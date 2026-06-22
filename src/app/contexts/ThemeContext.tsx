import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

// ─── Theme Tokens ────────────────────────────────────────────────────────────

export type ThemeColors = {
  pageBg: string;
  outerBg: string;
  surface: string;
  surfaceBorder: string;
  surfaceDivider: string;
  surface2: string;
  surface2Border: string;
  text: string;
  textSub: string;
  textMuted: string;
  textFaint: string;
  statusText: string;
  signalOn: string;
  signalOff: string;
  navBg: string;
  navBorder: string;
  navIconActive: string;
  navIconInactive: string;
  navLabelActive: string;
  navLabelInactive: string;
  navActivePill: string;
  iconBtnBg: string;
  iconBtnBorder: string;
  toggleOffBg: string;
  xpBarTrack: string;
  leaderboardRowBorder: string;
  myRowBg: string;
  podiumCardBg: string;
  podiumCardBorder: string;
  podiumSubText: string;
  rankedItemBg: string;
  rankedItemBorder: string;
  rankNumBg: string;
  rankNumColor: string;
  rankXpColor: string;
  rankLevelColor: string;
  chartGrid: string;
  chartAxis: string;
  tooltipBg: string;
  tooltipBorder: string;
  tooltipText: string;
  settingsGroupBg: string;
  settingsGroupBorder: string;
  settingsDivider: string;
  settingsSectionLabel: string;
  settingsRowText: string;
  settingsRowSub: string;
  profileStatsBg: string;
  profileStatsBorder: string;
  profileStatsValue: string;
  profileStatsLabel: string;
  gamecardBg: string;
  gamecardBorder: string;
  gameNameColor: string;
  gameDescColor: string;
  categoryTabBg: string;
  categoryTabBorder: string;
  categoryTabText: string;
  xpLegendColor: string;
  recentGameBg: string;
  recentGameBorder: string;
  splashTipBg: string;
  splashTipBorder: string;
  splashProgressTrack: string;
  versionText: string;
};

export const darkTheme: ThemeColors = {
  pageBg: "#0F172A",
  outerBg: "#020817",
  surface: "rgba(255,255,255,0.06)",
  surfaceBorder: "rgba(255,255,255,0.09)",
  surfaceDivider: "rgba(255,255,255,0.06)",
  surface2: "rgba(255,255,255,0.05)",
  surface2Border: "rgba(255,255,255,0.08)",
  text: "#fff",
  textSub: "rgba(255,255,255,0.5)",
  textMuted: "rgba(255,255,255,0.35)",
  textFaint: "rgba(255,255,255,0.2)",
  statusText: "rgba(255,255,255,0.8)",
  signalOn: "rgba(255,255,255,0.8)",
  signalOff: "rgba(255,255,255,0.3)",
  navBg: "rgba(10,17,35,0.97)",
  navBorder: "rgba(124,58,237,0.2)",
  navIconActive: "#7C3AED",
  navIconInactive: "rgba(255,255,255,0.35)",
  navLabelActive: "#A78BFA",
  navLabelInactive: "rgba(255,255,255,0.35)",
  navActivePill: "rgba(124,58,237,0.2)",
  iconBtnBg: "rgba(255,255,255,0.08)",
  iconBtnBorder: "rgba(255,255,255,0.1)",
  toggleOffBg: "rgba(255,255,255,0.12)",
  xpBarTrack: "rgba(255,255,255,0.08)",
  leaderboardRowBorder: "rgba(255,255,255,0.06)",
  myRowBg: "rgba(124,58,237,0.1)",
  podiumCardBg: "rgba(255,255,255,0.04)",
  podiumCardBorder: "rgba(255,255,255,0.08)",
  podiumSubText: "rgba(255,255,255,0.45)",
  rankedItemBg: "rgba(255,255,255,0.05)",
  rankedItemBorder: "rgba(255,255,255,0.07)",
  rankNumBg: "rgba(255,255,255,0.07)",
  rankNumColor: "rgba(255,255,255,0.6)",
  rankXpColor: "rgba(255,255,255,0.7)",
  rankLevelColor: "rgba(255,255,255,0.35)",
  chartGrid: "rgba(255,255,255,0.05)",
  chartAxis: "rgba(255,255,255,0.4)",
  tooltipBg: "rgba(15,23,42,0.95)",
  tooltipBorder: "rgba(124,58,237,0.3)",
  tooltipText: "#fff",
  settingsGroupBg: "rgba(255,255,255,0.05)",
  settingsGroupBorder: "rgba(255,255,255,0.08)",
  settingsDivider: "rgba(255,255,255,0.06)",
  settingsSectionLabel: "rgba(255,255,255,0.35)",
  settingsRowText: "#fff",
  settingsRowSub: "rgba(255,255,255,0.35)",
  profileStatsBg: "rgba(0,0,0,0.2)",
  profileStatsBorder: "rgba(255,255,255,0.06)",
  profileStatsValue: "#fff",
  profileStatsLabel: "rgba(255,255,255,0.4)",
  gamecardBg: "rgba(255,255,255,0.05)",
  gamecardBorder: "rgba(255,255,255,0.09)",
  gameNameColor: "#fff",
  gameDescColor: "rgba(255,255,255,0.45)",
  categoryTabBg: "rgba(255,255,255,0.07)",
  categoryTabBorder: "rgba(255,255,255,0.1)",
  categoryTabText: "rgba(255,255,255,0.5)",
  xpLegendColor: "rgba(255,255,255,0.5)",
  recentGameBg: "rgba(255,255,255,0.05)",
  recentGameBorder: "rgba(255,255,255,0.07)",
  splashTipBg: "rgba(124,58,237,0.12)",
  splashTipBorder: "rgba(124,58,237,0.3)",
  splashProgressTrack: "rgba(255,255,255,0.1)",
  versionText: "rgba(255,255,255,0.25)",
};

