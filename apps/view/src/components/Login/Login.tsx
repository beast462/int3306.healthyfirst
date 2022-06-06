import { generateAnswer } from '@/common/helpers/generate-answer';
import Flexbox from '@/view/common/components/Flexbox';
import styled from '@emotion/styled';
import { VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import {
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Slide,
  TextField,
  Theme,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { HttpStatus } from '@nestjs/common/enums';
import {
  ReactElement,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Navigations } from '../Navigations';

const Root = styled(Flexbox)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.4);
  align-items: center;
  justify-content: center;
  z-index: 99999;
`;

const RightAligned = styled(Flexbox)`
  width: 100%;
  flex-direction: row;
  -ms-flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const JustifyBetween = styled(Flexbox)`
  width: 100%;
  flex-direction: row;
  -ms-flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const RootPaper = styled(Paper)`
  padding: 1rem;
  overflow: hidden;
`;

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    marginTop: theme.spacing(2),
    padding: `0 ${theme.spacing(6)}`,
    width: '100%',
    position: 'absolute',
  },
  btn: {
    fontWeight: theme.typography.fontWeightBold,
  },
  slide: {
    position: 'absolute',
  },
  container: {
    display: 'block',
    width: theme.spacing(50),
    position: 'relative',
  },
  back: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    fontWeight: theme.typography.fontWeightBold,
  },
}));

function Login(): ReactElement {
  const classes = useStyles();
  const [step, setStep] = useState(0);
  const [question, setQuestion] = useState('');
  const [usernameInputError, setUsernameInputError] = useState('');
  const [passwordInputError, setPasswordInputError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);
  const [plhd, setPlhd] = useState(0);
  const formRefs = [useRef<HTMLFormElement>(), useRef<HTMLFormElement>()];

  const enterUsername = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();

      const form = event.target as HTMLFormElement;

      const {
        username: { value: username },
      } = form;

      const { statusCode, message, body, errorCode } = await fetch(
        `/api/user/login?username=${username}`,
      ).then((res) => res.json());

      if (statusCode !== HttpStatus.OK) {
        if (errorCode === 257) {
          setUsernameInputError('Tên đăng nhập của bạn không tồn tại');
        } else {
          setUsernameInputError(
            typeof message === 'string' ? message : message.join(' '),
          );
        }
        return;
      }

      usernameInputError.length > 0 && setUsernameInputError('');
      form.username.value = '';

      const { question: q, ...userInfo } = body;

      setUser(userInfo);
      setQuestion(q);
      setStep(1);
    },
    [setUsernameInputError, setQuestion, setStep],
  );

  const enterPassword = async (event: SyntheticEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const {
      password: { value: password },
    } = form;

    const answer = generateAnswer(question, password, { hashPassword: true });

    const { statusCode, message, errorCode } = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answer }),
    }).then((res) => res.json());

    if (statusCode !== HttpStatus.OK) {
      if (errorCode === 263) {
        setPasswordInputError('Mật khẩu không đúng. Hãy thử lại');
      } else {
        setPasswordInputError(
          typeof message === 'string' ? message : message.join(' '),
        );
      }
      return;
    }

    passwordInputError.length > 0 && setPasswordInputError('');

    window.location.reload();
  };

  useEffect(() => {
    formRefs[step]?.current.querySelector('input').focus();
  }, [step]);

  setTimeout(() => {
    if (formRefs[step].current && plhd === 0) setPlhd(1);
  }, 0);

  return (
    <Root>
      <RootPaper>
        <Typography variant="h5" align="center">
          Đăng nhập
        </Typography>
        <br />
        {step === 0 ? (
          <>
            <Typography align="center">Hệ thống thông tin</Typography>
            <Typography align="center">
              Cục an toàn vệ sinh thực phẩm
            </Typography>
          </>
        ) : (
          <>
            <Typography align="center">
              Chào mừng {user?.displayName}
            </Typography>
            <Typography align="center">{user?.role}</Typography>
          </>
        )}
        <br />

        <div
          className={classes.container}
          style={{
            height: `calc(${
              formRefs[step]?.current?.clientHeight ?? 0
            }px + 2rem + ${
              [usernameInputError, passwordInputError][step].length > 0
                ? '1rem'
                : '0rem'
            })`,
          }}
        >
          <Slide direction="right" in={step === 0} unmountOnExit={false}>
            <form
              onSubmit={enterUsername}
              className={classes.form}
              ref={formRefs[0]}
            >
              <TextField
                fullWidth
                autoFocus
                variant="outlined"
                label="Tên đăng nhập"
                name="username"
                error={usernameInputError.length > 0}
                helperText={usernameInputError ? usernameInputError : undefined}
              />

              <br />
              <br />

              <RightAligned>
                <Button
                  variant="contained"
                  type="submit"
                  className={classes.btn}
                >
                  tiếp tục
                </Button>
              </RightAligned>
            </form>
          </Slide>

          <Slide direction="left" in={step === 1} unmountOnExit={false}>
            <form
              onSubmit={enterPassword}
              className={classes.form}
              ref={formRefs[1]}
            >
              <TextField
                fullWidth
                autoFocus
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                label="Mật khẩu"
                name="password"
                error={passwordInputError.length > 0}
                helperText={passwordInputError ? passwordInputError : undefined}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityOffRounded />
                        ) : (
                          <VisibilityRounded />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <br />
              <br />

              <JustifyBetween>
                <a className={classes.back} onClick={() => setStep(0)}>
                  Không phải bạn?
                </a>

                <Button
                  variant="contained"
                  type="submit"
                  className={classes.btn}
                >
                  đăng nhập
                </Button>
              </JustifyBetween>
            </form>
          </Slide>
        </div>
      </RootPaper>
    </Root>
  );
}

Navigations.getInstance().registerNavigation('/login', null)(Login);
