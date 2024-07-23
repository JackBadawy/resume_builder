import React, { createContext, useContext, useState, ReactNode } from "react";
import AlertModal from "../Components/Modals/AlertModal";

interface ModalContextProps {
  openModal: (
    message: string,
    onConfirm?: (content?: string[]) => void,
    fileName?: string,
    renderContent?: () => JSX.Element
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
    ((content?: string[]) => void) | undefined
  >(undefined);
  const [renderContent, setRenderContent] = useState<
    (() => JSX.Element) | undefined
  >(undefined);

  const openModal = (
    message: string,
    onConfirm?: (content?: string[]) => void,
    fileName?: string,
    renderContent?: () => JSX.Element
  ) => {
    setMessage(message);
    setOnConfirm(() => onConfirm);
    setFileName(fileName);
    setRenderContent(() => renderContent);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setMessage("");
    setFileName(undefined);
    setOnConfirm(undefined);
    setRenderContent(undefined);
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
        renderContent={renderContent}
      />
    </ModalContext.Provider>
  );
};
