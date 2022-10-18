import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link , useNavigate} from 'react-router-dom';
import {useState } from 'react';
import ArlertMessage from '../../layout/ArlertMessage'
import axios from '../../axios';
import {ACCESS_TOKEN_NAME} from '../../axios'
import http from '../../axios'
const HTTP_LOGIN = '/v1/register';

const RegisterForm = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
        confiemPassword:""
    })
    // const { username, password, confirmPassword } = setUser
    
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
        // if(password !== confirmPassword) {
        //     setAlert({ type: 'danger', message: 'Passwords do not match' })
		// 	setTimeout(() => setAlert(null), 5000)
		// 	return
        // } 
        // console.log(user)
        try {
            const res = await http.post('/v1/register',user)
            if (res.data.success)
				// localStorage.setItem(
				// 	ACCESS_TOKEN_NAME,
				// 	res.data.accessToken
				// )
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
                    <h1>Register</h1>
                    <h4>Register new an account</h4>
                        <form onSubmit={handleSubmit}>
                        <ArlertMessage info={alert} />
                        <Form.Group>
                            <Form.Control id="username" value={user.username} onChange={handleChange} type="text" placeholder="Usernam" name="usernam"></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control id="password" value={user.password} onChange={handleChange} type="password" placeholder="Password" name="password"></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control id="confiemPassword" value={user.confiemPassword} onChange={handleChange} type="password" placeholder="Confiem Password" name="password"></Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Button variant='success' type='submit'>REGISTER</Button>
                        </Form.Group>
                        <p>Come back page login
                            <Link to={`/`}>
                                <Button variant='success' type='submit'>LOGIN</Button>
                            </Link>
                        </p>
                        </form>
                </div>
            </div>
        </div>
    </div>
}

export default RegisterForm