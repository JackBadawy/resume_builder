import EducationModalContent from "../Components/Modals/EducationModalContent";
import ReferenceModalContent from "../Components/Modals/ReferenceModalContent";
import WorkExperienceModalContent from "../Components/Modals/WorkExperienceModalContent";
import { useSections } from "../Context/SectionsContext";

interface SectionContent {
  [key: string]: {
    renderContent: (
      closeModal: () => void,
      addSectionContext: (content: string[]) => void
    ) => JSX.Element;
    onConfirm: ((content: string[]) => void) | undefined;
  };
}

export const sectionContent: SectionContent = {
  References: {
    renderContent: (closeModal, onConfirm) => (
      <ReferenceModalContent onConfirm={onConfirm} onClose={closeModal} />
    ),
    onConfirm: undefined,
  },
  Education: {
    renderContent: (closeModal, onConfirm) => (
      <EducationModalContent onConfirm={onConfirm} onClose={closeModal} />
    ),
    onConfirm: undefined,
  },
  "Work Experience": {
    renderContent: (closeModal, onConfirm) => (
      <WorkExperienceModalContent onConfirm={onConfirm} onClose={closeModal} />
    ),
    onConfirm: undefined,
  },
};
