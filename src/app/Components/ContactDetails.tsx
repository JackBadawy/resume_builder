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
      <label className="text-word-11 font-aptos ">
        Email:
        <input
          value={details.email}
          onChange={(e) => handleChange(e, "email")}
          placeholder="Email"
          className="text-word-11 font-aptos "
          id="contactDetail"
          data-text
        />
      </label>
      <label className="text-word-11 font-aptos ">
        Phone:
        <input
          value={details.phone}
          onChange={(e) => handleChange(e, "phone")}
          placeholder="Phone"
          className="text-word-11 font-aptos "
          id="contactDetail"
          data-text
        />
      </label>
      <label className="text-word-11 font-aptos ">
        Address:
        <input
          value={details.address}
          onChange={(e) => handleChange(e, "address")}
          placeholder="Address"
          className="text-word-11 font-aptos "
          id="contactDetail"
          data-text
        />
      </label>
      <label className="text-word-11 font-aptos">
        LinkedIn Profile:
        <input
          value={details.linkedin}
          onChange={(e) => handleChange(e, "linkedin")}
          placeholder="LinkedIn Profile"
          className="text-word-11 font-aptos "
          id="contactDetail"
          data-text
        />
      </label>
      <hr className="font-bold font-black border-black mt-3" />
    </div>
  );
};

export default ContactDetails;
