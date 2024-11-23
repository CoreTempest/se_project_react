import avatar from "../../assets/avatar.png";
import React from "react";
import "../Profile/Profile.css";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ handleEditProfileClick, handleSignout }) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        <img
          className="sidebar__user_avatar"
          src={currentUser?.avatar}
          alt={currentUser?.name}
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__buttons">
        <button
          onClick={handleEditProfileClick}
          type="button"
          className="sidebar__change-profile"
        >
          Change Profile Data
        </button>
        <button className="sidebar__logout" onClick={handleSignout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
