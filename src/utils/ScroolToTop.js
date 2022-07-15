import { useEffect } from "react";
import { useLocation } from "react-router";
import { motion } from "framer-motion";
const containerVariant = {
  init: { opacity: 0 },
  ani: {
    opacity: 1,
    transition: {
      duration: 1.5,
    },
  },
};

const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <motion.div variants={containerVariant} initial="init" animate="ani">
      {props.children}
    </motion.div>
  );
};

export default ScrollToTop;
