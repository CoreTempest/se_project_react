import React, { useState, useContext, useEffect } from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  clothingItems,
  handleAddClick,
  handleEditProfileClick,
  handleCardLike,
  handleSignout,
  isLoggedIn,
  onCardClick,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleSignout={handleSignout}
          handleEditProfileClick={handleEditProfileClick}
          onEditProfileData={handleEditProfileClick}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          onCardClick={onCardClick}
          handleCardLike={handleCardLike}
          isLoggedIn={isLoggedIn}
        />
      </section>
    </div>
  );
}

export default Profile;
