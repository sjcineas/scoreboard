import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FeedIcon from '@mui/icons-material/Feed';

const Container = styled.div`
    height: 50px;
    background-color: #1E1E24;
    color: white;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    display: flex;
    width: 100%;
    align-items: center;
`;

const LeftContainer = styled.div`
    height: 100%;
    background-color: #1E1E24;
    color: white;
    padding-left: 2%;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    display: flex;
    width: 55%;
    justify-content: right;
    align-items: center;
`;

const RightContainer = styled.div`
    height: 100%;
    background-color: #1E1E24;
    color: white;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    display: flex;
    width: 45%;
    justify-content: right;
    align-items: center;
    position: relative; /* Added for dropdown positioning */
`;

const NewLink = styled(Link)`
    color: white;
    &:visited{
      text-decoration:none;
    }
    &:link { text-decoration: none; }
    &:visited { text-decoration: none; }
    &:hover { text-decoration: none; }
    &:active { text-decoration: none; }
`;

const Icon = styled.div`
    padding-left: 3%;
    padding-right: 3%;
`;

const IconLink = styled(Link)`
    color: white;
`;

const Dropdown = styled.div`
    display: ${({ open }) => (open ? 'block' : 'none')}; /* Ensure display toggles based on state */
    position: absolute;
    top: 50px; /* Adjust top position */
    right: 0;
    background-color: #1E1E24;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1000; /* Ensure dropdown is above other elements */
    min-width: 160px;
`;

const DropdownItem = styled(Link)`
    color: white;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    &:hover {
        background-color: #333;
    }
`;

const Announcement = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
        console.log('Dropdown state:', !dropdownOpen); // Debugging state change
    };

    return (
        <Container>
            <LeftContainer>
                <NewLink to="/">SCOREBOARD</NewLink>
            </LeftContainer>
            <RightContainer>
                <Icon>
                  <IconLink to="/membershipform">
                    <FeedIcon id="FeedIcon" style={{ paddingLeft: '3%', paddingRight: '3%' }} />
                  </IconLink>
                </Icon>
                <Icon onClick={toggleDropdown}>
                    <AccountBoxIcon id="AccountBoxIcon" style={{ cursor: 'pointer' }} />
                </Icon>
                <Dropdown open={dropdownOpen}>
                    <DropdownItem to="/register">Register</DropdownItem>
                    <DropdownItem to="/login">Login</DropdownItem>
                    <DropdownItem to="/signout">Sign Out</DropdownItem>
                </Dropdown>
            </RightContainer>
        </Container>
    );
};

export default Announcement;