export const lightTheme: ThemeColors = {
  pageBg: "#F0F4FF",
  outerBg: "#DDE4F7",
  surface: "rgba(255,255,255,0.88)",
  surfaceBorder: "rgba(124,58,237,0.13)",
  surfaceDivider: "rgba(15,23,42,0.07)",
  surface2: "rgba(255,255,255,0.92)",
  surface2Border: "rgba(124,58,237,0.1)",
  text: "#0F172A",
  textSub: "rgba(15,23,42,0.58)",
  textMuted: "rgba(15,23,42,0.42)",
  textFaint: "rgba(15,23,42,0.28)",
  statusText: "rgba(15,23,42,0.75)",
  signalOn: "rgba(15,23,42,0.75)",
  signalOff: "rgba(15,23,42,0.22)",
  navBg: "rgba(255,255,255,0.97)",
  navBorder: "rgba(124,58,237,0.15)",
  navIconActive: "#7C3AED",
  navIconInactive: "rgba(15,23,42,0.3)",
  navLabelActive: "#7C3AED",
  navLabelInactive: "rgba(15,23,42,0.38)",
  navActivePill: "rgba(124,58,237,0.1)",
  iconBtnBg: "rgba(124,58,237,0.07)",
  iconBtnBorder: "rgba(124,58,237,0.15)",
  toggleOffBg: "rgba(15,23,42,0.1)",
  xpBarTrack: "rgba(15,23,42,0.08)",
  leaderboardRowBorder: "rgba(15,23,42,0.07)",
  myRowBg: "rgba(124,58,237,0.07)",
  podiumCardBg: "rgba(255,255,255,0.85)",
  podiumCardBorder: "rgba(124,58,237,0.12)",
  podiumSubText: "rgba(15,23,42,0.5)",
  rankedItemBg: "rgba(255,255,255,0.88)",
  rankedItemBorder: "rgba(124,58,237,0.1)",
  rankNumBg: "rgba(15,23,42,0.06)",
  rankNumColor: "rgba(15,23,42,0.55)",
  rankXpColor: "rgba(15,23,42,0.68)",
  rankLevelColor: "rgba(15,23,42,0.42)",
  chartGrid: "rgba(15,23,42,0.06)",
  chartAxis: "rgba(15,23,42,0.45)",
  tooltipBg: "rgba(255,255,255,0.98)",
  tooltipBorder: "rgba(124,58,237,0.25)",
  tooltipText: "#0F172A",
  settingsGroupBg: "rgba(255,255,255,0.9)",
  settingsGroupBorder: "rgba(124,58,237,0.12)",
  settingsDivider: "rgba(15,23,42,0.07)",
  settingsSectionLabel: "rgba(15,23,42,0.42)",
  settingsRowText: "#0F172A",
  settingsRowSub: "rgba(15,23,42,0.45)",
  profileStatsBg: "rgba(124,58,237,0.05)",
  profileStatsBorder: "rgba(124,58,237,0.1)",
  profileStatsValue: "#0F172A",
  profileStatsLabel: "rgba(15,23,42,0.48)",
  gamecardBg: "rgba(255,255,255,0.88)",
  gamecardBorder: "rgba(124,58,237,0.1)",
  gameNameColor: "#0F172A",
  gameDescColor: "rgba(15,23,42,0.5)",
  categoryTabBg: "rgba(15,23,42,0.06)",
  categoryTabBorder: "rgba(15,23,42,0.1)",
  categoryTabText: "rgba(15,23,42,0.5)",
  xpLegendColor: "rgba(15,23,42,0.5)",
  recentGameBg: "rgba(255,255,255,0.9)",
  recentGameBorder: "rgba(124,58,237,0.1)",
  splashTipBg: "rgba(124,58,237,0.07)",
  splashTipBorder: "rgba(124,58,237,0.2)",
  splashProgressTrack: "rgba(15,23,42,0.1)",
  versionText: "rgba(15,23,42,0.28)",
};

// ─── Context ──────────────────────────────────────────────────────────────────

interface ThemeContextType {
  isDark: boolean;
  t: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  t: darkTheme,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("logicDashTheme");
    return saved !== null ? saved === "dark" : true;
  });

  useEffect(() => {
    localStorage.setItem("logicDashTheme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{ isDark, t: isDark ? darkTheme : lightTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
