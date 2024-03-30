import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import Announcement from '../components/Announcement';
import { sampleData } from "../test-content/sampleData";

const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    background-color: #FFCF99;
`
const ContentBox = styled.div`
    margin-top: 150px;
    width: 100%;
    display: flex;
    flex-direction:column;
    align-items: center;
`
const ContentBox1 = styled.div`
    margin-top: 10px;
    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: black;
    color: white;
`
const DetailedContentBox = styled.div`
    width: 80%;
    display: flex;
    padding-top:20px;
    padding-bottom: 20px;
    border: solid  4px white;
`
const NameBox = styled.div`
    flex:1;
    text-align: center;
`
const IdBox = styled.div`
    flex:1;
    text-align: center;
`
const PointsBox = styled.div`
    flex:1;
    text-align: center;
`
const NameBox1 = styled.div`
    flex:1;
    text-align: center;
`
const IdBox1 = styled.div`
    flex:1;
    text-align: center;
`
const PointsBox1 = styled.div`
    flex:1;
    text-align: center;
`

const CheckPoints = () => {
  return (
    
    <Container>
        <Announcement/>
        <ContentBox>
            <ContentBox1>
                <NameBox1><h1> Name</h1></NameBox1>
                <IdBox1><h1>Id</h1></IdBox1>
                <PointsBox1><h1>Points</h1></PointsBox1>
            </ContentBox1>
            {sampleData.map((item) =>(
                <DetailedContentBox key={item.id}>
                        <NameBox>{item.name}</NameBox>
                        <IdBox>{item.id}</IdBox>
                        <PointsBox>{item.points}</PointsBox>
                </DetailedContentBox>
            )
            )}
        </ContentBox>
    </Container>
    

  )
}

export default CheckPoints
