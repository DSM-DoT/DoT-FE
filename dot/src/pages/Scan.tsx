import styled from "styled-components";
<<<<<<< HEAD
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
=======
import { useState, useEffect, useRef } from "react";

import { Header } from "../components/comon/Header";
import { Title } from "../components/comon/Title";
import { Button } from "../components/comon/Button";

import camera from "../assets/icons/camera.svg";
import upload from "../assets/icons/upload_img.svg";

export const Scan = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showCamera, setShowCamera] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 카메라 스트림 처리
  useEffect(() => {
    if (!showCamera) return;

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("카메라 오류:", err);
      });

    // 언마운트 시 카메라 종료
    return () => {
      if (!showCamera && videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, [showCamera]);

  // 파일 업로드 버튼 눌렀을 때
  const handleUploadFile = () => {
    setShowCamera(false);
    fileInputRef.current?.click();
  };

  // 파일이 선택되었을 때
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ScanWrapper>
      <Header />
      <ScanbarWrapper>
        <ScanbarGap>
          <Title
            title="이미지 스캔"
            text="이미지를 스캔하여 글자를 점자로 변환하세요."
          />

          <ScanbarContant>
            <ContantWrapper>
              <ImageWapper>
                <ImageContainer>
                  {showCamera && (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                        transform: "scaleX(-1)", // 좌우 반전
                      }}
                    />
                  )}

                  {!showCamera && selectedImage && (
                    <img
                      src={selectedImage}
                      alt="업로드된 이미지"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                </ImageContainer>

                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />

                <ButtonWrapper>
                  <img
                    src={camera}
                    alt="카메라"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedImage(null);
                      setShowCamera(true);
                    }}
                  />
                  <img
                    src={upload}
                    alt="업로드"
                    style={{ cursor: "pointer" }}
                    onClick={handleUploadFile}
                  />
                </ButtonWrapper>
              </ImageWapper>

              <Button text="스캔하기" />
            </ContantWrapper>
          </ScanbarContant>
        </ScanbarGap>
      </ScanbarWrapper>
    </ScanWrapper>
  );
};


const ScanWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ScanbarWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScanbarGap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
`;

const ScanbarContant = styled.div`
  display: flex;
  height: 350px;
  width: 350px;
  border-radius: 8px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #ffffff;
  box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  background-color: #d1d1d1;
  border-radius: 8px;
  overflow: hidden;
`;

const ContantWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 19px;
`;

const ImageWapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 2px;
`;
>>>>>>> origin/scan
