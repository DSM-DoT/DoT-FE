import styled from "styled-components";
import DoT from '../../assets/logos/DoT.svg';
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/');
  }
  return (
    <HeaderWrapper>
      <img src={DoT} onClick={handleStart} style={{ cursor:'pointer'}}/>
      <MenuWrapper>
        <Menu href="/scan">스캔하기</Menu>
        <Menu href="/text">텍스트 변환</Menu>
        <Menu href="/quiz">퀴즈 풀기</Menu>
      </MenuWrapper>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  width: 100%;
  height: 60px;
  padding: 0 58px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-bottom: 1px solid #888888;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
`;

const MenuWrapper = styled.div`
  display: flex;
  gap: 20px;
  font-size: 18px;
  color: #6D6D6D;
`;

const Menu = styled.a`
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  font-weight: 400;
  text-decoration: none;
  color: #6D6D6D;
  transition: all 0.3s ease;

  &:hover {
    color: #000000;
  }
`;
