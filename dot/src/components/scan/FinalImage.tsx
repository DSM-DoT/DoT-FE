import styled from "styled-components";
import arrow from "../../assets/icons/down_arrow.svg";
import leftArrow from "../../assets/icons/arrow.svg";
import copy from "../../assets/icons/copy.svg";
import sound from "../../assets/icons/sound.svg";
import { useEffect, useState } from "react";
import { Title } from "../comon/Title";

const brailleMap = {
  a: '\u2801', b: '\u2803', c: '\u2809', d: '\u2819', e: '\u2811',
  f: '\u280B', g: '\u281B', h: '\u2813', i: '\u280A', j: '\u281A',
  k: '\u2805', l: '\u2807', m: '\u280D', n: '\u281D', o: '\u2815',
  p: '\u280F', q: '\u281F', r: '\u2817', s: '\u280E', t: '\u281E',
  u: '\u2825', v: '\u2827', w: '\u283A', x: '\u282D', y: '\u283D', z: '\u2835',
  ' ': '\u2800', '.': '\u2832', ',': '\u2802', '!': '\u2816', '?': '\u2826'
};

type FinalComponentProps = {
  image: string;
  onReset: () => void;
  textLoad: string;
};

export const FinalImage: React.FC<FinalComponentProps> = ({ image, onReset, textLoad }) => {
  const [text, setText] = useState("");
  const [braille, setBraille] = useState("");

  const convertToBraille = (input: string): string => {
    return input
      .split("")
      .map(char => brailleMap[char.toLowerCase()] || char)
      .join("");
  };

  useEffect(() => {
    const filteredText = textLoad
      .split("")
      .filter((char) => brailleMap.hasOwnProperty(char.toLowerCase()))
      .join("");
    
    setText(filteredText);
    setBraille(convertToBraille(filteredText));
  }, [textLoad]);


  const handleSpeakText = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  return (
    <FinalWrapper>
      <FinalContent>
        <TitleWrapper>
          <PreviewImage src={image} alt="최종 이미지" />
          <Title
            title="이 이미지에서의 스캔한 결과"
            text="스캔한 결과를 아래와 같이 표시합니다."
          />
        </TitleWrapper>

        <TextContentWrapper>
          <TextContent>
            <ContentWrapper>
              <TitleContent>
                <TitleText>
                  이미지를 스캔한 결과 
                  <img src={sound} style={{cursor: 'pointer'}} onClick={handleSpeakText}/>
                </TitleText>
                <TextBox>{text ? text : `* 인식한 문자가 없습니다. *`}</TextBox>
              </TitleContent>
              <ButtonWrapper>
                <img src={leftArrow} style={{ cursor: 'pointer' }} onClick={onReset}/>
                <img src={copy} style={{ cursor: 'pointer' }} onClick={() => navigator.clipboard.writeText(text)}/>
              </ButtonWrapper>
            </ContentWrapper>
          </TextContent>

          <ArrowText>
            아래는 점자를 시각화한 결과 입니다.
            <img src={arrow} style={{ width: '10px', height: '13.33px' }}/>
          </ArrowText>

          <TextContent>
            <ContentWrapper>
              <TitleContent>
                <TitleText>스캔한 이미지에서 점자를 시각화한 결과</TitleText>
                <TextBox>{braille}</TextBox>
              </TitleContent>
              <ButtonWrapper>
                <div />
                <img src={copy} style={{ cursor: 'pointer' }} onClick={() => navigator.clipboard.writeText(braille)}/>
              </ButtonWrapper>
            </ContentWrapper>
          </TextContent>
        </TextContentWrapper>
      </FinalContent>
    </FinalWrapper>
  );
};


// 스타일 컴포넌트
const FinalWrapper = styled.div`
  display: flex;
  width: 713px;
  padding: 22px;
  flex-direction: column;
  gap: 10px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.10);
`;

const FinalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
`;

const TitleWrapper = styled.div`
  display: flex;
  gap: 14px;
`;

const PreviewImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  object-fit: cover;
  overflow: hidden;
`;

const TextContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 19px;
`;

const TextContent = styled.div`
  border-radius: 8px;
  width: 100%;
  height: 193px;
  padding: 11px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #F6F6F6;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const TitleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const TitleText = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;
  font-weight: 700;
  color: #000000;
`;

const TextBox = styled.div`
  color: #6d6d6d;
  font-size: 14px;
  font-weight: 400;
  height: 108px;
  overflow-y: auto;
  line-height: 1.5;
  word-break: break-word;
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
