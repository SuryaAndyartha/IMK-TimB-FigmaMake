import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";

export function SplashScreen() {
  const navigate = useNavigate();
  const { t } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/app");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex justify-center transition-colors duration-300"
      style={{ background: t.outerBg }}
    >
      <div
        className="w-full max-w-[390px] relative overflow-hidden flex flex-col items-center justify-between transition-colors duration-300"
        style={{ minHeight: "100svh", background: t.pageBg }}
      >
        {/* Background glow blobs */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 300,
            height: 300,
            top: -80,
            left: -80,
            background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 280,
            height: 280,
            bottom: 80,
            right: -60,
            background: "radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Status Bar */}
        <div
          className="w-full flex items-center justify-between px-6 pt-3 pb-1 flex-shrink-0"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <span style={{ color: t.statusText, fontSize: 13, fontWeight: 600 }}>09:41</span>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-[3px] items-end">
              {[3, 5, 7, 9].map((h, i) => (
                <div
                  key={i}
                  className="rounded-sm"
                  style={{
                    width: 3,
                    height: h,
                    background: i < 3 ? t.signalOn : t.signalOff,
                  }}
                />
              ))}
            </div>
            <div
              style={{
                width: 22,
                height: 11,
                borderRadius: 3,
                border: `1.5px solid ${t.signalOn}`,
                padding: "1.5px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "75%",
                  height: "100%",
                  borderRadius: 1.5,
                  background: "#84CC16",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: -4,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 2,
                  height: 5,
                  background: t.signalOn,
                  borderRadius: "0 1px 1px 0",
                }}
              />
            </div>
          </div>
        </div>

        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative mb-6"
          >
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                filter: "blur(20px)",
                opacity: 0.6,
                transform: "scale(1.15)",
              }}
            />
            {/* Logo container */}
            <div
              className="relative rounded-3xl flex items-center justify-center"
              style={{
                width: 100,
                height: 100,
                background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
                boxShadow:
                  "0 8px 32px rgba(124,58,237,0.5), 0 0 0 1px rgba(255,255,255,0.1)",
              }}
            >
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                <path
                  d="M30 6L14 28H26L22 46L38 24H26L30 6Z"
                  fill="white"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </motion.div>

          {/* App Name */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center mb-2"
          >
            <h1
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: 36,
                fontWeight: 800,
                background: "linear-gradient(90deg, #A78BFA, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.5px",
                lineHeight: 1.1,
              }}
            >
              LogicDash
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 14,
              color: "rgba(167,139,250,0.7)",
              fontWeight: 400,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Cognitive Training Game
          </motion.p>

          {/* Dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-2 mt-8"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                className="rounded-full"
                style={{
                  width: 8,
                  height: 8,
                  background:
                    i === 0 ? "#7C3AED" : i === 1 ? "#06B6D4" : "#84CC16",
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="w-full px-6 pb-10"
        >
          {/* Tip card */}
          <div
            className="rounded-2xl p-4 mb-5"
            style={{
              background: t.splashTipBg,
              border: `1px solid ${t.splashTipBorder}`,
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="flex items-start gap-3">
              <span style={{ fontSize: 20 }}>💡</span>
              <div>
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#A78BFA",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    marginBottom: 4,
                  }}
                >
                  Tips & Trik
                </p>
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: 13,
                    color: t.textSub,
                    lineHeight: 1.5,
                  }}
                >
                  Latih otakmu 15 menit setiap hari untuk meningkatkan daya
                  ingat hingga 40%!
                </p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div
            className="w-full rounded-full overflow-hidden"
            style={{ height: 3, background: t.splashProgressTrack }}
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.8, ease: "linear" }}
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #7C3AED, #06B6D4, #84CC16)",
                borderRadius: 9999,
              }}
            />
          </div>

          {/* Version */}
          <p
            className="text-center mt-3"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 11,
              color: t.versionText,
            }}
          >
            v1.0.0
          </p>
        </motion.div>
      </div>
    </div>
  );
}
