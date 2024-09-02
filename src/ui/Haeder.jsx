import DarkModeToggle from "./DarkModeToggle";

const Haeder = () => {
  return (
    <nav
      className={`py-3 w-full bg-secondary-0 transiton-all duration-100 ease-out z-20 shadow-menu md:shadow-none backdrop-blur-2xl
    blur-0 opacity-100 sticky top-0 font-sans items-center px-2 sm:px-3 flex justify-between`}
    >
      <div className="flex justify-between w-full">
        <h1 className="font-black text-[27px] text-primary-900"> با حسابــ</h1>
        <DarkModeToggle />
      </div>
    </nav>
  );
};

export default Haeder;
