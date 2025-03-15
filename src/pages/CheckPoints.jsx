import React, { useEffect, useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import Announcement from '../components/Announcement';
const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
`
const Banner =  styled.div`
    height: 20%;
    width: 100%;
    display: flex;
    background-color: #92140C;
    align-items: center;
    justify-content: center;
`
const BannerContainer =  styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 10%;
`
const PageTitle = styled.div`
    font-size: 50px;
    //font-family:
    text-align: center;
    padding-top: 20px;
    padding-bottom: 30px;
    width: 65%;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: left;
`
const Image = styled.img`
    width: 100px;
    height: 100px;

`
const ImageContainer = styled.div`
    padding:1%;
    width: 35%;
    justify-content: left;

`
const ContentBox = styled.div`
    margin-top: 50px;
    width: 100%;
    display: flex;
    flex-direction:column;
    align-items: center;
`
const TableLabels = styled.div`
    margin-top: 10px;
    padding-top:20px;
    padding-bottom: 20px;    
    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #1E1E24;
    color: white;
`
const DetailedContentBox = styled.div`
    width: 80%;
    background-color: ${props => props.odd ? '#9A6F6F' : '#fff'};
    display: flex;
    padding-top:20px;
    padding-bottom: 20px;

`
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease; /* Smooth transition for the hover effect */

    &:hover {
        font-size: 1.2em; /* Increase the font size */
        color: 9A6F6F; /* Change the color on hover */
    }
`;

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
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3030/data/membership')
        .then((response) => response.json())
        .then((data) =>{
            setData(data);
        })
        .catch((error) => {
            console.error('Error fetching data: ', error);
        })
    }, []);
    return (
    
    <Container>
        <Announcement/>
        <Banner>
            <BannerContainer>
                <ImageContainer>
                    <Image src="https://www.engr.ucr.edu/sites/default/files/styles/form_preview/public/nsbe_logo.png?itok=R-84CoI9" />
                </ImageContainer>
                <PageTitle>
                    Member Stat Sheet
                </PageTitle>
            </BannerContainer>
        </Banner>
        <ContentBox>
            <TableLabels>
                <NameBox1><h1> Name</h1></NameBox1>
                <IdBox1><h1>Id</h1></IdBox1>
                <PointsBox1><h1>Points</h1></PointsBox1>
            </TableLabels>
            {data.map((item, index) =>(
                <DetailedContentBox key={item.pantherId} odd={index % 2 === 1 ? "true" : undefined} >
                        <NameBox style={{ textDecoration: 'none', color: 'inherit' }}>
                            <StyledLink key={item.pantherId} to={`/StudentInfo/${item.pantherId}`} > 
                                {`${item.firstName} ${item.lastName}`}
                            </StyledLink>
                        </NameBox>
                        <IdBox>{item.pantherId}</IdBox>
                        <PointsBox>{item.points}</PointsBox>     
                </DetailedContentBox>
            )
            )}
        </ContentBox>
    </Container>
    

  )
}

export default CheckPoints
