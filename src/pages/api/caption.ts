import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next/types";

type Data = string;
interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    imageUrl: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>
) {
  const { imageUrl } = req.body;
  // POST request to Replicate to start the image restoration generation process
  let startResponse = await axios.post(
    "https://api.replicate.com/v1/predictions",
    {
      version:
        "a4a8bafd6089e1716b06057c42b19378250d008b80fe87caa5cd36d40c1eda90",
      input: {
        image: imageUrl,
        clip_model_name: "ViT-H-14/laion2b_s32b_b79k",
        mode: "fast",
      },
    },
    {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
      },
    }
  );

  let jsonStartResponse = await startResponse.data;

  let endpointUrl = jsonStartResponse.urls.get;

  // GET request to get the status of the image restoration process & return the result when it's ready
  let imageCaption: string | null = null;
  while (!imageCaption) {
    // Loop in 1s intervals until the alt text is ready
    let finalResponse = await axios.get(endpointUrl, {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
      },
    });
    let jsonFinalResponse = await finalResponse.data;

    if (jsonFinalResponse.status === "succeeded") {
      imageCaption = jsonFinalResponse.output;
    } else if (jsonFinalResponse.status === "failed") {
      break;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  res.status(200).json(imageCaption ? imageCaption : "Failed to caption image");
}
