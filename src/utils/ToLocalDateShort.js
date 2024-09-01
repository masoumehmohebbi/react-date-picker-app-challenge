const toLocalDateShort = (date) => {
  return new Date(date).toLocaleDateString("fa-IR", {});
};

export default toLocalDateShort;
