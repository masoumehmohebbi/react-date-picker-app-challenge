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

  let {
    gy: gDateYear,
    gm: gDateMonth,
    gd: gDateDay,
  } = jalaali.toGregorian(date.year, date.month.number, date.day);

  let now = new Date();
  let birth = new Date(`${gDateYear}-${gDateMonth}-${gDateDay} 00:00:00`);
  let {
    // jy: nowYear,
    jm: nowMonth,
    jd: nowDay,
  } = jalaali.toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate());
  let nextBirth = new Date(
    `${
      now.getFullYear() +
      !(
        nowMonth < date.month.number ||
        (nowMonth === date.month.number && nowDay < date.day)
      )
    }-${gDateMonth}-${gDateDay}`
  );

  // Functions
  function getDiff(start, end) {
    let y, d, h, m, s;
    let diff = Math.floor((end.getTime() - start.getTime()) / 1000);
    s = diff % 60;
    diff = Math.floor(diff / 60);
    m = diff % 60;
    diff = Math.floor(diff / 60);
    h = diff % 24;
    diff = Math.floor(diff / 24);
    d = diff % 365;
    y = Math.floor(diff / 365);

    return {
      year: y,
      day: d,
      hour: h,
      minute: m,
      second: s,
    };
  }

  let age = getDiff(birth, now);

  let next = getDiff(now, nextBirth);

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
            {age.year} سال {age.day} روز {age.hour} ساعت {age.minute} دقیقه{" "}
            {age.second} ثانیه
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
            {/* {countdown} */}
            {next.day} روز {next.hour} ساعت {next.minute} دقیقه {next.second}{" "}
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
