import { auth, firebase } from '../firebase'
//data
const initialData = {
    loading: false,
    active: false
}
//types
const LOADING = "LOADING"
const ERROR_USER = "ERROR_USER"
const SUCCESS_USER = "SUCCESS_USER"
const CLOSE_SECTION = "CLOSE_SECTION"

//reducer
export default function userReducer(state = initialData, action) {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true }
        case ERROR_USER:
            return { ...initialData }
        case SUCCESS_USER:
            return { ...state, loading: false, active: true, user: action.payload }
        case CLOSE_SECTION:
            return { ...initialData }
        default:
            return state
    }
}
//actions
export const loginUserAction = () => async (dispatch) => {
    dispatch({
        type: LOADING
    })
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const res = await auth.signInWithPopup(provider)
        dispatch({
            type: SUCCESS_USER,
            payload: {
                uid: res.user.uid,
                email: res.user.email
            }
        })

        localStorage.setItem('user', JSON.stringify({
            uid: res.user.uid,
            email: res.user.email
        }))

    } catch (error) {
        console.log(error);
        dispatch({
            type: ERROR_USER
        })
    }
}

export const readCurrentUserAction = () => (dispatch) => {
    if (localStorage.getItem("user")) {
        dispatch({
            type: SUCCESS_USER,
            payload: JSON.parse(localStorage.getItem("user"))
        })
    }
}

export const closeSection = () => (dispatch) => {
    auth.signOut()
    localStorage.removeItem("user")
    dispatch({
        type: CLOSE_SECTION
    })
}