import {api} from "../../Config/Api"
import { CREATE_CATEGORY_REQUEST, CREATE_EVENTS_FAILURE, CREATE_EVENTS_REQUEST, CREATE_EVENTS_SUCCESS, CREATE_RESTAURANT_FAILURE, CREATE_RESTAURANT_REQUEST, CREATE_RESTAURANT_SUCCESS, DELETE_EVENTS_FAILURE, DELETE_EVENTS_REQUEST, DELETE_EVENTS_SUCCESS, DELETE_RESTAURANT_FAILURE, DELETE_RESTAURANT_REQUEST, DELETE_RESTAURANT_SUCCESS, GET_ALL_EVENTS_FAILURE, GET_ALL_EVENTS_REQUEST, GET_ALL_EVENTS_SUCCESS, GET_ALL_RESTAURANT_FAILURE, GET_ALL_RESTAURANT_REQUEST, GET_ALL_RESTAURANT_SUCCESS, GET_RESTAURANT_BY_ID_FAILURE, GET_RESTAURANT_BY_ID_REQUEST, GET_RESTAURANT_BY_ID_SUCCESS, GET_RESTAURANT_BY_USER_ID_FAILURE, GET_RESTAURANT_BY_USER_ID_REQUEST, GET_RESTAURANT_BY_USER_ID_SUCCESS, GET_RESTAURANTS_CATEGORY_FAILURE, GET_RESTAURANTS_CATEGORY_REQUEST, GET_RESTAURANTS_CATEGORY_SUCCESS, GET_RESTAURANTS_EVENTS_FAILURE, GET_RESTAURANTS_EVENTS_REQUEST, GET_RESTAURANTS_EVENTS_SUCCESS, UPDATE_RESTAURANT_FAILURE, UPDATE_RESTAURANT_REQUEST, UPDATE_RESTAURANT_SUCCESS } from './ActionTypes';

export const getAllRestaurants=()=>{
    return async (dispatch) =>{
        dispatch({type:GET_ALL_RESTAURANT_REQUEST});
        try{
            const {data} = await api.get("/api/restaurants");
            dispatch({type:GET_ALL_RESTAURANT_SUCCESS, payload:data});
        }catch (error){
            console.log(error);
            dispatch({type:GET_ALL_RESTAURANT_FAILURE, payload:error});
        }
    }
};

export const getRestaurantById=(reqData)=>{
    return async (dispatch)=>{
        dispatch({type:GET_RESTAURANT_BY_ID_REQUEST});
        try{
            const response = await api.get(`api/restaurants/${reqData.id}`,{
                headers:{
                    Authorization:`Bearer ${reqData.token},`
                },
            });
            dispatch({type:GET_RESTAURANT_BY_ID_SUCCESS, payload:response.data});
        }catch (error){
            dispatch({type:GET_RESTAURANT_BY_ID_FAILURE, payload:error})
            console.log(error)
        }
    }
}

