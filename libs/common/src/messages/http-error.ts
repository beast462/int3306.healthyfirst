export const HttpErrorMessages = {
  /* Resource handler middleware */
  VIEW_NOT_BUILT: ['view was not built'],
  /* Auth guard middleware */
  AUTH_TOKEN_MISSING: ['required auth token not found'],
  AUTH_TOKEN_INVALID: ['invalid auth token'],
  USER_IN_AUTH_TOKEN_NOT_FOUND: ["user in auth token's payload not found"],
  /* User controller */
  USERNAME_DOES_NOT_EXIST: ['username does not exist'],
  ALREADY_LOGGED_IN: ['already logged in'],
  USERID_INVALID: [
    'userId can be either',
    '"me" or a number',
    '"me" is a shortcut for the current user',
  ],
  USER_CREATION_RESTRICTED: ['user can only create lower level users'],
  ROLE_DOES_NOT_EXIST: ['role does not exist'],
  USERNAME_EXISTS: ['username already exists'],
  EMAIL_EXISTS: ['email already exists'],
  USERNAME_AND_EMAIL_EXISTS: ['username and email already exists'],
  QUESTION_CHECK_MISSING: ['question check missing'],
  QUESTION_CHECK_CAN_NOT_BE_DECODED: ['question can not be decoded'],
  QUESTION_CHECK_WRONG_SIGNATURE: ['question check was incorectly signed'],
  USER_DOES_NOT_EXIST: ['user not found'],
  QUESTION_CHECK_EXPIRED: ['question check has expired'],
  ANSWER_IS_INCORRECT: ['answer is incorrect'],

  $_UNKNOWN_ERROR: ['unknown error'],
};
