'use client';

import { createContext, useContext, useState } from "react";
import { PreviewItem } from "../utils";

type SelectedImagesContextType = {
  selectedImages: PreviewItem[];
  setSelectedImages: (images: PreviewItem[]) => void;
  hasSelection: boolean;
  selected: boolean[];
  setSelected: React.Dispatch<React.SetStateAction<boolean[]>>;
  coverPagePicture: string | null;
  setCoverPagePicture: React.Dispatch<React.SetStateAction<string | null>>;
};

const SelectedImagesContext = createContext<SelectedImagesContextType | null>(null);

export const SelectedImagesProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedImages, setSelectedImages] = useState<PreviewItem[]>([]);
  const [selected, setSelected] = useState<boolean[]>([]);
  const hasSelection = selected.length > 0;
  const [coverPagePicture, setCoverPagePicture] = useState<string | null>(null);
  return (
    <SelectedImagesContext.Provider value={{ selectedImages, setSelectedImages, hasSelection , selected, setSelected, coverPagePicture, setCoverPagePicture }}>
      {children}
    </SelectedImagesContext.Provider>
  );
};

export const useSelectedImages = () => {
  const ctx = useContext(SelectedImagesContext);
  if (!ctx) throw new Error("useSelectedImages must be used inside SelectedImagesProvider");
  return ctx;
};