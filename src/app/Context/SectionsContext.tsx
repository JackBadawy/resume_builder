"use client";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useModal } from "./ModalContext";

export interface SectionEntry {
  id: number;
  entryContent: string[];
}

export interface Section {
  heading: string;
  sectionContent: SectionEntry[];
}

interface SectionsContextType {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  addSection: (sectionName: string) => void;
  addSectionEntry: (sectionIndex: number, content: string[]) => void;
  moveSectionUp: (index: number) => void;
  moveSectionDown: (index: number) => void;
  deleteSection: (index: number) => void;
  resetSections: () => void;
  isLoading: boolean;
  deleteEntry: (sectionIndex: number, entryIndex: number) => void;
}

const SectionsContext = createContext<SectionsContextType | undefined>(
  undefined
);

const defaultSections: Section[] = [
  { heading: "About Me", sectionContent: [{ id: 1, entryContent: [""] }] },
  {
    heading: "Work Experience",
    sectionContent: [],
  },
  { heading: "Education", sectionContent: [] },
  { heading: "References", sectionContent: [] },
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
    console.log("Adding section:", sectionName);
    setSections([...sections, { heading: sectionName, sectionContent: [] }]);
  };

  const addSectionEntry = (sectionIndex: number, entryContent: string[]) => {
    const newSections = [...sections];

    if (newSections[sectionIndex].heading === "About Me") {
      newSections[sectionIndex].sectionContent = [
        {
          id: 1,
          entryContent: [...entryContent],
        },
      ];
    } else {
      newSections[sectionIndex].sectionContent.push({
        id: newSections[sectionIndex].sectionContent.length + 1,
        entryContent: [...entryContent],
      });
    }

    setSections(newSections);

    console.log("sections", sections);
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

  const deleteEntry = (sectionIndex: number, entryIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].sectionContent = newSections[
      sectionIndex
    ].sectionContent.filter((_, i) => i !== entryIndex);
    setSections(newSections);
    localStorage.setItem("sections", JSON.stringify(newSections));
    closeModal();
  };

  const resetSections = () => {
    console.log("Resetting sections");
    const newSections = defaultSections.map((section) => ({
      ...section,
      sectionContent: [],
    }));
    setSections(newSections);
    setSections(defaultSections);
    localStorage.setItem("sections", JSON.stringify(newSections));
    closeModal();
  };

  return (
    <SectionsContext.Provider
      value={{
        sections,
        setSections,
        addSection,
        addSectionEntry,
        moveSectionUp,
        moveSectionDown,
        deleteSection,
        resetSections,
        isLoading,
        deleteEntry,
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
