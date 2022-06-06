import Confirm from './Contents/Confirm/Confirm';

export enum DialogContents {
  NONE,
  CONFIRM,
}

export default {
  [DialogContents.CONFIRM]: Confirm,
};
