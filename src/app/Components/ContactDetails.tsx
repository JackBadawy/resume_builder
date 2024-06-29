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
    <div className="contactDetail text-black flex flex-col pt-1">
      <label className="flex items-center text-word-11 font-aptos">
        <span className="h-17p flex items-center">Email:</span>
        <input
          value={details.email}
          onChange={(e) => handleChange(e, "email")}
          placeholder="Click to Enter Email"
          className="flex-grow text-word-11 font-aptos h-17p pl-1 focus:outline-none"
          autoComplete="off"
          id="contactDetail"
          data-text
        />
      </label>
      <label className="flex items-center text-word-11 font-aptos">
        <span className="h-17p flex items-center">Phone:</span>
        <input
          value={details.phone}
          onChange={(e) => handleChange(e, "phone")}
          placeholder="Click to Enter Phone"
          className="flex-grow text-word-11 font-aptos h-17p pl-1 focus:outline-none"
          autoComplete="off"
          id="contactDetail"
          data-text
        />
      </label>
      <label className="flex items-center text-word-11 font-aptos">
        <span className="h-17p flex items-center">Address:</span>
        <input
          value={details.address}
          onChange={(e) => handleChange(e, "address")}
          placeholder="Click to Enter Address"
          className="flex-grow text-word-11 font-aptos h-17p pl-1 focus:outline-none"
          autoComplete="off"
          id="contactDetail"
          data-text
        />
      </label>
      <label className="flex items-center text-word-11 font-aptos">
        <span className="h-17p flex items-center">LinkedIn Profile:</span>
        <input
          value={details.linkedin}
          onChange={(e) => handleChange(e, "linkedin")}
          placeholder="Click to Enter LinkedIn Profile"
          className="flex-grow text-word-11 font-aptos h-17p pl-1 focus:outline-none"
          autoComplete="off"
          id="contactDetail"
          data-text
        />
      </label>
      <hr className="font-bold font-black border-black mt-3 mb-6" />
    </div>
  );
};

export default ContactDetails;
