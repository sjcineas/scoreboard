import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    position: absolute;
    background-color: #f8f8f8;
`;

const Banner = styled.div`
    height: 20%;
    width: 100%;
    display: flex;
    background-color: #92140C;
    align-items: center;
    justify-content: center;
`;

const BannerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 10%;
`;

const PageTitle = styled.div`
    font-size: 40px;
    text-align: center;
    color: white;
    font-weight: bold;
`;

const ButtonContainer = styled.div`
    margin: 40px auto;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ClearButton = styled.button`
    margin: 20px;
    padding: 16px 32px;
    font-size: 1.2em;
    background-color: #92140C;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
        background-color: #c23a1a;
    }
`;

const Message = styled.div`
    margin-top: 20px;
    font-size: 1.1em;
    color: #333;
`;

const AdminClearTables = () => {
    const [message, setMessage] = useState('');
    const API = process.env.REACT_APP_API_URL ; // fallback for local dev
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleClear = async (endpoint, tableName) => {
        if (window.confirm(`Are you sure you want to clear the ${tableName} table? This action cannot be undone.`)) {
            try {
                const res = await axios.delete(`${API}${endpoint}`);
                setMessage(res.data.message || `${tableName} table cleared!`);
            } catch (err) {
                setMessage(`Error clearing ${tableName} table.`);
            }
        }
    };

    return (
        <Container>
            <NavBar />
            <Banner>
                <BannerContainer>
                    <PageTitle>Admin: Clear Tables</PageTitle>
                </BannerContainer>
            </Banner>
            <ButtonContainer>
                <ClearButton onClick={() => handleClear('/membership/clear', 'Membership')}>
                    Clear Membership Table
                </ClearButton>
                <ClearButton onClick={() => handleClear('/events/clear', 'Events')}>
                    Clear Events Table
                </ClearButton>
                <ClearButton onClick={() => handleClear('/attendance/clear', 'Attendance')}>
                    Clear Attendance Table
                </ClearButton>
                {message && <Message>{message}</Message>}
            </ButtonContainer>
        </Container>
    );
};

export default AdminClearTables;