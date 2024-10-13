import React from 'react'
import styled from 'styled-components'
import { Form, Link } from 'react-router-dom';
import Announcement from '../components/Announcement';

const Container = styled.div`
    display: flex;
    flex-direction: column ;
    align-items: center;
`;
const MembershipFormTitle = styled.div`
    width: 100%;
    background-color: #92140C;
    display: flex;
    align-items: center;
`;
const Image = styled.img`
    width: 100px;
    height: 100px;

`;
const ImageContainer = styled.div`
    padding:1%;
    width: 42%;
    justify-content: left;

`;
const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const Title = styled.h1`
    color: white;
`;

const FormSection = styled.div`
    width: 60%;
`;
const Subtitle = styled.p`
    color: white;
    margin: 0; /* Remove default margin */
    padding-left: 80px;
`;
const PersonalInformation = styled.div`
    color: #92140C;
    margin-top: 50px; 
    width: 80%;
`;

const FormItem = styled.div`
    width: 100%;
    display: block;
    padding-bottom: 20px;
`;

const Input = styled.input`
    margin-top: 10px;
    margin-left: 100;
    width: 80%;
`;

const InputContainer = styled.div`
    margin-top: 30px;
`;
const SchoolStatusTitle = styled.div`
    color: #92140C;
    margin-top: 20px; 
`;
const ChooseMembership = styled.div`
    color: black;
    margin-top: 10px; 
`;
const SchoolstatusInputcontainer = styled.div`
    margin-top: 10px;
    width: 80%;
    align-items: center;
`;
const CheckButtons = styled.input`
    margin-top: 10px;
    margin-bottom: 30px;
    margin-left: 18px;    
`;

const SubmitButton = styled.button`
    background-color: #92140C;
    color: white;
    padding: 10px 50px;
    margin-bottom: 20px;
    border: none;
    cursor: pointer;
    margin-top: 30px;
`;
const MembershipForm = () => {
    return (
        <Container>
            <Announcement/>
            <MembershipFormTitle>
                <ImageContainer>
                    <Image src="https://www.engr.ucr.edu/sites/default/files/styles/form_preview/public/nsbe_logo.png?itok=R-84CoI9" />
                </ImageContainer>
            <TitleContainer>
                <Title>Membership Form</Title>
                <Subtitle>N S B E  @  F I U</Subtitle>
            </TitleContainer>
            </MembershipFormTitle>
            <FormSection>
                <PersonalInformation>
                    <h3>Personal Information</h3>
                </PersonalInformation>
                <InputContainer>
                    <form>
                        <FormItem>
                            <label htmlFor="firstName"><h4>First Name:</h4></label>
                            <Input placeholder="First Name" type="text" id="firstName"/>
                        </FormItem>
                        <FormItem>
                            <label htmlFor="lastName"><h4>Last Name:</h4></label>
                            <Input placeholder="Last Name" type="text" id="lastName"/>
                        </FormItem>
                        <FormItem>
                            <label htmlFor="major"><h4>Major:</h4></label>
                            <Input placeholder="Major" type="text" id="major"/>
                        </FormItem>
                        <FormItem>
                            <label htmlFor="pantherId"><h4>Panther ID:</h4></label>
                            <Input placeholder="Panther ID" type="text" id="pantherId" />
                        </FormItem>
                        <FormItem>
                            <label htmlFor="fiuEmail"><h4>FIU Email:</h4></label>
                            <Input placeholder="FIU Email" type="email" id="fiuEmail" />
                        </FormItem>
                        <FormItem>
                            <label htmlFor="personalEmail"><h4>Personal Email:</h4></label>
                            <Input placeholder="Personal Email" type="email" id="personalEmail" />
                        </FormItem>
                        <FormItem>
                            <label htmlFor="gradSession"><h4>Grad Session:</h4></label>
                            <Input placeholder="Grad Session" type="text" id="gradSession" />
                        </FormItem>
                        <FormItem>
                            <label htmlFor="gradYear"><h4>Grad Year:</h4></label>
                            <Input placeholder="Grad Year" type="text" id="gradYear" />
                        </FormItem>
                        <FormItem>
                            <label htmlFor="phoneNumber"><h4>Phone Number:</h4></label>
                            <Input placeholder="Phone Number" type="text" id="phoneNumber" />
                        </FormItem>
                    </form>
                </InputContainer>
            </FormSection>
            <br/>
            <FormSection>
                <SchoolStatusTitle>
                    <h3>School Status</h3>
                </SchoolStatusTitle>
                <ChooseMembership>
                    <h5>*Choose your type of membership</h5>
                </ChooseMembership>
                <SchoolstatusInputcontainer>
                    <CheckButtons value='Freshman' type='checkbox' id='frame1' /> Freshman
                    <CheckButtons value='Sophomore' type='checkbox' id='frame2' /> Sophomore
                    <CheckButtons value='Junior' type='checkbox' id='frame3' /> Junior
                    <CheckButtons value='Senior' type='checkbox' id='frame4' /> Senior
                    <CheckButtons value='Graduate Student' type='checkbox' id='frame5' /> Graduate Student
                </SchoolstatusInputcontainer>
            </FormSection>
            <br/>
            <div>
                <center>
                <SubmitButton type="submit">Submit</SubmitButton>
                </center>
            </div>
        </Container>
    )
}
export default MembershipForm 
