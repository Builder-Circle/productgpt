import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next/types";

type Data = string;
interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    prompt: string;
    imageUrl: string;
    imageMaskUrl: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, imageUrl, imageMaskUrl } = req.body;
  // POST request to Replicate to start the image restoration generation process
  let startResponse = await axios.post(
    "https://api.replicate.com/v1/predictions",
    {
      version:
        "e490d072a34a94a11e9711ed5a6ba621c3fab884eda1665d9d3a282d65a21180",
      input: {
        prompt,
        negative_prompt: "",
        image: imageUrl,
        mask: imageMaskUrl,
        invert_mask: true,
        num_outputs: 1,
        num_inference_steps: 50,
        guidance_scale: 7.5,
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
