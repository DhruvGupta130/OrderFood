import { api } from "../../Config/Api";
import { ADD_ITEM_CART_FAILURE, ADD_ITEM_CART_REQUEST, ADD_ITEM_CART_SUCCESS, CLEAR_CART_FAILURE, CLEAR_CART_REQUEST, CLEAR_CART_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./ActionType";

export const getCart = (token) =>{
    return async (dispatch) =>{
        dispatch({type:GET_CART_REQUEST});
        try{
            const response = await api.get(`/api/cart`,{
                headers:{
                    Authorization:`Bearer ${token}`
                },
            });
            dispatch({type:GET_CART_SUCCESS, payload:response.data});
        }catch (error){
            console.log("error", error);
            dispatch({type:GET_CART_FAILURE, payload:error});
        }
    }
};

export const AddItemCart = (reqData) =>{
    return async (dispatch) =>{
        dispatch({type:ADD_ITEM_CART_REQUEST});
        try{
            const response = await api.post(`/api/cart/add`, reqData.cartItem, {
                headers:{
                    Authorization:`Bearer ${reqData.token}`
                },
            });
            dispatch({type:ADD_ITEM_CART_SUCCESS, payload:response.data});
        }catch (error){
            console.log("error",error);
            dispatch({type:ADD_ITEM_CART_FAILURE, payload:error});
        }
    }
};

export const updateCartItem = (reqData) =>{
    return async (dispatch) =>{
        dispatch({type:UPDATE_CART_ITEM_REQUEST});
        try{
            const response = await api.put(`/api/cart/update`, reqData.data, {
                headers:{
                    Authorization:`Bearer ${reqData.token}`
                },
            });
            dispatch({type:UPDATE_CART_ITEM_SUCCESS, payload:response.data});
        }catch (error){
            console.log(error);
            dispatch({type:UPDATE_CART_ITEM_FAILURE, payload:error});
        }
    }
};

export const removeCartItem = ({cartItemId, token}) =>{
    return async (dispatch) =>{
        dispatch({type:REMOVE_CART_ITEM_REQUEST});
        try{
            const response = await api.delete(`/api/cart/${cartItemId}/remove`,{
                headers:{
                    Authorization:`Bearer ${token}`
                },
            });
            dispatch({type:REMOVE_CART_ITEM_SUCCESS, payload:response.data});
        }catch (error){
            console.log(error);
            dispatch({type:REMOVE_CART_ITEM_FAILURE, payload:error});
        }
    }
};

export const clearCart = () =>{
    return async (dispatch) =>{
        dispatch({type:CLEAR_CART_REQUEST});
        try{
            const {data} = await api.put(`/api/cart/clear`, {}, {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                },
            });
            dispatch({type:CLEAR_CART_SUCCESS, payload:data});
        }catch (error){
            dispatch({type:CLEAR_CART_FAILURE, payload:error});
        }
    }
};