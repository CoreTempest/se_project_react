import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
  currentUser,
  handleProfileChangeClick,
  handleCardLike,
  handleSignout,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          currentUser={currentUser}
          handleProfileChangeClick={handleProfileChangeClick}
          handleSignout={handleSignout}
        />
      </section>
      <section className="profile__clothing-item">
        <ClothesSection
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          currentUser={currentUser}
          onCardLike={handleCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
