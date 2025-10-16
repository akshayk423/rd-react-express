import { useState, useContext } from "react";
import AppContext from "../../contexts/AppContext.js";
import { loginUser, registerUser } from "../../utils/userApi.js";
import "./Login.css";

const Login = () => {
  const { setCurrentUser, setToken } = useContext(AppContext);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = isLogin
        ? await loginUser(username, password)
        : await registerUser(username, password);

      if (res.token) {
        // Logged in
        setCurrentUser(res.user);
        setToken(res.token);
        localStorage.setItem("jwt", res.token);
      } else if (res.message && isLogin === false) {
        // Registration success (some backends might not return token)
        alert("Account created! You can now log in.");
        setIsLogin(true);
      } else if (res.error) {
        setError(res.error);
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
    }
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title">{isLogin ? "Login" : "Sign Up"}</h2>

        <input
          className="login__input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="login__input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="login__error">{error}</p>}
        <div className="login__footer">
          <button type="submit" className="login__btn">
            {isLogin ? "Login" : "Create Account"}
          </button>

          <p className="login__toggle">
            {isLogin ? "Don’t have an account?" : "Already have one?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="login__btn"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
