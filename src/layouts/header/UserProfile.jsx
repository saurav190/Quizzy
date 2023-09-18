import ChatIcon from '@mui/icons-material/Chat';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
// import { useSnackbar } from "notistack";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { logOut } from '../../redux/slices/userSlice';



const UserProfile = ({
  setTogglePrimaryDropDown, userRole
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
//   const { enqueueSnackbar } = useSnackbar();
  const popupRef = useRef(null);
  const wishlist = useSelector((state) => state.wishList);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
    localStorage.removeItem("loginuser");
    // enqueueSnackbar("Logout Successfully", { variant: "success" });
    setTogglePrimaryDropDown(false);
  };

  const handleCloseMenu = () => {
    setTogglePrimaryDropDown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target)
      ) {
        handleCloseMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navs = [
    {
      title: "Category",
      icon: <ShoppingBagIcon sx={{ fontSize: "18px" }} />,
      redirect: "/categories",
    },
    {
      title: "Quizzes",
      icon: (
        <span className="text-primary-blue">
        <FavoriteIcon sx={{ fontSize: "18px" }} />
        </span>
      ),
      redirect: "/quizzes",
    },
    {
      title: "Support",
      icon:<ChatIcon sx={{ fontSize: "18px" }} />,
      redirect: "/support",
    },
  ];

  return (
    <div
      ref={popupRef}
      className="absolute w-60 -left-24  ml-2 top-9 z-50 bg-white shadow-2xl rounded flex-col text-sm"
    >
    {userRole === "admin" &&
    <Link className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50 rounded-t" to="/admin/dashboard">
        <span className="text-primary-blue"><DashboardIcon sx={{ fontSize: "18px" }} /></span>
        Admin Dashboard
    </Link>
}

      <Link
        onClick={handleCloseMenu}
        className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50 rounded-t"
        to="/profile"
      >
      <span className="text-primary-blue"><AccountCircleIcon sx={{ fontSize: "18px" }} /></span>
                My Profile
      </Link>

      {navs.map((item, i) => {
        const { title, icon, redirect } = item;

        return (
          <Link
            onClick={handleCloseMenu}
            className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50"
            to={redirect}
            key={i}
          >
            {title === "Wishlist" ? (
              <>
                <span className="text-primary-blue">{icon}</span>
                {title}
                <span className="ml-auto mr-3 bg-gray-100 p-0.5 px-2 text-gray-600 rounded">
                  {wishlist.length}
                </span>
              </>
            ) : (
              <>
                <span className="text-primary-blue">{icon}</span>
                {title}
              </>
            )}
          </Link>
        );
      })}

      <div
        className="pl-3 py-3.5 flex gap-3 items-center hover:bg-gray-50 rounded-b cursor-pointer"
        onClick={handleLogout}
      >
      <span className="text-primary-blue"><PowerSettingsNewIcon sx={{ fontSize: "18px" }} /></span>
        Logout
      </div>

      <div className="absolute right-1/2 -top-2.5">
        <div className="arrow_down"></div>
      </div>
    </div>
  );
};

export default UserProfile;
