import React, { useState } from "react";
import { AiFillHome, AiFillInfoCircle } from "react-icons/ai";
import { MdSubject } from "react-icons/md";
import { BsFillPersonLinesFill, BsPersonFill } from "react-icons/bs";
import { FaChalkboardTeacher, FaBars } from "react-icons/fa";
import { ReactComponent as SignOut } from "../assets/svg/SignOut.svg";
import { ReactComponent as Info } from "../assets/svg/Info.svg";
import { HiMenuAlt2 } from "react-icons/hi";
import classes from "./AdminSideBar.module.css";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHooks";
import { signOut } from "../store/authSlice/auth";
interface AdminSideBarProps {
  children?: any;
}
const AdminSideBar: React.FC<AdminSideBarProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const sideBarItems = [
    {
      path: "/Home",
      name: "Home",
      icon: <AiFillHome />,
    },
    {
      path: "/Subjects",
      name: "Manage Subjects",
      icon: <MdSubject />,
    },
    {
      path: "/Students",
      name: "Manage Students",
      icon: <BsFillPersonLinesFill />,
    },
    {
      path: "/Instructors",
      name: "Instructors",
      icon: <FaChalkboardTeacher />,
    },
    {
      path: "/Info",
      name: "Faculty Info",
      icon: <AiFillInfoCircle />,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const signOutHandler = () => {
    dispatch(signOut({}));
  };
  return (
    <div className={classes.container}>
      <div
        style={{
          width: isOpen ? "240px" : "70px",
        }}
        className={classes.sidebar}
      >
        <div className={classes.topSection}>
          <div
            className={`${classes.sidebarHeader} ${
              !isOpen && classes.sidebarHeader_closed
            }`}
          >
            <h1
              style={{
                display: isOpen ? "block" : "none",
              }}
              className={classes.logo}
            >
              SU Attendance
            </h1>
            <HiMenuAlt2
              className={classes.burgerIcon}
              onClick={toggleSidebar}
            />
          </div>
          <div
            className={`${classes.linksSection} ${
              !isOpen && classes.linksSection_closed
            }`}
          >
            {sideBarItems.map((item: any, index: any) => {
              return (
                <NavLink
                  className={({ isActive }) => {
                    if (isActive && !isOpen) {
                      return `${classes.link} ${classes.closedActiveLink}`;
                    }
                    return `${classes.link} ${
                      isActive && classes.openedActiveLink
                    }`;
                  }}
                  to={item.path}
                  key={index}
                >
                  {item.icon}
                  <p
                    style={{
                      display: isOpen ? "block" : "none",
                    }}
                    className={classes.linkText}
                  >
                    {item.name}
                  </p>
                </NavLink>
              );
            })}
          </div>
        </div>
        <div
          className={`${classes.bottomSection} ${
            isOpen ? classes.bottomSection_opened : classes.bottomSection_closed
          }`}
        >
          <SignOut onClick={signOutHandler} className={classes.bottomIcon} />
          <Info className={classes.bottomIcon} />
          <BsPersonFill className={classes.bottomIcon} />
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default AdminSideBar;
