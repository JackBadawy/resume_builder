import React, { createContext, useContext, useState, ReactNode } from "react";
import AlertModal from "../Components/AlertModal";

interface ModalContextProps {
  openModal: (
    message: string,
    onConfirm?: (fileName?: string) => void,
    fileName?: string
  ) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [onConfirm, setOnConfirm] = useState<
    ((fileName?: string) => void) | undefined
  >(undefined);

  const openModal = (
    message: string,
    onConfirm?: (fileName?: string) => void,
    fileName?: string
  ) => {
    setMessage(message);
    setOnConfirm(() => onConfirm);
    setFileName(fileName);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <AlertModal
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={onConfirm}
        message={message}
        fileName={fileName}
      />
    </ModalContext.Provider>
  );
};
