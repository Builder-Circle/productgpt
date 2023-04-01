import { createContext, useContext, useState } from "react";

interface GeneratorContextInterface {
  prompt: string | null;
  setPrompt: (value: string | null) => void | null;
  imageName: string | null;
  setImageName: (value: string | null) => void | null;
  originalImage: string | null;
  setOriginalImage: (value: string | null) => void | null;
  generatedImage: string | null;
  setGeneratedImage: (value: string | null) => void | null;
  noBgOriginalImage: string | null;
  setNoBgOriginalImage: (value: string | null) => void | null;
  maskedOriginalImage: string | null;
  setMaskedOriginalImage: (value: string | null) => void | null;
  resultLoading: boolean;
  setResultLoading: (value: boolean) => void | null;
}

const GeneratorContext = createContext<GeneratorContextInterface | undefined>(
  undefined
);

export function useGenerator() {
  const context = useContext(GeneratorContext);
  if (context === undefined) {
    throw new Error("useGenerator must be within GeneratorProvider");
  }
  return context;
}

export function GeneratorProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [prompt, setPrompt] = useState<string | null>(
    null
  );
  const [imageName, setImageName] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [noBgOriginalImage, setNoBgOriginalImage] = useState<string | null>(
    null
  );
  const [maskedOriginalImage, setMaskedOriginalImage] = useState<string | null>(
    null
  );
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [resultLoading, setResultLoading] = useState(false);

  const value = {
    prompt,
    setPrompt,
    imageName,
    setImageName,
    originalImage,
    setOriginalImage,
    generatedImage,
    setGeneratedImage,
    noBgOriginalImage,
    setNoBgOriginalImage,
    maskedOriginalImage,
    setMaskedOriginalImage,
    resultLoading,
    setResultLoading,
  };
  return (
    <GeneratorContext.Provider value={value}>
      {children}
    </GeneratorContext.Provider>
  );
}
