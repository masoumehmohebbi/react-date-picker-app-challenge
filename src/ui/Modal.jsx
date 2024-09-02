import { HiOutlineX } from "react-icons/hi";
import useOutsideClick from "../hooks/useOutsideClick";

const Modal = ({ open, onClose, title, children }) => {
  const ref = useOutsideClick(onClose);
  return (
    open && (
      <div className="w-full h-screen fixed top-0 left-0 backdrop-blur-sm bg-secondary-800 bg-opacity-30 z-50">
        <div
          ref={ref}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-secondary-0 p-9 shadow-lg transition-all duration-300 ease-out w-[calc(100vw-2rem)] md:max-w-lg lg:max-w-2xl max-h-[calc(100vh-2rem)] overflow-y-4"
        >
          <div className="flex items-center relative justify-center border-b border-b-secondary-300 pb-2 mb-6">
            <p className="text-secondary-700 font-bold text-base">{title}</p>
            <button onClick={onClose} className="absolute left-0">
              <HiOutlineX className="w-7 h-7 p-1 text-red-500 bg-secondary-100 hover:bg-secondary-200 transition duration-500 rounded-full" />
            </button>
          </div>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
