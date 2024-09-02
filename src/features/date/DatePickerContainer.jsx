import { useEffect, useReducer } from "react";
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

// Initial state
const initialState = {
  date: new DateObject({ calendar: persian }),
  countdown: 0,
  open: false,
};

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case "SET_DATE":
      return { ...state, date: action.payload };
    case "SET_COUNTDOWN":
      return { ...state, countdown: state.countdown + 1 };
    case "TOGGLE_MODAL":
      return { ...state, open: !state.open };
    default:
      return state;
  }
}

function DatePickerContainer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { date, countdown, open } = state;

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

  if (nextBirth <= now) {
    nextBirth = addYears(nextBirth, 1);
  }

  // Calculate age
  const ageInYears = differenceInYears(now, birth);

  // Convert current date and birth date to Jalaali
  const nowJalaali = jalaali.toJalaali(now);
  const birthJalaali = jalaali.toJalaali(birth);

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
  const nextBirthJalaali = jalaali.toJalaali(nextBirth);
  let monthsUntilNextBirthday = nextBirthJalaali.jm - nowJalaali.jm;
  let daysUntilNextBirthday = nextBirthJalaali.jd - nowJalaali.jd;

  if (daysUntilNextBirthday < 0) {
    monthsUntilNextBirthday -= 1;
    daysUntilNextBirthday += getDaysInPersianMonth(
      nowJalaali.jm + 1,
      nowJalaali.jy
    );
  }

  if (monthsUntilNextBirthday < 0) {
    monthsUntilNextBirthday += 12;
  }

  const ageInHours = now.getHours();
  const ageInMinutes = now.getMinutes();
  const ageInSeconds = now.getSeconds();

  const hoursUntilNextBirthday = 23 - ageInHours;
  const minutesUntilNextBirthday = 59 - ageInMinutes;
  const secondsUntilNextBirthday = 59 - ageInSeconds;

  // Updating countdown
  useEffect(() => {
    const interval = setInterval(
      () => dispatch({ type: "SET_COUNTDOWN" }),
      1000
    );
    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <div className="min-h-[81vh] bg-secondary-100">
      <div className="sm:pt-5 flex flex-col text-secondary-800">
        <div className="flex-1 mt-11 border border-primary-300 container sm:max-w-screen-sm mb-5 bg-secondary-0 p-11 rounded-2xl shadow-xl shadow-primary-400">
          <div className="flex justify-center items-center">
            <DatePickerField
              date={date}
              setDate={(newDate) =>
                dispatch({ type: "SET_DATE", payload: newDate })
              }
              label="انتخاب تاریخ تولد"
            />
          </div>
          <button
            className="btn btn--primary text-[17px] w-full flex items-center justify-center gap-x-1"
            onClick={() => dispatch({ type: "TOGGLE_MODAL" })}
          >
            <MdOutlineCalculate className="w-6 h-6" />
            محاسبه کن
          </button>
          <Modal
            title="سن شما مطابق تقویم شمسی"
            open={open}
            onClose={() => dispatch({ type: "TOGGLE_MODAL" })}
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
