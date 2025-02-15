import { BiHomeAlt } from "react-icons/bi";
import { PiPlantBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { FaRegPaperPlane } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export const sidebarConfig = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: BiHomeAlt,
    type: "link",
  },
  {
    title: "Activities",
    path: "/activities",
    icon: PiPlantBold, // 'null', if there's no icons.
    type: "dropdown",
    subItems: [
      { title: "Users", path: "/activities#users" },
      { title: "Settings", path: "/activities#settings" },
    ],
  },
  {
    title: "Profile",
    path: "/profile",
    icon: CgProfile, // 'null', if there's no icons.
    type: "dropdown",
    subItems: [
      { title: "Users", path: "/profile#users" },
      { title: "Settings", path: "/profile#settings" },
    ],
  },
  {
    title: "About",
    path: "/about",
    icon: FaRegPaperPlane,
    type: "link",
  },
  {
    title: "Logout",
    path: "/logout",
    icon: FiLogOut,
    type: "link",
  },

];
