import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import Announcement from '../components/Announcement';

const MembershipFormTitle = styled.div`
    width: 100%;
    background-color: #92140C;
    display: flex;
    align-items: center;
`;
const Image = styled.img`
    height: 50%;
    width: 10%;
`;
const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px; /* Adjust this value as needed for spacing */
`;
const Title = styled.h1`
    margin-left: 400px; /* Adjust this value as needed for spacing */
    color: white;
`;
const Subtitle = styled.p`
    color: white;
    margin: 0; /* Remove default margin */
    margin-left: 490px; /* Adjust this value as needed for spacing */
`;
const PersonalInformation = styled.div`
    color: #92140C;
    margin-top: 50px; 
    margin-left: 160px; 
`;
const Input = styled.input`
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 160px;
    width: 80%;
`;
const InputContainer = styled.div`
    margin-top: 30px;
    margin-left: 160px;
`;
const SchoolStatues = styled.div`
    color: #92140C;
    margin-top: 50px; 
    margin-left: 160px; 
`;
const ChooseMembership = styled.div`
    color: black;
    margin-top: 10px; 
    margin-left: 160px; 
`;
const SchoolstatusInputcontainer = styled.div`
    margin-top: 10px;
    margin-left: -100px;
`;
const Inputs = styled.input`
    margin-top: 10px;
    margin-bottom: 30px;
    margin-left: 200px;
    margin-right: -40px;
    width: 10%;
`;
const SubmitButton = styled.button`
    background-color: #92140C;
    color: white;
    padding: 10px 50px;
    border: none;
    cursor: pointer;
    margin-top: 30px;
`;
const MembershipForm = () => {
    return (
        <container>
            <MembershipFormTitle>
                <Image src="https://www.engr.ucr.edu/sites/default/files/styles/form_preview/public/nsbe_logo.png?itok=R-84CoI9" />
            <TitleContainer>
                <Title>Membership Form</Title>
                <Subtitle>N S B E  @  F I U</Subtitle>
            </TitleContainer>
            </MembershipFormTitle>
            <div>
                <PersonalInformation>
                    <h3>Personal Information</h3>
                </PersonalInformation>
                <InputContainer>
                    <form>
                        <label htmlFor="firstName"><h4>First Name:</h4></label>
                        <Input placeholder="First Name" type="text" id="firstName"/>
                        <label htmlFor="lastName"><h4>Last Name:</h4></label>
                        <Input placeholder="Last Name" type="text" id="lastName"/>
                        <label htmlFor="major"><h4>Major:</h4></label>
                        <Input placeholder="Major" type="text" id="major"/>
                        <label htmlFor="pantherId"><h4>Panther ID:</h4></label>
                        <Input placeholder="Panther ID" type="text" id="pantherId" />
                        <label htmlFor="fiuEmail"><h4>FIU Email:</h4></label>
                        <Input placeholder="FIU Email" type="email" id="fiuEmail" />
                        <label htmlFor="personalEmail"><h4>Personal Email:</h4></label>
                        <Input placeholder="Personal Email" type="email" id="personalEmail" />
                        <label htmlFor="gradSession"><h4>Grad Session:</h4></label>
                        <Input placeholder="Grad Session" type="text" id="gradSession" />
                        <label htmlFor="gradYear"><h4>Grad Year:</h4></label>
                        <Input placeholder="Grad Year" type="text" id="gradYear" />
                        <label htmlFor="phoneNumber"><h4>Phone Number:</h4></label>
                        <Input placeholder="Phone Number" type="text" id="phoneNumber" />
                    </form>
                </InputContainer>
            </div>
        <br/>
            <div>
                <SchoolStatues>
                    <h3>School Status</h3>
                </SchoolStatues>
                <ChooseMembership>
                    <h5>*Choose your type of membership</h5>
                </ChooseMembership>
                <SchoolstatusInputcontainer>
                    <Inputs value='Freshman' type='checkbox' id='frame1' /> Freshman
                    <Inputs value='Sophomore' type='checkbox' id='frame2' /> Sophomore
                    <Inputs value='Junior' type='checkbox' id='frame3' /> Junior
                    <Inputs value='Senior' type='checkbox' id='frame4' /> Senior
                    <Inputs value='Graduate Student' type='checkbox' id='frame5' /> Graduate Student
                </SchoolstatusInputcontainer>
            </div>
        <br/>
            <div>
                <center>
                <SubmitButton type="submit">Submit</SubmitButton>
                </center>
            </div>
        </container>
    )
}
export default MembershipForm 
