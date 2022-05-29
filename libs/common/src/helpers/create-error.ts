import { ErrorCodes } from '@/common/constants/error-codes';
import { ResponseDTO } from '@/common/dto/response.dto';
import { HttpErrorMessages } from '@/common/messages/http-error';
import { HttpException } from '@nestjs/common';

type Ctor = new (...args: unknown[]) => unknown;

const messagesDictionary: Map<ErrorCodes, string[]> = new Map();
const { set: d } = messagesDictionary;
const e = ErrorCodes;
const m = HttpErrorMessages;

d(e.SUCCESS, []);

d(e.ALREADY_LOGGED_IN, m.ALREADY_LOGGED_IN);
d(e.USERNAME_DOES_NOT_EXIST, m.USERNAME_DOES_NOT_EXIST);
d(e.QUESTION_CHECK_MISSING, m.QUESTION_CHECK_MISSING);
d(e.QUESTION_CHECK_CAN_NOT_BE_DECODED, m.QUESTION_CHECK_CAN_NOT_BE_DECODED);
d(e.QUESTION_CHECK_WRONG_SIGNATURE, m.QUESTION_CHECK_WRONG_SIGNATURE);
d(e.USER_DOES_NOT_EXIST, m.USER_DOES_NOT_EXIST);
d(e.QUESTION_CHECK_EXPIRED, m.QUESTION_CHECK_EXPIRED);
d(e.ANSWER_IS_INCORRECT, m.ANSWER_IS_INCORRECT);
d(e.USERID_INVALID, m.USERID_INVALID);
d(e.ROLE_DOES_NOT_EXIST, m.ROLE_DOES_NOT_EXIST);
d(e.USER_CREATION_RESTRICTED, m.USER_CREATION_RESTRICTED);
d(e.USERNAME_ALREADY_EXISTS, m.USERNAME_ALREADY_EXISTS);
d(e.EMAIL_ALREADY_EXISTS, m.EMAIL_ALREADY_EXISTS);
d(e.USERNAME_AND_EMAIL_ALREADY_EXIST, m.USERNAME_AND_EMAIL_ALREADY_EXIST);

d(e.AUTH_TOKEN_MISSING, m.AUTH_TOKEN_MISSING);
d(e.AUTH_TOKEN_INVALID, m.AUTH_TOKEN_INVALID);
d(e.USER_IN_AUTH_TOKEN_NOT_FOUND, m.USER_IN_AUTH_TOKEN_NOT_FOUND);

d(e.UNKNOWN_ERROR, m.$_UNKNOWN_ERROR);

export function createError(ErrorCtor: Ctor, code: ErrorCodes): never {
  const error = new ErrorCtor() as HttpException;

  throw new ErrorCtor({
    statusCode: error.getStatus(),
    message: messagesDictionary.get(code) ?? [],
    errorCode: code,
  } as ResponseDTO<void>);
}
