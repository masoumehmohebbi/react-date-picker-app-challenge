import { useEffect, useState } from "react";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import jalaali from "jalaali-js";
import { SiLivewire } from "react-icons/si";
import { BsPatchQuestionFill } from "react-icons/bs";
import { FaBirthdayCake } from "react-icons/fa";
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  addYears,
} from "date-fns";
import CalculateDate from "./CalculateDate";
import DatePickerField from "./DatePickerField";
import Modal from "../../ui/Modal";
import { MdOutlineCalculate } from "react-icons/md";

function DatePickerContainer() {
  const [date, setDate] = useState(new DateObject({ calendar: persian }));
  const [countdown, setCountdown] = useState(0);
  const [open, setOpen] = useState(false);

  // Convert Shamsi-date to Gregorian
  const {
    gy: gDateYear,
    gm: gDateMonth,
    gd: gDateDay,
  } = jalaali.toGregorian(date.year, date.month.number, date.day);

  // Get current date and birthday in Gregorian format
  const now = new Date();
  const birth = new Date(`${gDateYear}-${gDateMonth}-${gDateDay} 00:00:00`);
  let nextBirth = new Date(now.getFullYear(), gDateMonth - 1, gDateDay);

  // Ensure the next birthday is in the future
  if (nextBirth <= now) {
    nextBirth = addYears(nextBirth, 1);
  }

  // Calculate age
  const ageInYears = differenceInYears(now, birth);
  const ageInMonths = differenceInMonths(now, birth) % 12;
  const ageInDays = differenceInDays(now, addYears(birth, ageInYears)) % 30;
  const ageInHours = differenceInHours(now, addYears(birth, ageInYears)) % 24;
  const ageInMinutes =
    differenceInMinutes(now, addYears(birth, ageInYears)) % 60;
  const ageInSeconds =
    differenceInSeconds(now, addYears(birth, ageInYears)) % 60;

  // Calculate the countdown to the next birthday
  const monthsUntilNextBirthday = differenceInMonths(nextBirth, now) % 12;
  const daysUntilNextBirthday = differenceInDays(nextBirth, now) % 30;
  const hoursUntilNextBirthday = differenceInHours(nextBirth, now) % 24;
  const minutesUntilNextBirthday = differenceInMinutes(nextBirth, now) % 60;
  const secondsUntilNextBirthday = differenceInSeconds(nextBirth, now) % 60;

  // Updating countdown
  useEffect(() => {
    const interval = setInterval(() => setCountdown(countdown + 1), 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <div className="min-h-[81vh] bg-[#f1f5f9]">
      <div className="sm:pt-5 flex flex-col text-slate-800">
        <div className="flex-1 mt-11 border border-primary-300 container sm:max-w-screen-sm mb-5 bg-secondary-0 p-6 rounded-md shadow-xl shadow-primary-400">
          <div className="flex justify-center items-center">
            <DatePickerField
              date={date}
              setDate={setDate}
              label="انتخاب تاریخ تولد"
            />
          </div>

          <button
            className="btn btn--primary text-base w-full flex items-center justify-center gap-x-1"
            onClick={() => setOpen(true)}
          >
            <MdOutlineCalculate className="w-6 h-6" />
            محاسبه کن
          </button>
          <Modal
            title="سن شما مطابق تقویم شمسی"
            open={open}
            onClose={() => setOpen(false)}
          >
            <CalculateDate
              label="سن شما: "
              icon={<SiLivewire className="text-green-700 w-5 h-5" />}
            >
              <div>
                {ageInYears} سال و {ageInMonths} ماه و {ageInDays} روز و{" "}
                {ageInHours} ساعت و {ageInMinutes} دقیقه و {ageInSeconds} ثانیه
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
                {monthsUntilNextBirthday} ماه و {daysUntilNextBirthday} روز و{" "}
                {hoursUntilNextBirthday} ساعت و {minutesUntilNextBirthday} دقیقه
                و {secondsUntilNextBirthday} ثانیه
              </div>
            </CalculateDate>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default DatePickerContainer;
