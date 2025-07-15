import styled from "styled-components";
import { Header } from "../components/comon/Header";
import DoT from "../assets/logos/DoT.png";
import { Button } from "../components/comon/Button";
import { useNavigate } from "react-router-dom";

export const Start = () => {

  const navigate = useNavigate();

  const GoToScan = () => {
    navigate('/scan');
  }

  return (
    <Wrapper>
      <Header/>
      <StartWrapper>
        <StartLogo $img={DoT}/>
        <StartContent>
          <TextWrapper>
            <Text><Highlight>텍스트를</Highlight> 점자로</Text>
            <Text>점자를 <Highlight>시각화로</Highlight> </Text>
          </TextWrapper>
          <Button text="지금 점자 스캔하기" onClick={GoToScan}/>
        </StartContent>
      </StartWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
` 


const StartWrapper = styled.div`
flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 69px;
`;

const StartLogo = styled.div<{$img: string}>`
  width: 516px;
  height: 223px;
  background-image: url(${(props) => props.$img});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`

const StartContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Text = styled.div`
  color: #000;
  font-size: 50px;
  font-weight: 700;
`

const Highlight = styled.span`
  font-size: 50px;
  font-weight: 700;
  background: linear-gradient(91deg, #790699 -4.24%, #320699 12.91%, #3D64AC 57.21%, #28BFB2 91.84%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent; /* 비웹킷 계열 대비용 */
  display: inline;
`;


