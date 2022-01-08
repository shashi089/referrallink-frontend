import axios from "axios";
import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { Context } from "../../context/Context";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./UserHome.css";
import { mobile } from "../../responsive";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: rgba(26, 32, 44, 255);
  height: 100vh;
  width: 100vw;
  ${mobile({
    width: "100vw",
  })}
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  color: #0275d8;
  ${mobile({
    marginTop: "2rem",
  })}
`;

function UserHome() {
  const { user, dispatch } = useContext(Context);
  const history = useHistory();

  const referalLink = `https://referlink-mern.netlify.app/${user.user.createdAt}/${user.user.name}/${user.user.id}`;

  console.log(user);

  const handleSubmit = async () => {
    try {
      await axios.delete(
        `https://node-referallink-backend.herokuapp.com/users/delete/${user.user.id}`,
        { headers: { token: user.user.token } }
      );

      history.push("/register");
      localStorage.clear();
      dispatch({ type: "LOGOUT" });
    } catch {}
  };

  return (
    <MainContainer>
      <Container>
        {user.user ? (
          <div>
            <div>
              <div className="d-flex flex-column align-items-center">
                <h2>Hello, {user.user.name}</h2>
                <h2>Your Current Position is </h2>
                <h1 className="position">{user.user.position}</h1>
              </div>
              <p className="para text-center">
                (Share the below Link to Your friends to improve Your Position)
              </p>
              <div className="ref_div">
                <div className="mr-4">
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    value={referalLink}
                    readonly
                    className="Link mx-4"
                  />
                </div>
                <div className="button">
                  <button
                    className="Realbutton"
                    onClick={() => navigator.clipboard.writeText(referalLink)}
                  >
                    Copy Your Referal Link
                  </button>
                </div>
              </div>
            </div>
            <div className="my-3 button">
              <Link className="mx-3" to="/userviewall">
                <Button>View All User's Position</Button>
              </Link>
              <Link className="mx-3" to="/useredit">
                <Button>Edit Your Details</Button>
              </Link>
              <Button className="mx-3 bg-danger" onClick={handleSubmit}>
                Delete Your Account
              </Button>
            </div>
          </div>
        ) : (
          <h1 className="text-danger">Login to view this page</h1>
        )}
      </Container>
    </MainContainer>
  );
}

export default UserHome;
