import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import axios from 'axios';

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

const RegisterContainer = styled.div`
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
    width:58%;
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
    display: flex; /* Change display to flex */
    flex-direction: column; /* Align items in a column */`

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

const ErrorMessage = styled.div`
    color: red;
    font-size: 14px;
    margin-bottom: 10px;
`

// const SignUpButton = styled.button`
//     border-radius: 4px;
//     height: 30px;
//     width: 100%;
//     background-color: #1E1E24;
//     color: #FFF8F0;
//     font-weight: bold;
//     cursor: pointer;
//     &:hover {
//     background-color: #92140C;
//   }
// `
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
    width: 42%;
    justify-content: left;

`

const Register = () => {
    const [values, setValues] = useState({
        code: '',
        email: '',
        username:'',
        password: ''
    })
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value});
        // Clear error when user starts typing
        if (error) setError('');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const API = process.env.REACT_APP_API_URL;
        
        try {
            const response = await axios.post(
                `${API}/register/users`,
                values,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            if (response.status === 201) {
                // Redirect to login after successful registration
                navigate('/login');
            }
        } catch (err) {
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(err.response.data.error || 'Registration failed. Please try again.');
            } else if (err.request) {
                // The request was made but no response was received
                setError('No response from server. Please check your connection.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setError('An error occurred. Please try again.');
            }
        }
    }

    return (
     <Container>
        <NavBar/>
        <Banner>
        <BannerContainer id="banner">
                <ImageContainer>
                    <Image id="nsbe_logo" src="https://www.engr.ucr.edu/sites/default/files/styles/form_preview/public/nsbe_logo.png?itok=R-84CoI9" />
                </ImageContainer>
                <PageTitle id='page_title'>
                    Sign Up
                </PageTitle>
            </BannerContainer>
        </Banner>
        <BottomOfContainer>
        <RegisterContainer>
            {/* <PageTitle>
                Login
            </PageTitle> */}
            <InputContainer>
                <NewForm onSubmit={handleSubmit}>
                    <Inputs 
                        id='code_input' 
                        name='code' 
                        placeholder='Code' 
                        type='text' 
                        value={values.code}
                        onChange={handleChange}
                    />
                    <Inputs 
                        id='email_input' 
                        name='email' 
                        placeholder='Email' 
                        type='email' 
                        value={values.email}
                        onChange={handleChange}
                    />
                    <Inputs 
                        id='username_input' 
                        name='username' 
                        placeholder='Username' 
                        type='text' 
                        value={values.username}
                        onChange={handleChange}
                    />
                    <Inputs 
                        id='password_input' 
                        name='password' 
                        placeholder='Password' 
                        type='password' 
                        value={values.password}
                        onChange={handleChange}
                    />
                    {error && <ErrorMessage id='error_message'>{error}</ErrorMessage>}
                    <SubmitButton id='register_button' type='submit'>Register</SubmitButton>
                </NewForm>
            </InputContainer>
        </RegisterContainer>
        </BottomOfContainer>
        
     </Container>
    )
  }
  
  export default Register
  