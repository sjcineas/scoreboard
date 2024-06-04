import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Announcement from '../components/Announcement';
import { WidthFull } from '@mui/icons-material';
import { autocompleteClasses } from '@mui/material';



const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #794040;
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
    width: 98%;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
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
    height: 120px;
    width: 120px;
`
const ImageContainer = styled.div`
    width: 2%;
    
`



const Login = () => {
    return (
     <Container>
        <Announcement/>
        <Banner>
            <BannerContainer>
                <ImageContainer>
                    <Image src="https://www.nsbe.org/getmedia/9e92a6e6-21d0-4be7-bda9-88b26865694f/1.png" alt=""></Image>
                </ImageContainer>
                <PageTitle>
                    Login to Scoreboard
                </PageTitle>
            </BannerContainer>
        </Banner>
        <BottomOfContainer>
        <LoginContainer>
            {/* <PageTitle>
                Login
            </PageTitle> */}
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
        </BottomOfContainer>
        
     </Container>
    )
  }
  
  export default Login
  