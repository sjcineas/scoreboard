import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Container = styled.div`
    height: 40px;
    background-color: #1E1E24;
    color: white;
    padding-top: 10px;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    display:flex;
    width: 100%;
    justify-content: center;
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

const Announcement = () => {
  return (
    <Container>
      <NewLink to="/">
        SCOREBOARD
      </NewLink>
    </Container>
  )
}

export default Announcement
