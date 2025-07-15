import styled from "styled-components";
import Logo from "../assets/DoT.svg";

export const Header = () => {
  return (
    <>
      <StartWrapper>
        <img src={Logo} />
        <Nav>
          <NavItem>스캔하기</NavItem>
          <NavItem>텍스트 변환</NavItem>
        </Nav>
      </StartWrapper>
    </>
  );
};

const StartWrapper = styled.div`
  top: 0;
  margin: 0;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  border: 1px solid #888888;
  background-color: #ffffff;
  z-index: 10;
  padding: 0 59px;
`;

const Nav = styled.nav`
  display: flex;
  width: 187px;
  height: 21px;
  gap: 11px;
`;

const NavItem = styled.div`
  text-align: center;
  width: 86px;
  color: #6d6d6d;
  cursor: pointer;
`;
