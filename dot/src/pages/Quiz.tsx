import { useState, useEffect } from "react";
import styled from "styled-components";
import { Header } from "../components/comon/Header";
import { Title } from "../components/comon/Title";
import bg from "../assets/decorations/quiz_bg.svg";
import { CountButton } from "../components/quiz/CountButton";

export const Quiz = () => {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const [nowQuiz, setNowQuiz] = useState(0);
  const [quizCount, setQuizCount] = useState(10);
  if(nowQuiz === 1){
    return (
      <></>
    )

  }else if (nowQuiz === 2){
    return (
      <QuizWrapper>
        <Header/>
      </QuizWrapper>
    )
  }

  return (
    <QuizWrapper>
      <Header/>
      <QuizSettingWrapper>
        <QuizeSettingTitleWrapper>
          <Title title="퀴즈 풀기" text="점자의 역사와 재미있는 사실들을 관한 퀴즈를 풀어보새요!"/>
          <QuizSettingBarContainer>
            <ImageWrapper>
              <ImageContent src={bg} alt="퀴즈 배경">
              </ImageContent>
            </ImageWrapper>
            <ButtonTitleWrapper>
              문제 수
              <ButtonWrapper>
                <CountButton title={5} nowCount={quizCount} onClick={() => setQuizCount(5)}/>
                <CountButton title={10} nowCount={quizCount} onClick={() => setQuizCount(10)}/>
                <CountButton title={15} nowCount={quizCount} onClick={() => setQuizCount(15)}/>
              </ButtonWrapper>
            </ButtonTitleWrapper>
          </QuizSettingBarContainer>
        </QuizeSettingTitleWrapper>
      </QuizSettingWrapper>
    </QuizWrapper>
  )
}

const QuizWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const QuizSettingWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QuizeSettingTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
`

const QuizSettingBarContainer = styled.div`
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
`

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`

const ImageContent = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 8px;
  /* background-image: url(${(props) => props.$bg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center; */
`;

const ButtonTitleWrapper = styled.div`
  display: flex;
  font-size: 14px;
  color: #6D6D6D;
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`