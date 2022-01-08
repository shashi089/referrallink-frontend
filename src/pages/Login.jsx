import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import * as YUP from "yup";
import { Context } from "../context/Context";
import TopNavbar from "../components/TopNavbar";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import { mobile } from "../responsive";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(26, 32, 44, 255);
  height: 100vh;
  width: 100vw;
  ${mobile({
    width: "100vw",
  })}
`;

// schema
const schema = YUP.object().shape({
  email: YUP.string()
    .email("Please enter a valid Email")
    .required("Please enter your Email ID"),
  password: YUP.string()
    .min(4, "Password should be minimum 4 characters")
    .required("Please enter your Password"),
});

export default function Login() {
  const history = useHistory();
  const [dummy, setDummy] = useState(false);
  const [logRes, setLogRes] = useState(true);
  const { dispatch } = useContext(Context);
  const [loading, setLoading] = useState(false);

  const loginAccount = async (values) => {
    try {
      setLoading(true);
      dispatch({ type: "LOGIN_START" });
      const response = await axios.post(
        "https://node-referallink-backend.herokuapp.com/users/login",
        {
          email: values.email,
          password: values.password,
        }
      );
      console.log();
      console.log(response.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      setLogRes(false);
      setLoading(false);
      if (response.data.name === "admin") {
        history.push("/admin");
      } else {
        history.push("/userhome");
      }
    } catch (err) {
      console.log("login failed");
      dispatch({ type: "LOGIN_FAILURE" });
      setDummy(true);
    }
  };

  return (
    <MainContainer>
      <TopNavbar />
      {logRes ? (
        <div
          style={{
            background: "rgba(26, 32, 44, 255)",
          }}
        >
          <div className="d-flex justify-content-center">
            <Card
              style={{
                marginTop: "3%",
              }}
            >
              <Card.Header className="text-center">
                <h4>Login</h4>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={schema}
                  onSubmit={async (values) => {
                    await loginAccount(values);
                  }}
                >
                  {() => {
                    return (
                      <Form className="mb-3">
                        {/* email */}

                        <div className="mb-3">
                          <label>Email</label>
                          <Field
                            className="form-control"
                            type="text"
                            name="email"
                            component="input"
                          />
                          <div className="text-danger">
                            <ErrorMessage name="email" />
                          </div>
                        </div>

                        {/* password */}
                        <div>
                          <label>Password</label>
                          <Field
                            className="form-control"
                            type="password"
                            name="password"
                            component="input"
                          />
                          <div className="text-danger">
                            <ErrorMessage name="password" />
                          </div>
                        </div>
                        {loading && (
                          <div
                            style={{ marginLeft: "13rem", marginTop: "1rem" }}
                          >
                            <Loader
                              type="Bars"
                              color="#00BFFF"
                              height={30}
                              width={30}
                            />
                          </div>
                        )}
                        <div className="mt-3 d-flex justify-content-center">
                          <button type="submit" className="btn btn-primary">
                            Login
                          </button>
                        </div>
                        <div className="mt-3 d-flex justify-content-between">
                          <div>
                            <NavLink to="/register">New Here? Register</NavLink>
                          </div>
                        </div>
                        <div>
                          <div>
                            <h5
                              style={{ textAlign: "center", marginTop: "10px" }}
                            >
                              Admin Credentials
                            </h5>
                            <span>
                              <b> Admin Email : </b>admin@gmail.com
                            </span>
                            <br />
                            <span>
                              <b>Admin Password :</b> admin
                            </span>
                          </div>

                          <div>
                            <h5 style={{ textAlign: "center" }}>
                              User Credentials
                            </h5>
                            <p>
                              <span>
                                <b>User Email : </b>user1@gmail.com
                              </span>
                              <br />
                              <span>
                                <b>User Password : </b>user1
                              </span>
                            </p>
                          </div>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
                {dummy ? (
                  <div className="d-flex justify-content-center text-danger">
                    <h3>Email or Password is wrong</h3>
                  </div>
                ) : (
                  <div></div>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      ) : (
        history.push("/")
      )}
    </MainContainer>
  );
}
