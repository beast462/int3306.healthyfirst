import { ApplicationState } from '@/view/store';
import { changeShowRegisForm } from '@/view/store/actions/app/changeShowRegisForm';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

const connector = connect(
  (state: ApplicationState) => ({
    showRegisForm: state.app.showRegisForm,
  }),
  {
    changeShowRegisForm,
  },
);

function RegistrationForm({
  showRegisForm,
  changeShowRegisForm,
}: ConnectedProps<typeof connector>) {
  const [username, setUsername] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [displayname, setDisplayname] = useState<string>('');
  const [displayNameError, setDisplayNameError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [role, setRole] = useState<string>('2');

  const handleClickSubmit = async () => {
    const newUser = {
      username: username,
      displayName: displayname,
      email: email,
      role: +role,
    };

    console.log(newUser, JSON.stringify(newUser));

    const { statusCode, message } = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(newUser),
    }).then((res) => res.json());

    console.log(statusCode, message);

    if (statusCode !== HttpStatus.CREATED) {
      setUsernameError('');
      setDisplayNameError('');
      setEmailError('');
    } else {
      changeShowRegisForm(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setUsername('');
    setDisplayname('');
    setEmail('');
    setEmailError('');
    setUsernameError('');
    setDisplayNameError('');
  };

  return (
    <Dialog open={showRegisForm} onClose={() => changeShowRegisForm(false)}>
      <DialogTitle>Đăng ký</DialogTitle>
      <Grid container spacing={2} sx={{ padding: '1rem' }}>
        <Grid item xs={12}>
          <TextField
            label="Tên đăng nhập"
            variant="outlined"
            size="small"
            placeholder="tung.doan.3"
            fullWidth
            inputProps={{ maxLength: 32 }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(event.target.value)
            }
            // error={usernameError.length > 0}
            // helperText={usernameError}
            autoComplete="username"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Tên hiển thị"
            variant="outlined"
            size="small"
            placeholder="Đoàn Duy Tùng"
            fullWidth
            inputProps={{ maxLength: 64 }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDisplayname(event.target.value)
            }
            // error={displayNameError.length > 0}
            // helperText={displayNameError}
            autoComplete="name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            placeholder="fmlphongvan@gmail.com"
            fullWidth
            inputProps={{ maxLength: 64 }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
            // error={emailError.length > 0}
            // helperText={emailError}
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth size="small" variant="outlined">
            <InputLabel id="roleLabel">Vai trò</InputLabel>
            <Select
              id="demo-simple-select"
              labelId="roleLabel"
              label="Vai trò"
              value={role}
              onChange={(event: SelectChangeEvent) =>
                setRole(event.target.value as string)
              }
            >
              <MenuItem value={2}>Quản lý chi cục</MenuItem>
              <MenuItem value={3}>Chuyên viên chi cục</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{ mx: 1 }}
              onClick={handleClickSubmit}
            >
              Xác nhận
            </Button>
            <Button
              variant="text"
              onClick={() => {
                changeShowRegisForm(false);
                resetForm();
              }}
            >
              Huỷ
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default connector(RegistrationForm);
