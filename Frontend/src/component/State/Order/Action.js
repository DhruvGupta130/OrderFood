import { api } from "../../Config/Api";
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_USERS_NOTIFICATION_FAILURE, GET_USERS_NOTIFICATION_REQUEST, GET_USERS_NOTIFICATION_SUCCESS, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS } from "./ActionType"

export const createOrder = ({reqData, token}) =>{
    return async (dispatch) =>{
        dispatch({type:CREATE_ORDER_REQUEST});
        try{
            const response = await api.post(`/api/order`, reqData,{
                headers:{
                    Authorization:`Bearer ${token}`
                },
            });
            // if(data.payment_url){
            //     window.location.href=data.payment_url;
            // }
            dispatch({type:CREATE_ORDER_SUCCESS, payload:response.data});
            return response;
        }catch (error){
            console.log("error", error);
            dispatch({type:CREATE_ORDER_FAILURE, payload:error});
        }
    }
};

export const getUsersOrders = (token) =>{
    return async (dispatch) =>{
        dispatch({type:GET_USERS_ORDERS_REQUEST});
        try{
            const {data} = await api.get(`/api/order/user`,{
                headers:{
                    Authorization:`Bearer ${token}`
                },
            });
            dispatch({type:GET_USERS_ORDERS_SUCCESS, payload:data});
        }catch (error){
            dispatch({type:GET_USERS_ORDERS_FAILURE, payload:error});
        }
    }
}

export const getUserNotifications = () => {
    return async (dispatch) => {
        dispatch({type:GET_USERS_NOTIFICATION_REQUEST});
        try{
            const {data} = await api.get(`/api/notifications`);
            dispatch({type:GET_USERS_NOTIFICATION_SUCCESS, payload:data});
        }catch (error){
            console.log("error", error);
            dispatch({type:GET_USERS_NOTIFICATION_FAILURE, payload:error});
        }
    }
};