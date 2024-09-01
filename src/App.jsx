import { useEffect, useState } from "react";
import DatePickerField from "../ui/DatePickerField";
import Footer from "./common/Footer";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import jalaali from "jalaali-js";
import { motion } from "framer-motion";
import * as shamsi from "shamsi-date-converter";

function App() {
  const [date, setDate] = useState(new DateObject({ calendar: persian }));
  const [countdown, setCountdown] = useState("");

  // Take Date in Shemsi & convert to Gregorian
  let userYear = date.year;
  let userMonth = date.month;
  let userDay = date.day;
  let userMinutes = date.minute;

  const convertJaliliToGregorian = shamsi.jalaliToGregorian(
    userYear,
    userMonth,
    userDay,
    userMinutes
  );

  // Calculate the user's age
  const today = new Date();
  const todayPersian = jalaali.toJalaali(today);
  const birthDate = new Date(date.year, date.month - 1, date.day);
  // const birthDate = new Date(
  //   convertJaliliToGregorian[0],
  //   convertJaliliToGregorian[1] - 1,
  //   convertJaliliToGregorian[2]
  // );

  let ageYear = todayPersian.jy - birthDate.getFullYear();
  let ageMonth = todayPersian.jm - birthDate.getMonth();
  let ageDay = todayPersian.jd - birthDate.getDate();
  // let ageYear = today.getFullYear() - birthDate.getFullYear();
  // let ageMonth = today.getMonth() - birthDate.getMonth();
  // let ageDay = today.getDay() - birthDate.getDate();

  // Correct the age if necessary
  if (ageDay < 0) {
    ageMonth--;
    const daysInMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();
    ageDay += daysInMonth;
  }
  if (ageMonth < 0) {
    ageYear--;
    ageMonth += 12;
  }

  // Calculate the user birthday time left - MILADY & SHEMSI
  useEffect(() => {
    const calculateCountdown = () => {
      // Gregorian calendar calculation
      const currentYear = today.getFullYear();
      const birthday = new Date(`${currentYear}-${date.month}-${date.day}`);

      if (today > birthday) {
        birthday.setFullYear(currentYear + 1);
      }

      const timeDiff = birthday - today;
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setCountdown(
        `${days} روز, ${hours} ساعت, ${minutes} دقیقه, ${seconds} ثانیه`
      );

      // // Persian calendar calculation
      // const currentPersianYear = todayPersian.jy;
      // let persianBirthday = jalaali.toGregorian(
      //   currentPersianYear,
      //   date.month,
      //   date.day
      // );
      // let nextBirthday = new Date(
      //   persianBirthday.gy,
      //   persianBirthday.gm - 1,
      //   persianBirthday.gd
      // );

      // if (today > nextBirthday) {
      //   const nextPersianYear = currentPersianYear + 1;
      //   persianBirthday = jalaali.toGregorian(
      //     nextPersianYear,
      //     date.month,
      //     date.day
      //   );
      //   nextBirthday = new Date(
      //     persianBirthday.gy,
      //     persianBirthday.gm - 1,
      //     persianBirthday.gd
      //   );
      // }

      // const persianTimeDiff = nextBirthday - today;
      // const persianDays = Math.floor(persianTimeDiff / (1000 * 60 * 60 * 24));
      // const persianHours = Math.floor(
      //   (persianTimeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      // );
      // const persianMinutes = Math.floor(
      //   (persianTimeDiff % (1000 * 60 * 60)) / (1000 * 60)
      // );
      // const persianSeconds = Math.floor((persianTimeDiff % (1000 * 60)) / 1000);

      // setCountdownShemsi(
      //   `${persianDays} روز, ${persianHours} ساعت, ${persianMinutes} دقیقه, ${persianSeconds} ثانیه`
      // );
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, [date]);

  console.log(ageMonth);
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

        <CalculateDate label="سن شما: ">
          <div>
            {ageYear} سال {ageMonth} ماه {ageDay} روز {userMinutes} ثانیه
          </div>
        </CalculateDate>

        <CalculateDate label="تاریخ تولد کاربر به میلادی: ">
          <div>
            {convertJaliliToGregorian[0]} / {convertJaliliToGregorian[1]} /
            {convertJaliliToGregorian[2]} / {userMinutes}
          </div>
        </CalculateDate>

        <CalculateDate label="تا تولد بعدی چقدر مونده؟ (میلادی): ">
          <div dir="rtl">{countdown}</div>
        </CalculateDate>

        <CalculateDate label="تا تولد بعدی چقدر مونده؟ (شمسی): ">
          <div dir="rtl">{countdown}</div>
        </CalculateDate>
      </div>
      <Footer />
    </div>
  );
}

export default App;

function CalculateDate({ label, children }) {
  return (
    <div className="flex gap-x-3 mt-11 hover:scale-105 pb-3 hover:bg-pink-400 hover:ring-pink-400 transition duration-500 bg-pink-300 px-5 py-4 rounded-md shadow-xl ring-offset-1 ring ring-pink-300">
      <motion.p
        whileHover={{
          scale: 1.1,
          // boxShadow: "0px 0px 7px #fff7ed",
          transition: { delay: 0.2, type: "tween", duration: 0.3 },
        }}
        className="font-bold"
      >
        {label}
      </motion.p>
      {children}
    </div>
  );
}
