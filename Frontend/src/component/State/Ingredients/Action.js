import { api } from "../../Config/Api"
import { CREATE_INGREDIENTS_FAILURE, CREATE_INGREDIENTS_REQUEST, CREATE_INGREDIENTS_SUCCESS, GET_INGREDIENT_CATEGORY_FAILURE, GET_INGREDIENT_CATEGORY_REQUEST, GET_INGREDIENT_CATEGORY_SUCCESS, GET_INGREDIENTS, UPDATE_STOCK } from "./ActionTypes";
import { CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS } from "../Restaurant/ActionTypes";

export const getIngredientsOfRestaurant = (token) =>{
    return async (dispatch) =>{
        try{
            const response = await api.get(`/api/admin/ingredients/restaurant`, {
                headers:{
                    Authorization:`Bearer ${token}`
                },
            });
            dispatch({type:GET_INGREDIENTS, payload:response.data});
        }catch (error){
            console.log("error ",error);
        }
    }
};

export const createIngredient = ({data, token}) =>{
    return async (dispatch) =>{
        dispatch({type:CREATE_INGREDIENTS_REQUEST});
        try{
            const response = await api.post(`/api/admin/ingredients`, data, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            dispatch({type:CREATE_INGREDIENTS_SUCCESS, payload:response.data});
        }catch (error){
            console.log("error",error);
            dispatch({type:CREATE_INGREDIENTS_FAILURE, payload:error});
        }
    }
}

export const createIngredientCategory = ({data, token})=>{
    return async (dispatch) => {
        dispatch({type:CREATE_CATEGORY_REQUEST});
        try{
            const response = await api.post(`/api/admin/ingredients/category`, data, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            dispatch({type:CREATE_CATEGORY_SUCCESS, payload: response.data});
        }catch (error){
            console.log("error ",error);
            dispatch({type:CREATE_CATEGORY_FAILURE, payload: error});
        }
    }
}

export const getIngredientCategory = (token) =>{
    return async (dispatch) =>{
        dispatch({type:GET_INGREDIENT_CATEGORY_REQUEST});
        try{
            const response = await api.get(`/api/admin/ingredients/restaurant/category`,{
                headers:{
                    Authorization:`Bearer ${token}`
                },
            });
            dispatch({type:GET_INGREDIENT_CATEGORY_SUCCESS, payload:response.data});
        }catch (error){
            console.log("error ", error);
            dispatch({type:GET_INGREDIENT_CATEGORY_FAILURE, payload:error});
        }
    }
};

export const updateStockOfIngredient = ({id, token}) =>{
    return async (dispatch) =>{
        try{
            const response = await api.put(`/api/admin/ingredients/${id}/update`, {}, {
                headers:{
                    Authorization:`Bearer ${token}`
                },
            });
            dispatch({type:UPDATE_STOCK, payload:response.data});
        }catch (error){
            console.log("error ", error);
        }
    }
};