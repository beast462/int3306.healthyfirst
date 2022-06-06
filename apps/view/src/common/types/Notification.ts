export enum NotificationSeverity {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

export type Notification = {
  id: string;
  message: string;
  severity: NotificationSeverity;
  details: string[];
};
