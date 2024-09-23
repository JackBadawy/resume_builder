import { useState } from "react";
import { useContactDetails } from "../Context/ContactDetailsContext";
import ValidationModal from "./Modals/ValidationModal";
import LinkedInModal from "./Modals/LinkedInModal";

const ContactDetails: React.FC = () => {
  const { contactDetails, setContactDetails, linkedInEnabled, addressEnabled } =
    useContactDetails();
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[\d\s()-]{10,}$/;
    if (!phoneRegex.test(phone)) {
      setValidationError("Please enter a valid phone number.");
      return false;
    }
    return true;
  };

  const validateLinkedIn = (url: string) => {
    const linkedinRegex =
      /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/;
    if (!linkedinRegex.test(url)) {
      setValidationError("Please enter a valid LinkedIn profile URL.");
      return false;
    }
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Omit<typeof contactDetails, "linkedin">
  ) => {
    const value = e.target.value;
    setContactDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleBlur = (field: string) => {
    switch (field) {
      case "email":
        validateEmail(contactDetails.email);
        break;
      case "phone":
        validatePhone(contactDetails.phone);
        break;
    }
  };

  const handleLinkedInSave = (displayText: string, profileUrl: string) => {
    if (validateLinkedIn(profileUrl)) {
      setContactDetails((prevDetails) => ({
        ...prevDetails,
        linkedin: { displayText, profileUrl },
      }));
    }
  };

  const handleTestLinkedIn = () => {
    if (contactDetails.linkedin.profileUrl) {
      window.open(
        contactDetails.linkedin.profileUrl,
        "_blank",
        "noopener,noreferrer"
      );
    } else {
      setValidationError("Please enter a LinkedIn profile URL first.");
    }
  };

  return (
    <div className="contactDetail text-black flex flex-col pt-1">
      <label className="flex items-center text-word-11 font-aptos">
        <span className="h-17p flex items-center">Phone:</span>
        <input
          value={contactDetails.phone}
          onChange={(e) => handleChange(e, "phone")}
          onBlur={() => handleBlur("phone")}
          placeholder="Click to Enter Phone"
          className="flex-grow text-word-11 font-aptos h-17p pl-1 focus:outline-none"
          autoComplete="off"
          id="contactDetail"
          data-text
        />
      </label>
      {addressEnabled && (
        <label className="flex items-center text-word-11 font-aptos">
          <span className="h-17p flex items-center">Address:</span>
          <input
            value={contactDetails.address}
            onChange={(e) => handleChange(e, "address")}
            placeholder="Click to Enter Address"
            className="flex-grow text-word-11 font-aptos h-17p pl-1 focus:outline-none"
            autoComplete="off"
            id="contactDetail"
            data-text
          />
        </label>
      )}
      <label className="flex items-center text-word-11 font-aptos">
        <span className="h-17p flex items-center">Email:</span>
        <input
          value={contactDetails.email}
          onChange={(e) => handleChange(e, "email")}
          onBlur={() => handleBlur("email")}
          placeholder="Click to Enter Email"
          className="flex-grow text-word-11 font-aptos font-bold h-17p pl-1 focus:outline-none underline text-blue-600"
          autoComplete="off"
          id="contactDetail"
          data-text
        />
      </label>

      {linkedInEnabled && (
        <div className="flex items-center">
          <label className="flex items-center text-word-11 font-aptos flex-grow">
            <span className="h-17p flex items-center">LinkedIn Profile:</span>
            <input
              value={contactDetails.linkedin.displayText}
              onClick={() => setIsLinkedInModalOpen(true)}
              readOnly
              placeholder="Click to Enter LinkedIn Profile"
              className="flex-grow text-word-11 font-aptos h-17p pl-1 focus:outline-none underline font-bold text-blue-600 cursor-pointer"
              autoComplete="off"
              id="contactDetail"
              data-text
            />
          </label>
          <button
            onClick={handleTestLinkedIn}
            className="ml-2 px-2 bg-bws text-white rounded text-xs hover:bg-blue-600 transition-colors"
          >
            Test Link
          </button>
        </div>
      )}
      <hr className="font-bold font-black border-black mt-3 mb-6" />
      <ValidationModal
        isOpen={!!validationError}
        onClose={() => setValidationError(null)}
        message={validationError || ""}
      />
      <LinkedInModal
        isOpen={isLinkedInModalOpen}
        onClose={() => setIsLinkedInModalOpen(false)}
        onSave={handleLinkedInSave}
        initialDisplayText={contactDetails.linkedin.displayText}
        initialProfileUrl={contactDetails.linkedin.profileUrl}
      />
    </div>
  );
};

export default ContactDetails;
