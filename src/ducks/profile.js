export const FETCH_PROFILE_REQUEST = "FETCH_PROFILE_REQUEST";
export const FETCH_PROFILE_RECEIVE = "PROFILE_RECEIVE";
export const FETCH_PROFILE_FAILURE = "FETCH_PROFILE_FAILURE";

export const requestProfile = {
  type: FETCH_PROFILE_REQUEST
};

export function receiveProfile(json) {
  return {
    type: FETCH_PROFILE_RECEIVE,
    payload: json.data
  };
}

export function failureProfile(error) {
  return {
    type: FETCH_PROFILE_FAILURE,
    payload: { error }
  };
}
export const fetchProfile = (dispatch, getState) => {
  const { id } = getState().rootReducer.auth.user;
  dispatch(requestProfile);
  return fetch(
    `https://mysterious-reef-29460.herokuapp.com/api/v1/user-info/${id}`
  )
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(json => dispatch(receiveProfile(json)))
    .catch(error => {
      dispatch(failureProfile(error));
    });
};

const initialState = {
  data: {},
  loading: false,
  error: null
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_PROFILE_RECEIVE:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case FETCH_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        data: {},
        error: action.payload.error
      };
    default:
      return state;
  }
}
