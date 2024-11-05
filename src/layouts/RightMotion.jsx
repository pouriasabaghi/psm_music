import { motion } from "framer-motion";
function RightMotion({children, className=""}) {
  return (
    <motion.div
    initial={{ x: "100%" }}
    animate={{ x: 0 }}
    exit={{ x: "100%" }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className={className}
    >
      {children}
      </motion.div>
  );
}

export default RightMotion;