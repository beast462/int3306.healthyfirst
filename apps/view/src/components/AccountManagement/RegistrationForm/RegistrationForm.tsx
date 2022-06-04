import { SyntheticEvent } from 'react';

import styled from '@emotion/styled';
import { ArrowLeft } from '@mui/icons-material';
import { Button, Divider, Paper, Toolbar, Typography } from '@mui/material';

import { ISegmentProps } from '../AccountManagement';
import Inputs from './Inputs/Inputs';
import Flexbox from '@/view/common/components/Flexbox';
import { ApplicationState } from '@/view/store';
import { connect, ConnectedProps } from 'react-redux';
import { notify } from '@/view/store/actions/app/notify';
import { NotificationSeverity } from '@/view/common/types/Notification';
import { HttpStatus } from '@nestjs/common/enums';
import { ErrorCodes } from '@/common/constants/error-codes';

const Root = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;
`;

const Container = styled(Paper)`
  width: 100%;
`;

const BtnContainer = styled(Flexbox)`
  justify-content: flex-end;
  padding: 1rem 2rem;
`;

const connector = connect((state: ApplicationState) => ({}), {
  notify,
});

function RegistrationForm({
  switchSegment,
  notify,
}: ISegmentProps & ConnectedProps<typeof connector>) {
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;

    const newUser = {
      username: target.username.value,
      displayName: target.displayName.value,
      email: target.email.value,
      role: +target.roleId.value,
    };

    console.log(newUser);

    const { statusCode, message, body, errorCode } = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(newUser),
    }).then((res) => res.json());

    if (
      statusCode === HttpStatus.CREATED ||
      statusCode === HttpStatus.NOT_IMPLEMENTED
    ) {
      notify('Tạo tài khoản thành công', NotificationSeverity.SUCCESS);

      target.username.value = '';
      target.displayName.value = '';
      target.email.value = '';
    } else {
      const errorMessages = [];
      switch (errorCode) {
        case ErrorCodes.USERNAME_ALREADY_EXISTS:
          errorMessages.push('Tên đăng nhập đã được đăng ký');
          break;

        case ErrorCodes.EMAIL_ALREADY_EXISTS:
          errorMessages.push('Email đã được đăng ký');
          break;

        case ErrorCodes.USERNAME_AND_EMAIL_ALREADY_EXIST:
          errorMessages.push('Tên đăng nhập và Email đã được đăng ký');
          break;

        case ErrorCodes.ROLE_DOES_NOT_EXIST:
          errorMessages.push('Không tồn tại vai trò này');
          break;

        default:
          errorMessages.push('Lỗi không xác định');
      }

      notify(
        'Tạo tài khoản không thành công',
        NotificationSeverity.ERROR,
        errorMessages,
      );
    }
  };

  return (
    <Root>
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Button
            size="small"
            startIcon={<ArrowLeft />}
            onClick={switchSegment}
          >
            quay lại danh sách
          </Button>

          <Typography variant="h6">Tạo tài khoản mới</Typography>
        </Toolbar>

        <form onSubmit={handleSubmit}>
          <Inputs />

          <br />

          <Divider />

          <BtnContainer>
            <Button variant="contained" size="small" type="submit">
              tạo tài khoản
            </Button>
          </BtnContainer>
        </form>
      </Container>
    </Root>
  );
}

export default connector(RegistrationForm);
