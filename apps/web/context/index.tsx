'use client';

import { createContext, useContext, useState } from "react";
import { PreviewItem } from "../utils";

type SelectedImagesContextType = {
  selectedImages: PreviewItem[];
  setSelectedImages: (images: PreviewItem[]) => void;
};

const SelectedImagesContext = createContext<SelectedImagesContextType | null>(null);

export const SelectedImagesProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedImages, setSelectedImages] = useState<PreviewItem[]>([]);
  return (
    <SelectedImagesContext.Provider value={{ selectedImages, setSelectedImages }}>
      {children}
    </SelectedImagesContext.Provider>
  );
};

export const useSelectedImages = () => {
  const ctx = useContext(SelectedImagesContext);
  if (!ctx) throw new Error("useSelectedImages must be used inside SelectedImagesProvider");
  return ctx;
};