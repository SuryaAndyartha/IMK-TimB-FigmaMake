import { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import {
  User,
  Bell,
  Moon,
  Sun,
  Volume2,
  Music,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Sparkles,
  Smartphone,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useTheme } from "../contexts/ThemeContext";

const AVATAR_URL =
  "https://images.unsplash.com/photo-1565016941625-2bee25d37f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGFzaWFuJTIwbWFuJTIwc3R1ZGVudCUyMGF2YXRhciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3ODU1ODczM3ww&ixlib=rb-4.1.0&q=80&w=400";

function Toggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="relative rounded-full transition-all duration-300 flex-shrink-0"
      style={{
        width: 48,
        height: 26,
        background: enabled
          ? "linear-gradient(90deg, #7C3AED, #06B6D4)"
          : "rgba(148,163,184,0.25)",
        boxShadow: enabled ? "0 0 12px rgba(124,58,237,0.5)" : "none",
        border: enabled ? "none" : "1px solid rgba(148,163,184,0.3)",
      }}
    >
      <motion.div
        animate={{ x: enabled ? 22 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 rounded-full"
        style={{
          width: 20,
          height: 20,
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}
      />
    </button>
  );
}

function SettingRow({
  icon: Icon,
  label,
  sub,
  color,
  hasToggle,
  toggled,
  onToggle,
  hasArrow,
  danger,
}: {
  icon: LucideIcon;
  label: string;
  sub?: string;
  color: string;
  hasToggle?: boolean;
  toggled?: boolean;
  onToggle?: () => void;
  hasArrow?: boolean;
  danger?: boolean;
}) {
  const { t } = useTheme();
  return (
    <div
      className="flex items-center gap-3 px-4 py-3.5"
      style={{ cursor: "pointer" }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: danger ? "rgba(239,68,68,0.15)" : `${color}22`,
          border: `1px solid ${danger ? "rgba(239,68,68,0.2)" : `${color}35`}`,
        }}
      >
        <Icon size={17} style={{ color: danger ? "#EF4444" : color }} />
      </div>
      <div className="flex-1">
        <p
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: danger ? "#EF4444" : t.settingsRowText,
          }}
        >
          {label}
        </p>
        {sub && (
          <p
            style={{
              fontSize: 11,
              color: t.settingsRowSub,
              marginTop: 1,
            }}
          >
            {sub}
          </p>
        )}
      </div>
      {hasToggle && onToggle && (
        <Toggle enabled={toggled ?? false} onToggle={onToggle} />
      )}
      {hasArrow && (
        <ChevronRight size={16} style={{ color: t.textMuted }} />
      )}
    </div>
  );
}

function SettingsGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const { t } = useTheme();
  return (
    <div className="mb-5">
      <p
        className="px-5 mb-2"
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: t.settingsSectionLabel,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        {title}
      </p>
      <div
        className="mx-5 rounded-2xl overflow-hidden"
        style={{
          background: t.settingsGroupBg,
          border: `1px solid ${t.settingsGroupBorder}`,
          backdropFilter: "blur(12px)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Divider() {
  const { t } = useTheme();
  return (
    <div
      style={{
        height: 1,
        background: t.settingsDivider,
        margin: "0 16px",
      }}
    />
  );
}

export function Settings() {
  const { isDark, t, toggleTheme } = useTheme();

  const [settings, setSettings] = useState({
    dailyReminder: true,
    weeklySummary: true,
    animations: true,
    soundEffects: true,
    backgroundMusic: false,
    haptics: true,
    dataAnalytics: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        background: t.pageBg,
        minHeight: "100%",
        transition: "background 0.3s",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: -60,
          width: 200,
          height: 200,
          background:
            "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Status Bar */}
      <div className="relative flex items-center justify-between px-5 pt-3 pb-1">
        <span style={{ color: t.statusText, fontSize: 13, fontWeight: 600 }}>
          09:41
        </span>
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
      </div>

      {/* Header */}
      <div className="relative px-5 pt-4 pb-4">
        <h1 style={{ fontSize: 24, fontWeight: 800, color: t.text }}>
          Pengaturan
        </h1>
        <p style={{ fontSize: 13, color: t.textSub, marginTop: 4 }}>
          Personalisasi pengalamanmu ⚙️
        </p>
      </div>

      {/* Profile Card */}
      <div className="px-5 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-2xl p-4 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(6,182,212,0.15) 100%)",
            border: "1px solid rgba(124,58,237,0.3)",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Decorative circles */}
          <div
            style={{
              position: "absolute",
              top: -30,
              right: -30,
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "rgba(124,58,237,0.2)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -20,
              right: 60,
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "rgba(6,182,212,0.15)",
            }}
          />

          <div className="relative flex items-center gap-4">
            <div className="relative">
              <div
                className="rounded-full overflow-hidden"
                style={{
                  width: 64,
                  height: 64,
                  border: "3px solid #7C3AED",
                  boxShadow: "0 0 16px rgba(124,58,237,0.5)",
                }}
              >
                <ImageWithFallback
                  src={AVATAR_URL}
                  alt="Budi Santoso"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                  boxShadow: "0 2px 8px rgba(124,58,237,0.5)",
                  border: `1.5px solid ${t.pageBg}`,
                }}
              >
                <Sparkles size={10} style={{ color: "#fff" }} />
              </div>
            </div>
            <div className="flex-1">
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: isDark ? "#fff" : t.text,
                  lineHeight: 1.2,
                }}
              >
                Budi Santoso
              </h2>
              <p style={{ fontSize: 12, color: isDark ? "rgba(255,255,255,0.55)" : t.textSub, marginTop: 2 }}>
                budi.santoso@itb.ac.id
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className="px-2 py-0.5 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #7C3AED, #06B6D4)",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  Level 12
                </span>
                <span
                  className="px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(245,158,11,0.2)",
                    border: "1px solid rgba(245,158,11,0.3)",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#F59E0B",
                  }}
                >
                  🔥 7 Hari Streak
                </span>
              </div>
            </div>
            <button
              className="px-3 py-1.5 rounded-xl flex-shrink-0"
              style={{
                background: "rgba(124,58,237,0.25)",
                border: "1px solid rgba(124,58,237,0.4)",
                fontSize: 12,
                fontWeight: 600,
                color: "#A78BFA",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Edit
            </button>
          </div>

          {/* Stats row */}
          <div
            className="flex mt-4 rounded-xl overflow-hidden"
            style={{ background: t.profileStatsBg }}
          >
            {[
              { label: "Game", value: "183" },
              { label: "XP Total", value: "4,280" },
              { label: "Rank", value: "#42" },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex-1 text-center py-2.5"
                style={{
                  borderRight:
                    i < 2 ? `1px solid ${t.profileStatsBorder}` : "none",
                }}
              >
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: t.profileStatsValue,
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{ fontSize: 10, color: t.profileStatsLabel }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Akun Settings */}
      <SettingsGroup title="Akun">
        <SettingRow
          icon={User}
          label="Edit Profil"
          sub="Ubah nama dan foto"
          color="#7C3AED"
          hasArrow
        />
        <Divider />
        <SettingRow
          icon={Shield}
          label="Ubah Password"
          sub="Keamanan akun"
          color="#06B6D4"
          hasArrow
        />
        <Divider />
        <SettingRow
          icon={Globe}
          label="Bahasa"
          sub="Bahasa Indonesia"
          color="#84CC16"
          hasArrow
        />
      </SettingsGroup>

      {/* Notifikasi */}
      <SettingsGroup title="Notifikasi">
        <SettingRow
          icon={Bell}
          label="Pengingat Harian"
          sub="Notifikasi latihan setiap hari"
          color="#F59E0B"
          hasToggle
          toggled={settings.dailyReminder}
          onToggle={() => toggle("dailyReminder")}
        />
        <Divider />
        <SettingRow
          icon={Sparkles}
          label="Ringkasan Mingguan"
          sub="Laporan performa tiap minggu"
          color="#A78BFA"
          hasToggle
          toggled={settings.weeklySummary}
          onToggle={() => toggle("weeklySummary")}
        />
      </SettingsGroup>

      {/* Tampilan */}
      <SettingsGroup title="Tampilan">
        {/* Dark/Light Mode Toggle — drives the actual theme */}
        <div
          className="flex items-center gap-3 px-4 py-3.5"
          style={{ cursor: "pointer" }}
          onClick={toggleTheme}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: isDark ? "rgba(139,92,246,0.2)" : "rgba(245,158,11,0.15)",
              border: `1px solid ${isDark ? "rgba(139,92,246,0.3)" : "rgba(245,158,11,0.3)"}`,
            }}
          >
            {isDark ? (
              <Moon size={17} style={{ color: "#8B5CF6" }} />
            ) : (
              <Sun size={17} style={{ color: "#F59E0B" }} />
            )}
          </div>
          <div className="flex-1">
            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: t.settingsRowText,
              }}
            >
              {isDark ? "Mode Gelap" : "Mode Terang"}
            </p>
            <p style={{ fontSize: 11, color: t.settingsRowSub, marginTop: 1 }}>
              {isDark
                ? "Antarmuka mode malam aktif"
                : "Antarmuka mode siang aktif"}
            </p>
          </div>
          <Toggle enabled={isDark} onToggle={toggleTheme} />
        </div>
        <Divider />
        <SettingRow
          icon={Smartphone}
          label="Animasi"
          sub="Efek animasi halaman"
          color="#06B6D4"
          hasToggle
          toggled={settings.animations}
          onToggle={() => toggle("animations")}
        />
      </SettingsGroup>

      {/* Suara */}
      <SettingsGroup title="Suara">
        <SettingRow
          icon={Volume2}
          label="Efek Suara"
          sub="Suara tombol dan feedback"
          color="#84CC16"
          hasToggle
          toggled={settings.soundEffects}
          onToggle={() => toggle("soundEffects")}
        />
        <Divider />
        <SettingRow
          icon={Music}
          label="Musik Latar"
          sub="Musik latar saat bermain"
          color="#EC4899"
          hasToggle
          toggled={settings.backgroundMusic}
          onToggle={() => toggle("backgroundMusic")}
        />
      </SettingsGroup>

      {/* Lainnya */}
      <SettingsGroup title="Lainnya">
        <SettingRow
          icon={HelpCircle}
          label="Bantuan & FAQ"
          sub="Pusat bantuan"
          color="#06B6D4"
          hasArrow
        />
        <Divider />
        <SettingRow
          icon={Shield}
          label="Kebijakan Privasi"
          sub="Syarat & ketentuan"
          color="#94A3B8"
          hasArrow
        />
      </SettingsGroup>

      {/* Logout */}
      <div className="px-5 mb-8">
        <button
          className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]"
          style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.25)",
            fontFamily: "Poppins, sans-serif",
            fontSize: 15,
            fontWeight: 700,
            color: "#EF4444",
          }}
        >
          <LogOut size={18} style={{ color: "#EF4444" }} />
          Keluar dari Akun
        </button>
        <p
          className="text-center mt-4"
          style={{
            fontSize: 11,
            color: t.versionText,
            fontFamily: "Poppins, sans-serif",
          }}
        >
          LogicDash v1.0.0 · Made with 💜 in Indonesia
        </p>
      </div>
    </div>
  );
}