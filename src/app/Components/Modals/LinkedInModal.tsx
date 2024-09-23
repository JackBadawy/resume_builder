import { useState } from "react";

interface LinkedInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (displayText: string, profileUrl: string) => void;
  initialDisplayText: string;
  initialProfileUrl: string;
}

const LinkedInModal: React.FC<LinkedInModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialDisplayText,
  initialProfileUrl,
}) => {
  const [displayText, setDisplayText] = useState(initialDisplayText);
  const [profileUrl, setProfileUrl] = useState(initialProfileUrl);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(displayText, profileUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 fade-in">
      <div className="bg-slate-800 p-6 rounded-lg shadow-md text-white w-96 slide-down">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">LinkedIn Profile</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="text-left">
          <label className="block mb-2">
            Display Text:
            <input
              type="text"
              value={displayText}
              onChange={(e) => setDisplayText(e.target.value)}
              className="w-full p-2 mt-1 text-black rounded"
              placeholder="@YourName"
            />
          </label>
          <label className="block mb-4">
            Profile URL:
            <input
              type="text"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              className="w-full p-2 mt-1 text-black rounded"
              placeholder="https://www.linkedin.com/in/your-profile"
            />
          </label>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-bws rounded hover:bg-opacity-80 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkedInModal;
