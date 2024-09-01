import { useEffect, useState } from "react";
import DatePickerField from "../ui/DatePickerField";
import Footer from "./common/Footer";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import jalaali from "jalaali-js";
import { motion } from "framer-motion";
import { SiLivewire } from "react-icons/si";
import { BsPatchQuestionFill } from "react-icons/bs";
import { FaBirthdayCake } from "react-icons/fa";

function App() {
  const [date, setDate] = useState(new DateObject({ calendar: persian }));
  const [countdown, setCountdown] = useState(0);

  // Convert Shamsi-date to Gregorian
  let {
    gy: gDateYear,
    gm: gDateMonth,
    gd: gDateDay,
  } = jalaali.toGregorian(date.year, date.month.number, date.day);

  // Get current date and birthday in Gregorian-format
  let now = new Date();
  let birth = new Date(`${gDateYear}-${gDateMonth}-${gDateDay} 00:00:00`);
  let nextBirth = new Date(now.getFullYear(), gDateMonth - 1, gDateDay);

  if (nextBirth < now) {
    nextBirth.setFullYear(nextBirth.getFullYear() + 1);
  }

  // Functions For Calc Time-Diff
  function getDiff(start, end) {
    let y, m, d, h, min, s;
    let startDate = new DateObject({
      date: start,
      calendar: persian,
    });
    let endDate = new DateObject({
      date: end,
      calendar: persian,
    });

    // Calculate differences in time
    let diff = end - start;
    s = Math.floor(diff / 1000) % 60;
    min = Math.floor(diff / 1000 / 60) % 60;
    h = Math.floor(diff / 1000 / 60 / 60) % 24;

    y = endDate.year - startDate.year;
    m = endDate.month.index - startDate.month.index;
    d = endDate.day - startDate.day;
    if (d < 0) {
      m--;
      let previousMonthDays;
      if (endDate.month.index === 0) {
        previousMonthDays = 31;
      } else if (endDate.month.index <= 5) {
        previousMonthDays = 31;
      } else {
        previousMonthDays = 30;
      }
      d += previousMonthDays;
    }

    if (m < 0) {
      y--;
      m += 12;
    }

    if (y < 0) {
      y = 0;
    }

    return {
      year: y,
      month: m,
      day: d,
      hour: h,
      minute: min,
      second: s,
    };
  }

  // User Age
  let age = getDiff(birth, now);

  // Days left to user Birthday
  let next = getDiff(now, nextBirth);

  // Updating countdown
  useEffect(() => {
    let interval = setInterval(() => setCountdown(countdown + 1), 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <div className="bg-purple-200 min-h-screen sm:pt-5 flex flex-col text-slate-800">
      <div className="flex-1 border border-purple-300 container sm:max-w-screen-sm mx-auto mb-5 bg-white p-6 rounded-md shadow-xl shadow-purple-400">
        <div className="flex justify-center items-center">
          <DatePickerField
            date={date}
            setDate={setDate}
            label=" تاریخ تولد خود را انتخاب کنید :)"
          />
        </div>

        <CalculateDate
          label="سن شما: "
          icon={<SiLivewire className="text-green-700 w-5 h-5" />}
        >
          <div>
            {age.year} سال {age.month} ماه {age.day} روز {age.hour} ساعت{" "}
            {age.minute} دقیقه {age.second} ثانیه
          </div>
        </CalculateDate>

        <CalculateDate
          label="تاریخ تولد کاربر به میلادی: "
          icon={<FaBirthdayCake className="text-pink-700 w-5 h-5" />}
        >
          <div>
            {gDateYear}/{gDateMonth}/{gDateDay}
          </div>
        </CalculateDate>

        <CalculateDate
          label="تا تولد بعدی چقدر مونده؟ : "
          icon={<BsPatchQuestionFill className="w-5 h-5 text-blue-700" />}
        >
          <div dir="rtl">
            {next.day} روز {next.hour} ساعت {next.minute} دقیقه {next.second}
            ثانیه
          </div>
        </CalculateDate>
      </div>
      <Footer />
    </div>
  );
}

export default App;

function CalculateDate({ label, children, icon }) {
  return (
    <div className="flex border border-pink-400 gap-x-3 mt-11 hover:scale-105 pb-3 hover:bg-pink-400 hover:ring-pink-400 transition duration-500 bg-pink-300 px-5 py-4 rounded-md shadow-xl ring-offset-2 ring ring-pink-400">
      <motion.p
        whileHover={{
          scale: 1.1,
          marginLeft: "0.5rem",
          transition: { delay: 0.2, type: "tween", duration: 0.3 },
        }}
        className="font-bold flex items-center gap-x-2 justify-center"
      >
        {icon}
        {label}
      </motion.p>
      {children}
    </div>
  );
}
