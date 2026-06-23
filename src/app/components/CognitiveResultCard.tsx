// src/app/components/CognitiveResultCard.tsx
import { motion } from "motion/react";
import { BrainCircuit, PlayCircle, Star } from "lucide-react";
import { useNavigate } from "react-router";
import { useTheme } from "../contexts/ThemeContext";

interface CognitiveResultCardProps {
  // Misalnya didapat dari hasil evaluasi: "Logika", "Memori", "Fokus", atau "Kecepatan"
  recommendedCategory: string; 
  gameName: string; // contoh: "Logic Puzzle"
}

export function CognitiveResultCard({ recommendedCategory, gameName }: CognitiveResultCardProps) {
  const { t } = useTheme();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl p-5 overflow-hidden mb-6"
      style={{
        background: "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(6,182,212,0.1) 100%)",
        border: "1px solid rgba(124,58,237,0.3)",
      }}
    >
      {/* Badge "Sangat Cocok" */}
      <div 
        className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full"
        style={{ background: "#84CC16", color: "#fff" }}
      >
        <Star size={10} fill="#fff" />
        <span style={{ fontSize: 10, fontWeight: 700 }}>Sangat Cocok</span>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "#7C3AED", color: "#fff" }}
        >
          <BrainCircuit size={20} />
        </div>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: t.text }}>
            Hasil Evaluasi: {recommendedCategory}
          </h3>
          <p style={{ fontSize: 12, color: t.textSub }}>
            Sesuai dengan gaya berpikir dan evaluasi kognitifmu hari ini.
          </p>
        </div>
      </div>

      {/* CTA Dinamis */}
      <button
        onClick={() => navigate(`/app/games?play=${gameName}`)}
        className="w-full mt-2 py-3 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
        style={{
          background: "linear-gradient(90deg, #7C3AED, #06B6D4)",
          boxShadow: "0 4px 12px rgba(124,58,237,0.3)",
          color: "#fff",
          fontWeight: 700,
          fontSize: 14,
        }}
        aria-label={`Mainkan Mode ${recommendedCategory}`}
      >
        <PlayCircle size={18} />
        Mainkan Mode {recommendedCategory}
      </button>
    </motion.div>
  );
}