import React from 'react'
import styled from 'styled-components'
import Announcement from '../components/Announcement'


const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    background-color: #92140C;
    justify-content: center;
    display: flex;
`

const RegisterContainer = styled.div`
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
const RegisterTitle = styled.div`
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
    display: flex; /* Change display to flex */
    flex-direction: column; /* Align items in a column */`

const Inputs = styled.input`
    height: 30px;
    width: 100%;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 40px;

`
const SubmitButton = styled.button`
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


const Register = () => {
    return (
     <Container>
        <Announcement/>
        <RegisterContainer>
            <RegisterTitle>
                Register
            </RegisterTitle>
            <InputContainer>
                <form>
                    <Inputs placeholder='Student Organization Acronym' type='text'></Inputs>
                    <Inputs placeholder='Username' type='text'></Inputs>
                    <Inputs placeholder='Password' type='password'></Inputs>
                    <SubmitButton>Sign Up</SubmitButton>
                </form>
            </InputContainer>
        </RegisterContainer>
     </Container>
    )
  }
  
  export default Register
  