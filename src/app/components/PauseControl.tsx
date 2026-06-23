// src/app/components/PauseControl.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Pause, Play, RotateCcw, Home } from "lucide-react";
import { useNavigate } from "react-router";
import { useTheme } from "../contexts/ThemeContext";

interface PauseControlProps {
  onPause: () => void;
  onResume: () => void;
  onRestart: () => void;
}

export function PauseControl({ onPause, onResume, onRestart }: PauseControlProps) {
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();
  const { t } = useTheme();

  const handlePause = () => {
    setIsPaused(true);
    onPause();
  };

  const handleResume = () => {
    setIsPaused(false);
    onResume();
  };

  return (
    <>
      {/* Tombol Pause Mengambang (Pojok Kanan Atas) */}
      <button
        onClick={handlePause}
        className="fixed top-4 right-4 z-40 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: t.surface,
          border: `1px solid ${t.surfaceBorder}`,
          backdropFilter: "blur(8px)",
        }}
        aria-label="Jeda Permainan"
      >
        <Pause size={20} style={{ color: t.text }} />
      </button>

      {/* Overlay Menu Pause */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-5"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-sm rounded-3xl p-6 text-center"
              style={{
                background: t.surface,
                border: `1px solid ${t.surfaceBorder}`,
                boxShadow: "0 24px 40px rgba(0,0,0,0.2)",
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Menu Jeda"
            >
              <h2 style={{ fontSize: 22, fontWeight: 700, color: t.text, marginBottom: 8 }}>
                Permainan Dijeda
              </h2>
              <p style={{ fontSize: 13, color: t.textSub, marginBottom: 24 }}>
                Ambil napas sejenak. Kamu bisa melanjutkan kapan saja.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleResume}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  <Play size={18} /> Lanjutkan Permainan
                </button>
                <button
                  onClick={() => {
                    setIsPaused(false);
                    onRestart();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl"
                  style={{ background: t.surface2, color: t.text, fontWeight: 600 }}
                >
                  <RotateCcw size={18} /> Ulangi Level
                </button>
                <button
                  onClick={() => navigate("/app/dashboard")}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl mt-2"
                  style={{ color: "#EF4444", fontWeight: 600 }}
                >
                  <Home size={18} /> Keluar ke Beranda
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}