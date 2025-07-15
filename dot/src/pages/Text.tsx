import styled from "styled-components";
import arrow from "../assets/icons/down_arrow.svg";
import sound from "../assets/icons/sound.svg";
import copy from "../assets/icons/copy.svg";
import { Header } from "../components/comon/Header";
import { Title } from "../components/comon/Title";
import { useState, useEffect } from "react";
import { Linked } from "../components/comon/Linked";
import { useNavigate } from "react-router-dom";

const brailleMap = {
  // 소문자 a~z
  a: '\u2801', b: '\u2803', c: '\u2809', d: '\u2819', e: '\u2811',
  f: '\u280B', g: '\u281B', h: '\u2813', i: '\u280A', j: '\u281A',
  k: '\u2805', l: '\u2807', m: '\u280D', n: '\u281D', o: '\u2815',
  p: '\u280F', q: '\u281F', r: '\u2817', s: '\u280E', t: '\u281E',
  u: '\u2825', v: '\u2827', w: '\u283A', x: '\u282D', y: '\u283D', z: '\u2835',

  // 숫자 0~9
  1: '\u2801', 2: '\u2803', 3: '\u2809', 4: '\u2819', 5: '\u2811',
  6: '\u280B', 7: '\u281B', 8: '\u2813', 9: '\u280A', 0: '\u281A',

  // 문장 부호
  ' ': '\u2800',   // 공백
  '.': '\u2832',   // 온점 ⠲
  ',': '\u2802',   // 쉼표 ⠂
  '!': '\u2816',   // 느낌표 ⠖
  '?': '\u2826'    // 물음표 ⠦
};



export const Text = () => {
  const [text, setText] = useState("");
  const [braille, setBraille] = useState("");
  const navigate = useNavigate();

// 점자 변환 함수
const convertToBraille = (input: string): { braille: string; error: boolean } => {
  for (let char of input) {
    const lowerChar = char.toLowerCase();
    if (!brailleMap[lowerChar] && char !== "\n") {
      console.log(`❗ 등록되지 않은 문자: "${char}"`);
      return { braille: "", error: 1 }; // 오류 발견 즉시 반환
    }
  }
  // 오류 없으면 점자 변환
  const brailleStr = input
    .split("")
    .map((char) => brailleMap[char.toLowerCase()] || char)
    .join("");
  return { braille: brailleStr, error: 0 };
};

useEffect(() => {
  const { braille: brailleStr, error: hasError } = convertToBraille(text);
  setBraille(brailleStr);
  setError(hasError ? 1 : 0);
}, [text]);

const [error, setError] = useState(0);

// text가 바뀔 때마다 braille 자동 세팅


  const handleTextarea = (e) => {
    setText(e.target.value);
  }

  const handleSpeakText = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <>
      <Header />
      <Main>
        <Title title="텍스트를 점자로 변환" text="텍스트를 입력하여 점자를 시각화 하세요."/>
        <ScanWrapper>
          <Scandiv>
            <Textinput>
              <Inputtext>
                텍스트 쓰는 부분
                <img
                  src={sound}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={handleSpeakText}
                />
              </Inputtext>
              <TextInputField  placeholder="점자로 변환할 글자를 입력하세요(소문자 영어만)" value={text} onChange={handleTextarea}/>
            </Textinput>
            <ArrowText>
              아래는 점자를 시각화한 결과 입니다.
              <img src={arrow} style={{ width: '10px', height: '13.33px' }}/>
            </ArrowText>
            <Result $error={error}>
              <Inputtext $code={error}>텍스트를 점자로 시각화한 결과</Inputtext>
              <TextBox $code={error}>{error === 0 ? braille : "변환는 소문자 영어만 가능 합니다! (특수문자 x)"}</TextBox>
              <ButtonWrapper>
                  <img src="" style={{ cursor: 'pointer' }} />
                  <img src={error === 0 ? copy : "" } style={{ cursor: 'pointer' }} onClick={() => navigator.clipboard.writeText(braille)}/>
                </ButtonWrapper>
            </Result>
          </Scandiv>
          <Linked title="이미지나 스캔할레요" link="바로가기" onClick={() => navigate('/scan')}/>
        </ScanWrapper>
      </Main>
    </>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 713px;
  height: 534px;
  gap: 11px;
  justify-content: center;
`;

const ScanWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

const TextBox = styled.div<{$code?: number}>`
  color: ${props => props.$code ? '#FF3B30' : '#6D6D6D'};
  font-size: 14px;
  font-weight: 400;
  height: 108px;
  overflow-y: auto;
  line-height: 1.5;
  word-break: break-word;
`


const Scandiv = styled.div`
  display: flex;
  width: 713px;
  padding: 22px;
  flex-direction: column;
  align-items: center;
  gap: 19px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.10);
`;

const Textinput = styled.div`
  border-radius: 8px;
  width: 100%;
  height: 193px;
  padding: 11px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #F6F6F6;
`;

const Result = styled.div<{$error: number}>`
  border-radius: 8px;
  width: 100%;
  height: 193px;
  padding: 11px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #F6F6F6;
  border: ${props => props.$error ? '2px solid #FF3B30' : 'none'};
`;

const Inputtext = styled.h1<{$code?: number}>`
  display: flex;;
  font-weight: 700;
  font-size: 16px;
  line-height: 17px;
  color:${props => props.$code ? '#FF3B30' : '##00000'};
  align-items: center;
  outline: none;
  gap: 5px;
`;

const Inputdescription = styled.h2`
  /* Wow sans */

  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  /* 상자 높이와 동일 */

  color: #6d6d6d;

  /* 내부 오토레이아웃 */
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  margin-top: 5px;
  margin-left: 15px;
`;

const TextInputField = styled.textarea`
  box-sizing: border-box;
  border: none;
  width: 100%;
  height: 155px;
  font-weight: 400;
  font-size: 14px;
  color: #6d6d6d;
  background: #f6f6f6;
  resize: none;
  outline: none;
  overflow-y: auto;

`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ArrowText = styled.div`
  display: flex;
  gap: 11px;
  color: #6D6D6D;
  font-size: 14px;
  font-weight: 500;
`;