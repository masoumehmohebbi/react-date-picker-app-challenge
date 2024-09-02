import DatePicker, { DateObject } from "react-multi-date-picker";
import { motion } from "framer-motion";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const DatePickerField = ({ label, date, setDate }) => {
  const maxDate = new DateObject({ date: new Date(), calendar: persian });
  return (
    <div className="flex items-center justify-center gap-x-5 mb-16">
      <motion.h1
        initial={{ x: "70px" }}
        animate={{ x: "0" }}
        transition={{ duration: 1, type: "spring", stiffness: 120 }}
        className="text-slate-700 font-black text-base flex items-center gap-x-2"
      >
        {label}
      </motion.h1>

      <DatePicker
        containerClassName=" group bg-primary-200 hover:bg-primary-300 border border-primary-400 ring-2 ring-primary-500 ring-offset-2 rounded-md shadow-xl py-1 cursor-pointer pr-28"
        inputClass="textField__input bg-primary-200 group-hover:bg-primary-300 text-lg"
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
