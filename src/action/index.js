import axios from '../config/axios'
import cookies from 'universal-cookie'

const cookie = new cookies()

//LOGIN

export const onLoginUser = (username, password) =>{
    
    //TEMBAK DATA KE DATABASE
    return (dispatch) => {
        axios.post('/login',
        {
            username,
            password
        }
        ).then(res => {
            if(typeof(res.data) == 'string'){
                alert(res.data)
            }else{
                const {id, username, email, password, gender, phone_number, avatar, nama_lengkap } = res.data
                console.log(res.data);

                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: {
                        id, username, email, password, gender, phone_number, avatar, nama_lengkap
                    }
                })
                cookie.set('username', {id, username, email, password, gender, phone_number, avatar, nama_lengkap}, {path: '/'})
            }
        })
    }
}

//KEEP LOGIN
export const keepLogin = (objUser) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: {
            id: objUser.id,
            username: objUser.username,
            email: objUser.email,
                nama_lengkap: objUser.nama_lengkap,
                phone_number: objUser.phone_number,
                avatar: objUser.avatar,
                gender: objUser.gender
        }
    }
}

//LOGOUT
export const onLogoutUser = () => {
    cookie.remove('username')
    return{
        type: 'LOGOUT_SUCCESS'
    }
}


export const onLoginAdmin = (username, password) =>{
    
    //TEMBAK DATA KE DATABASE
    return (dispatch) => {
        axios.post('/login/admin',
        {
            username,
            password
        }
        ).then(res => {
            if(typeof(res.data) == 'string'){
                alert(res.data)
            }else{
                const {id, username } = res.data
                console.log(res.data);

                dispatch({
                    type: 'LOGIN_ADMIN_SUCCESS',
                    payload: {
                        id, username
                    }
                })
                cookie.set('Admin', {id, username}, {path: '/HomeAdmin'})
            }
        })
    }
}

//KEEP LOGIN
export const keepLoginAdmin = (objUser) => {
    return {
        type: "LOGIN_ADMIN_SUCCESS",
        payload: {
            id: objUser.id,
            username: objUser.username
        }
    }
}

//LOGOUT
export const onLogoutAdmin = () => {
    cookie.remove('admin')
    return{
        type: 'LOGOUT_ADMIN_SUCCESS'
    }
}