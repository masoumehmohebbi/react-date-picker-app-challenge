import { motion } from "framer-motion";
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
export default CalculateDate;
