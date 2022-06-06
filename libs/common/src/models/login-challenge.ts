export type LoginChallenge = {
  requestId: string;
  question: string;
  answer: string;
  expires: Date;
  presignedToken: string;
  removalTask: NodeJS.Timeout;
};
