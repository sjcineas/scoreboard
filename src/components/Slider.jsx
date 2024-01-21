import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: absolute;
    background-color: red;
`

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${props=> props.direction === "left" && "10px" };
    right: ${props=> props.direction === "right" && "10px" };
    margin: auto;
    align-items: center;
    justify-content: center;
    cursor:pointer;
    opacity: 0.80;
`

const Slider = () => {
  return (
    <Container>
        <Arrow direction="left">
            <ArrowLeftOutlined/>
        </Arrow>
        <Arrow direction="right">
            <ArrowRightOutlined/>
        </Arrow>
    </Container>
  )
}

export default Slider
