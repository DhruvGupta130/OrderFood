import { api } from "../../Config/Api";
import { GET_RESTAURANTS_ORDERS_FAILURE, GET_RESTAURANTS_ORDERS_REQUEST, GET_RESTAURANTS_ORDERS_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS } from "./ActionType"

export const updateOrderStatus = ({orderId, orderStatus, token})=>{
    return async (dispatch) =>{
        dispatch({type:UPDATE_ORDER_STATUS_REQUEST});
        try{
            const response = await api.put(`/api/admin/order/${orderId}?status=${orderStatus}`, {}, {
                headers:{
                    Authorization:`Bearer ${token}`
                },
            });
            dispatch({type:UPDATE_ORDER_STATUS_SUCCESS, payload:response.data})
        }catch (error) {
            console.log(error);
            dispatch({type:UPDATE_ORDER_STATUS_FAILURE, payload:error});
        }
    }
};

export const getRestaurantOrders = (token, orderStatus) =>{
    return async (dispatch) =>{
        dispatch({type:GET_RESTAURANTS_ORDERS_REQUEST});
        try{
            const response = await api.get(`/api/admin/order/restaurant?status=${orderStatus}`, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            dispatch({type:GET_RESTAURANTS_ORDERS_SUCCESS, payload:response.data});
        }catch (error){
            console.log(error);
            dispatch({type:GET_RESTAURANTS_ORDERS_FAILURE, payload:error});
        }
    }
};