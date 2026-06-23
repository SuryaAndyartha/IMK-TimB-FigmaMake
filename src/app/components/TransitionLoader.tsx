// src/app/components/TransitionLoader.tsx
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface TransitionLoaderProps {
  message?: string;
}

export function TransitionLoader({ message = "Memuat data permainan..." }: TransitionLoaderProps) {
  const { t } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: t.pageBg }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        <Loader2 size={40} style={{ color: "#7C3AED" }} />
      </motion.div>
      <p
        className="mt-4"
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: 14,
          color: t.textSub,
          fontWeight: 500,
        }}
      >
        {message}
      </p>
    </motion.div>
  );
}