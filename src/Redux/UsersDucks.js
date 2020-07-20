import { auth, firebase, db, storage } from '../firebase'
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

        const user = {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName,
            photoUrl: res.user.photoURL
        }

        const userDb = await db.collection('users').doc(user.email).get()

        if (user.exists) {
            dispatch({
                type: SUCCESS_USER,
                payload: userDb.data()
            })

            localStorage.setItem('user', JSON.stringify(userDb.data()))
        } else {
            await db.collection('users').doc(user.email).set(user)

            dispatch({
                type: SUCCESS_USER,
                payload: user
            })

            localStorage.setItem('user', JSON.stringify(user))

        }


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

export const updateUserAction = (name) => async (dispatch, getState) => {

    dispatch({
        type: LOADING
    })

    const { user } = getState().users

    try {
        await db.collection("users").doc(user.email).update({
            displayName: name
        })

        const updatedUser = {
            ...user, displayName: name
        }

        dispatch({
            type: SUCCESS_USER,
            payload: updatedUser
        })

        localStorage.setItem('user', JSON.stringify(updatedUser))

    } catch (error) {
        console.log(error);
    }

}

export const updateImageAction = (image) => async (dispatch, getState) => {

    dispatch({
        type: LOADING
    })

    const { user } = getState().users

    try {

        const imageRef = await storage.ref().child(user.email).child('profile')
        await imageRef.put(image)

        const imageUrl = await imageRef.getDownloadURL()

        await db.collection("users").doc(user.email).update({
            photoUrl: imageUrl
        })

        const updatedUser = {
            ...user, photoUrl: imageUrl
        }

        dispatch({
            type: SUCCESS_USER,
            payload: updatedUser
        })

        localStorage.setItem('user', JSON.stringify(updatedUser))

    } catch (error) {
        console.log(error);
    }

}