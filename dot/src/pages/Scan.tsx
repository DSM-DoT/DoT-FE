import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../components/comon/Header";
import { Title } from "../components/comon/Title";
import { Button } from "../components/comon/Button";
import { Error } from "../components/scan/Error";
import { FinalImage } from "../components/scan/FinalImage";
import { Linked } from "../components/comon/Linked";

import camera from "../assets/icons/camera.svg";
import upload from "../assets/icons/upload_img.svg";



export const Scan = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showCamera, setShowCamera] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [finalImage, setFinalImage] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const [error, setError] = useState(0);
  const navigate = useNavigate();

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
        setError(1);
        console.error("카메라 오류:", err);
      });

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, [showCamera]);

  // 파일 업로드 클릭 시
  const handleUploadFile = () => {
    setShowCamera(false);
    fileInputRef.current?.click();
    setError(0);
  };

  // 파일 선택 시
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

  // 스캔하기 눌렀을 때 (캡처 또는 업로드 이미지 finalImage 상태로 전환)
  const handleScan = () => {
    if (showCamera && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // 좌우 반전된 상태로 캡쳐
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL("image/png");
        setCapturedImage(imageDataUrl);
        setFinalImage(true);
        setShowCamera(false);
      }
    } else if (selectedImage) {
      // 업로드 이미지가 있을 경우 바로 finalImage 상태로
      setCapturedImage(selectedImage);
      setFinalImage(true);
    } else {
      setError(2);
    }
  };

  // finalImage 상태면 완전 다른 컴포넌트 보여주기
  if (finalImage && capturedImage) {
    return (
      <ScanWrapper>
        <Header />
        <ScanbarWrapper>
          <FinalImage
            image={capturedImage}
            onReset={() => {
              setFinalImage(false);
              setCapturedImage(null);
              setShowCamera(false);
              setSelectedImage(null);
            }}
          />
        </ScanbarWrapper>
      </ScanWrapper>
    );
  }

  return (
    <ScanWrapper>
      <Header />
      <ScanbarWrapper>
        <ScanbarContainer>
          <ScanbarGap>
            <Title
              title="이미지 스캔"
              text="이미지를 스캔하여 글자를 점자로 변환하세요."
            />

            <ScanbarContant>
              <ContantWrapper>
                <ImageWapper>
                  <TitleWrapper>
                    <Error code={error}/>
                    <ImageContainer $code={error}>
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
                  </TitleWrapper>
                  

                  <ButtonWrapper>
                    <img
                      src={camera}
                      alt="카메라"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedImage(null);
                        setShowCamera(true);
                        setError(0);
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
                <Button text="스캔하기" onClick={handleScan} />
              </ContantWrapper>
            </ScanbarContant>
            {/* 캔버스는 화면에 보이지 않게 숨겨둠 */}
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </ScanbarGap>
          <Linked title="텍스트만 변환하고 싶어요" link="바로가기" onClick={() => navigate('/text')} />
        </ScanbarContainer>
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

const ScanbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 29px;
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

const ImageContainer = styled.div<{$code: number}>`
  width: 200px;
  height: 200px;
  background-color: #d1d1d1;
  border: ${(props) => (props.$code !== 0 ? "2px solid red" : "none")};
  border-radius: 8px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
