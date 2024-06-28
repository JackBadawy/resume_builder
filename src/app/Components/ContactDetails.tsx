import { useState, useEffect } from "react";

const ContactDetails = ({
  onUpdate,
}: {
  onUpdate: (details: Record<string, string>) => void;
}) => {
  const [details, setDetails] = useState({
    email: "",
    phone: "",
    address: "",
    linkedin: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value;
    setDetails((prevDetails) => {
      return { ...prevDetails, [field]: value };
    });
  };

  useEffect(() => {
    onUpdate(details);
  }, [details, onUpdate]);

  return (
    <div className="contactDetail text-black flex flex-col">
      <label className="text-word-11 font-aptos flex">
        Email:
        <input
          value={details.email}
          onChange={(e) => handleChange(e, "email")}
          placeholder="Click to Enter Email"
          className="text-word-11 font-aptos flex-grow"
          id="contactDetail"
          data-text
        />
      </label>
      <label className="text-word-11 font-aptos flex">
        Phone:
        <input
          value={details.phone}
          onChange={(e) => handleChange(e, "phone")}
          placeholder="Click to Enter Phone Number"
          className="text-word-11 font-aptos flex-grow"
          id="contactDetail"
          data-text
        />
      </label>
      <label className="text-word-11 font-aptos flex">
        Address:
        <input
          value={details.address}
          onChange={(e) => handleChange(e, "address")}
          placeholder="Click to Enter Address"
          className="text-word-11 font-aptos flex-grow"
          id="contactDetail"
          data-text
        />
      </label>
      <label className="text-word-11 font-aptos flex">
        LinkedIn Profile:
        <input
          value={details.linkedin}
          onChange={(e) => handleChange(e, "linkedin")}
          placeholder="Click to Enter LinkedIn Profile"
          className="text-word-11 font-aptos flex-grow"
          id="contactDetail"
          data-text
        />
      </label>
      <hr className="font-bold font-black border-black mt-3" />
    </div>
  );
};

export default ContactDetails;
