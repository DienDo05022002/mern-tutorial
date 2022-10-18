
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link,useNavigate } from 'react-router-dom';
import {useState , useContext} from 'react';
import ArlertMessage from '../../layout/ArlertMessage'
import axios from '../../axios';
import {ACCESS_TOKEN_NAME} from '../../axios'
import http from '../../axios'
const HTTP_LOGIN = '/v1/login';


const LoginForm = () => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    const handleChange = (e) => {
        setUser(prev => {
            return {...prev, [e.target.id]:e.target.value}
        })
    }
    const [alert, setAlert] = useState(null)
    //Next to route   
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
//------------------------------------------------------------
        if(!user.username || !user.password) {
            throw new Error("user or password not defind")
        } 
        console.log( user.username, user.password)
        try {
            const res = await http.post('/v1/login' ,user)
            if (res.data.success)
				// localStorage.setItem(
				// 	ACCESS_TOKEN_NAME,
				// 	res.data.accessToken
				// )
                console.log(res.data.accessToken)
                navigate('/dashboard')
            
        } catch (err) {
            setAlert({type: 'Thất bại', message: handleSubmit.message})
            setTimeout(() => {
                setAlert(null)
            },4000)
        }
    }
    return <div>
        <div className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1>LearnIt</h1>
                    <h4>Keep track of what you are learning</h4>
                    <form  onSubmit={handleSubmit}>
                        <ArlertMessage info={alert} />
                        <Form.Group>
                            <Form.Control id="username" value={user.username} onChange={handleChange} type="text" placeholder="Usernam" name="usernam"></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control id="password" value={user.password} onChange={handleChange} type="password" placeholder="Password" name="password"></Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Button variant='success' type='submit'>LOGIN</Button>
                        </Form.Group>
                        <p>lllllllll</p>
                        <p>Don't have an account
                            <Link to={`/register`}>
                                <Button variant='success' type='submit'>REGISTER</Button>
                            </Link>
                        </p>

                    </form>
                </div>
            </div>
        </div>
        {/* <Outlet /> */}
    </div>
}

export default LoginForm