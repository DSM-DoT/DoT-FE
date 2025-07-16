import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../comon/Button";
import brailleQuiz from "../../mocks/quiz/QuizData";
import ocard from "../../assets/icons/o_card.png";
import ocard2 from "../../assets/icons/o_gray_card.png";
import xcard from "../../assets/icons/x_card.png";
import xcard2 from "../../assets/icons/x_gray_card.png";

const shuffleArray = (array) => {
  
  // 원본 배열을 변경하지 않기 위해 새로운 배열을 만듭니다.
  const shuffledArray = [...array];
  let currentIndex = shuffledArray.length;
  let randomIndex;

  // 남은 요소가 없을 때까지 반복합니다.
  while (currentIndex !== 0) {
    // 남은 요소 중 무작위 인덱스를 선택합니다.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // 현재 요소와 무작위로 선택된 요소를 교환합니다.
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex],
    ];
  }

  return shuffledArray;
}

type PlayGroundProps = {
  quizCount: number;
  isQuiz?: (result: number) => void;
  isAnswerCount?: (result: number) => void;
  isScore?: (result: number) => void;
  isCount?: (result: number) => void;
}


const shuffledQuiz = shuffleArray(brailleQuiz);

export const PlayGround:React.FC<PlayGroundProps> = ({quizCount, isQuiz, isAnswerCount, isScore, isCount}) => {
  // 이 플레이 판을 설정하는 값들
  const [answer, setAnswer] = useState(0);
  const [answerCount, setAnswerCount] = useState(1);
  const [quiz, setQuiz] = useState(false);
  const [cardQuiz, setCardQuiz] = useState(false);
  const [cardCount, setCardCount] = useState(0);
  // 아래는 문제에서 받은 값들
  const [answerExplain, setAnserExplain] = useState(shuffledQuiz[answerCount -1].question);
  const [quizAnswer, setQuizAnswer] = useState(shuffledQuiz[answerCount -1].answer);

  // 저장 하시겠습니까? 한번 뜨는 놈
  useEffect(() => {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
      };
  
      window.addEventListener("beforeunload", handleBeforeUnload);
  
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, []);

  useEffect(() => {
    if (answerCount > quizCount) {
      const totalAnswered = answerCount - 1;
      const score = (cardCount / totalAnswered) * 100;

      isAnswerCount(cardCount); // 정답 개수 넘김
      isScore(score);           // 점수 넘김
      isCount(quizCount);       // 총 문제 수 넘김
      isQuiz(2);                // 결과 화면으로 전환
    }
  }, [answerCount]);


  useEffect(() => {
    setAnserExplain(shuffledQuiz[answerCount -1].question);
    setQuizAnswer(shuffledQuiz[answerCount -1].answer);
  },[answerCount])

  const hadleX = () => {
    if(answer === 0){
      setCardCount(cardCount + 1);
      setCardQuiz(false);
      setAnswer(1);
      if(quizAnswer === cardQuiz){
        setQuiz(true);
      }else{
        setQuiz(false);
      }
    }
  }

    const hadleY = () => {
    if(answer === 0){
      setCardQuiz(true);
      setAnswer(1);
      if(quizAnswer === cardQuiz){
        setCardCount(cardCount + 1);
        setQuiz(true);
      }else{
        setQuiz(false);
      }
    }
  }

  const handleNext = () => {
    setAnswerCount(answerCount + 1);
    setAnswer(0);
  }


  if(answer === 1){
    return(
      <QuizWrapper>
        <CountText>
          {answerCount+'/'+quizCount}
        </CountText>
        <ButtonWrapper>
        <QuizBarContent>
          <QuizTextWrapper>
            <QuizTitle $answer={answer} $quiz={quiz}>
              {answer === 0
              ? "ox문제"
              : quiz === true
              ? "정답입니다!"
              : "오답입니다.."}
            </QuizTitle>
            <QuizExplain>
              {answerExplain}
            </QuizExplain>
          </QuizTextWrapper>
           <QuizCardWrapper>
          <QuizCount>
            {answerCount}번째 문제
          </QuizCount>
          <CardWrapper>
            <Card onClick={hadleX} $img={xcard} $img2={xcard2} $value={0} $answer={quiz} $isActive={answer === 1 && quizAnswer === false}/>
            <Card onClick={hadleY} $img={ocard} $img2={ocard2} $value={1} $answer={quiz} $isActive={answer === 1 && quizAnswer === false}/>
        </CardWrapper>
        </QuizCardWrapper>
        </QuizBarContent>
        <Button text="다음으로" onClick={handleNext}/>
      </ButtonWrapper>
    </QuizWrapper>
    )
  }
  return (
    <QuizWrapper>
      <CountText>
        {answerCount+'/'+quizCount}
      </CountText>
      <ButtonWrapper>
      <QuizBarContent>
        <QuizTextWrapper>
          <QuizTitle $answer={answer} $quiz={quiz}>
            ox 문제
          </QuizTitle>
          <QuizExplain>
            {answerExplain}
          </QuizExplain>
        </QuizTextWrapper>
        <QuizCardWrapper>
          <QuizCount>
            {answerCount}번째 문제
          </QuizCount>
          <CardWrapper>
            <Card onClick={hadleX} $img={xcard} $img2={xcard2} $value={0} $answer={quiz} $isActive={answer === 1 && quizAnswer === false}/>
            <Card onClick={hadleY} $img={ocard} $img2={ocard2} $value={1} $answer={quiz} $isActive={answer === 1 && quizAnswer === false}/>
        </CardWrapper>
        </QuizCardWrapper>
      </QuizBarContent>
      </ButtonWrapper>
    </QuizWrapper>
  )
}

const QuizWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 7px;
`
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 46px;
`

const CountText = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #5B61F7;
`

const QuizBarContent = styled.div`
  display: flex;
  height: 350px;
  width: 640px;
  border-radius: 8px;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  gap: 26px;
  background-color: #ffffff;
  box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.1);
  padding: 10px;
`

const QuizCardWrapper = styled.div`
  align-items: end;
  width: 343px;
  display: flex;
  flex-direction: column;
  gap: 9px;
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 21px;
`

const Card = styled.div<{
  $img: string;
  $img2: string;
  $value: number;
  $answer: boolean;
  $isActive?: boolean; // 활성화 상태
}>`
  width: 161px;
  height: 232px;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.10);
  background-image: url(${({ $isActive, $value, $answer, $img, $img2 }) =>
    $isActive === undefined
      ? $img   // 문제 풀 때 기본 컬러 이미지
      : $isActive
      ? $img   // 정답일 때 컬러 이미지
      : $img2  // 오답일 때 회색 이미지
  });
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  cursor: pointer;
`


const QuizCount = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #3E39EE;
`

const QuizTitle = styled.div<{$answer:number ,$quiz:boolean}>`
  font-size: 20px;
  font-weight: 700;
  color: ${({ $answer, $quiz }) =>
    $answer === 0
      ? '#3E39EE'
      : $quiz
      ? '#23EB00'
      : '#FF3B30'
  };
`

const QuizExplain = styled.div`
  color: #6D6D6D;
  height: 300px;
  font-size: 14px;
  font-weight: 500;
`

const QuizTextWrapper = styled.div`
  width: 214px;
  color: #000000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 20px;
  font-weight: 700;
  
`