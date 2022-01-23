import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import "./register.css";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #1c192d6e;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 25px;
  background-color: white;
  border-radius: 15px;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
font-size: 25px;
font-weight: 350;
justify-content: center;
display: flex;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 13px;
    margin: 20px 5px;
`;

const Button = styled.button`
  width: 50%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: auto;
  border-radius: 26px;
`;

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <Container>
      <Wrapper>
      <Title className="registerTitle">Register</Title>
      <Form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <Input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <Input
          type="text"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <Input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
         <Agreement>
            By creating an account, I consent to the processing of my personal
             data in accordance with the <b>PRIVACY POLICY</b>
           </Agreement>
        <Button className="registerButton" type="submit">
          Register
        </Button>
      </Form>
        <Link className="link" to="/login"></Link>          
      {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
      </Wrapper>
      </Container>
    </div>
  );
}