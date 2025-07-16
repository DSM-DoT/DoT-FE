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

const apiKey = import.meta.env.VITE_AI_API_KEY;
console.log("API 키:", import.meta.env.VITE_AI_API_KEY);


export const Scan = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showCamera, setShowCamera] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [finalImage, setFinalImage] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [ocrText, setOcrText] = useState<string>("");

  const [error, setError] = useState(0);
  const navigate = useNavigate();

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

  const handleUploadFile = () => {
    setShowCamera(false);
    fileInputRef.current?.click();
    setError(0);
  };

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

  const handleScan = () => {
    if (showCamera && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL("image/png");
        console.log("캡처된 이미지 데이터 URL:", imageDataUrl); // 여기 추가
        setCapturedImage(imageDataUrl);
        setFinalImage(true);
        setShowCamera(false);
        const base64 = imageDataUrl.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
        runOCR(base64);
      }
    } else if (selectedImage) {
      console.log("선택된 업로드 이미지:", selectedImage); // 여기 추가
      setCapturedImage(selectedImage);
      setFinalImage(true);
      const base64 = selectedImage.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
      runOCR(base64);
    } else {
      setError(2);
    }
  };

  const runOCR = async (base64: string) => {
    
    console.log("OCR 요청 전송, base64 길이:", base64.length); // 요청 직전 로그

    try {
      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requests: [
              {
                image: { content: base64 },
                features: [{ type: "TEXT_DETECTION" }],
              },
            ],
          }),
        }
      );

      const result = await response.json();
      console.log("OCR 응답 결과:", result); // 응답 확인용 로그

      const text = result.responses?.[0]?.fullTextAnnotation?.text || "";
      console.log("인식된 텍스트:", text); // 텍스트 유무 체크용
      setOcrText(text);
    } catch (err) {
      console.error("OCR 실패:", err);
    }
  };

  if (finalImage && capturedImage) {
    return (
      <ScanWrapper>
        <Header />
        <ScanbarWrapper>
          <FinalImage
            image={capturedImage}
            textLoad={ocrText}
            onReset={() => {
              setFinalImage(false);
              setCapturedImage(null);
              setShowCamera(false);
              setSelectedImage(null);
              setOcrText("");
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
                    <Error code={error} />
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
                            // transform: "scaleX(-1)",
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
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </ScanbarGap>
          <Linked
            title="텍스트만 변환하고 싶어요"
            link="바로가기"
            onClick={() => navigate("/text")}
          />
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
  overflow: hidden;
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
