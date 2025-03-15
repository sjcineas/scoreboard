import React, { useState } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Announcement from '../components/Announcement';
import { useNavigate } from 'react-router-dom';
import { WidthFull } from '@mui/icons-material';
import { autocompleteClasses } from '@mui/material';



const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #92140C;
    justify-content: center;
    display: block;
`
const BottomOfContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: white;
    justify-content: center;
    display: flex;
`
const Banner =  styled.div`
    height: 20%;
    width: 100%;
    display: flex;
    //background-color: white;
    align-items: center;
    justify-content: center;
`
const BannerContainer =  styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const LoginContainer = styled.div`
    margin-top: 20px;
    width: 35%;
    height: 60%;
    position: absolute;
    //background-color: #FFF8F0;
    border-radius: 20%;
    display: flex; /* Change display to flex */
    flex-direction: column; /* Align items in a column */
    align-items: center; /* Center items horizontally */
    //border: solid 5px;
`
const PageTitle = styled.div`
    font-size: 50px;
    //font-family:
    text-align: center;
    padding-top: 20px;
    padding-bottom: 30px;
    width: 56%;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: left;
`

const InputContainer = styled.div`
    width: 70%;
    height: auto;
    align-items: center;
    justify-content: center;
    display: flex; 
    flex-direction: column; 
`
const Inputs = styled.input`
    height: 30px;
    width: 100%;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 25px;
    background-color: #F4F4F4;

`
const SubmitButton = styled.button`
    border-radius: 4px;
    height: 30px;
    width: 100%;
    background-color: #1E1E24;
    color: #FFF8F0;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 25px;
    &:hover {
    background-color: #92140C;
  }
`

const SignUpButton = styled.button`
    border-radius: 4px;
    height: 30px;
    width: 100%;
    background-color: #1E1E24;
    color: #FFF8F0;
    font-weight: bold;
    cursor: pointer;
    &:hover {
    background-color: #92140C;
  }
`
const NewForm = styled.form`
    justify-content: center;
    display: flex;
    flex-direction: column;
    width: 100%;

`
const Image = styled.img`
    width: 100px;
    height: 100px;

`
const ImageContainer = styled.div`
    padding:1%;
    width: 44%;
    justify-content: left;

`
const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    margin-bottom: 10px;
`;


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:3030/login/auth/login', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                localStorage.setItem('token', data.token); // Assuming your API returns a token
                localStorage.setItem('user', JSON.stringify({ username })); // Store user info
                
                navigate('/'); // Redirect after successful login
            } else {
                setError(data.message || 'Invalid username or password');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        }
    };
    
    return (
        <Container>
            <Announcement />
            <Banner>
                <BannerContainer>
                    <ImageContainer>
                        <Image src="https://www.engr.ucr.edu/sites/default/files/styles/form_preview/public/nsbe_logo.png?itok=R-84CoI9" />
                    </ImageContainer>
                    <PageTitle>Login</PageTitle>
                </BannerContainer>
            </Banner>
            <BottomOfContainer>
                <LoginContainer>
                    <InputContainer>
                        <NewForm onSubmit={handleSubmit}>
                            <Inputs
                                placeholder="Username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Inputs
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {error && <ErrorMessage>{error}</ErrorMessage>}
                            <SubmitButton type="submit">Login</SubmitButton>
                            <h5>Don't have an account yet?</h5>
                            <Link to="/register" style={{ width: '100%' }}>
                                <SignUpButton>Sign Up</SignUpButton>
                            </Link>
                        </NewForm>
                    </InputContainer>
                </LoginContainer>
            </BottomOfContainer>
        </Container>
    );
};

  export default Login