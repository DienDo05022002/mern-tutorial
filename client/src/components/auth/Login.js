import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../../status/context/AuthContext';
import axios from '../../axios';
import {ACCESS_TOKEN_NAME} from '../../axios'
const http = '/v1/login';

const Login = () => {
        const { setAuth } = useContext(AuthContext);
        const userRef = useRef();
        const errRef = useRef();
    
        const [user, setUser] = useState('');
        const [pwd, setPwd] = useState('');
        const [errMsg, setErrMsg] = useState('');
        const [success, setSuccess] = useState(false);
    
        useEffect(() => {
            userRef.current.focus();
        }, [])
    
        useEffect(() => {
            setErrMsg('');
        }, [user, pwd])

        const handleSubmit = async (e) => {
            e.preventDefault();
    
            try {
                const response = await axios.post(http,Login
                    // JSON.stringify({ user, pwd }),
                    // {
                    //     headers: { 'Content-Type': 'application/json' },
                    //     withCredentials: true
                    // }
                );
                console.log(response)
                // console.log(JSON.stringify(response?.data));
                //console.log(JSON.stringify(response));
                const accessToken = response?.data?.accessToken;
                // const roles = response?.data?.roles;
                setAuth({ user, pwd, accessToken });
                setUser('');
                setPwd('');
                setSuccess(true);
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 400) {
                    setErrMsg('Missing Username or Password');
                } else if (err.response?.status === 401) {
                    setErrMsg('Unauthorized');
                } else {
                    setErrMsg('Login Failed');
                }
                errRef.current.focus();
            }
        }


    return (
    <div>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
    </div>
    )
}

export default Login