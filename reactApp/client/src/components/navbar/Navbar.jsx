import React from "react";
import "./navbar.css";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Person from '../../assets/xp.jpg'
import ProfileDropDown from "../ProfileDropDown";
const Navbar = () => {
  return (
    <div className="navbarContainer">
      <div className="navbarLeft">
        <span className="logo">AntiSocial</span>
      </div>
      <div className="navbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input placeholder="Search for friends" className="searchInput" />
        </div>
      </div>
      <div className="navbarRight">
        <div className="navbarLinks">
          <span className="navbarLink">HomePage</span>
          <span className="navbarLink">TimeLine</span>
        </div>
        <div className="navbarIcons">
          <div className="navbarIconItem">
            <PersonIcon/>
            <span className="navbarIconBadge">1</span>
          </div>
          <div className="navbarIconItem">
            <ChatIcon/>
            <span className="navbarIconBadge">12</span>
          </div>
          <div className="navbarIconItem">
            <NotificationsIcon/>
            <span className="navbarIconBadge">4</span>
          </div>
        </div>
        <ProfileDropDown/>
      </div>
    </div>
  )
};

export default Navbar;
