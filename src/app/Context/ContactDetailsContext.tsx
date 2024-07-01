import React, { createContext, useContext, useState, ReactNode } from "react";

interface ContactDetailsContextProps {
  contactDetails: Record<string, string>;
  setContactDetails: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  linkedInEnabled: boolean;
  setLinkedInEnabled: (enabled: boolean) => void;
}

const ContactDetailsContext = createContext<
  ContactDetailsContextProps | undefined
>(undefined);

export const ContactDetailsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [contactDetails, setContactDetails] = useState<Record<string, string>>({
    email: "",
    phone: "",
    address: "",
    linkedin: "",
  });

  const [linkedInEnabled, setLinkedInEnabled] = useState<boolean>(true);

  return (
    <ContactDetailsContext.Provider
      value={{
        contactDetails,
        setContactDetails,
        linkedInEnabled,
        setLinkedInEnabled,
      }}
    >
      {children}
    </ContactDetailsContext.Provider>
  );
};

export const useContactDetails = (): ContactDetailsContextProps => {
  const context = useContext(ContactDetailsContext);
  if (!context) {
    throw new Error(
      "useContactDetails must be used within a ContactDetailsProvider"
    );
  }
  return context;
};
