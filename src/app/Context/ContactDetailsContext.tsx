"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface LinkedInData {
  displayText: string;
  profileUrl: string;
}

interface ContactDetails {
  email: string;
  phone: string;
  address: string;
  linkedin: LinkedInData;
}

interface ContactDetailsContextProps {
  contactDetails: ContactDetails;
  setContactDetails: React.Dispatch<React.SetStateAction<ContactDetails>>;
  linkedInEnabled: boolean;
  setLinkedInEnabled: (enabled: boolean) => void;
  addressEnabled: boolean;
  setAddressEnabled: (enabled: boolean) => void;
  isLoading: boolean;
}

const ContactDetailsContext = createContext<
  ContactDetailsContextProps | undefined
>(undefined);

export const ContactDetailsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [contactDetails, setContactDetails] = useState<ContactDetails>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("contactDetails");
      if (saved) {
        const parsedData = JSON.parse(saved);
        if (typeof parsedData.linkedin === "string") {
          return {
            ...parsedData,
            linkedin: { displayText: parsedData.linkedin, profileUrl: "" },
          };
        }
        return parsedData;
      }
    }
    return {
      email: "",
      phone: "",
      address: "",
      linkedin: { displayText: "", profileUrl: "" },
    };
  });

  const [linkedInEnabled, setLinkedInEnabled] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("linkedInEnabled");
      return saved ? JSON.parse(saved) : true;
    }
    return true;
  });

  const [addressEnabled, setAddressEnabled] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("addressEnabled");
      return saved ? JSON.parse(saved) : true;
    }
    return true;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("contactDetails", JSON.stringify(contactDetails));
      localStorage.setItem("linkedInEnabled", JSON.stringify(linkedInEnabled));
      localStorage.setItem("addressEnabled", JSON.stringify(addressEnabled));
      setIsLoading(false);
    }
  }, [contactDetails, linkedInEnabled, addressEnabled]);

  return (
    <ContactDetailsContext.Provider
      value={{
        contactDetails,
        setContactDetails,
        linkedInEnabled,
        setLinkedInEnabled,
        addressEnabled,
        setAddressEnabled,
        isLoading,
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
