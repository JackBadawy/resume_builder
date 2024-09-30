import { useModal } from "@/app/Context/ModalContext";
import { useSections } from "@/app/Context/SectionsContext";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface EntryProps {
  sectionIndex: number;
  entryIndex: number;
}

const EntryDeleteButton: React.FC<EntryProps> = ({
  sectionIndex,
  entryIndex,
}) => {
  const { openModal, closeModal } = useModal();
  const { deleteEntry } = useSections();

  const handleDelete = () => {
    openModal("Are you sure you want to delete this entry?", () =>
      deleteEntry(sectionIndex, entryIndex)
    );
  };

  return (
    <button
      onClick={() => handleDelete()}
      className="bg-bws px-2 rounded absolute top-[1cm] left-[-1.8cm] transform translate-x-full -translate-y-full"
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
};

export default EntryDeleteButton;
