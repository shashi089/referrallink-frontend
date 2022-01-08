import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as YUP from "yup";
import axios from "axios";
import styled from "styled-components";
import { Context } from "../../context/Context";
import { Link, useHistory } from "react-router-dom";
import TopNavbar from "../../components/TopNavbar";
import Loader from "react-loader-spinner";

const Maincontainer = styled.div`
  background-color: rgba(26, 32, 44, 255);
  color: white;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
`;
const Container = styled.div`
  padding: 40px 40px;
  background: rgb(209, 209, 209);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 6rem;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled(Field)`
  height: 2rem;
  margin: 1rem 0;
  width: 25rem;
  text-align: center;
  overflow: hidden;
`;

const Button = styled.button`
  border: none;
  padding: 8px;
  margin-bottom: 1rem;
  width: 12rem;
`;
const Error = styled.div`
  color: red;
  font-size: 0.8rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Label = styled.label`
  width: 100%;
  text-align: center;
  font-size: 1.3rem;
`;

function UserEdit() {
  const history = useHistory();
  const [loader, setLoader] = useState(false);

  const { user, dispatch } = useContext(Context);
  console.log(user);

  const signInSchema = YUP.object().shape({
    name: YUP.string().required("Please Enter User Name"),
    email: YUP.string()
      .email("Please Enter valid Email")
      .required("Please Enter Price"),
  });

  return (
    <>
      {" "}
      <TopNavbar />
      <div>
        <Maincontainer>
          <Container>
            <FormContainer>
              <div>
                {" "}
                <h3 style={{ marginBottom: "2rem" }}>Edit Product</h3>
              </div>
              <div>
                {" "}
                <Formik
                  initialValues={{
                    name: user.user.name,
                    position: user.user.position,
                    email: user.user.email,
                  }}
                  validationSchema={signInSchema}
                  onSubmit={async (values, { resetForm }) => {
                    setLoader(true);
                    console.log(values);
                    try {
                      const res = await axios.put(
                        `https://node-referallink-backend.herokuapp.com/users/update/${user.user.id}`,
                        values,
                        {
                          headers: {
                            token: user.user.token,
                          },
                        }
                      );

                      console.log(res);
                      history.push("/login");
                      localStorage.clear();
                      dispatch({ type: "LOGOUT" });
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                >
                  {() => {
                    return (
                      <Form>
                        <InputDiv className="form-group ">
                          <Label> User Name</Label>
                          <Input
                            type="text"
                            placeholder="User Name"
                            className="form-control"
                            id="name"
                            name="name"
                            //   value={user.name}
                          />
                          <Error>
                            <ErrorMessage name="name" />
                          </Error>
                        </InputDiv>

                        <InputDiv className="form-group ">
                          <Label> User Email</Label>
                          <Input
                            type="text"
                            placeholder="Email"
                            className="form-control"
                            id="email"
                            name="email"
                          />
                          <Error>
                            <ErrorMessage name="email" />
                          </Error>
                        </InputDiv>
                        {loader && (
                          <div
                            style={{
                              marginBottom: "10px",
                              display: "flex",
                              justifyContent: "center",
                              padding: "5px",
                            }}
                          >
                            <Loader
                              type="Bars"
                              color="#00BFFF"
                              height={30}
                              width={30}
                            />
                          </div>
                        )}
                        <div className="text-center">
                          <Button type="submit">Update</Button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
                <Link to="/userhome">
                  <button>Go Back</button>
                </Link>
              </div>
            </FormContainer>
          </Container>
        </Maincontainer>
      </div>
    </>
  );
}

export default UserEdit;