export const getRestaurantByUserId = (token)=>{
    return async (dispatch)=>{
        dispatch({type:GET_RESTAURANT_BY_USER_ID_REQUEST});
        try{
            const {data} = await api.get('/api/admin/restaurants/user',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            dispatch({type:GET_RESTAURANT_BY_USER_ID_SUCCESS, payload:data});
        }catch (error){
            dispatch({type:GET_RESTAURANT_BY_USER_ID_FAILURE, payload:error});
            console.log(error);
        }
    }
};

export const createRestaurant = (reqData) =>{
    console.log("token--------", reqData.token);
    return async (dispatch) =>{
        dispatch({type:CREATE_RESTAURANT_REQUEST});
        try{
            const {data} = await api.post(`/api/admin/restaurants`, reqData.data,{
                headers:{
                    Authorization:`Bearer ${reqData.token}`
                }
            });
            window.location.href="/admin/restaurant";
            dispatch({type:CREATE_RESTAURANT_SUCCESS, payload:data});
        }
        catch (error){
            console.log(error);
            dispatch({type:CREATE_RESTAURANT_FAILURE, payload:error});
        }     
    }
}

export const updateRestaurant = ({restaurantId, restaurantData, token}) =>{
    return async (dispatch) =>{
        dispatch({type:UPDATE_RESTAURANT_REQUEST});
        try{
            const response = await api.put(`/api/admin/restaurants/${restaurantId}`, restaurantData,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            dispatch({type:UPDATE_RESTAURANT_SUCCESS, payload:response.data});
        }
        catch (error){
            console.log(error);
            dispatch({type:UPDATE_RESTAURANT_FAILURE, payload:error});
        }     
    }
}

export const deleteRestaurant = ({restaurantId, token}) =>{
    return async (dispatch) =>{
        dispatch({type:DELETE_RESTAURANT_REQUEST});
        try{
            const response = await api.delete(`/api/admin/restaurants/${restaurantId}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            dispatch({type:DELETE_RESTAURANT_SUCCESS, payload:response.data});
        }
        catch (error){
            console.log(error);
            dispatch({type:DELETE_RESTAURANT_FAILURE, payload:error});
        }     
    }
}

export const updateRestaurantStatus = (token) =>{
    return async (dispatch) =>{
        dispatch({type:UPDATE_RESTAURANT_REQUEST});
        try{
            const response = await api.put(`/api/admin/restaurants/status`,{} ,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            dispatch({type:CREATE_RESTAURANT_SUCCESS, payload:response.data});
        }
        catch (error){
            console.log(error);
            dispatch({type:CREATE_RESTAURANT_FAILURE, payload:error});
        }     
    }
}

export const createEventAction = ({data, token, restaurantId}) =>{
    return async (dispatch) =>{
        dispatch({type:CREATE_EVENTS_REQUEST});
        try{
            const response = await api.post(`/api/admin/restaurants/events/${restaurantId}`, data,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            dispatch({type:CREATE_EVENTS_SUCCESS, payload:response.data});
        }
        catch (error){
            console.log(error);
            dispatch({type:CREATE_EVENTS_FAILURE, payload:error});
        }     
    }
}

export const getAllEvents = ({token}) =>{
    return async (dispatch) =>{
        dispatch({type:GET_ALL_EVENTS_REQUEST});
        try{
            const {data} = await api.get(`/api/events`, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            dispatch({type:GET_ALL_EVENTS_SUCCESS, payload:data});
        }
        catch (error){
            console.log(error);
            dispatch({type:GET_ALL_EVENTS_FAILURE, payload:error});
        }     
    }
}

export const deleteEvents=({eventId, token})=>{
    return async (dispatch)=>{
        dispatch({type:DELETE_EVENTS_REQUEST});
        try{
            const response = await api.delete(`api/admin/events/${eventId}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            dispatch({type:DELETE_EVENTS_SUCCESS, payload:response.data});            
        }catch (error){
            console.log(error);
            dispatch({type:DELETE_EVENTS_FAILURE, payload:error});
        }
    }
}

export const getRestaurantEvents = ({restaurantId, token}) =>{
    return async (dispatch) =>{
        dispatch({type:GET_RESTAURANTS_EVENTS_REQUEST});
        try{
            const response = await api.get(`/api/admin/restaurants/events/${restaurantId}`, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            dispatch({type:GET_RESTAURANTS_EVENTS_SUCCESS, payload:response.data});
        }
        catch (error){
            console.log(error);
            dispatch({type:GET_RESTAURANTS_EVENTS_FAILURE, payload:error});
        }     
    }
}

export const createCategoryAction = ({reqData, token}) =>{
    return async (dispatch) =>{
        dispatch({type:CREATE_CATEGORY_REQUEST});
        try{
            const response = await api.post(`/api/admin/category`, reqData,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            dispatch({type:CREATE_RESTAURANT_SUCCESS, payload:response.data});
        }
        catch (error){
            console.log(error);
            dispatch({type:CREATE_RESTAURANT_FAILURE, payload:error});
        }     
    }
}

export const getRestaurantsCategory = ({token, id}) =>{
    return async (dispatch) =>{
        dispatch({type:GET_RESTAURANTS_CATEGORY_REQUEST});
        try{
            const response = await api.get(`/api/category/restaurant/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            dispatch({type:GET_RESTAURANTS_CATEGORY_SUCCESS, payload:response.data});
        }
        catch (error){
            console.log(error);
            dispatch({type:GET_RESTAURANTS_CATEGORY_FAILURE, payload:error});
        }     
    }
}