import { ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, CREATE_ADDRESS_FAILURE, CREATE_ADDRESS_REQUEST, CREATE_ADDRESS_SUCCESS, DELETE_ADDRESS_FAILURE, DELETE_ADDRESS_REQUEST, DELETE_ADDRESS_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_ADDRESS_FAILURE, UPDATE_ADDRESS_REQUEST, UPDATE_ADDRESS_SUCCESS } from "./ActionTypes"
import { api } from "../../Config/Api"

export const registerUser=(reqData)=>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try{
        const{data}=await api.post(`/auth/register`,reqData.userData)
        if(data.token)localStorage.setItem("token",data.token);
        if(data.role==="ROLE_RESTAURANT_OWNER"){
            reqData.navigate('/admin/restaurant')
        }
        else{
            reqData.navigate('/')
        }
        dispatch({type:REGISTER_SUCCESS, payload:data});
    }
    catch(error){
        const errorMessage = error.response && error.response.data ? error.response.data.message : "An error occurred";
        dispatch({type:REGISTER_FAILURE, payload:errorMessage})
    }
}

export const loginUser=(reqData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try{
        const {data}=await api.post(`/auth/login`,reqData.userData);
        if(data.token)localStorage.setItem("token",data.token);
        if(data.role==="ROLE_RESTAURANT_OWNER"){
            reqData.navigate('/admin/restaurant')
        }
        else{
            reqData.navigate('/')
        }
        dispatch({type:LOGIN_SUCCESS, payload:data});
    }
    catch(error){
        const errorMessage = error.response && error.response.data ? error.response.data.message : "An error occurred";
        console.log("Error",errorMessage);
        dispatch({type:LOGIN_FAILURE, payload:errorMessage});
    }
}

export const getUser=(token)=>async(dispatch)=>{
    dispatch({type:GET_USER_REQUEST})
    try{
        const response=await api.get(`/users/profile`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        dispatch({type:GET_USER_SUCCESS, payload:response.data});
    }
    catch(error){
        console.log("Error",error);
        dispatch({type:GET_USER_FAILURE, payload:error});
    }
}

export const addToFavorite=({token, restaurantId})=>async(dispatch)=>{
    dispatch({type:ADD_TO_FAVORITE_REQUEST})
    try{
        const{data}=await api.put(`/api/restaurants/${restaurantId}/add-favorites`,{}, {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        dispatch({type:ADD_TO_FAVORITE_SUCCESS, payload:data});
    }catch(error){
        dispatch({type:ADD_TO_FAVORITE_FAILURE, payload:error})
        console.log("Error",error);
    }
}

export const createAddress=({token, address})=>async(dispatch)=>{
    dispatch({type:CREATE_ADDRESS_REQUEST});
    try{
        const {data} = await api.post(`/users/address` , address, {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        dispatch({type:CREATE_ADDRESS_SUCCESS, payload:data});
    }catch(error){
        dispatch({type:CREATE_ADDRESS_FAILURE, payload:error});
        console.log(error);
    }
}

export const updateAddress=({token, address, id})=>async(dispatch)=>{
    dispatch({type:UPDATE_ADDRESS_REQUEST});
    try{
        const {data} = await api.put(`/users/address/${id}`, address, {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        dispatch({type:UPDATE_ADDRESS_SUCCESS, payload:data});
    }catch(error){
        dispatch({type:UPDATE_ADDRESS_FAILURE, payload:error});
        console.log(error);
    }
};

export const deleteAddress=({token, id})=>async(dispatch)=>{
    dispatch({type:DELETE_ADDRESS_REQUEST});
    try{
        const {data} = await api.delete(`/users/address?id=${id}`, {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        dispatch({type:DELETE_ADDRESS_SUCCESS, payload:data});
    }catch(error){
        dispatch({type:DELETE_ADDRESS_FAILURE, payload:error});
        console.log(error);
    }
}

export const logout=()=>async(dispatch)=>{
    try{
        localStorage.clear();
        dispatch({type:LOGOUT})
    }catch(error){
        console.log("Error",error);
    }
}
