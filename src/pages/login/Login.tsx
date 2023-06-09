import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { useAuth, useAuthDispatch } from "../../context/AuthContext";
import Button from "../../components/Button";
import  {URL}  from '../../constants/url';
const Login = () => {
  const [authError, setError] = useState(null);

  const user = useAuth();
  const dispatch = useAuthDispatch();

  const navigate = useNavigate()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });
    try {
      // Make an API request to authenticate the user
      const response = await axios.post(`${URL}/login`, { username, password });

      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      navigate("/")
    } catch (error) {
      setError(error.response.data.message);
      console.error(error);
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data.message });
    }
  };


  return (
  <>
    <form onSubmit={handleSubmit}>
      <div className="login">
        <div className="lContainer">
          <input
            type="text"
              id="username"
              placeholder="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
            className="lInput"
            />
            <Button title="Login" type="submit" />
          {authError && <span style={{color:'red'}}>{authError}</span> }
        </div>
      </div>
    </form>
  </>
  );
};

export default Login;