import { ReactNode, createContext, useContext, useState } from "react";
//might delete file
interface FileContextProps {
  fileName: string;
  setFileName: (name: string) => void;
}

const defaultFileContext: FileContextProps = {
  fileName: "resume",
  setFileName: () => {},
};

const FileContext = createContext<FileContextProps>(defaultFileContext);
export const FileContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [fileName, setFileName] = useState<string>("resume");

  return (
    <FileContext.Provider value={{ fileName, setFileName }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFile must be used within a FileProvider");
  }
  return context;
};
