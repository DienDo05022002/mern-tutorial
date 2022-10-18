import { useContext, useState, useEffect } from 'react'
import Badge from 'react-bootstrap/Badge'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Col from 'react-bootstrap/Col'
import NavbarMenu from '../../layout/NavbarMenu'
import React from 'react'
import setToken from '../../ultis/setToken'
import axios from '../../axios';
import ActionButtons from '../action/ActionButtons'
import UpdataButton from '../action/UpdataButton'
import { PostContext } from '../../status/context/PostContext'
import {jwtInterceptor} from '../../axios';
import { ACCESS_TOKEN_NAME } from '../../axios'
import http from '../../axios'
import addIcon from '../../assets/add_icon.jpg'
const HTTP_LOGIN = '/v1/postAll';

const Dashboard = () => {

	const [posts, setPost] = useState([])

	const {
		setShowAddPostModal,
	} = useContext(PostContext)

	// Get posts
	// useEffect(() => {
	// 	axios.get(`http://localhost:3030/v1/postAll`)
	// 	.then((res) => {
	// 		setPost(res.data)
	// 		console.log(res.data)
	// 	})
	// }, [])
	useEffect(() => {
		const getPost = async () => {
			// if (localStorage[ACCESS_TOKEN_NAME]) {
			// 	setToken(localStorage[ACCESS_TOKEN_NAME])
			// } else {console.log('user not fould')}
			try {
				await http.get('/v1/postAll')
					.then((res) => {
						setPost(res.data.posts)
						console.log(res.data.posts)
					})
			} catch (err) {console.log(err)}
		}
		getPost()
	}, [])

	let body = null

	if(posts.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					{/* <Card.Header as='h1'>Hi {username}</Card.Header> */}
					<Card.Body>
						<Card.Title>Welcome to LearnIt</Card.Title>
						<Card.Text>
							Click the button below to track your first skill to learn
						</Card.Text>
						<Button
							variant='primary'
							// onClick={setShowAddPostModal.bind(this, true)}
						>
							LearnIt!
						</Button>
					</Card.Body>
				</Card>
			</>
		)
	} else {
		body = (
			<>
			<NavbarMenu></NavbarMenu>
			<Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
				{posts.map((post, index) => 
					<Col key={post._id} className='my-2'>
						<Card
							className='shadow'
							border={post.status === 'LEARNED'? 'success': post.status === 'LEARNING'? 'warning': 'danger'}
						>
							<Card.Body>
								<Card.Title>
									<Row>
										<Col>
											<p className='post-title'>{post.title}</p>
											<Badge
												pill
												variant={post.status === 'LEARNED'? 'success': post.status === 'LEARNING'? 'warning': 'danger'}
											>
												{post.status}
											</Badge>
										</Col>
										<Col className='text-right'>
										<ActionButtons></ActionButtons>
										</Col>
									</Row>
								</Card.Title>
								<Card.Text>{post.description}</Card.Text>
							</Card.Body>
						</Card>
						<div>{post.title}</div>
					</Col>
					// <div key={post._id}></div>
				)}
				<Col>
				buutin
				</Col>
			</Row>
			</>
		)
	}
	return (
		<>
			{body}
			<UpdataButton/>
			{/* Open Add Post Modal */}
			<OverlayTrigger
				placement='left'
				overlay={<Tooltip>Add a new thing to learn</Tooltip>}
			>
				<Button
					className='btn-floating'
				onClick={setShowAddPostModal.bind(this, true)}
				>
					<img src={addIcon} alt='play' width='40' height='40' />
					{/* <img src={addIcon} alt='add-post' width='60' height='60' /> */}
				</Button>
			</OverlayTrigger>
			
		</>
	)

}
export default Dashboard
