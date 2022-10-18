// user status auth(trạng thái người dùng(login,register,logout))
import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";
import { useState} from 'react';
import setToken from '../../ultis/setToken'
import axios from 'axios';
import {ACCESS_TOKEN_NAME} from '../../axios'
const HTTP_LOGIN = '/v1/login';

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(authReducer, {
		authLoading: true,
		isAuthenticated: false,
		user: null
	})

	const [use , setUse] = useState({
		token:""
	})
	// Authenticate user with localStorage ### xác thực người dùng với localStorage
	// const loadUser = async () => {
	// 	if (localStorage[ACCESS_TOKEN_NAME]) {        //nếu có token thì =>
	// 		setToken(localStorage[ACCESS_TOKEN_NAME]) //setToken cho nó bằng tonken trong localStore
	// 	}
	// 	// bạn chỉ có 1 lần xác thực vs sever nếu ko sẽ xóa token trong localStorage
	// 	try {
	// 		const response = await axios.get(HTTP_LOGIN)
	// 		if (response.data.success) {
	// 			dispatch({
	// 				type: 'SET_AUTH',
	// 				payload: { isAuthenticated: true, user: response.data.user }
	// 			})
	// 		}
	// 	} catch (error) {
	// 		// nếu người dùng ko xác thực đc thì setToken bằng null(xóa token trong localStorage)
	// 		localStorage.removeItem(ACCESS_TOKEN_NAME)
	// 		setToken(null)
	// 		dispatch({
	// 			type: 'SET_AUTH',
	// 			payload: { isAuthenticated: false, user: null }
	// 		})
	// 	}
	// }
	// Login
	const loginUser = async userForm => {
		try {
			const response = await axios.post(`http://localhost:3030/v1/login`, userForm)
			if (response.data.success)
				localStorage.setItem(
					ACCESS_TOKEN_NAME,
					response.data.accessToken
				)

			return response.data
		} catch (error) {
			if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
		}
	}
	// console.log(loginUser)
	const data  = {
		use, setUse
	}
	return (
		<AuthContext.Provider value={data}>
			{children}
		</AuthContext.Provider>
	)
}
export default AuthContextProvider