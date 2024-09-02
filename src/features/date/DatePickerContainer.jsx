import { useEffect, useState } from "react";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import jalaali from "jalaali-js";
import { SiLivewire } from "react-icons/si";
import { BsPatchQuestionFill } from "react-icons/bs";
import { FaBirthdayCake } from "react-icons/fa";
import { differenceInYears, addYears } from "date-fns";
import CalculateDate from "./CalculateDate";
import DatePickerField from "./DatePickerField";
import Modal from "../../ui/Modal";
import { MdOutlineCalculate } from "react-icons/md";
import getDaysInPersianMonth from "../../utils/getDaysInPersianMonth";

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

  // Convert current date and birth date to Jalaali
  const nowJalaali = jalaali.toJalaali(now);
  const birthJalaali = jalaali.toJalaali(birth);

  // Calculate months and days considering the Persian calendar specifics
  let ageInMonths = nowJalaali.jm - birthJalaali.jm;
  let ageInDays = nowJalaali.jd - birthJalaali.jd;

  if (ageInDays < 0) {
    ageInMonths -= 1;
    ageInDays += getDaysInPersianMonth(nowJalaali.jm - 1, nowJalaali.jy);
  }

  if (ageInMonths < 0) {
    ageInMonths += 12;
  }

  // Calculate remaining time until the next birthday
  let monthsUntilNextBirthday = nextBirth.getMonth() - now.getMonth();
  let daysUntilNextBirthday = nextBirth.getDate() - now.getDate();

  if (daysUntilNextBirthday < 0) {
    monthsUntilNextBirthday -= 1;
    daysUntilNextBirthday += getDaysInPersianMonth(
      nextBirth.getMonth(),
      nextBirth.getFullYear()
    );
  }

  if (monthsUntilNextBirthday < 0) {
    monthsUntilNextBirthday += 12;
  }

  const ageInHours = now.getHours();
  const ageInMinutes = now.getMinutes();
  const ageInSeconds = now.getSeconds();

  const hoursUntilNextBirthday = 24 - ageInHours;
  const minutesUntilNextBirthday = 60 - ageInMinutes;
  const secondsUntilNextBirthday = 60 - ageInSeconds;

  // Updating countdown
  useEffect(() => {
    const interval = setInterval(() => setCountdown(countdown + 1), 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <div className="min-h-[81vh] bg-secondary-100">
      <div className="sm:pt-5 flex flex-col text-secondary-800">
        <div className="flex-1 mt-11 border border-primary-300 container sm:max-w-screen-sm mb-5 bg-secondary-0 p-11 rounded-2xl shadow-xl shadow-primary-400">
          <div className="flex justify-center items-center">
            <DatePickerField
              date={date}
              setDate={setDate}
              label="انتخاب تاریخ تولد"
            />
          </div>

          <button
            className="btn btn--primary text-[17px] w-full flex items-center justify-center gap-x-1"
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
