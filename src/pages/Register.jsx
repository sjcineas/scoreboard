import React, { useState } from 'react';
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import axios from 'axios'; // Ensure you have axios installed (npm install axios)

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
    const [formData, setFormData] = useState({
        orgAcronym: '',
        orgCode: '',
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5038/register', formData);
            console.log('Registration Successful:', response);
        } catch (error) {
            console.error('Registration Failed:', error);
        }
    };


    return (
     <Container>
        <Announcement/>
        <RegisterContainer>
            <RegisterTitle>
                Register
            </RegisterTitle>
            <InputContainer>
                <form onSubmit={handleSubmit}>
                    <Inputs name='orgAcronym' placeholder='Student Organization Acronym' type='text' value={formData.orgAcronym} onChange={handleChange} />
                    <Inputs name='orgCode' placeholder='Student Organization Code' type='text' value={formData.orgCode} onChange={handleChange} />
                    <Inputs name='username' placeholder='Username' type='text' value={formData.username} onChange={handleChange} />
                    <Inputs name='password' placeholder='Password' type='password' value={formData.password} onChange={handleChange} />
                    <SubmitButton type='submit'>Sign Up</SubmitButton>
                </form>
            </InputContainer>
        </RegisterContainer>
     </Container>
    )
  }
  
  export default Register
  