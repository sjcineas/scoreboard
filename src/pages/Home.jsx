import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import Announcement from '../components/Announcement';


const Container = styled.div`
    width: 100%;
    height: 100%;
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
  font-size: 60px;
  width: 100%;
  justify-content: center;
  text-align: center;
  display: flex;
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
  color: white;
  background-color: #1E1E24;
  border: none;
  &:hover {
    cursor: pointer;
  }
`
const ButtonBox = styled.div`
  margin-left: 70px;
  margin-right: 70px;
`
const Home = () => {
  return (
    
    <Container>
      <Announcement/>
      <Banner>
        <BannerTitle>
          Welcome <br/> to <br/> Scoreboard
        </BannerTitle>
      </Banner>
      <ButtonContainer>
        <ButtonBox>
          <Link to="/login">
            <Button className="signin">
              Login
            </Button>
          </Link>
        </ButtonBox>
        <ButtonBox>
          <Link to="/checkpoints">
            <Button className='checkpoints'>
              Check Points
            </Button>
        </Link>
        </ButtonBox>
        <Link to="/MembershipForm">
          <Button className='MembershipForm'>
            Membership Form
          </Button>
        </Link>
      </ButtonContainer>
    </Container>

  )
}

export default Home
