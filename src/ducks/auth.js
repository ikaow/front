import { history } from "../index";

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILURE = "AUTH_FAILURE";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const requestAuth = {
  type: AUTH_REQUEST
};

export function authFailure(error) {
  return {
    type: AUTH_FAILURE,
    payload: { error }
  };
}

export function authSuccess(json) {
  return {
    type: AUTH_SUCCESS,
    payload: json.data
  };
}

export const authLogout = {
  type: AUTH_LOGOUT
};

export const authorize = userData => {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  };
  return dispatch => {
    dispatch(requestAuth);
    return fetch(
      "https://mysterious-reef-29460.herokuapp.com/api/v1/validate",
      options
    )
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(json => {
        if (json.status !== "ok") {
          throw Error(json.message);
        }
        dispatch(authSuccess(json));
        history.push("/profile");
      })
      .catch(error => dispatch(authFailure(error)));
  };
};

const initialState = {
  loading: false,
  isAuthenticated: false,
  error: null,
  user: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    case AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default: {
      return state;
    }
  }
}
