import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React, { useState, useEffect } from "react";
import "./LoginModal.css";

const LoginModal = ({ handleCloseModal, isOpen, handleLogin }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateForm = () => {
    let isValid = true;
    let errors = {
      email: "",
      password: "",
    };

    if (!email) {
      errors.email = "Email is required.";
      isValid = false;
    }

    if (!password) {
      errors.password = "Password is required.";
      isValid = false;
    }

    setErrors(errors);

    return isValid;
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  function resetForm() {
    setPassword("");
    setUrl("");
    setEmail("");
    set;
  }

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleLogin({ email, password });
    }
    //onAddItem({ email, password });
  };
  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <div className="login__button-container">
        <button
          type="submit"
          className={`register__link ${isFormValid() ? "active" : ""}`}
        >
          Log In
        </button>
        <button
          type="button"
          to="login"
          className="login__login-link"
          onClick={() => setActiveModal("register")}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
