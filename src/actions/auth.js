

import {SIGN_UP, SIGN_IN, START_LOADING, END_LOADING, NOTIFY} from "../constants/actionTypes"
import * as api from "../api"
import {toast} from "react-toastify"


export const signIn = (user, navigate) => async(dispatch) => {
    try {
        dispatch({type:START_LOADING})
        const {data} = await api.signIn(user)
        console.log("377437hudwhwd",data)
        dispatch({type:END_LOADING})
        
        data.error && ( toast.error(<>{data.message}</>))
    
        data.success  && dispatch({type:SIGN_IN, data:data})
        data.success && navigate(`/`)
        // data.success && navigate(`/user/${data.user._id}`)
        data.success && dispatch( toast.success(<>{data.message}</>))

        
    } catch (error) {
        
    }
    
}
export const signUp = (user, navigate) => async(dispatch) => {

    try {

        dispatch({type:START_LOADING})
        const {data} = await api.signUp(user)
        console.log(data)
        
    
        dispatch({type:SIGN_IN, data:data})
        dispatch({type:END_LOADING})
        data.success && navigate(-1)
        data.success && dispatch( toast.success(<>{data.message}</>))
        data.error && dispatch( toast.error(<>{data.message}</>))
    } catch (error) {
        
    }

}

