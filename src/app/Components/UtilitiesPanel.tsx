import { useState } from "react";
import { useSections } from "../Context/SectionsContext";
import ToggleSwitch from "./ToggleSwitch";

const UtilityPanel: React.FC = () => {
  const { sections, addSection, moveSectionUp, moveSectionDown } =
    useSections();
  const [newSectionPrompt, setNewSecPrompt] = useState<boolean>(false);
  const [newSubHeading, setNewSubHeading] = useState<string>("");
  const [linkedInEnabled, setLinkedInEnabled] = useState<boolean>(true);

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
      <div className="bg-slate-800 p-3 rounded-lg shadow-md">
        <h2 className="underline text-white text-lg font-semibold">
          Contact Details:
        </h2>
        <ul className="flex flex-col gap-2 mt-2">
          <li className="bg-slate-700 rounded p-1 flex justify-between items-center">
            <span className="mr-1">LinkedIn</span>
            <ToggleSwitch
              enabled={linkedInEnabled}
              setEnabled={setLinkedInEnabled}
            />
          </li>
        </ul>
      </div>

      <div className="bg-slate-800 p-3 rounded-lg shadow-md">
        <h2 className="underline text-white text-lg font-semibold">
          Sections:
        </h2>
        <ul className="flex flex-col gap-2 mt-2">
          {sections.map((section, index) => (
            <li
              key={index}
              className="bg-slate-700 rounded p-1 flex justify-between items-center"
            >
              <span className="mr-1">{section.heading}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => moveSectionUp(index)}
                  className="bg-bws text-white px-2 rounded"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveSectionDown(index)}
                  className="bg-bws text-white px-2 rounded"
                >
                  ↓
                </button>
              </div>
            </li>
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
