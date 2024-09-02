import DatePicker, { DateObject } from "react-multi-date-picker";
import { motion } from "framer-motion";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { MdDateRange } from "react-icons/md";

const DatePickerField = ({ label, date, setDate }) => {
  const maxDate = new DateObject({ date: new Date(), calendar: persian });
  return (
    <div className="flex flex-col justify-center items-center">
      <motion.h1
        initial={{ x: "-70px" }}
        animate={{ x: "0" }}
        transition={{ duration: 1, type: "spring", stiffness: 120 }}
        className="mb-4 text-slate-700 font-black text-[22px] pb-7 flex items-center gap-x-2"
      >
        <MdDateRange className="w-7 h-7 text-pink-700" />
        {label}
      </motion.h1>

      <DatePicker
        containerClassName="w-full group bg-pink-200 hover:bg-pink-300 border border-purple-400 ring-2 ring-purple-500 ring-offset-2 rounded-md shadow-xl py-1 cursor-pointer pr-28"
        inputClass="textField__input bg-pink-200 group-hover:bg-pink-300 text-lg"
        calenderPosition="bottom-center"
        value={date}
        onChange={(date) => setDate(date)}
        format="YYYY/MM/DD"
        calendar={persian}
        locale={persian_fa}
        maxDate={maxDate}
      />
    </div>
  );
};

export default DatePickerField;