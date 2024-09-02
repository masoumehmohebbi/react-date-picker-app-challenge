const Haeder = () => {
  return (
    <nav
      className={`py-3 w-full transiton-all duration-100 ease-out z-20 shadow-menu md:shadow-none backdrop-blur-2xl
    blur-0 opacity-100 sticky top-0 font-sans items-center px-2 sm:px-3 flex justify-between`}
    >
      <div className="flex">
        {/* <MdDateRange className="w-7 h-7 text-primary-700" /> */}
        <h1 className="font-black text-2xl"> با حسابــ</h1>
      </div>
    </nav>
  );
};

export default Haeder;
