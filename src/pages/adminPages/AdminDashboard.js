import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import Loader from "react-loader-spinner";
import { mobile } from "../../responsive";

const Maincontainer = styled.div`
  background-color: rgba(26, 32, 44, 255);
  height: 100vh;
  width: 100vw;
  color: white;
  ${mobile({
    width: "100vw",
  })}
`;

const Container = styled.div`
  margin: 0rem 8rem;
  ${mobile({
    margin: "0rem 0rem",
  })}
`;
const GridContainer = styled.div`
  height: 60vh;
  background: rgb(209, 209, 209);
`;

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  color: white;
  cursor: pointer;
  margin: 1rem;
  height: 100%;
  border-radius: 4px;
`;

const Header = styled.div`
  display: flex;
  /* margin: 2rem 0; */
  padding: 2rem 0px;
  width: 100%;
`;

const LoaderDiv = styled.div`
  margin-left: 13rem;
  background: rgba(26, 32, 44, 255);
  display: flex;
  justify-content: center;
  padding: 10rem 0px;
`;

const AddContainer = styled.div`
  width: 100%;
  text-align: right;
  height: 3rem;
  margin-right: 1rem;
`;

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      setLoading(false);

      const res = await axios.get(
        `https://node-referallink-backend.herokuapp.com/admin/get/all`
      );
      res.data = Object.values(res.data);

      let UsersList = [];
      for (let i = 1; i < res.data.length; i++) {
        if (res.data[i].name !== "admin") {
          UsersList.push(res.data[i]);
        }
      }
      setUsers(UsersList);

      setLoading(true);
    } catch {}
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      // setLoading(false);
      const res = await axios.delete(
        `https://node-referallink-backend.herokuapp.com/admin/delete/${id}`,
        {
          headers: {
            token: user.user.token,
          },
        }
      );
      console.log(res);
      getUsers();
      // setLoading(true);
    } catch {}
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "position",
      headerName: "Position",
      width: 130,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 110,
      renderCell: (params) => {
        return (
          <Link to={"/adminedit/" + params.row._id}>
            <Edit
              style={{
                color: "#4285F4",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            />
          </Link>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 120,
      renderCell: (params) => {
        return (
          <DeleteOutline
            onClick={() => handleDelete(params.row._id)}
            style={{ color: "red", cursor: "pointer", marginLeft: "20px" }}
          />
        );
      },
    },
  ];
  return (
    <>
      <Maincontainer>
        <Container>
          <Header>
            <div style={{ width: "20rem" }}>
              <h3>Users Details</h3>
            </div>
            <AddContainer>
              <Link to="admincreate">
                <Button className="bg-primary">Add new </Button>
              </Link>
            </AddContainer>
          </Header>

          {loading ? (
            <GridContainer>
              <DataGrid
                rows={users}
                disableSelectionOnClick
                columns={columns}
                getRowId={(row) => row._id}
                checkboxSelection
              />
            </GridContainer>
          ) : (
            <LoaderDiv>
              <Loader type="Bars" color="#00BFFF" height={30} width={30} />
            </LoaderDiv>
          )}
        </Container>
      </Maincontainer>
    </>
  );
}

export default AdminDashboard;
