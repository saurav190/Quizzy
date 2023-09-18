import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import Searchbar from "./Searchbar";
import UserProfile from "./UserProfile";

const Header = () => {
  const { isAuthenticated, userRole } = useSelector((state) => state.userSlice);
  const user = useSelector((state) => state.userSlice.login);

  const [togglePrimaryDropDown, setTogglePrimaryDropDown] = useState(false);

  return (
    <header className="bg-[#385A64] sticky top-0 py-2.5 w-full z-10">
      <div className="w-full sm:w-9/12 px-1 sm:px-4 m-auto flex justify-evenly items-center relative">
        <div className="flex items-center flex-1 gap-4">
          <Link
            className="h-7 mr-1 sm:mr-4 flex items-center justify-center"
            to="/"
          >
            <span className="text-white md:block hidden text-xl">Sporcel</span>
          </Link>
        </div>
        <div className="flex items-center justify-between ml-1 sm:ml-0 gap-0.5 sm:gap-7 relative">
          {isAuthenticated === false ? (
            <Link
              to="/login"
              className="px-3 sm:px-9 py-0.5 text-primary-blue bg-white border font-medium rounded-sm cursor-pointer"
            >
              Login
            </Link>
          ) : (
            <span
              className="userDropDown border border-white rounded-sm px-3 py-0.5 flex items-center text-white font-medium gap-1 cursor-pointer"
              onClick={() => setTogglePrimaryDropDown(!togglePrimaryDropDown)}
            >
              {user.name}
              <span>
                {togglePrimaryDropDown ? (
                  <ExpandLessIcon sx={{ fontSize: "16px" }} />
                ) : (
                  <ExpandMoreIcon sx={{ fontSize: "16px" }} />
                )}
              </span>
            </span>
          )}

          {togglePrimaryDropDown && (
            <UserProfile
              setTogglePrimaryDropDown={setTogglePrimaryDropDown}
              userRole={userRole}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
