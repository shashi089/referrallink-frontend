import axios from "axios";
import { ErrorMessage, Field, Formik, Form } from "formik";
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as YUP from "yup";
import "./css/Register.css";
import { useState } from "react";
import TopNavbar from "../components/TopNavbar";
import { useParams } from "react-router-dom";
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

const schema = YUP.object().shape({
  name: YUP.string().required("Please enter Name"),
  email: YUP.string().email().required("Please Enter your Email"),
  password: YUP.string()
    .min(4, "Password should be atlease 4 characters")
    .required("Enter Password"),
  confirm_password: YUP.string()
    .required()
    .oneOf([YUP.ref("password"), null], "Password Should Match"),
});

export default function Register() {
  const [info, setInfo] = useState("");
  const params = useParams();
  const [loading, setLoading] = useState(false);

  console.log(Object.keys(params).length);
  console.log(params);
  let paramsName;
  if (Object.keys(params).length === 3) {
    paramsName = params.name;
    paramsName = paramsName.split(" ").join("");
  }

  const createAccount = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://node-referallink-backend.herokuapp.com/users/register",
        {
          name: values.name,
          email: values.email,
          password: values.password,
        }
      );
      console.log(response);
      setInfo(
        "User Registered Successfully. Please Login with Your Email and Password"
      );
      setLoading(false);
    } catch (err) {
      console.log(err);
      setInfo("Email already exists");
      setLoading(false);
    }
  };

  const createAccountWithReferalLink = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://node-referallink-backend.herokuapp.com/users/login/${params.time}/${paramsName}/${params.id}`,
        {
          name: values.name,
          email: values.email,
          password: values.password,
        }
      );
      console.log(response);
      setInfo(
        "User Registered Successfully. Please Login with Your Email and Password"
      );
      setLoading(false);
    } catch (err) {
      console.log(err);
      setInfo("Email already exists");
      setLoading(false);
    }
  };

  return (
    <MainContainer>
      <TopNavbar />
      <div
        style={{
          height: "100vh",
          background: "rgba(26, 32, 44, 255)",
        }}
      >
        <div className="card-container d-flex justify-content-center">
          <Card
            style={{
              marginTop: "3%",
            }}
          >
            <Card.Header className="text-center">
              <h4>Create Account</h4>
            </Card.Header>
            <Card.Body>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  confirm_password: "",
                }}
                validationSchema={schema}
                onSubmit={(values, { resetForm }) => {
                  if (Object.keys(params).length === 3) {
                    createAccountWithReferalLink(values);
                  } else if (Object.keys(params).length === 0) {
                    createAccount(values);
                  }

                  resetForm();
                }}
              >
                {() => {
                  return (
                    <Form className="d-flex flex-column">
                      {/* name */}
                      <div className="mb-3">
                        <label>Name</label>
                        <Field
                          className="form-control"
                          type="text"
                          name="name"
                          component="input"
                        />
                        <div className="text-danger">
                          <ErrorMessage name="name" />
                        </div>
                      </div>

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
                      <div className="mb-3">
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

                      {/* confirm password */}
                      <div className="mb-3">
                        <label>Confirm Password</label>
                        <Field
                          className="form-control"
                          type="password"
                          name="confirm_password"
                          component="input"
                        />
                        <div className="text-danger">
                          <ErrorMessage name="confirm_password" />
                        </div>
                      </div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {loading && (
                          <>
                            <Loader
                              type="Bars"
                              color="#00BFFF"
                              height={30}
                              width={30}
                            />
                          </>
                        )}
                      </div>
                      <div className="mt-2 d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                        <Link to="/login">Go to Login</Link>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
              <div className="mt-3 text-center text-success">
                <p>{info}</p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </MainContainer>
  );
}
