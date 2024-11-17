import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { coordinates, APIkey } from "../../utils/constants.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import Footer from "../Footer/Footer.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile.jsx";
import { getItems, addNewItem, deleteItemById } from "../../utils/api.js";
import ConfirmDeleteModal from "../ConfirmDelete/ConfirmDelete.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import {
  checkToken,
  signIn,
  signUp,
  updateCurrentUser,
  addCardLike,
  removeCardLike,
} from "../../utils/auth.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleAddClick = () => {
    setActiveModal("create");
    console.log("activeModal after set:", activeModal);
  };
  const closeActiveModal = () => {
    console.log("Closing modal");
    setActiveModal("");
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const openDeleteModal = () => {
    setActiveModal("delete");
  };

  const handleSignUpClick = () => {
    setActiveModal("signup-modal");
  };

  const handleLogInClick = () => {
    setActiveModal("login-modal");
  };

  const handleProfileChangeClick = () => {
    setActiveModal("user-modal");
  };

  function onAddItem({ name, weather, imageUrl }) {
    addNewItem(name, imageUrl, weather)
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
        closeActiveModal();
      })
      .catch(console.error);
  }

  function handleDeleteItem() {
    deleteItemById(selectedCard._id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  }

  const handleRegistration = ({ name, email, password, avatar }) => {
    const userProfile = { name, email, password, avatar };
    signUp(userProfile)
      .then((res) => {
        handleLogInClick({ email, password });
      })
      .catch((error) => {
        console.error("Error during Registration:", error);
      });
  };

  const handleLogin = ({ email, password }) => {
    console.log("Attempting to login");
    setIsLoading(true);

    signIn({ email, password })
      .then((res) => {
        console.log(res);
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return checkToken(res.token);
        } else {
          console.error("No token in response");
          throw new Error("No token in response");
        }
      })
      .then((data) => {
        setIsAuthenticated(true);
        setCurrentUser(data);
        closeActiveModal();
        setLoggedIn(true);
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Error during login:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleSignout = () => {
    localStorage.removeItem("jwt");
    setIsAuthenticated(false);
    setCurrentUser(null);
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
          navigate("/profile");
        })
        .catch((error) => {
          console.error("Token validation failed", error);
          localStorage.removeItem("jwt");
          setLoggedIn(false);
        });
    } else {
      setLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
        console.log(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
        console.log(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  // ADD WRAPPERS TO BELOW

  return (
    <CurrentUserContext.Provider value={currentUser} loggedIn={loggedIn}>
      <div className="app">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="app__content">
            <Header handleAddClick={handleAddClick} weatherData={weatherData} />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute LoggedIn={loggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      element={Profile}
                      currentUser={currentUser}
                      handleProfileChangeClick={handleProfileChangeClick}
                      handleCardLike={handleCardLike}
                      handleSignout={handleSignout}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>
          {activeModal === "create" && (
            <AddItemModal
              handleCloseModal={closeActiveModal}
              isOpen={activeModal === "create"}
              onAddItem={onAddItem}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              card={selectedCard}
              onClose={closeActiveModal}
              isOpen={handleCardClick}
              openDeleteModal={openDeleteModal}
            />
          )}
          {activeModal === "delete" && (
            <ConfirmDeleteModal
              activeModal={activeModal}
              handleDeleteItem={handleDeleteItem}
              closeActiveModal={closeActiveModal}
              selectedCard={selectedCard}
            />
          )}
          {activeModal === "user-modal" && (
            <EditProfileModal
              activeModal={activeModal}
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "user-modal"}
              handleUpdateProfile={handleUpdateProfile}
            />
          )}
          {activeModal === "login-modal" && (
            <LoginModal
              activeModal={activeModal}
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "login-modal"}
              handleLogin={handleLogin}
              handleSignUpClick={handleSignUpClick}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
