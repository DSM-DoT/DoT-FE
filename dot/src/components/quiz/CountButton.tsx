import styled from "styled-components";

type CountButtonProps = {
  title: number;
  nowCount: number;
  onClick: () => void;
}

export const CountButton:React.FC<CountButtonProps> = ({title, nowCount, onClick}) => {
  return (
    <ButtonWrapper $title={title} $nowCount={nowCount} onClick={onClick}>
      {title}
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.div<{$title: number, $nowCount: number}>`
  font-size: 8px;
  width: 18px;
  height: 18px;
  border-radius: 60px;
  color: ${(props) => (props.$title === props.$nowCount ? '#3E39EE' : '#888888')};
  font-weight: ${(props) => (props.$title === props.$nowCount ? '700' : '500')};
  border: ${(props) => (props.$title === props.$nowCount ? '#3E39EE' : '#888888')};
  box-shadow: ${(props) => (props.$title === props.$nowCount ? '0px 0px 2px 1px rgba(0, 0, 0, 0.10)' : '#888888')};
  border: solid 1px;
  cursor: pointer;
  
`