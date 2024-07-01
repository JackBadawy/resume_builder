import {
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
  const savedContactDetails = localStorage.getItem("contactDetails");
  const initialContactDetails = savedContactDetails
    ? JSON.parse(savedContactDetails)
    : {
        email: "",
        phone: "",
        address: "",
        linkedin: "",
      };

  const savedLinkedInEnabled = localStorage.getItem("linkedInEnabled");
  const initialLinkedInEnabled =
    savedLinkedInEnabled !== null ? JSON.parse(savedLinkedInEnabled) : true;

  const savedAddressEnabled = localStorage.getItem("addressEnabled");
  const initialAddressEnabled =
    savedAddressEnabled !== null ? JSON.parse(savedAddressEnabled) : true;

  const [contactDetails, setContactDetails] = useState<Record<string, string>>(
    initialContactDetails
  );
  const [linkedInEnabled, setLinkedInEnabled] = useState<boolean>(
    initialLinkedInEnabled
  );
  const [addressEnabled, setAddressEnabled] = useState<boolean>(
    initialAddressEnabled
  );

  useEffect(() => {
    localStorage.setItem("contactDetails", JSON.stringify(contactDetails));
  }, [contactDetails]);

  useEffect(() => {
    localStorage.setItem("linkedInEnabled", JSON.stringify(linkedInEnabled));
  }, [linkedInEnabled]);

  useEffect(() => {
    localStorage.setItem("addressEnabled", JSON.stringify(addressEnabled));
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
