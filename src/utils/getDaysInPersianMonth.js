import jalaali from "jalaali-js";
// Utility function to get the number of days in a Persian month
export default function getDaysInPersianMonth(month, year) {
  // Handle leap year logic for the last month (Esfand)
  if (month === 12) {
    return jalaali.isLeapJalaaliYear(year) ? 30 : 29;
  }

  // First 6 months have 31 days, the rest have 30 days
  return month <= 6 ? 31 : 30;
}
