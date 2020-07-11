import axios from 'axios'

//Constants
const perPage = 10

const intialData = {
    count: 0,
    next: null,
    previous: null,
    results: [],
}

//types
const GET_POKEMONS_SUCCESS = "GET_POKEMONS_SUCCESS"
const NEXT_POKEMONS_PAGE_SUCCESS = "NEXT_POKEMONS_PAGE_SUCCESS"
const PREVIOUS_POKEMONS_PAGE_SUCCESS = "PREVIOUS_POKEMONS_PAGE_SUCCESS"
const GET_POKEMON_DETAILS_SUCCESS = "GET_POKEMON_DETAILS_SUCCESS"

//Reducer
export default function pokeReducer(state = intialData, action) {

    switch (action.type) {
        case GET_POKEMONS_SUCCESS:
            return {
                ...state, ...action.payload
            }

        case NEXT_POKEMONS_PAGE_SUCCESS:
            return {
                ...state, ...action.payload
            }

        case PREVIOUS_POKEMONS_PAGE_SUCCESS:
            return {
                ...state, ...action.payload
            }
        case GET_POKEMON_DETAILS_SUCCESS:
            return {
                ...state, details: action.payload
            }
        default:
            return state
    }
}

//Actions

export const getPokemonDetail = (url = "https://pokeapi.co/api/v2/pokemon/1/") => async (dispatch) => {

    if (localStorage.getItem(url)) {
        dispatch({
            type: GET_POKEMON_DETAILS_SUCCESS,
            payload: JSON.parse(localStorage.getItem(url))
        })
    } else {
        try {
            const res = await axios.get(url)
            dispatch({
                type: GET_POKEMON_DETAILS_SUCCESS,
                payload: {
                    name: res.data.name,
                    weight: res.data.weight,
                    height: res.data.height,
                    image: res.data.sprites.front_default,
                    moves: JSON.stringify(res.data.moves),
                    type: JSON.stringify(res.data.types),
                    stats: JSON.stringify(res.data.stats),
                }
            })

            localStorage.setItem(url, JSON.stringify({
                name: res.data.name,
                weight: res.data.weight,
                height: res.data.height,
                image: res.data.sprites.front_default,
                moves: JSON.stringify(res.data.moves),
                type: JSON.stringify(res.data.types),
                stats: JSON.stringify(res.data.stats),
            }))


        } catch (error) {
            console.log(error);
        }
    }


}

export const getPokemonsAction = () => async (dispatch) => {
    let key = "offset=0"

    if (localStorage.getItem(key)) {
        dispatch({
            type: GET_POKEMONS_SUCCESS,
            payload: JSON.parse(localStorage.getItem(key))
        })

    } else {
        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${perPage}`)

            dispatch({
                type: GET_POKEMONS_SUCCESS,
                payload: res.data
            })

            localStorage.setItem(key, JSON.stringify(res.data))

        } catch (error) {
            console.log(error);
        }
    }
}


export const getNextPokemonsPage = () => async (dispatch, getState) => {

    const { next } = getState().pokemons
    if (localStorage.getItem(next)) {
        dispatch({
            type: NEXT_POKEMONS_PAGE_SUCCESS,
            payload: JSON.parse(localStorage.getItem(next))
        })
    } else {
        try {
            const res = await axios.get(next)

            dispatch({
                type: NEXT_POKEMONS_PAGE_SUCCESS,
                payload: res.data
            })
            localStorage.setItem(next, JSON.stringify(res.data))
        } catch (error) {
            console.log(error);
        }
    }
}


export const getPreviousPokemonsPage = () => async (dispatch, getState) => {

    const { previous } = getState().pokemons
    if (localStorage.getItem(previous)) {
        dispatch({
            type: PREVIOUS_POKEMONS_PAGE_SUCCESS,
            payload: JSON.parse(localStorage.getItem(previous))
        })
    } else {

        try {
            const res = await axios.get(previous)

            dispatch({
                type: PREVIOUS_POKEMONS_PAGE_SUCCESS,
                payload: res.data
            })

            localStorage.setItem(previous, JSON.stringify(res.data))
        } catch (error) {
            console.log(error);
        }
    }
}