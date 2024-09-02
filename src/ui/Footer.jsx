import { CgSandClock } from "react-icons/cg";
const Footer = () => {
  return (
    <div className="bg-secondary-300 shadow-sm text-center px-2 py-5 font-semibold text-slate-900">
      <div className="w-fit mx-auto flex items-start justify-start gap-x-1">
        <CgSandClock className="w-5 h-5 text-slate-900" />
        <span> AminH - DatePicker - Challenge</span>
      </div>
    </div>
  );
};

export default Footer;
