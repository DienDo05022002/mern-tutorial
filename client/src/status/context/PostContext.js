import React from 'react'
import { createContext, useReducer, useState } from "react";
import postReducer from '../../status/reducers/postReducer'
import axios from '../../axios';
import {ACCESS_TOKEN_NAME} from '../../axios'
import http from '../../axios'
const HTTP_LOGIN = '/v1';//url này là dùng để post khóa học, xem rest

export const PostContext = createContext() 

const PostContextProvider = ({ children }) => {
    // State
	// const [postState, dispatch] = useReducer(postReducer, {
	// 	post: null,
	// 	posts: [],
	// 	postsLoading: true
	// })
	const [showAddPostModal, setShowAddPostModal] = useState(false)

	const axiosUpPost = async newPost => {
		try {
			const response = await http.post('/v1', newPost)
			if (response.data.success) {
				console.log(response.data)
				return response.data.post
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete post
	// const deletePost = async postId => {
	// 	try {
	// 		const response = await axios.delete(HTTP_LOGIN${postId}`)
	// 		if (response.data.success)
	// 			dispatch({ type: DELETE_POST, payload: postId })
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }
	// const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)
	// const [showToast, setShowToast] = useState({
	// 	show: false,
	// 	message: '',
	// 	type: null
	// })

    // Get all posts
	// const getPosts = async () => {
	// 	try {
	// 		const response = await axios.get(`${apiUrl}/posts`)
	// 		if (response.data.success) {
	// 			dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts })
	// 		}
	// 	} catch (error) {
	// 		dispatch({ type: POSTS_LOADED_FAIL })
	// 	}
	// }

	// // Add post
	// const addPost = async newPost => {
	// 	try {
	// 		const response = await axios.post(`${apiUrl}/posts`, newPost)
	// 		if (response.data.success) {
	// 			dispatch({ type: ADD_POST, payload: response.data.post })
	// 			return response.data
	// 		}
	// 	} catch (error) {
	// 		return error.response.data
	// 			? error.response.data
	// 			: { success: false, message: 'Server error' }
	// 	}
	// }
    const data  = {
		// postState,
		showAddPostModal,
		setShowAddPostModal,
		axiosUpPost
	}
  return (
    <PostContext.Provider value={data}>
			{children}
	</PostContext.Provider>
  )
}

export default PostContextProvider