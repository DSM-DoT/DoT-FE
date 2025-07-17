import styled from "styled-components";

type ErrorProps = {
  code: number;
}

const errorList = [
  '카메라 접근 권한이 없습니다!',
  '이미지를 업로드 또는 카메라로 스캔해주세요!'
]

export const Error: React.FC<ErrorProps> = ({ code }) => {
  if (code !== 0) {
    return (
      <ErrorText>
        {errorList[code - 1]}
      </ErrorText>
    );
  }
  return null;
};

const ErrorText = styled.div`
  position: absolute;
  margin-bottom: 230px;
  font-weight: 400;
  font-size: 12px;
  color:#FF3B30;
`