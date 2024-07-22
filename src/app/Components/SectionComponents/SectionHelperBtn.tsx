import { useModal } from "@/app/Context/ModalContext";
import { sectionTips } from "@/app/Utility/sectionTips";

interface SectionHelperProps {
  section: string;
}

const SectionHelperBtn: React.FC<SectionHelperProps> = ({ section }) => {
  const { openModal } = useModal();

  const openHelperModal = () => {
    const tip = sectionTips[section] || "No tips available for this section";
    openModal(tip);
  };

  return (
    <button onClick={openHelperModal} className="bg-bws ml-2 px-2 rounded">
      ?
    </button>
  );
};

export default SectionHelperBtn;
