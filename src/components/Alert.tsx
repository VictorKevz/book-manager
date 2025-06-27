import { Alert } from "@mui/material";
import { useAlertProvider } from "../context/AlertContext";
import { AnimatePresence, motion } from "framer-motion";

export const AlertMessage = () => {
  const { alert } = useAlertProvider();
  return (
    <AnimatePresence>
      {alert.visible && (
        <motion.div className="fixed w-full flex items-center justify-end top-5 z-999 px-5">
          <Alert
            variant="filled"
            severity={alert.type}
            className="max-w-[20rem] w-full shadow-2xl"
          >
            {alert.message}
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
