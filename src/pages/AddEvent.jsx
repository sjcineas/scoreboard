import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios';
import NavBar from '../components/NavBar';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%; 
`;
const AddEventFormTitle = styled.div`
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
    margin: 0; 
    padding-left: 80px;
`;
const EventDetailTitle = styled.div`
    color: #92140C;
    margin-top: 50px; 
    width: 100%;
    text-align: center;
`;

const Input = styled.input`
    width: 100%;

`;
const TextArea = styled.textarea`
    width: auto;
    min-height: 50px;
    max-height: 300px; 
    resize: vertical; 
    overflow: auto;
    padding: 8px;
    font-size: 16px;
`;


const InputContainer = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;    
    align-items: center;
    width: 40%; 
    margin-left: auto; 
    margin-right: auto; 


`;
const FormItem = styled.div`
    display: block;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding-bottom: 20px;

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
const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    margin-bottom: 10px;
`;

const AddEvent = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [invalidIds, setInvalidIds] = useState([]);
    const [formData, setFormData] = useState({
        eventName: '',
        eventType: '',
        pointValue: 0,
        idList: ''
    });
    
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('token');
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.eventName || !formData.eventType || !formData.pointValue || !formData.idList) {
            setError('All fields are required.');
            return;
        }
        try {
            const API = process.env.REACT_APP_API_URL;
            const response = await axios.post(`${API}/addEvent/log/event`,
                formData,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const data = await response.data;
            if (Array.isArray(data.invalidPantherIds) && data.invalidPantherIds.length > 0) {
                const list = data.invalidPantherIds.map(obj => {
                    const [id, msg] = Object.entries(obj)[0];
                    return `${id}: ${msg}`;
                });
                setInvalidIds(list);
                setError('Some Panther IDs were invalid.');
                return;
            }

            setInvalidIds([]);
            setError('');
            alert('Successfully Added Event and Points');
        } catch (error) {
        setError('Network error. Please try again.');
        alert(error)
    }
};
    
    return (
        <Container>
            <NavBar/>
            <AddEventFormTitle>
                <ImageContainer>
                    <Image src="https://www.engr.ucr.edu/sites/default/files/styles/form_preview/public/nsbe_logo.png?itok=R-84CoI9" />
                </ImageContainer>
            <TitleContainer>
                <Title id='page_title'>Event Management</Title>
                <Subtitle id='page_subtitle'>N S B E  @  F I U</Subtitle>
            </TitleContainer>
        </AddEventFormTitle>
        <form onSubmit={handleSubmit} style={{ width: '100%', justifyContent: 'center' }}>
            <FormSection>
                <EventDetailTitle>
                    <h3 id='event_details_section_label'>Event Details</h3>
                </EventDetailTitle>
                <InputContainer>
                    <FormItem>
                        <label name="eventName"><h4>Event Name:</h4></label>
                        <Input
                            placeholder="Event Name"
                            type="text"
                            id="event_name"
                            name="eventName"
                            value={formData.eventName}
                            onChange={handleChange}
                        />
                    </FormItem>
                    <FormItem>
                        <label name="eventType"><h4>Event Type:</h4></label>
                        <select id="event_type" name="eventType" value={formData.eventType} onChange={handleChange}>
                            <option value="">Select Event Type</option>
                            <option id="_gbm" value="General Body Meeting">General Body Meeting</option>
                            <option id="_study_hall" value="Study Hall">Study Hall</option>
                            <option id="_social" value="Social">Social</option>
                            <option id="_collaboration" value="Student Organization Collaboration">Student Organization Collaboration</option>
                            <option id="_volunteer" value="Volunteer">Volunteer</option>
                            <option id="_signature" value="Signature">Signature</option>
                            <option id="_industry" value="Industry">Industry</option>
                        </select>

                    </FormItem>
                    <FormItem>
                        <label name="Point Value"><h4>Point Value:</h4></label>
                        <Input
                            placeholder=""
                            type="number"
                            id="point_value"
                            name="pointValue"
                            value={formData.pointValue}
                            onChange={handleChange}
                        />
                    </FormItem>
                    <FormItem>
                        <label id='attendee_id_list_label' name="Attendee ID List"><h4>Attendee ID List:</h4></label>
                        <TextArea
                            placeholder="Attendee ID List"
                            type="text"
                            id="id_list"
                            name="idList"
                            value={formData.idList}
                            onChange={handleChange}
                        />
                    </FormItem>
                    <FormItem>
                        <label name="Point Value"><h4>Point Value:</h4></label>
                        <Input
                            placeholder=""
                            type="number"
                            id="point_value"
                            name="pointValue"
                            value={formData.pointValue}
                            onChange={handleChange}
                        />
                    </FormItem>
                    <FormItem>
                        <label id='attendee_id_list_label' name="Attendee ID List"><h4>Attendee ID List:</h4></label>
                        <TextArea
                            placeholder="Attendee ID List"
                            type="text"
                            id="id_list"
                            name="idList"
                            value={formData.idList}
                            onChange={handleChange}
                        />
                    </FormItem>

                </InputContainer>
                <br />
                {error && (
                    <ErrorMessage id='general_error_message'>
                        {error}
                    </ErrorMessage>
                )}
                <br />
                {invalidIds.length > 0 && (
                    <ErrorMessage id='error_message'>
                        The following Panther IDs are invalid: {invalidIds.join(', ')}
                    </ErrorMessage>
                )}
                <SubmitButton type="submit">Submit</SubmitButton>
            </FormSection>
        </form>

    </Container>
)
}
export default AddEvent
