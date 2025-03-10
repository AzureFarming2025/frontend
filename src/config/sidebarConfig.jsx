import { BiHomeAlt, BiBell } from "react-icons/bi";
import { PiPlantBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { FaRegPaperPlane } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { LuSettings, LuBadgeHelp } from "react-icons/lu";

// ✅ Navigation 섹션
const navigation = [
  {
    title: "Home",
    path: "/dashboard",
    icon: BiHomeAlt,
    type: "link",
  },
  {
    title: "Activities",
    path: "/activities",
    icon: PiPlantBold,
    type: "dropdown",
    subItems: [
      { title: "Users", path: "/activities#users" },
      { title: "Settings", path: "/activities#settings" },
    ],
  },
  {
    title: "About",
    path: "/about",
    icon: FaRegPaperPlane,
    type: "link",
  },
];

// ✅ User & Settings 섹션
const settings = [
  {
    title: "Notifications",
    path: "/notifications",
    icon: BiBell,
    type: "link",
  },
  {
    title: "Settings",
    path: "/settings",
    icon: LuSettings,
    type: "link",
  },
  {
    title: "Help",
    path: "/help",
    icon: LuBadgeHelp,
    type: "link",
  },
];

// ✅ Logout (하단 버튼 용도)
const footer = [
  {
    title: "Logout",
    path: "/logout",
    icon: FiLogOut,
    type: "link",
  },
];

export const sidebarConfig = { navigation, settings, footer };
