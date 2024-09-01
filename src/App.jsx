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

  function calculateDiff(start, end) {
    let monthDay = (n, y) =>
      [
        0,
        31,
        31,
        31,
        31,
        31,
        31,
        30,
        30,
        30,
        30,
        30,
        (y + 1) % 4 === 0 ? 30 : 29,
      ][n];

    let year, month, day;
    if (end.year === start.year) {
      if (end.month === start.month) {
        month = 0;
        day = end.day - start.day;
      } else {
        month = end.month - start.month;
        if (end.day >= start.day) {
          day = end.day - start.day;
        } else {
          month--;
          day = monthDay(start.month, start.year) - start.day + end.day;
        }
      }
    } else {
      month = (end.year - start.year) * 12 + end.month - start.month;
      if (end.day >= start.day) {
        day = end.day - start.day;
      } else {
        month--;
        day = monthDay(start.month, start.year) - start.day + end.day;
      }
    }

    year = end.year - start.year;
    if (year < 0) year = 0;

    return [year, month, day];
  }

  function calculateAge() {
    let now = new Date();
    let {
      jy: nowYear,
      jm: nowMonth,
      jd: nowDay,
    } = jalaali.toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate());

    return [
      ...calculateDiff(
        { year: date.year, month: date.month.number, day: date.day },
        { year: nowYear, month: nowMonth, day: nowDay }
      ),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
    ];
  }
  let [ageYear, ageMonth, ageDay, ageHour, ageMinute, ageSecond] =
    calculateAge();

  let {
    gy: gDateYear,
    gm: gDateMonth,
    gd: gDateDay,
  } = jalaali.toGregorian(date.year, date.month.number, date.day);

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
            {ageYear} سال {ageMonth} ماه {ageDay} روز {ageHour} ساعت {ageMinute}{" "}
            دقیقه {ageSecond} ثانیه
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
          <div dir="rtl">{countdown}</div>
        </CalculateDate>
      </div>
      <Footer />
    </div>
  );
}

export default App;

function CalculateDate({ label, children, icon }) {
  return (
    <div className="flex gap-x-3 mt-11 hover:scale-105 pb-3 hover:bg-pink-400 hover:ring-pink-400 transition duration-500 bg-pink-300 px-5 py-4 rounded-md shadow-xl ring-offset-1 ring ring-pink-300">
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
