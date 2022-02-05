import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Logout } from "../redux/userRedux";
import { useDispatch } from "react-redux";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Button = styled.button`
  border-radius: 40px;
  padding: 10px;
  font-size: 13px;
  width: 89px;
  border: black;
  height: 37px;
  background-color: #f7e8e2;
  cursor: pointer;
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    // localStorage.removeItem("persist:root");
    localStorage.clear();
    e.preventDefault();
    dispatch(Logout());
    console.log("Logout triggered");
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            <Language>EN</Language>
            <SearchContainer>
              <Input placeholder="Search" />
              <Search style={{ color: "gray", fontSize: 16 }} />
            </SearchContainer>
          </Left>
          <Center>
            <Link to="/">
              <Logo>Ninja</Logo>
            </Link>
          </Center>
          <Right>
            {/* {localStorage.getItem("persist:root" || null) ? ( */}
            {currentUser ? (
              <Link to="/">
                <Button onClick={handleLogout}>LOGOUT</Button>{" "}
              </Link>
            ) : (
              <>
                {" "}
                <Link to="/register">
                  <Button> REGISTER </Button>
                </Link>
                <Link to="/login">
                  <Button>SIGN IN</Button>
                </Link>{" "}
              </>
            )}
            <Link to="/cart">
              <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </Link>
          </Right>
        </Wrapper>
      </Container>
    </>
  );
};

export default Navbar;
