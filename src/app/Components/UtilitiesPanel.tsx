import React, { RefObject, useEffect, useRef, useState } from "react";
import { useSections } from "../Context/SectionsContext";
import ToggleSwitch from "./ToggleSwitch";
import { useContactDetails } from "../Context/ContactDetailsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import AlertModal from "./AlertModal";
import { useResumeHeading } from "../Context/ResumeHeadingContext";
import { useResumeContext } from "../Context/ResumeMetaContext";

const UtilityPanel: React.FC = () => {
  const {
    sections,
    addSection,
    moveSectionUp,
    moveSectionDown,
    deleteSection,
    resetSections,
    isLoading: sectionsLoading,
  } = useSections();
  const {
    linkedInEnabled,
    setLinkedInEnabled,
    addressEnabled,
    setAddressEnabled,
  } = useContactDetails();
  const [newSectionPrompt, setNewSecPrompt] = useState<boolean>(false);
  const [newSubHeading, setNewSubHeading] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalAction, setModalAction] = useState<() => void>(() => {});

  const { contactDetails, isLoading } = useContactDetails();
  const { fullName, jobTitle, isLoading: headingLoading } = useResumeHeading();
  const { heightMinusPadding, resumeRef, a4Ref } = useResumeContext();

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
        alert("Adding this section will exceed the page height.");
      }
    }
  };

  const handleCancel = () => {
    setNewSecPrompt(false);
  };

  const handleDelete = (index: number) => {
    setModalMessage("Are you sure you want to delete this section?");
    setModalAction(() => () => {
      deleteSection(index);
      setIsModalOpen(false);
    });
    setIsModalOpen(true);
  };

  const handleReset = () => {
    setModalMessage("Are you sure you want to reset all sections?");
    setModalAction(() => () => {
      resetSections();
      setIsModalOpen(false);
    });
    setIsModalOpen(true);
  };

  const canAddNewSection = (): boolean => {
    const currentHeight = resumeRef.current?.scrollHeight;
    const newSectionHeightEstimate = 50;
    const a4Height = heightMinusPadding;

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
                    >
                      <FontAwesomeIcon icon={faArrowUp} />
                    </button>
                    <button
                      onClick={() => moveSectionDown(index)}
                      className="bg-bws text-white px-2 rounded"
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

      <AlertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={modalAction}
        message={modalMessage}
      />
    </div>
  );
};

export default UtilityPanel;
