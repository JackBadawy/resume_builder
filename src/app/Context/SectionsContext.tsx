"use client";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

import { useModal } from "./ModalContext";

interface Section {
  heading: string;
  text: string;
}

interface SectionsContextType {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  addSection: (sectionName: string) => void;
  moveSectionUp: (index: number) => void;
  moveSectionDown: (index: number) => void;
  deleteSection: (index: number) => void;
  resetSections: () => void;
  isLoading: boolean;
}

const SectionsContext = createContext<SectionsContextType | undefined>(
  undefined
);

const defaultSections: Section[] = [
  { heading: "About Me", text: "" },
  { heading: "Work Experience", text: "" },
  { heading: "Education", text: "" },
  { heading: "References", text: "" },
];

export const SectionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(true);
  const [sections, setSections] = useState<Section[]>(() => {
    if (typeof window !== "undefined") {
      const savedSections = localStorage.getItem("sections");
      return savedSections ? JSON.parse(savedSections) : defaultSections;
    }
    return defaultSections;
  });

  useEffect(() => {
    const loadSections = () => {
      const savedSections = localStorage.getItem("sections");
      if (savedSections) {
        setSections(JSON.parse(savedSections));
      }
      setIsLoading(false);
    };

    loadSections();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sections", JSON.stringify(sections));
      setIsLoading(false);
    }
  }, [sections]);

  const addSection = (sectionName: string) => {
    setSections([...sections, { heading: sectionName, text: "" }]);
  };

  const moveSectionUp = (index: number) => {
    if (index > 0) {
      const newSections = [...sections];
      [newSections[index - 1], newSections[index]] = [
        newSections[index],
        newSections[index - 1],
      ];
      setSections(newSections);
    }
  };

  const moveSectionDown = (index: number) => {
    if (index < sections.length - 1) {
      const newSections = [...sections];
      [newSections[index + 1], newSections[index]] = [
        newSections[index],
        newSections[index + 1],
      ];
      setSections(newSections);
    }
  };

  const deleteSection = (index: number) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
    closeModal();
  };

  const resetSections = () => {
    setSections(defaultSections);
    closeModal();
  };

  return (
    <SectionsContext.Provider
      value={{
        sections,
        setSections,
        addSection,
        moveSectionUp,
        moveSectionDown,
        deleteSection,
        resetSections,
        isLoading,
      }}
    >
      {children}
    </SectionsContext.Provider>
  );
};

export const useSections = () => {
  const context = useContext(SectionsContext);
  if (!context) {
    throw new Error("useSections must be used within a SectionsProvider");
  }
  return context;
};
