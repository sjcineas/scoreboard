import React, { useEffect, useState} from 'react'
import Announcement from '../components/Announcement'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
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
const PageContent = styled.div`
    //height: 100%;
    //width: 100%;
    display: flex;
    justify-content: center;
    padding: 100px;

`
const Table = styled.div`
    height: 100%;
    width: 100%;
    display: block;
    background-color: #92140C;

`
const Row = styled.div`
    display:flex;
    justify-content: space-between;
    margin: 10px;
    //border-bottom: 1px solid #ddd;

    &:last-child {
        border-bottom: none;
    }
`;
const RowLabel = styled.div`
    width: 50%;
    font-weight: bold;
    padding: 10px;
    background-color: #f0f0f0;
`;
const RowContent = styled.div`
    width: 50%;
    padding: 10px;
    background-color: #ffffff;
`;
const StudentInfo = () => {
    const { pantherId } = useParams();
    const [data, setData] = useState(null);
    useEffect(() => {
        if (!pantherId) {
            console.error("No Panther ID found, stopping fetch.");
            return;
        }
        fetch(`http://localhost:3030/api/data/membership/${pantherId}`)
        .then((response) => response.json())
        .then((data) =>{
            const studentData = data.find((item) => item.pantherId === pantherId);
            setData(studentData); 
        })
        .catch((error) => {
            console.error('Error fetching data: ', error);
        })
    }, [pantherId]);
    if (!data) {
        return <div>Loading...</div>;
    }
    if (Object.keys(data).length === 0) {
        return <div>No student data found!</div>;
    }
    return(
        <Container>
            <Announcement/>
            <Banner>
                <BannerContainer>
                    <ImageContainer>
                        <Image src="https://www.engr.ucr.edu/sites/default/files/styles/form_preview/public/nsbe_logo.png?itok=R-84CoI9" />
                    </ImageContainer>
                    <PageTitle>
                        Student Information
                    </PageTitle>
                </BannerContainer>
            </Banner>
            <PageContent>
                <Table>
                    <Row> 
                        <RowLabel>FIRST NAME</RowLabel>
                        <RowContent> {data.firstName}</RowContent>
                    </Row>
                    <Row> 
                        <RowLabel>LAST NAME</RowLabel>
                        <RowContent> {data.lastName}</RowContent>
                    </Row>
                    <Row> 
                        <RowLabel>MAJOR</RowLabel>
                        <RowContent> {data.major}</RowContent>
                    </Row>
                    <Row> 
                        <RowLabel>PANTHER ID</RowLabel>
                        <RowContent> {data.pantherId}</RowContent>
                    </Row>
                    <Row> 
                        <RowLabel>GRADUATION SESSION</RowLabel>
                        <RowContent> {data.gradSession}</RowContent>
                    </Row>
                    <Row> 
                        <RowLabel>GRADUATION YEAR</RowLabel>
                        <RowContent> {data.gradYear}</RowContent>
                    </Row>
                    <Row> 
                        <RowLabel> SCHOOL STATUS</RowLabel>
                        <RowContent> {data.schoolStatus}</RowContent>
                    </Row>
                    <Row> 
                        <RowLabel>TOTAL POINTS</RowLabel>
                        <RowContent> {data.points}</RowContent>
                    </Row>
                </Table>
            </PageContent>
        </Container>
    )
}
export default StudentInfo