import { api } from "../../Config/Api";
import { CREATE_MENU_ITEM_FAILURE, CREATE_MENU_ITEM_REQUEST, CREATE_MENU_ITEM_SUCCESS, GET_ALL_MENU_ITEM_FAILURE, GET_ALL_MENU_ITEM_REQUEST, GET_ALL_MENU_ITEM_SUCCESS, GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST, GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, SEARCH_MENU_ITEM_FAILURE, SEARCH_MENU_ITEM_REQUEST, SEARCH_MENU_ITEM_SUCCESS, UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST, UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS } from "./ActionType"

export const createMenuItem = ({menu, token}) =>{
    return async (dispatch) =>{
        dispatch({type:CREATE_MENU_ITEM_REQUEST});
        try{
            const {data} = await api.post("api/admin/food", menu,{
                headers:{
                    Authorization:`Bearer ${token}`
                },
            });
            dispatch({type:CREATE_MENU_ITEM_SUCCESS, payload:data});
        }catch (error){
            console.log(error);
            dispatch({type:CREATE_MENU_ITEM_FAILURE, payload:error});
        }
    }
}

export const getMenuItemsByRestaurantId = (reqdata) =>{
    return async (dispatch) =>{
        dispatch({type:GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST});
        try{
            const {data} = await api.get(`api/food/restaurant/${reqdata.id}?veg=${reqdata.vegeterian}&non-veg=${reqdata.nonVegeterian}&seasonal=${reqdata.seasonal}&category=${reqdata.category}`,{
                headers:{
                    Authorization:`Bearer ${reqdata.token}`
                },
            });
            dispatch({type:GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload:data});
        }catch (error){
            console.log(error);
            dispatch({type:GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, payload:error});
        }
    }
}

export const searchMenuItem = ({ keyword, token }) => {
    return async (dispatch) => {
        dispatch({ type: SEARCH_MENU_ITEM_REQUEST });
        try {
            const { data } = await api.get(`/api/food/search?search=${keyword}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: data });
        } catch (error) {
            console.log(error);
            dispatch({ type: SEARCH_MENU_ITEM_FAILURE, payload: error });
        }
    };
};

// export const getAllIngredientsOfMenuItem = (reqdata) =>{
//     return async (dispatch) =>{
//         dispatch({type:GET_ALL_});
//         try{
//             const {data} = await api.post("api/admin/food", menu,{
//                 headers:{
//                     Authorization:`Bearer ${token}`
//                 },
//             });
//             console.log(data);
//             dispatch({type:CREATE_MENU_ITEM_SUCCESS, payload:data});
//         }catch (error){
//             console.log(error);
//             dispatch({type:CREATE_MENU_ITEM_FAILURE, payload:error});
//         }
//     }
// }

export const getAllFoodItems = () =>{
    return async (dispatch) =>{
        dispatch({type:GET_ALL_MENU_ITEM_REQUEST});
        try{
            const {data} = await api.get("/api/food");
            dispatch({type:GET_ALL_MENU_ITEM_SUCCESS, payload:data});
        }catch (error){
            console.log(error);
            dispatch({type:GET_ALL_MENU_ITEM_FAILURE, payload:error});
        }
    }
}

export const updateMenuItemsAvailability = ({foodId, token}) =>{
    return async (dispatch) =>{
        dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST});
        try{
            const {data} = await api.put(`/api/admin/food/${foodId}`, {},{
                headers:{
                    Authorization:`Bearer ${token}`
                },
            });
            dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS, payload:data});
        }catch (error){
            console.log(error);
            dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, payload:error});
        }
    }
};
