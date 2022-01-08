import axios from "axios";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as YUP from "yup";
import { Link } from "react-router-dom";
import TopNavbar from "../../components/TopNavbar";
import { Context } from "../../context/Context";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import { mobile } from "../../responsive";

const Container = styled.div`
  background-color: rgba(26, 32, 44, 255);
  color: white;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  ${mobile({
    width: "100vw",
  })}
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mobile({
    width: "80vw",
  })}
`;

const Input = styled(Field)`
  height: 2rem;
  margin: 5px 0;
  width: 25rem;
  text-align: center;
  overflow: hidden;
  ${mobile({
    width: "80vw",
  })}
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
  padding: 40px 40px;
  background: rgb(209, 209, 209);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
`;

const Label = styled.label`
  width: 100%;
  /* text-align: center; */
  /* font-size: 1.3rem; */
`;

function AdminEdit2() {
  const { user } = useContext(Context);
  const [userFetched, setUser] = useState({});
  const params = useParams();
  const history = useHistory();
  const [loader, setLoader] = useState(false);

  const signInSchema = YUP.object().shape({
    name: YUP.string().required("Please Enter User Name"),
    position: YUP.number().required("Please Position Number"),
    email: YUP.string()
      .email("Please Enter valid Email")
      .required("Please Enter Price"),
  });

  const getUser = async () => {
    try {
      const res = await axios.get(
        `https://node-referallink-backend.herokuapp.com/admin/get/${params.id}`
      );
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  /* eslint-disable react-hooks/exhaustive-deps */

  useEffect(() => {
    getUser();
  }, []);

  if (!userFetched.name) return [];

  console.log(userFetched);
  console.log(userFetched.name);
  console.log(userFetched.email);
  console.log(userFetched.position);
  return (
    <>
      <TopNavbar />
      <div>
        <Container>
          <FormContainer>
            <div>
              <h3>Edit User</h3>
            </div>
            <div style={{ marginTop: "2rem" }}>
              <Formik
                initialValues={{
                  name: userFetched.name,
                  position: userFetched.position,
                  email: userFetched.email,
                }}
                validationSchema={signInSchema}
                onSubmit={async (values, { resetForm }) => {
                  setLoader(true);

                  console.log(values);
                  try {
                    const res = await axios.put(
                      `https://node-referallink-backend.herokuapp.com/admin/update/${params.id}`,
                      values,
                      {
                        headers: {
                          token: user.user.token,
                        },
                      }
                    );
                    console.log(res);
                    setLoader(false);
                    history.push("/admin");
                    console.log(values);
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
                          //   value={userFetched.name}
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

                      <InputDiv className="form-group ">
                        <Label> Position</Label>
                        <Input
                          type="number"
                          placeholder="Position"
                          className="form-control"
                          id="position"
                          name="position"
                        />
                        <Error>
                          <ErrorMessage name="position" />
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

                      <div className="text-center mt-3">
                        <Button type="submit">Update</Button>
                      </div>

                      <div>
                        <Link to="/admin">
                          <Button>Go Back</Button>
                        </Link>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </FormContainer>
        </Container>
      </div>
    </>
  );
}

export default AdminEdit2;
