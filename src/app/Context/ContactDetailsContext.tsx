"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ContactDetailsContextProps {
  contactDetails: Record<string, string>;
  setContactDetails: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  linkedInEnabled: boolean;
  setLinkedInEnabled: (enabled: boolean) => void;
  addressEnabled: boolean;
  setAddressEnabled: (enabled: boolean) => void;
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
  const [addressEnabled, setAddressEnabled] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedContactDetails = localStorage.getItem("contactDetails");
      if (savedContactDetails) {
        setContactDetails(JSON.parse(savedContactDetails));
      }

      const savedLinkedInEnabled = localStorage.getItem("linkedInEnabled");
      if (savedLinkedInEnabled !== null) {
        setLinkedInEnabled(JSON.parse(savedLinkedInEnabled));
      }

      const savedAddressEnabled = localStorage.getItem("addressEnabled");
      if (savedAddressEnabled !== null) {
        setAddressEnabled(JSON.parse(savedAddressEnabled));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("contactDetails", JSON.stringify(contactDetails));
    }
  }, [contactDetails]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("linkedInEnabled", JSON.stringify(linkedInEnabled));
    }
  }, [linkedInEnabled]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("addressEnabled", JSON.stringify(addressEnabled));
    }
  }, [addressEnabled]);

  return (
    <ContactDetailsContext.Provider
      value={{
        contactDetails,
        setContactDetails,
        linkedInEnabled,
        setLinkedInEnabled,
        addressEnabled,
        setAddressEnabled,
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
