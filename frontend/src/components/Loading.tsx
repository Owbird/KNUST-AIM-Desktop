import AIMLogo from "@/assets/images/aim.png";
import { Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <motion.div
      className="flex h-screen items-center justify-center"
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 0.5, repeat: Infinity }}
    >
      <Image className="h-16" src={AIMLogo} />
    </motion.div>
  );
};

export default Loading;
