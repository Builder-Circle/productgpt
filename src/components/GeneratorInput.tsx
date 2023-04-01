import { useGenerator } from "@/contexts/GeneratorContext";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Spinner,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { UploadDropzone } from "react-uploader";
import { Uploader } from "uploader";

const uploader = Uploader({
  apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    : "free",
});

const options = {
  maxFileCount: 1,
  mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
  editor: { images: { crop: false } },
  styles: {
    colors: { primary: "#2563EB" },
  },
};

export default function GeneratorInput() {
  const {
    prompt,
    setPrompt,
    setImageName,
    setOriginalImage,
    setNoBgOriginalImage,
    setMaskedOriginalImage,
    setGeneratedImage,
    originalImage,
    noBgOriginalImage,
    maskedOriginalImage,
    resultLoading,
    setResultLoading,
  } = useGenerator();

  const [imageLoading, setImageLoading] = useState(false);
  const [captionLoading, setCaptionLoading] = useState(false);

  const UploadZone = () => (
    <UploadDropzone
      uploader={uploader}
      options={options}
      onUpdate={(file) => {
        if (file.length !== 0) {
          setImageName(file[0].originalFile.originalFileName);
          const imageUrl = file[0].fileUrl.replace("raw", "thumbnail");
          setOriginalImage(imageUrl);
          setImageLoading(true);
          axios
            .post("/api/masking", { imageUrl })
            .then((res) => {
              console.log(res.data);
              setNoBgOriginalImage(res.data[0]);
              setMaskedOriginalImage(res.data[1]);
              setImageLoading(false);
            })
            .catch((err) => {
              setImageLoading(false);
            });
        }
      }}
      width="670px"
      height="250px"
    />
  );

  const getCaption = () => {
    if (originalImage) {
      setCaptionLoading(true);
      axios
        .post("/api/caption", { imageUrl: originalImage })
        .then((res) => {
          setPrompt(res.data);
          setCaptionLoading(false);
        })
        .catch((err) => {
          setCaptionLoading(false);
        });
    }
  };

  const generateResult = async () => {
    if (!prompt || !noBgOriginalImage || !maskedOriginalImage) return;
    setResultLoading(true);
    axios
      .post("/api/generate", {
        prompt,
        imageUrl: noBgOriginalImage,
        imageMaskUrl: maskedOriginalImage,
      })
      .then((res) => {
        setGeneratedImage(res.data);
        setResultLoading(false);
      });
  };

  return (
    <Flex
      flexDirection={"column"}
      p={8}
      bgColor={"white"}
      borderRadius={8}
      border="1px solid #EFEFEF"
      boxShadow={"md"}
      gap={2}
      w="100%"
    >
      <Text fontWeight={"bold"}>Prompt</Text>
      {!captionLoading ? (
        <Textarea
          value={prompt ? prompt : ""}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: A bottle of perfume, on the rock, mountain view, sunset light."
          isDisabled={captionLoading}
        />
      ) : (
        <VStack h="100%" alignItems={"center"} justifyContent={"center"}>
          <Spinner
            thickness="6px"
            speed="0.65s"
            emptyColor="gray.200"
            color="primary.0"
            w={"60px"}
            h={"60px"}
          />
          <Text>Generating Prompt...</Text>
        </VStack>
      )}

      <Button
        colorScheme={"spaceblue"}
        onClick={() => {
          getCaption();
        }}
        isDisabled={
          captionLoading || resultLoading || imageLoading || !originalImage
        }
      >
        <Text fontWeight={"bold"}>Auto Prompt (Slow)</Text>
      </Button>
      <Text fontWeight={"bold"}>Upload Image</Text>
      {originalImage && noBgOriginalImage && !imageLoading && (
        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
          <GridItem colSpan={1}>
            <Image
              alt="original photo"
              src={originalImage}
              width={"100%"}
              borderRadius={8}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <Image
              alt="no bg original photo"
              src={noBgOriginalImage}
              width={"100%"}
              borderRadius={8}
            />
          </GridItem>
        </Grid>
      )}
      {!originalImage && !imageLoading && <UploadZone />}
      {imageLoading && (
        <VStack h="100%" alignItems={"center"} justifyContent={"center"}>
          <Spinner
            thickness="6px"
            speed="0.65s"
            emptyColor="gray.200"
            color="primary.0"
            w={"60px"}
            h={"60px"}
          />
          <Text>Processing Image...</Text>
        </VStack>
      )}
      <Button
        colorScheme={"spaceblue"}
        onClick={() => {
          generateResult();
        }}
        isDisabled={
          captionLoading ||
          resultLoading ||
          imageLoading ||
          !prompt ||
          !originalImage ||
          !noBgOriginalImage ||
          !maskedOriginalImage
        }
      >
        <Text fontWeight={"bold"}>Generate</Text>
      </Button>
      <Button
        colorScheme={"gray"}
        onClick={() => {
          setPrompt("");
          setImageName("");
          setOriginalImage("");
          setNoBgOriginalImage("");
          setMaskedOriginalImage("");
          setGeneratedImage("");
          setCaptionLoading(false);
          setImageLoading(false);
          setResultLoading(false);
        }}
        isDisabled={imageLoading}
      >
        <Text fontWeight={"bold"}>Reset</Text>
      </Button>
    </Flex>
  );
}
