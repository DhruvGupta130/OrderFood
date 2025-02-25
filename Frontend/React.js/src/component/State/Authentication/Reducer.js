import { isPresentInFavorites } from "../../Config/Logic";
import {
  ADD_TO_FAVORITE_FAILURE,
  ADD_TO_FAVORITE_REQUEST,
  ADD_TO_FAVORITE_SUCCESS,
  CREATE_ADDRESS_FAILURE,
  CREATE_ADDRESS_REQUEST,
  CREATE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAILURE,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UPDATE_ADDRESS_FAILURE,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS
} from "./ActionTypes";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  token: null,
  favorites: [],
  success: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
    case ADD_TO_FAVORITE_REQUEST:
    case CREATE_ADDRESS_REQUEST:
    case UPDATE_ADDRESS_REQUEST:
    case DELETE_ADDRESS_REQUEST:
      return { ...state, isLoading: true, error: null, success: null };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payload.message,
        token: action.payload.token,
      };

    case LOGOUT:
      return initialState;

    case GET_USER_SUCCESS:
      return {
        ...state,
        success: "User fetched successfully",
        isLoading: false,
        user: action.payload,
        favorites: action.payload.favorites || [],
      };

    case CREATE_ADDRESS_SUCCESS:
    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        success: "Address updated successfully",
        isLoading: false,
      };

    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        success: "Address deleted successfully",
        isLoading: false,
      };

    case ADD_TO_FAVORITE_SUCCESS:
      return {
        ...state,
        success: "Favorites modified successfully!",
        isLoading: false,
        error: null,
        favorites: isPresentInFavorites(state.favorites, action.payload)
          ? state.favorites.filter(item => item.id !== action.payload.id)
          : [action.payload, ...state.favorites]
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case ADD_TO_FAVORITE_FAILURE:
    case CREATE_ADDRESS_FAILURE:
    case UPDATE_ADDRESS_FAILURE:
    case DELETE_ADDRESS_FAILURE:
      return { ...state, isLoading: false, error: action.payload, success: null };

    case 'CLEAR_ERROR':
      return { ...state, error: null };

    default:
      return state;
  }
};
