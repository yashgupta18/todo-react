import { createContext, useContext, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem?.("user")) || null,
  loading: false,
  error: null,
  isAuthorized: false,
  tokens: {},
};

export const AuthContext = createContext(INITIAL_STATE);
const AuthDispatchContext = createContext(null);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
        isAuthorized: false,
        tokens: {},
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem('accessToken',  action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      const user = action.payload.user.name;
      localStorage.setItem("user", JSON.stringify(user))
      const tokens = {
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      }
      return {
        user: user,
        loading: false,
        error: null,
        isAuthorized: false,
        tokens: tokens,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
        isAuthorized: false,
        tokens: {},
      };
    case "LOGOUT":
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      return {
        user: null,
        loading: false,
        error: null,
        isAuthorized: false,
        tokens: {},
      };
    case "TODOS":
      return {
        user: state.user,
        loading: false,
        error: null,
        isAuthorized: true,
        tokens: state.tokens,
      };
    case "TODOS_START":
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={state}
    >
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};


export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthDispatch() {
  return useContext(AuthDispatchContext);
}
