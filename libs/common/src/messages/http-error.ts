export const HttpErrorMessages = {
  /* User controller */
  USERNAME_DOES_NOT_EXIST: ['username does not exist'],
  LOGIN_CHALLENGE_NOT_FOUND: ['login challenge not found'],
  LOGIN_ANSWER_WRONG_OR_INVALID: ['wrong or invalid answer'],
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
};
