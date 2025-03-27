// import SearchModal from "@components/ModalSearch";
import Notifications from "@components/selector/DropdownNotifications";
import Help from "@components/selector/DropdownHelp";
import UserMenu from "@components/selector/DropdownProfile";
import ThemeToggle from "@components/ui/ThemeToggle";
import { MdMenu } from "react-icons/md";

const Header = ({ sidebarExpanded, setSidebarExpanded }) => {
  return (
    <header className="h-16 p-5 flex items-center justify-between bg-base-100">
      {/* Left: Sidebar toggle */}
      <div className="flex items-center gap-4">
        {sidebarExpanded !== undefined && (
          <div className="md:hidden block px-auto opacity-60">
            <label
              htmlFor="my-drawer"
              className="btn btn-ghost btn-circle drawer-button"
              onClick={() => setSidebarExpanded(true)}
            >
              <MdMenu size={20} />
            </label>
          </div>
        )}
      </div>
      {/* Right: Controls */}
      <div className="flex items-center gap-4">
        {/* 🔍 Optional Search Button */}
        {/* 
        <button
          className={`btn btn-ghost btn-circle ${
            searchModalOpen ? "bg-gray-200" : ""
          }`}
          onClick={() => setSearchModalOpen(true)}
          aria-controls="search-modal"
        >
          <span className="sr-only">Search</span>
          <svg
            className="w-5 h-5"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7ZM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Z" />
            <path d="m13.314 11.9 2.393 2.393a.999.999 0 1 1-1.414 1.414L11.9 13.314a8.019 8.019 0 0 0 1.414-1.414Z" />
          </svg>
        </button>
        <SearchModal
          id="search-modal"
          searchId="search"
          modalOpen={searchModalOpen}
          setModalOpen={setSearchModalOpen}
        />
        */}

        <Notifications align="right" />
        <Help align="right" />
        <ThemeToggle />

        <div className="w-px h-6 bg-gray-200" />
        <UserMenu align="right" />
      </div>
    </header>
  );
};

export default Header;
