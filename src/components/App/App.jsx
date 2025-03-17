import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { coordinates, APIkey } from "../../utils/constants.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import Footer from "../Footer/Footer.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile.jsx";
import { getItems, addNewItem, deleteItem } from "../../utils/api.js";
import ConfirmDeleteModal from "../ConfirmDelete/ConfirmDelete.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import {
  signUp,
  handleEditProfile,
  getUserProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/auth.js";
import * as auth from "../../utils/auth.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
    weather: "",
  });
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  const navigate = useNavigate();

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleAddClick = () => {
    setActiveModal("create");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleDeleteCardClick = () => {
    console.log("Delete is being called");
    setActiveModal("delete");
  };

  const handleRegisterModal = () => {
    setActiveModal("signup");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit");
  };

  const handleAddItem = (item) => {
    addNewItem(item.name, item.imageUrl, item.weather.toLowerCase())
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem.data, ...prevItems]);

        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  function handleDeleteItem() {
    const token = localStorage.getItem("jwt");
    deleteItem(selectedCard, token)
      .then(() => {
        const newClothingItems = clothingItems.filter(
          (cardItem) => cardItem._id !== selectedCard._id
        );
        setClothingItems(newClothingItems);
        setSelectedCard({});
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  }

  const onSignUp = ({ email, password, name, avatar }) => {
    const userProfile = { email, password, name, avatar };
    signUp(userProfile)
      .then(() => {
        onLogIn({ email, password });
      })
      .catch((error) => {
        console.error("Error at sign up:", error);
      });
  };

  const onLogIn = ({ email, password }) => {
    auth
      .logIn({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        getUserProfile(data.token).then((res) => {
          setCurrentUser(res);
          setIsLoggedIn(true);
          navigate("/profile");
        });
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onEditProfileSubmit = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    handleEditProfile({ name, avatar }, token)
      .then((res) => {
        setCurrentUser({ ...currentUser, ...res });
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    return !isLiked
      ? addCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item))
            );
            setIsLiked(true);
          })
          .catch(console.error)
      : removeCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
            setIsLiked(false);
          })
          .catch(console.error);
  };

  const handleSignout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    closeActiveModal();
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    function handleCloseMethods(evt) {
      if (evt.key === "Escape" || evt.key === "esc") {
        closeActiveModal();
      }
      if (evt.type === "click" && evt.target.classList.contains("modal")) {
        closeActiveModal();
      }
      if (
        evt.type === "click" &&
        evt.target.classList.contains("modal__close")
      ) {
        closeActiveModal();
      }
    }
    if (activeModal !== "") {
      document.addEventListener("keydown", handleCloseMethods);
      document.addEventListener("click", handleCloseMethods);
    }
    return () => {
      document.removeEventListener("keydown", handleCloseMethods);
      document.removeEventListener("click", handleCloseMethods);
    };
  }, [activeModal]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserProfile(token)
        .then((res) => {
          setCurrentUser(res);
          setIsLoggedIn(true);
        })
        .catch(console.error);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser} isLoggedIn={isLoggedIn}>
      <div className="app">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="app__content">
            <Header
              handleAddClick={handleAddClick}
              isLoggedIn={isLoggedIn}
              handleLoginModal={handleLoginModal}
              handleToggleSwitchChange={handleToggleSwitchChange}
              weatherData={weatherData}
              handleRegisterModal={handleRegisterModal}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleCardLike={handleCardLike}
                    isLiked={isLiked}
                    isLoggedIn={isLoggedIn}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                      handleEditProfileClick={handleEditProfileClick}
                      isLiked={isLiked}
                      onCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
                      handleSignout={handleSignout}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>

          <AddItemModal
            buttonText="Add Garment"
            title="New Garment"
            isOpen={activeModal === "create"}
            addNewItem={handleAddItem}
            onClose={closeActiveModal}
          />

          {activeModal === "preview" && (
            <ItemModal
              isOpen={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
              handleDeleteCardClick={handleDeleteCardClick}
            />
          )}
          {activeModal === "delete" && (
            <ConfirmDeleteModal
              isOpen={activeModal}
              onClose={closeActiveModal}
              handleDeleteItem={handleDeleteItem}
              selectedCard={selectedCard}
            />
          )}

          <RegisterModal
            isOpen={activeModal === "signup"}
            closeActiveModal={closeActiveModal}
            onSignUp={onSignUp}
            openLoginModal={handleLoginModal}
          />

          <EditProfileModal
            isOpen={activeModal === "edit"}
            onClose={closeActiveModal}
            onEditProfileSubmit={onEditProfileSubmit}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            closeActiveModal={closeActiveModal}
            onLogIn={onLogIn}
            openRegisterModal={handleRegisterModal}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
