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
        "4bdb324f7d2547aef96ca0704a94c0b25ab2805b9afecc2d24e68f7a01f87297",
      input: {
        image: imageUrl,
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
  let generatedImage: string | null = null;
  while (!generatedImage) {
    // Loop in 1s intervals until the alt text is ready
    let finalResponse = await axios.get(endpointUrl, {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
      },
    });
    let jsonFinalResponse = await finalResponse.data;

    if (jsonFinalResponse.status === "succeeded") {
      generatedImage = jsonFinalResponse.output;
    } else if (jsonFinalResponse.status === "failed") {
      break;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  res
    .status(200)
    .json(generatedImage ? generatedImage : "Failed to restore image");
}
