import React, { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import Logo from "../assets/icon.png";
import styled from "styled-components";
import { Context } from "../context/Context";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { mobile } from "../responsive";

const Image = styled.img`
  height: 50px;
`;

const BarNav = styled(Navbar)`
  color: #1919a5 !important;
  background: rgba(26, 32, 44, 255);
  width: 100vw;
  top: 0;
  padding: 15px 0px;
  border-bottom: 0.5px solid #d1d1d1;
  ${mobile({
    width: "100vw",
  })}
`;

const NavLink = styled.div`
  text-decoration: none;
  cursor: pointer;
`;

export default function TopNavbar() {
  const { user, dispatch } = useContext(Context);
  const history = useHistory();

  const handleClick = async () => {
    history.push("/");
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <BarNav>
      <Container>
        <Link to="/">
          <Image src={Logo} />
        </Link>

        <Nav
          className="ms-auto"
          style={{ fontWeight: "600", fontSize: "1.3rem" }}
        >
          {user.user ? (
            <div className="d-flex flex-row mr-3 text-light">
              <div>Hi, {user.user.name} </div>
              <div
                style={{ textDecoration: "none", cursor: "pointer" }}
                className="text-primary ms-3"
                onClick={handleClick}
              >
                Logout
              </div>
            </div>
          ) : (
            <>
              <Link className="text-decoration-none" to="/register">
                <NavLink className="text-primary">Register</NavLink>
              </Link>
              <Link className="ms-2 text-decoration-none" to="/login">
                <NavLink className="text-primary ">Login</NavLink>
              </Link>
            </>
          )}
        </Nav>
      </Container>
    </BarNav>
  );
}
