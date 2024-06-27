import { createContext, useState, useContext, ReactNode } from "react";

interface SectionsContextType {
  sections: string[];
  addSection: (sectionName: string) => void;
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

  return (
    <SectionsContext.Provider value={{ sections, addSection }}>
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
