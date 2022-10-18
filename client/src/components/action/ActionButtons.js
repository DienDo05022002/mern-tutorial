import Button from 'react-bootstrap/Button'
import deleteIcon from '../../assets/icon_delete.jpg'
import playIcon from '../../assets/icon_play.jpg'
import iconPen from '../../assets/icon_pen.jpg'

// import { PostContext } from '../../contexts/PostContext'
// import { useContext } from 'react'

const ActionButtons = ({ url, _id }) => {
	// const { deletePost, findPost, setShowUpdatePostModal } = useContext(
	// 	PostContext
	// )

	// const choosePost = postId => {
	// 	findPost(postId)
	// 	setShowUpdatePostModal(true)
	// }

	return (
		<>
			<Button className='post-button' href={url} target='_blank'>1
				<img src={playIcon} alt='play' width='27' height='27' />
			</Button>
			<Button className='post-button'>2
				<img src={iconPen} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button'>3
				<img src={deleteIcon} alt='delete' width='27' height='27' />
			</Button>
		</>
	)
}

export default ActionButtons