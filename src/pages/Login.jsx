import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Announcement from '../components/Announcement';
import { WidthFull } from '@mui/icons-material';



const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    background-color: #92140C;
    justify-content: center;
    display: flex;
`

const LoginContainer = styled.div`
    margin-top: 150px;
    width: 30%;
    height: 60%;
    position: absolute;
    background-color: #FFF8F0;
    border-radius: 20%;
    display: flex; /* Change display to flex */
    flex-direction: column; /* Align items in a column */
    align-items: center; /* Center items horizontally */
    border: solid 5px;
`
const LoginTitle = styled.div`
    font-size: 50px;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 30px;
    width: 100%;

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

`
const SubmitButton = styled.button`
    border-radius: 4px;
    height: 30px;
    width: 100%;
    background-color: #1E1E24;
    color: #FFF8F0;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 40px;
    &:hover {
        background-color: #92140C;
  }
`

const SignUpButton = styled.button`
    border-radius: 4px;
    height: 30px;
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


const Login = () => {
    return (
     <Container>
        <Announcement/>
        <LoginContainer>
            <LoginTitle>
                Login
            </LoginTitle>
            <InputContainer>
                <NewForm>
                    <Inputs placeholder='Username' type='text'></Inputs>
                    <Inputs placeholder='Password' type='password'></Inputs>
                    <SubmitButton>Login</SubmitButton>
                    <h5>Don't have an account yet?</h5>
                    <Link to="/register" style={{ width: '100%' }}>
                        <SignUpButton>Sign Up</SignUpButton>
                    </Link>
                </NewForm>
            </InputContainer>
        </LoginContainer>
     </Container>
    )
  }
  
  export default Login
  