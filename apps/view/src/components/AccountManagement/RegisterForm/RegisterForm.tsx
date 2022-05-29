import styled from '@emotion/styled';
import { AddRounded } from '@mui/icons-material';
import {
  SelectChangeEvent,
  Grid,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  InputAdornment,
  Button,
  Box,
} from '@mui/material';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { ReactElement, useState } from 'react';

const Root = styled.div`
   width: 100%,
   display: flex,
`;

function RegisterForm(): ReactElement {
  const [username, setUsername] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [displayname, setDisplayname] = useState<string>('');
  const [displayNameError, setDisplayNameError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [role, setRole] = useState<string>('2');

  const handleChangeUsername = (event) => {
    const tmp = event.target.value;
    setUsername(tmp);
  };

  const handleChangeDisplayName = (event) => {
    const tmp = event.target.value;
    setDisplayname(tmp);
  };

  const handleChangeEmail = (event) => {
    const tmp = event.target.value;
    setEmail(tmp);
  };

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setRole(event.target.value as string);
  };

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
    <Root>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Tên đăng nhập"
            variant="standard"
            size="small"
            placeholder="tung.doan.3"
            fullWidth
            inputProps={{ maxLength: 32 }}
            onChange={handleChangeUsername}
            error={usernameError.length > 0}
            helperText={usernameError}
            autoComplete="username"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Tên hiển thị"
            variant="standard"
            size="small"
            placeholder="Đoàn Duy Tùng"
            fullWidth
            inputProps={{ maxLength: 64 }}
            onChange={handleChangeDisplayName}
            error={displayNameError.length > 0}
            helperText={displayNameError}
            autoComplete="name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="standard"
            size="small"
            placeholder="fmlphongvan@gmail.com"
            fullWidth
            inputProps={{ maxLength: 64 }}
            onChange={handleChangeEmail}
            error={emailError.length > 0}
            helperText={emailError}
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth size="small" variant="standard">
            <InputLabel id="roleLabel">Vai trò</InputLabel>
            <Select
              id="demo-simple-select"
              labelId="roleLabel"
              label="Vai trò"
              value={role}
              onChange={handleChange}
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
                resetForm();
              }}
            >
              Huỷ
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Root>
  );
}

export default RegisterForm;