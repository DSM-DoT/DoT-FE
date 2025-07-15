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
      <img src={DoT} style={{cursor:"pointer"}} onClick={handleStart}/>
      <MenuWapper>
        <Menu href="/scan">스캔하기</Menu>
        <Menu href="#">텍스트 변환</Menu>
      </MenuWapper>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #888888;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 58px;
`

const MenuWapper = styled.div`
  display: flex;
  gap: 11px;
  font-size: 18px;
  color: #6D6D6D;
`

const Menu = styled.a`
  cursor: pointer;
  font-weight: 400;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #000000;
  }
`;