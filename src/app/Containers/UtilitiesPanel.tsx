"use client";
import { useState } from "react";
import { useSections } from "../Context/SectionsContext";
import ToggleSwitch from "../Components/ToggleSwitch";
import { useContactDetails } from "../Context/ContactDetailsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { useResumeContext } from "../Context/ResumeMetaContext";
import { useModal } from "../Context/ModalContext";

const UtilityPanel: React.FC = () => {
  const {
    sections,
    addSection,
    moveSectionUp,
    moveSectionDown,
    deleteSection,
    resetSections,
  } = useSections();
  const {
    linkedInEnabled,
    setLinkedInEnabled,
    addressEnabled,
    setAddressEnabled,
  } = useContactDetails();
  const [newSectionPrompt, setNewSecPrompt] = useState<boolean>(false);
  const [newSubHeading, setNewSubHeading] = useState<string>("");

  const { isLoading } = useContactDetails();

  const { heightMinusPadding, resumeRef } = useResumeContext();
  const { openModal } = useModal();

  const handleNewSecChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSubHeading(e.target.value);
  };

  const handleAddSection = () => {
    if (newSubHeading.trim()) {
      if (canAddNewSection()) {
        addSection(newSubHeading);
        setNewSubHeading("");
        setNewSecPrompt(false);
      } else {
        openModal("Adding this section will exceed the page limit.");
      }
    }
  };

  const handleCancel = () => {
    setNewSecPrompt(false);
  };

  const handleDelete = (index: number) => {
    openModal("Are you sure you want to delete this section?", () =>
      deleteSection(index)
    );
  };

  const handleReset = () => {
    openModal("Are you sure you want to reset all sections?", resetSections);
  };

  const canAddNewSection = (): boolean => {
    const currentHeight = resumeRef.current?.scrollHeight;
    const newSectionHeightEstimate = 50;
    const a4Height = heightMinusPadding;
    if (!currentHeight) {
      return false;
    }
    return currentHeight + newSectionHeightEstimate <= a4Height;
  };

  return (
    <div className="utilContainer h-a4 p-4 flex flex-col gap-4">
      <div className="bg-slate-800 p-3 rounded-lg shadow-md">
        <h2 className="text-white text-lg font-semibold">Contact Details:</h2>
        <ul className="flex flex-col gap-2 mt-2">
          <li className="bg-slate-700 rounded p-1 flex justify-between items-center">
            <span>LinkedIn</span>
            <ToggleSwitch
              enabled={linkedInEnabled}
              setEnabled={setLinkedInEnabled}
            />
          </li>
          <li className="bg-slate-700 rounded p-1 flex justify-between items-center">
            <span>Address</span>
            <ToggleSwitch
              enabled={addressEnabled}
              setEnabled={setAddressEnabled}
            />
          </li>
        </ul>
      </div>

      <div className="bg-slate-800 p-3 rounded-lg shadow-md w-60">
        <h2 className="text-white text-lg font-semibold">Sections:</h2>

        <ul className="flex flex-col gap-2 mt-2">
          {!isLoading ? (
            sections.map((section, index) => (
              <li
                key={index}
                className="bg-slate-700 rounded p-1 flex justify-between items-center"
              >
                <span className="mr-1">{section.heading}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-bws text-white px-2 rounded"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => moveSectionUp(index)}
                      className="bg-bws text-white px-2 rounded"
                      id={`${section.heading}UpBtn`}
                    >
                      <FontAwesomeIcon icon={faArrowUp} />
                    </button>
                    <button
                      onClick={() => moveSectionDown(index)}
                      className="bg-bws text-white px-2 rounded"
                      id={`${section.heading}DwnBtn`}
                    >
                      <FontAwesomeIcon icon={faArrowDown} />
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div className="bg-slate-700 rounded p-1 text-center">
              Loading...
            </div>
          )}
          <li>
            {newSectionPrompt === false ? (
              <button
                onClick={() => setNewSecPrompt(true)}
                className="mb-4 mt-4 px-4 py-2 bg-bws text-white rounded w-full"
              >
                Add Section
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <input
                  onChange={handleNewSecChange}
                  value={newSubHeading}
                  className="bg-slate-700 text-white outline-none p-1 rounded"
                  placeholder="New Section Name..."
                />
                <div className="flex justify-between">
                  <button
                    className="mb-4 px-4 py-2 bg-gray-600 text-white rounded"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddSection}
                    className="mb-4 px-4 py-2 bg-bws text-white rounded"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </li>
          <li>
            <button
              onClick={handleReset}
              className="mt-4 px-4 py-2 bg-bws text-white rounded w-full"
            >
              Reset Sections
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UtilityPanel;
