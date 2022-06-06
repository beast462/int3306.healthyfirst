import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import useSWR from 'swr';

import { ErrorCodes } from '@/common/constants/error-codes';
import { ResponseDTO } from '@/common/dto/response.dto';
import { ResponsibleAreaEntity } from '@/common/entities';
import { SerializableError } from '@/common/models/serializable-error';
import { HttpStatus } from '@nestjs/common/enums';

import { swrHookKeys } from '../common/constants/swrHookKeys';
import { NotificationSeverity } from '../common/types/Notification';
import { notify } from '../store/actions/app/notify';
import { useUser } from './useUser';

async function fetchResponsibleLocation(
  this: Dispatch<any>,
  userId: number,
): Promise<ResponsibleAreaEntity> {
  if (typeof userId !== 'number')
    throw new SerializableError(new Error(ErrorCodes.UNKNOWN_ERROR.toString()));

  const {
    statusCode,
    message,
    body,
    errorCode,
  }: ResponseDTO<ResponsibleAreaEntity> = await fetch(
    `/api/responsible-area/userid/${userId}`,
  ).then((res) => res.json());

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

export function useResponsibleLocation() {
  const dispatch = useDispatch();
  const { user } = useUser();
  const { data, error } = useSWR<ResponsibleAreaEntity, Error>(
    swrHookKeys.USE_RESPONSIBLE_LOCATION,
    fetchResponsibleLocation.bind(dispatch, user?.id),
    {
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnMount: true,
    },
  );

  const isError =
    error &&
    (error instanceof Error || SerializableError.isSerializableError(error));

  return {
    data,
    isLoading: !error && !data,
    error: isError ? error : null,
  };
}
