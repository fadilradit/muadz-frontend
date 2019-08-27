import {combineReducers} from 'redux'

const init = {
    id: '',
    username: ''
}

const AuthReducers = (data = init, action) => {
    switch(action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...data,
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                nama_lengkap: action.payload.nama_lengkap,
                phone_number: action.payload.phone_number,
                avatar: action.payload.avatar,
                gender: action.payload.gender
            }
        case "LOGOUT_SUCCESS":
            return {
                ...data,
                id: '',
                username: '',
                email: '',
                nama_lengkap: '',
                phone_number: '',
                avatar: '',
                gender: '',
            }
            default:
                return data
    }
}

export default combineReducers (
    {
        auth: AuthReducers
    }
)