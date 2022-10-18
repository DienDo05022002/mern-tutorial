import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { Link,useNavigate } from 'react-router-dom';
import iconCode from '../assets/icon code.jpg'
import logoutIcon from '../assets/icon log_out.jpg'
import {ACCESS_TOKEN_NAME} from '../axios'

const NavbarMenu = () => {
    // const {use} = useContext(AuthContext)

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        navigate('/')
    }
    return <Navbar expand='lg' bg='primary' variant='dark' className='shadow' style={{padding: '10px 20px'}}>
        <Navbar.Brand className='font-weight-bolder text-white'>
            <img
                src={iconCode}
                alt='learnItLogo'
                width='32'
                height='32'
                className='mr-2'
            />
            LearnIt
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />

        <Navbar.Collapse id='basic-navbar-nav' style={{justifyContent: 'space-between'}}>
            <Nav className='mr-auto'>
                <Nav.Link
                    className='font-weight-bolder text-white'
                    to='/dashboard'
                    as={Link}
                >
                    Dashboard
                </Nav.Link>
                <Nav.Link
                    className='font-weight-bolder text-white'
                    to='/about'
                    as={Link}
                >
                    About
                </Nav.Link>
            </Nav>

            <Nav>
                <Nav.Link className='font-weight-bolder text-white' disabled>
                    Welcome   
                </Nav.Link>
                <Button
                    variant='secondary'
                    className='font-weight-bolder text-white'
                    onClick={logout}
                >
                    <img
                        src={logoutIcon}
                        alt='logoutIcon'
                        width='32'
                        height='32'
                        className='mr-2'
                    />
                    Logout
                </Button>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
}
export default NavbarMenu

