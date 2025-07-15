import styled from "styled-components"

type LinkedProps = {
  title: string;
  link: string;
  onClick?: () => void;
}

export const Linked:React.FC<LinkedProps> = ({title, link, onClick}) => {
  return (
    <TextWrapper>
      <TitleWrapper>{title}</TitleWrapper>
      <LinkedWrapper onClick={onClick}>{link}</LinkedWrapper>
    </TextWrapper>
  )
}
const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 7px;
`

const TitleWrapper = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #6D6D6D;
`;

const LinkedWrapper = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #5B61F7;
  cursor: pointer;
`