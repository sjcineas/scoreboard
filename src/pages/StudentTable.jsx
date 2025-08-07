import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import NavBar from "../components/NavBar";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: #f7f7f7;
`;

const Banner = styled.div`
  height: 20%;
  width: 100%;
  background-color: #92140c;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BannerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 40px;
`;

const PageTitle = styled.h1`
  font-size: 40px;
  color: white;
  font-weight: bold;
  margin-left: 20px;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
`;

const TableContainer = styled.div`
  margin: 40px auto;
  width: 90%;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  overflow-x: auto; /* Enable horizontal scrolling */
  overflow-y: hidden; /* Prevent vertical scrolling */
  background-color: white; /* Ensure the background color covers the scrollable area */
  position: relative; /* Prevent clipping of child elements */
  max-width: fit-content; /* Ensure the container adjusts to the content width */
`;

const TableHeader = styled.div`
  display: flex;
  background-color: #1e1e24;
  color: white;
  font-weight: bold;
  padding: 12px 10px;
  width: max-content;
  white-space: nowrap;
`;

const HeaderCell = styled.div`
  flex: 1;
  text-align: left;
  padding: 0 10px;
  white-space: nowrap;
`;

const Row = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  padding: 12px 10px;
  background-color: ${(props) => (props.index % 2 === 0 ? "#fafafa" : "white")};
  flex-shrink: 0; /* Prevent rows from shrinking */
  width: max-content; /* Ensure rows span the full width of the scrollable area */
  white-space: nowrap; /* Prevent wrapping of row content */
`;

const Cell = styled.div`
  flex: 1;
  padding: 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: ${(props) => props.minWidth}px; /* Dynamically set column width */
  
`;

const Message = styled.div`
  text-align: center;
  font-size: 18px;
  margin: 40px 0;
  color: #92140c;
`;

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [columnWidths, setColumnWidths] = useState({});

  useEffect(() => {
    const API = process.env.REACT_APP_API_URL || "http://localhost:3000/";
    axios.get(`${API}/data/membership`)
      .then((res) => {
        setStudents(res.data);
        setLoading(false);
        calculateColumnWidths(res.data);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
        setError("Failed to load student data.");
        setLoading(false);
      });
  }, []);

  const calculateColumnWidths = (data) => {
    const widths = {};
    const keys = [
      "pantherId",
      "firstName",
      "lastName",
      "major",
      "fiuEmail",
      "personalEmail",
      "gradSession",
      "gradYear",
      "phoneNumber",
      "schoolStatus",
      "points",
    ];

    keys.forEach((key) => {
      widths[key] = Math.max(
        ...data.map((item) => item[key]?.length || 0),
        key.length
      ) * 12; // Approximate width per character
    });

    setColumnWidths(widths);
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <Message>Loading student data...</Message>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <Message>{error}</Message>
      </>
    );
  }

  if (!students.length) {
    return (
      <>
        <NavBar />
        <Message>No student data found.</Message>
      </>
    );
  }

  return (
    <Container>
      <NavBar />
      <Banner>
        <BannerContainer>
          <Image
            src="https://www.engr.ucr.edu/sites/default/files/styles/form_preview/public/nsbe_logo.png?itok=R-84CoI9"
            alt="NSBE Logo"
          />
          <PageTitle>Student Table</PageTitle>
        </BannerContainer>
      </Banner>
      <TableContainer>
        <TableHeader>
        <HeaderCell style={{ minWidth: columnWidths.pantherId }}>Panther ID</HeaderCell>
          <HeaderCell style={{ minWidth: columnWidths.firstName }}>First Name</HeaderCell>
          <HeaderCell style={{ minWidth: columnWidths.lastName }}>Last Name</HeaderCell>
          <HeaderCell style={{ minWidth: columnWidths.major }}>Major</HeaderCell>
          <HeaderCell style={{ minWidth: columnWidths.fiuEmail }}>FIU Email</HeaderCell>
          <HeaderCell style={{ minWidth: columnWidths.personalEmail }}>Personal Email</HeaderCell>
          <HeaderCell style={{ minWidth: columnWidths.gradSession }}>Grad Session</HeaderCell>
          <HeaderCell style={{ minWidth: columnWidths.gradYear }}>Grad Year</HeaderCell>
          <HeaderCell style={{ minWidth: columnWidths.phoneNumber }}>Phone Number</HeaderCell>
          <HeaderCell style={{ minWidth: columnWidths.schoolStatus }}>School Status</HeaderCell>
          <HeaderCell style={{ minWidth: columnWidths.points }}>Points</HeaderCell>
        </TableHeader>
        {students.map((student, index) => (
          <Row key={student.pantherId || index} index={index}>
            <Cell minWidth={columnWidths.pantherId}>{student.pantherId}</Cell>
            <Cell minWidth={columnWidths.firstName}>{student.firstName}</Cell>
            <Cell minWidth={columnWidths.lastName}>{student.lastName}</Cell>
            <Cell minWidth={columnWidths.major}>{student.major}</Cell>
            <Cell minWidth={columnWidths.fiuEmail}>{student.fiuEmail}</Cell>
            <Cell minWidth={columnWidths.personalEmail}>{student.personalEmail}</Cell>
            <Cell minWidth={columnWidths.gradSession}>{student.gradSession}</Cell>
            <Cell minWidth={columnWidths.gradYear}>{student.gradYear}</Cell>
            <Cell minWidth={columnWidths.phoneNumber}>{student.phoneNumber}</Cell>
            <Cell minWidth={columnWidths.schoolStatus}>{student.schoolStatus}</Cell>
            <Cell minWidth={columnWidths.points}>{student.points}</Cell>
          </Row>
        ))}
      </TableContainer>
    </Container>
  );
};

export default StudentTable;