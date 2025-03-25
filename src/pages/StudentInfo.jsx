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

const MessageContainer = styled.div`
    font-size: 20px;
    color: #333;
    text-align: center;
    padding: 20px;
    background-color: #f8d7da;
    border-radius: 5px;
    width: 100%;
`;

const StudentInfo = () => {
    const { pantherId } = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
        if (!pantherId) {
            console.error("No Panther ID found, stopping fetch.");
            return;
        }
        fetch(`http://localhost:3030/StudentInfo/${pantherId}`)
        .then((response) => response.json())
        .then((result) =>{
            if (result.data?.length === 0) {
                setData([]); 
            } else {
                setData(result.data);
            }        

        })
        .catch((error) => {
            console.error('Error fetching data: ', error);
        })
    }, [pantherId]);
    if (!data || data.length === 0) {
        return (
            <>
                <Announcement />
                <MessageContainer>No data found</MessageContainer>
            </>
        );
    }
    
    return(
        <Container>
            <Announcement/>
            <Banner>
                <BannerContainer>
                    <ImageContainer>
                        <Image src="https://www.engr.ucr.edu/sites/default/files/styles/form_preview/public/nsbe_logo.png?itok=R-84CoI9" />
                    </ImageContainer>
                    <PageTitle id='page_title'>
                        Student Information
                    </PageTitle>
                </BannerContainer>
            </Banner>
            <PageContent>
              <Table>
                        {data.map((item, index) => (
                            <Row key={index}>
                                <RowLabel>{item.eventName}</RowLabel>
                                <RowContent>{item.eventType}</RowContent>
                                <RowContent>Value: {item.eventValue}</RowContent>
                            </Row>
                        ))}
                    </Table>
            </PageContent>
        </Container>
    )
}
export default StudentInfo