
import { LOGOUT } from "../Authentication/ActionTypes";
import * as actionTypes from "./ActionType";

const initialState = {
    cart: null,
    cartItems: [],
    loading: false,
    error: null
};

const cartReducer = (state = initialState, action) =>{
    switch (action.type){
        case actionTypes.GET_CART_REQUEST:
        case actionTypes.UPDATE_CART_ITEM_REQUEST:
        case actionTypes.REMOVE_CART_ITEM_REQUEST:
            return{
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.GET_CART_SUCCESS:
        case actionTypes.CLEAR_CART_SUCCESS:
            return{
                ...state,
                loading: false,
                cart: action.payload,
                // cartItems: action.payload.items
            };
        case actionTypes.ADD_ITEM_CART_SUCCESS:
            return{
                ...state,
                loading:false,
                cartItems: action.payload
            };
        case actionTypes.UPDATE_CART_ITEM_SUCCESS:
            return{
                ...state,
                loading: false,
                cartItems: state.cartItems.map((items)=>
                    items.id === action.payload.id ? action.payload : items
                )
            };
        case actionTypes.REMOVE_CART_ITEM_SUCCESS:
            return{
                ...state,
                loading: false,
                cartItems: state.cartItems.filter((item)=>
                    item.id!==action.payload
                ),
            };
        case actionTypes.GET_CART_FAILURE:
        case actionTypes.UPDATE_CART_ITEM_FAILURE:
        case actionTypes.REMOVE_CART_ITEM_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.payload
            };
        case LOGOUT:
            localStorage.removeItem("token");
            return{
                ...state,
                cartItems: [],
                cart: null,
                success: "Logout Successful"
            };
        default:
            return state;
    }
};

export default cartReducer;