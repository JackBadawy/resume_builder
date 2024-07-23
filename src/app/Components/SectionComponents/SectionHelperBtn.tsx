import { useModal } from "@/app/Context/ModalContext";
import { sectionTips } from "@/app/Utility/sectionTips";
import { sectionContent } from "@/app/Utility/sectionContent";
import { Section, useSections } from "@/app/Context/SectionsContext";

interface SectionHelperProps {
  section: Section;
  index: number;
}

const SectionHelperBtn: React.FC<SectionHelperProps> = ({ section, index }) => {
  const { openModal, closeModal } = useModal();
  const { addSectionEntry } = useSections();

  /* const openHelperModal = () => {
    const tip = sectionTips[section] || "No tips available for this section";
    openModal(tip);
  }; */

  const openHelperModal = () => {
    const tip =
      sectionTips[section.heading] || "No tips available for this section";
    const content = sectionContent[section.heading];

    if (content) {
      openModal(tip, undefined, undefined, () =>
        content.renderContent(closeModal, (content: string[]) => {
          addSectionEntry(index, content);
          closeModal();
        })
      );
    } else {
      openModal(tip);
    }
  };

  return (
    <button onClick={openHelperModal} className="bg-bws ml-2 px-2 rounded">
      ?
    </button>
  );
};

export default SectionHelperBtn;
