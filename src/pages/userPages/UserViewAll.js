import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import TopNavbar from "../../components/TopNavbar";
import "./UserHome.css";
import Loader from "react-loader-spinner";
import { mobile } from "../../responsive";

const Maincontainer = styled.div`
  background-color: rgba(26, 32, 44, 255);
  margin: px 0px;
  height: 100vh;
  width: 100vw;
  color: white;
  ${mobile({
    width: "100vw",
  })}
`;
const Container = styled.div`
  margin: 0rem 8rem;
  padding: 2rem 0;
  ${mobile({
    margin: "0rem 1rem",
  })}
`;
const GridContainer = styled.div`
  height: 60vh;
`;

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  color: white;
  cursor: pointer;
  height: 100%;
  border-radius: 4px;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
`;

const AddContainer = styled.div`
  width: 100%;
  text-align: right;
`;

function UserViewAll() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      setLoading(false);
      const res = await axios.get(
        `https://node-referallink-backend.herokuapp.com/users/get/all`
      );
      res.data = Object.values(res.data);

      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].name === "admin") {
          res.data.splice(i, 1);
        }
      }
      console.log(loading);
      setLoading(true);
      setUsers(res.data);
    } catch {}
  };

  useEffect(() => {
    getUsers();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
    },
    {
      field: "position",
      headerName: "Position",
      width: 150,
    },
  ];
  return (
    <>
      <TopNavbar />
      <div>
        <Maincontainer>
          {loading ? (
            <Container>
              <Header>
                <div style={{ width: "20rem" }}>
                  <h3>Users Details</h3>
                </div>

                <AddContainer>
                  <Link to="/userhome">
                    <Button className="bg-primary">Go Back</Button>
                  </Link>
                </AddContainer>
              </Header>
              <GridContainer>
                <DataGrid
                  rows={users}
                  disableSelectionOnClick
                  columns={columns}
                  getRowId={(row) => row._id}
                  checkboxSelection
                  className="dataGrid"
                />
              </GridContainer>
            </Container>
          ) : (
            <div
              style={{
                marginLeft: "13rem",
                // marginTop: "1rem",
                background: "rgba(26, 32, 44, 255)",
                display: "flex",
                justifyContent: "center",
                padding: "10rem 0px",
              }}
            >
              <Loader type="Bars" color="#00BFFF" height={30} width={30} />
            </div>
          )}
        </Maincontainer>
      </div>
    </>
  );
}

export default UserViewAll;
