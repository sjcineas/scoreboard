import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import NavBar from '../components/NavBar';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;   /* Full width for horizontal centering */
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
    justify-content: center;

`;
const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;

`;
const Title = styled.h1`
    color: white;
`;

const FormSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
`;
const Subtitle = styled.p`
    color: white;
    margin: 0; /* Remove default margin */
    padding-left: 80px;
`;
const PersonalInformation = styled.div`
    color: #92140C;
    margin-top: 50px; 
    width: 100%;
    text-align: center;
`;

const Input = styled.input`
    width: 100%;

`;

const InputContainer = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;    
    align-items: center;
    width: 40%; /* Set width to desired size */
    //max-width: 200px; /* Optional to limit size */
    margin-left: auto; /* Center it horizontally */
    margin-right: auto; /* Center it horizontally */


`;
const FormItem = styled.div`
    display: block;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding-bottom: 20px;

`;
const SchoolStatusTitle = styled.div`
    color: #92140C;
    margin-top: 20px;
    text-align: center; 
`;
const ChooseMembership = styled.div`
    color: black;
    margin-top: 10px; 
    text-align: center; 
`;
const SchoolStatusInputContainer = styled.div`
    display: flex;
    margin-top: 10px;
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
`;
const CheckButtons = styled.input`
    width: 100%;
    display: block;
    justify-content: center;    
`;

const SubmitButton = styled.button`
    background-color: #92140C;
    color: white;
    padding: 10px 50px;
    margin-bottom: 20px;
    border: none;
    cursor: pointer;
    margin-top: 30px;
    margin-left:auto;
    margin-right: auto;
`;
const MembershipForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        major: '',
        pantherId: '',
        fiuEmail: '',
        personalEmail: '',
        gradSession: '',
        gradYear: '',
        phoneNumber: '',
        schoolStatus: ''
    });

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value 
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const API = process.env.REACT_APP_API_URL;
            const response = await axios.post(`${API}/membershipform`, formData);
            alert(response.data.message);
        } catch (error) {
            if(error.response && error.response.data.error){
                alert(error.response.data.error)
            }else{
                console.error('Error submitting form:', error);
                alert('Failed to submit the form. \nError: ', error.response, '\nPlease try again.');
            }
        }
    };

    
    return (
        <Container>
            <NavBar/>
            <MembershipFormTitle>
                <ImageContainer>
                    <Image src="https://www.engr.ucr.edu/sites/default/files/styles/form_preview/public/nsbe_logo.png?itok=R-84CoI9" />
                </ImageContainer>
            <TitleContainer>
                <Title id = 'page_title'>Membership Form</Title>
                <Subtitle id='page_subtitle'>N S B E  @  F I U</Subtitle>
            </TitleContainer>
            </MembershipFormTitle>
            <form onSubmit={handleSubmit} style={{width:'100%', justifyContent: 'center'}}>
                <FormSection>
                    <PersonalInformation>
                        <h3 id = 'personal_info_section_title'>Personal Information</h3>
                    </PersonalInformation>
                    <InputContainer>
                        <FormItem>
                            <label id='first_name_label' name="firstName"><h4>First Name:</h4></label>
                            <Input placeholder="First Name" type="text" id="first_name_input" name="firstName"onChange={handleChange}/>
                        </FormItem>
                        <FormItem>
                            <label id="last_name_label" name="lastName"><h4>Last Name:</h4></label>
                            <Input placeholder="Last Name" type="text" id="last_name_input" name="lastName"onChange={handleChange}/>
                        </FormItem>
                        <FormItem>
                            <label id='major_label' name="major"><h4>Major:</h4></label>
                            <Input placeholder="Major" type="text" id="major_input" name="major" onChange={handleChange}/>
                        </FormItem>
                        <FormItem>
                            <label id='panther_id_label' name="pantherId"><h4>Panther ID:</h4></label>
                            <Input placeholder="Panther ID" type="text" id="panther_id_input" name="pantherId" onChange={handleChange}/>
                        </FormItem>
                        <FormItem>
                            <label id='fiu_email_label' name="fiuEmail"><h4>FIU Email:</h4></label>
                            <Input placeholder="FIU Email" type="email" id="fiu_email_input" name="fiuEmail" onChange={handleChange}/>
                        </FormItem>
                        <FormItem>
                            <label id="personal_email_label" name="personalEmail"><h4>Personal Email:</h4></label>
                            <Input placeholder="Personal Email" type="email" id="personal_email_input" name="personalEmail"  onChange={handleChange}/>
                        </FormItem>
                        <FormItem>
                            <label id="grad_session_label" name="gradSession"><h4>Grad Session:</h4></label>
                            <Input placeholder="Grad Session" type="text" id="grad_session_input" name="gradSession"onChange={handleChange}/>
                        </FormItem>
                        <FormItem>
                            <label id="grad_year_label" name="gradYear"><h4>Grad Year:</h4></label>
                            <Input placeholder="Grad Year" type="number" id="grad_year_input" name="gradYear" onChange={handleChange}/>
                        </FormItem>
                        <FormItem>
                            <label id="phone_number_label" name="phoneNumber"><h4>Phone Number:</h4></label>
                            <Input placeholder="Phone Number" type="text" id="phone_number_input" name="phoneNumber" onChange={handleChange}/>
                        </FormItem>
                    </InputContainer>
            
                    <br/>
                    <SchoolStatusTitle>
                        <h3 id='school_status_section_label' >School Status</h3>
                    </SchoolStatusTitle>
                    <ChooseMembership>
                        <h5 id='membership_type_label'>*Choose your type of membership</h5>
                    </ChooseMembership>
                    <SchoolStatusInputContainer>
                        <CheckButtons value="Freshman" type="radio" id="freshman_label" name="schoolStatus" onChange={handleChange}/> Freshman
                        <CheckButtons value="Sophomore" type="radio" id="sophomore_label" name="schoolStatus" onChange={handleChange} /> Sophomore
                        <CheckButtons value="Junior" type="radio" id="junior_label" name="schoolStatus" onChange={handleChange} /> Junior
                        <CheckButtons value="Senior" type="radio" id="senior_label" name="schoolStatus" onChange={handleChange}/> Senior
                        <CheckButtons value="Graduate Student" type="radio" id="grad_student_label" name="schoolStatus" onChange={handleChange}/> Graduate Student
                    </SchoolStatusInputContainer>
                    <br/>
                    <SubmitButton id='submit_form_label'type="submit">Submit</SubmitButton>
                </FormSection>
            </form>
                
        </Container>
    )
}
export default MembershipForm 
