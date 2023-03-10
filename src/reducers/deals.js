import {
  FETCH_ALL,
  FETCH_POST,
  COMMENT,
  START_LOADING,
  END_LOADING,
  DELETE,
  UPDATE,
  LIKE,
  CREATE,
  FETCH_BY_SEARCH,
} from "../constants/actionTypes";

const postsReducer = (state = { isLoading: false, deals: [] }, action) => {
  switch (action.type) {
  

    case FETCH_ALL:
      return {
        ...state,
        deals: action.payload,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case UPDATE:
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) return action.payload;
          return post;
        }),
      };

    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };
    case FETCH_POST:
      return { ...state, post: action.payload };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    default:
      return state;
  }
};

export default postsReducer;
