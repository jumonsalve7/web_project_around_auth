import "./index.css";
import "../utils/auth";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Cards from "./components/Cards/Cards";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import * as auth from "../utils/auth";
import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import AppContext from "./components/contexts/AppContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Register from "./components/Register/Register";
import { getToken, setToken } from "../utils/token";
import * as api from "../utils/api";
import { getInitialCards } from "../utils/api";

export default function App() {
  const [cards, setCards] = useState([]);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleRegistration = ({ email, password }) => {
    console.log("Registro:", email, password);
    auth
      .register(email, password)

      .then(() => {
        -navigate("/cards");
        +navigate("/login"); // normalmente vas al login después de registrarte
      })
      .catch((err) => console.error("Error en registro:", err));
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .authorize(email, password)
      .then((data) => {
        console.log("Login exitoso, datos recibidos:", data);
        if (data.token) {
          setToken(data.token);

          setUserData({ email, password });
          setIsLoggedIn(true);
          const redirectPath = location.state?.from?.pathname || "/cards";
          navigate(redirectPath);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    api
      .getUserInfo(jwt)
      .then(({ email, password }) => {
        setIsLoggedIn(true);
        setUserData({ email, password });
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    (async () => {
      await getInitialCards().then((data) => {
        setCards(data);
      });
    })();
  }, []);
  return (
    <>
      <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Header />

        <Routes>
          <Route
            path="/cards"
            element={
              <ProtectedRoute>
                <Main cards={cards}/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/register"
            element={
              <ProtectedRoute anonymous>
                <Register handleRegistration={handleRegistration} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={
              <ProtectedRoute anonymous>
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
