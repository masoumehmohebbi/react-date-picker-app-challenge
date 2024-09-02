import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useDarkMode } from "../context/DarkModeContext";
const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? (
        <HiOutlineSun className="w-7 h-7 text-primary-900" />
      ) : (
        <HiOutlineMoon className="w-7 h-7 text-primary-900" />
      )}
    </button>
  );
};

export default DarkModeToggle;
