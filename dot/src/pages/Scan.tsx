import styled from "styled-components";
import Down from "../assets/Vector.svg";
import sound from "../assets/sound.svg";
import copy from "../assets/tabler_copy.svg";
import { Header } from "../components/Header";

export const Scan = () => {
  return (
    <>
      <Header />
      <Main>
        <Scantitle>텍스트를 점자로 변환</Scantitle>
        <Scandescription>텍스트를 입력하여 점자를 시각화하세요</Scandescription>
        <Scandiv>
          <Textinput>
            <Inputtext>
              텍스트 쓰는 부분{" "}
              <img
                src={sound}
                style={{
                  marginLeft: "3px",
                  lineHeight: "17px",
                  cursor: "pointer",
                }}
              />
            </Inputtext>
            <TextInputField />
          </Textinput>

          <h1
            style={{
              color: "#6D6D6D",
              fontSize: "16px",
              display: "flex",
              margin: "auto",
            }}
          >
            아래는 텍스트를 점자로 시각화한 결과 입니다{" "}
            <img src={Down} style={{ marginLeft: "11px" }} />
          </h1>

          <Result>
            <Inputtext>텍스트를 점자로 시각화한 결과</Inputtext>
            <Inputdescription>시각화한 점자</Inputdescription>
            <img
              src={copy}
              style={{
                position: "absolute",
                bottom: "11px",
                right: "11px",
                cursor: "pointer",
              }}
            />
          </Result>
        </Scandiv>
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
`;

const Scantitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: black;
`;

const Scandescription = styled.h2`
  font-size: 17px;
  color: black;
  margin-bottom: 11px;
`;

const Scandiv = styled.div`
  /* Frame 14 */

  /* 오토레이아웃 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 22px;
  gap: 10px;
  isolation: isolate;

  width: 713px;
  height: 482px;

  background: #ffffff;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  /* 내부 오토레이아웃 */
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

const Textinput = styled.div`
  width: 669px;
  height: 193px;

  background: #f6f6f6;
  border-radius: 8px;

  /* 내부 오토레이아웃 */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const Result = styled.div`
  position: relative;
  width: 669px;
  height: 193px;

  background: #f6f6f6;
  border-radius: 8px;

  /* 내부 오토레이아웃 */
  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
`;

const Inputtext = styled.h1`
  display: flex;
  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
  margin-top: 17px;
  margin-left: 15px;
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
  width: 669px;
  height: 155px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #6d6d6d;
  background: #f6f6f6;
  resize: none;
  outline: none;
  padding: 5px 15px;
  overflow: hidden;
`;
