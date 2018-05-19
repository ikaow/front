const FETCH_NEWS_REQUEST = "FETCH_NEWS_REQUEST";
const FETCH_NEWS_RECEIVE = "FETCH_NEWS_RECEIVE";
const FETCH_NEWS_FAILURE = "FETCH_NEWS_FAILURE";

export const requestNews = {
  type: FETCH_NEWS_REQUEST
};

export function receiveNews(json) {
  return {
    type: FETCH_NEWS_RECEIVE,
    payload: json.data
  };
}

export function failureNews(error) {
  return {
    type: FETCH_NEWS_FAILURE,
    payload: { error }
  };
}
export const fetchNews = dispatch => {
  dispatch(requestNews);
  return fetch("https://mysterious-reef-29460.herokuapp.com/api/v1/news")
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(json => dispatch(receiveNews(json)))
    .catch(error => {
      dispatch(failureNews(error));
    });
};

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function newsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_NEWS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_NEWS_RECEIVE:
      return {
        ...state,
        loading: false,
        items: action.payload
      };
    case FETCH_NEWS_FAILURE:
      return {
        ...state,
        loading: false,
        items: [],
        error: action.payload.error
      };
    default:
      return state;
  }
}
