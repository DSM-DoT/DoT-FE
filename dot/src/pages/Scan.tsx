import styled from "styled-components";
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
