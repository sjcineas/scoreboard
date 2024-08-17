import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FeedIcon from '@mui/icons-material/Feed';

const Container = styled.div`
    height: 50px;
    background-color: #1E1E24;
    color: white;
    //padding-top: 10px;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    display:flex;
    width: 100%;
    align-items: center;
    //justify-content: center;
`
const LeftContainer = styled.div`
    height: 100%;
    background-color: #1E1E24;
    color: white;
    padding-left: 2%;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    display:flex;
    width: 55%;
    justify-content: right;
    align-items: center;

`
const RightContainer = styled.div`
    height: 100%;
    background-color: #1E1E24;
    color: white;
    //padding-right: 2%;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    display:flex;
    width: 45%;
    justify-content: right;
    align-items: center;
`
const NewLink = styled(Link)`
    color: white;
    &:visited{
      text-decoration:none;
    }
    &:link { text-decoration: none; }
    &:visited { text-decoration: none; }
    &:hover { text-decoration: none; }
    &:active { text-decoration: none; }
`

const Icon = styled.div`
    padding-left: 3%;
    padding-right: 3%;
`

const Announcement = () => {
  return (
    <Container>
      <LeftContainer>
      <NewLink to="/">SCOREBOARD</NewLink>
      </LeftContainer>
      <RightContainer>
        <FeedIcon id="FeedIcon" style={{ paddingLeft: '3%', paddingRight: '3%' }} />
        <AccountBoxIcon id="AccountBoxIcon" style={{ paddingLeft: '3%', paddingRight: '3%' }}/>
      </RightContainer>
    </Container>
  )
}
export default Announcement
