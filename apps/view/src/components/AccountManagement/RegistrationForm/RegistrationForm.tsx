import styled from '@emotion/styled';
import { ISegmentProps } from '../AccountManagement';

const Root = styled.div`
  width: 100%;
  height: 100%;
  background-color: red;
`;

function RegistrationForm({}: ISegmentProps) {
  return <Root></Root>;
}

export default RegistrationForm;
