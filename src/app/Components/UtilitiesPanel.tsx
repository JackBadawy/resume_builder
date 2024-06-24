import React, { useState } from "react";
import { useSections } from "../Context/SectionsContext";

const UtilityPanel: React.FC = () => {
  const { sections, addSection } = useSections();
  const [newSectionPrompt, setNewSecPrompt] = useState<boolean>(false);
  const [newSubHeading, setNewSubHeading] = useState<string>("");

  const handleNewSecChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSubHeading(e.target.value);
  };

  const handleAddSection = () => {
    if (newSubHeading.trim()) {
      addSection(newSubHeading);
      setNewSubHeading("");
      setNewSecPrompt(false);
    }
  };

  return (
    <div className="utilContainer h-a4 p-4 flex flex-col gap-4">
      <div>
        <h2 className="underline">Sections:</h2>
        <ul>
          {sections.map((section, index) => (
            <li key={index}>{section}</li>
          ))}
        </ul>
      </div>
      {newSectionPrompt === false ? (
        <button
          onClick={() => setNewSecPrompt(true)}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Add Section
        </button>
      ) : (
        <div className="flex gap-2">
          <input
            onChange={handleNewSecChange}
            value={newSubHeading}
            className="text-black"
            placeholder="New Section Name..."
          />
          <button
            onClick={handleAddSection}
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default UtilityPanel;
