import { useState, useEffect } from "react";
import styled from "styled-components";
import { Header } from "../components/comon/Header";
import { Title } from "../components/comon/Title";
import bg from "../assets/decorations/quiz_bg.svg";
import { CountButton } from "../components/quiz/CountButton";
import { Button } from "../components/comon/Button";
import { PlayGround } from "../components/quiz/PlayGround";

export const Quiz = () => {

  const [nowQuiz, setNowQuiz] = useState(0);
  const [quizCount, setQuizCount] = useState(10);
  const [finalCount, setFinalCount] = useState(0);
  const [score, setScore] = useState(0);
  const [finalQuizCount, setFinalQuizCount] = useState(0);

  const getResultText = (score: number): string => {
    if (score === 100) return "점자 마스터세요??";
    if (score >= 90) return "진짜 조금만 더하면...";
    if (score >= 75) return "조금 더 분발하세요.";
    if (score >= 50) return "다소 분발해야겠어요..";
    return "분발하셔야겠어요....";
  };

  if(nowQuiz === 1){
    return (
      <QuizWrapper>
        <Header/>
        <QuizSettingWrapper>
          <PlayGround quizCount={quizCount} isQuiz={setNowQuiz} isAnswerCount={setFinalCount} isScore={setScore} isCount={setFinalQuizCount}/>
        </QuizSettingWrapper>
      </QuizWrapper>
    )

  }else if (nowQuiz === 2){
    return (
      <QuizWrapper>
        <Header/>
        <QuizSettingWrapper>
        <QuizeSettingTitleWrapper>
          <Title
            title="퀴즈 결과"
            text={`결과는... ${getResultText(score)}`}
          />
          <QuizSettingBarContainer>
            <QuizGap>
            <QuizContainer>
              {finalQuizCount} 문제 중, {finalCount}문제 맞춤.
              <ImageWrapper>
                <ImageContents>
                  {Math.round(score)}점
                </ImageContents>
              </ImageWrapper>
              <ButtonTitleWrapper>
                문제 수
                <ButtonWrapper>
                  <CountButton title={5} nowCount={quizCount} onClick={() => setQuizCount(5)}/>
                  <CountButton title={10} nowCount={quizCount} onClick={() => setQuizCount(10)}/>
                  <CountButton title={15} nowCount={quizCount} onClick={() => setQuizCount(15)}/>
                  <CountButton title={20} nowCount={quizCount} onClick={() => setQuizCount(20)}/>
                  <CountButton title={30} nowCount={quizCount} onClick={() => setQuizCount(30)}/>
                </ButtonWrapper>
              </ButtonTitleWrapper>
            </QuizContainer>
            <Button text="다시하기" onClick={() => setNowQuiz(1)}/>
            </QuizGap>
          </QuizSettingBarContainer>
        </QuizeSettingTitleWrapper>
      </QuizSettingWrapper>
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
            <QuizGap>
            <QuizContainer>    
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
                  <CountButton title={20} nowCount={quizCount} onClick={() => setQuizCount(20)}/>
                  <CountButton title={30} nowCount={quizCount} onClick={() => setQuizCount(30)}/>
                </ButtonWrapper>
              </ButtonTitleWrapper>
            </QuizContainer>
            <Button text="시작하기" onClick={() => setNowQuiz(1)}/>
            </QuizGap>
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

const QuizGap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 19px;
`

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
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #ffffff;
  box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.1);
`

const QuizContainer = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #5B61F7;
  font-weight: 600;
`

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`

const ImageContents = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 8px;
  background: linear-gradient(137deg, #EAECFE 1.03%, #808DFF 96.14%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #ffffff;
  font-weight: 700;
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
  box-sizing: border-box;
  width: 100%;
  justify-content: space-between;
  display: flex;
  font-size: 14px;
  color: #6D6D6D;
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`