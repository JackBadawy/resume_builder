import { createContext, useState, useContext, ReactNode } from "react";

interface SectionsContextType {
  sections: string[];
  addSection: (sectionName: string) => void;
  moveSectionUp: (index: number) => void;
  moveSectionDown: (index: number) => void;
}

const SectionsContext = createContext<SectionsContextType | undefined>(
  undefined
);

export const SectionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sections, setSections] = useState<string[]>([
    "About Me",
    "Work Experience",
    "Education",
    "References",
  ]);

  const addSection = (sectionName: string) => {
    setSections([...sections, sectionName]);
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

  return (
    <SectionsContext.Provider
      value={{ sections, addSection, moveSectionUp, moveSectionDown }}
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
