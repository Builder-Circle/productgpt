import { useGenerator } from "@/contexts/GeneratorContext";
import {
  Box,
  Flex,
  Image,
  Spinner,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { CompareSlider } from "./CompareSlider";

export default function GeneratorOutput() {
  const { originalImage, generatedImage, resultLoading } = useGenerator();
  const [sideBySide, setSideBySide] = useState(false);
  return (
    <Flex
      flexDirection={"column"}
      p={8}
      bgColor={"white"}
      borderRadius={8}
      border="1px solid #EFEFEF"
      boxShadow={"md"}
      gap={2}
      align={"left"}
    >
      <Flex justifyContent={"space-between"} w="100%">
        <Text fontWeight={"extrabold"} fontSize={"24px"}>
          Result
        </Text>
        <Flex alignItems={"center"} gap={4}>
          <Text>comparision</Text>
          <Switch
            isChecked={sideBySide}
            onChange={(e) => setSideBySide(e.target.checked)}
          />
        </Flex>
      </Flex>
      <VStack
        p={4}
        minH={"50vh"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {resultLoading && (
          <VStack h="100%" alignItems={"center"} justifyContent={"center"}>
            <Spinner
              thickness="6px"
              speed="0.65s"
              emptyColor="gray.200"
              color="primary.0"
              w={"60px"}
              h={"60px"}
            />
            <Text>You result is on the way!</Text>
          </VStack>
        )}
        {!resultLoading && !generatedImage && (
          <Text>No result generated yet.</Text>
        )}
        {!resultLoading && originalImage && generatedImage && !sideBySide && (
          <Image
            alt="restored photo"
            src={generatedImage}
            width={{ base: "100%", md: "60%" }}
            borderRadius={8}
          />
        )}
        {!resultLoading && originalImage && generatedImage && sideBySide && (
          <Box width={{ base: "100%", md: "60%" }}>
            <CompareSlider
              original={originalImage!}
              restored={generatedImage!}
            />
          </Box>
        )}
      </VStack>
    </Flex>
  );
}
