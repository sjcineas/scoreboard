import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import Announcement from '../components/Announcement';


const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    background-color: #FFCF99;
`

const Banner =  styled.div`
  height: 60%;
  width: 100%;
  display: flex;
  background-color: #92140C;
  border-bottom: solid 10px;
  align-items: center;
  justify-content: center;
  
`
const BannerTitle = styled.div`
  color: #FFCF99;
  font-size: 80px;
`
const ButtonContainer = styled.div`
  padding-top: 50px;
  width: 100%;
  justify-content: center;
  display: flex;
`
const Button = styled.button`
  border-radius: 10%;
  color: #111D4A;
  padding: 20px;
  margin-left: 70px;
  margin-right: 70px;
  color: white;
  background-color: #1E1E24;
  border: none;

  &:hover {
    cursor: pointer;
  }
`
const Home = () => {
  return (
    
    <Container>
      <Announcement/>
      <Banner>
        <BannerTitle>
          Welcome to Scoreboard
        </BannerTitle>
      </Banner>
      <ButtonContainer>
        <Link to="/login">
          <Button className="signin">
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button className='checkpoints'>
            Check Points
          </Button>
        </Link>
        
      </ButtonContainer>
    </Container>
    

  )
}

export default Home
