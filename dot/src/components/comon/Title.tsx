import styled from "styled-components"

type TitleProps = {
  title: string;
  text: string;
}

export const Title:React.FC<TitleProps> = ({title, text}) => {
  return (
    <TitleWrapper>
      <TitleContent>{title}</TitleContent>
      <Text>{text}</Text>
    </TitleWrapper>
  )
}

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const TitleContent = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #000000;
`

const Text = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #6D6D6D;
`