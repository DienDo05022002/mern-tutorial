import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { PostContext } from '../../status/context/PostContext'

const UpdataButton = () => {
	// Contexts
	const {
		showAddPostModal,setShowAddPostModal,axiosUpPost
	} = useContext(PostContext)

	// State
	const [upPost, setUpPost] = useState({
		title: '', description: '', url: '', status: 'TO LEARN' 
	})
	// const [updatedPost, setUpdatedPost] = useState(post)

	// useEffect(() => setUpdatedPost(post), [post])

	const { title, description, url, status } = upPost

	const onChange = event =>
	setUpPost({ ...upPost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		reset()
	}

	// const closeDialog = () => {
	// 	setUpdatedPost(post)
	// 	setShowUpdatePostModal(false)
	// }
	const submitPost = async event => {
		event.preventDefault()
		await axiosUpPost(upPost)
		console.log(upPost)
		reset()
	}

	// Submit thành công thì cho reset lại từ đầu để tắt closeDialog
	const reset = () => {
		setUpPost({ title: '', description: '', url: '', status: 'TO LEARN' })
		setShowAddPostModal(false)
	}

	return (
		<Modal show={showAddPostModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Making progress?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={submitPost}>
				<Modal.Body>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Title'
							name='title'
							required
							aria-describedby='title-help'
							value={title}
							onChange={onChange}
						/>
						<Form.Text id='title-help' muted>
							Required
						</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as='textarea'
							rows={3}
							placeholder='Description'
							name='description'
							value={description}
							onChange={onChange}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Youtube Tutorial URL'
							name='url'
							value={url}
							onChange={onChange}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as='select'
							value={status}
							name='status'
							onChange={onChange}
						>
							<option value='TO LEARN'>TO LEARN</option>
							<option value='LEARNING'>LEARNING</option>
							<option value='LEARNED'>LEARNED</option>
						</Form.Control>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onHide={closeDialog}>
						Cancel
					</Button>
					<Button variant='primary' type='submit'>
						LearnIt!
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default UpdataButton