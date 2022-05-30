import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import useSWR from 'swr';

import { ErrorCodes } from '@/common/constants/error-codes';
import { ResponseDTO } from '@/common/dto/response.dto';
import { PublicUser } from '@/common/models/public-user';
import { SerializableError } from '@/common/models/serializable-error';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';

import { NotificationSeverity } from '../common/types/Notification';
import { notify } from '../store/actions/app/notify';

async function fetchCreatedAccounts(
  this: Dispatch<any>,
  url,
): Promise<PublicUser[]> {
  const { statusCode, body, message, errorCode }: ResponseDTO<PublicUser[]> =
    await fetch(url).then((res) => res.json());

  if (statusCode === HttpStatus.OK) return body;

  switch (errorCode) {
    case ErrorCodes.SUCCESS:
      break;

    default:
      this(notify('Lỗi không xác định', NotificationSeverity.ERROR, message));
      break;
  }

  throw new SerializableError(new Error(errorCode.toString()));
}

export function useCreatedAccounts() {
  const dispatch = useDispatch();
  const { data, error } = useSWR<PublicUser[], Error>(
    '/api/user/me/creation',
    fetchCreatedAccounts.bind(dispatch),
  );

  const isError =
    error &&
    (error instanceof Error || SerializableError.isSerializableError(error));

  return {
    createdAccounts: data,
    isLoading: !error && !data,
    error: isError ? error : null,
  };
}
