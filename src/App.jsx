import "./index.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

import * as auth from "../utils/auth";
import { api } from "../utils/api";
import { getToken, setToken } from "../utils/token";

import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import AppContext from "./AppContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  // 🔐 REGISTRO
  const handleRegistration = ({ email, password }) => {
    auth
      .register(email, password)
      .then(() => {
        console.log("Registro OK");
        navigate("/login");
      })
      .catch(console.error);
  };

  // 🔐 LOGIN
  const handleLogin = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.jwt) {
          setToken(data.jwt);
          setIsLoggedIn(true);
          navigate("/cards");
        }
      })
      .catch(console.error);
  };

  // App.jsx
  const handleCardLike = (card) => {
    // Verificamos si ya tiene like (usando encadenamiento opcional ?. por si acaso)
    const isLiked = card.likes?.some((i) => i._id === currentUser._id);

    api
      .toggleLikeCard(card._id, isLiked) // El orden de los parámetros depende de tu api.js
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)),
        );
      })
      .catch(console.error);
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
      })
      .catch(console.error);
  };

  // 🔄 CARGAR DATOS DESPUÉS DE LOGIN
  useEffect(() => {
    if (!isLoggedIn) return;

    api.getUserInfo().then(setCurrentUser).catch(console.error);

    api.getInitialCards().then(setCards).catch(console.error);
  }, [isLoggedIn]);

  // 🔄 AUTO LOGIN SI HAY TOKEN
  useEffect(() => {
    const jwt = getToken();
    if (jwt) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <AppContext.Provider value={{ isLoggedIn, currentUser }}>
        <Header />

        <Routes>
          <Route
            path="/cards"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  cards={cards}
                  currentUser={currentUser}
                  onCardLike={handleCardLike} // <--- ¡Añade esto!
                  onCardDelete={handleCardDelete} // <--- ¡Añade esto!
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/register"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
                <Register handleRegistration={handleRegistration} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
                <Login handleLogin={handleLogin} />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              isLoggedIn ? <Navigate to="/cards" /> : <Navigate to="/login" />
            }
          />
        </Routes>

        <Footer />
      </AppContext.Provider>
    </>
  );
}
