import styled from "styled-components"

type ButtonProps = {
  onClick?: () => void;
  text: string;
}

export const Button:React.FC<ButtonProps> = ({onClick,text}) => {
  return (
    <ButtonWrapper onClick={onClick}>
      {text}
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.div`
  cursor: pointer;
  display: flex;
  padding: 10px 125px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #3E39EE;
  color: #fff;
  font-size: 14px;
  font-weight: 500;  
  border-radius: 8px;
`