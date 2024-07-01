import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

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
}

const SectionsContext = createContext<SectionsContextType | undefined>(
  undefined
);

export const SectionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const initialSections = () => {
    const savedSections = localStorage.getItem("sections");
    return savedSections
      ? JSON.parse(savedSections)
      : [
          { heading: "About Me", text: "" },
          { heading: "Work Experience", text: "" },
          { heading: "Education", text: "" },
          { heading: "References", text: "" },
        ];
  };

  const [sections, setSections] = useState<Section[]>(initialSections);

  useEffect(() => {
    localStorage.setItem("sections", JSON.stringify(sections));
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

  return (
    <SectionsContext.Provider
      value={{
        sections,
        setSections,
        addSection,
        moveSectionUp,
        moveSectionDown,
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
