interface ToggleSwitchProps {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, setEnabled }) => {
  return (
    <div
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${
        enabled ? "bg-bws" : "bg-gray-300"
      }`}
      onClick={() => setEnabled(!enabled)}
    >
      <span
        className={`inline-block w-4 h-4 transform  rounded-full transition-transform ${
          enabled ? "translate-x-6 bg-white" : "translate-x-1 bg-bws"
        }`}
      />
    </div>
  );
};

export default ToggleSwitch;
