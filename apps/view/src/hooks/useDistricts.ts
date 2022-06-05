import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import useSWR from 'swr';

import { ErrorCodes } from '@/common/constants/error-codes';
import { ResponseDTO } from '@/common/dto/response.dto';
import { LocationEntity } from '@/common/entities';
import { SerializableError } from '@/common/models/serializable-error';
import { HttpStatus } from '@nestjs/common/enums';

import { swrHookKeys } from '../common/constants/swrHookKeys';
import { NotificationSeverity } from '../common/types/Notification';
import { notify } from '../store/actions/app/notify';

async function fetchDistricts(this: Dispatch<any>): Promise<LocationEntity[]> {
  const {
    statusCode,
    message,
    body,
    errorCode,
  }: ResponseDTO<LocationEntity[]> = await fetch(
    `/api/location/districts`,
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

export function useDistricts() {
  const dispatch = useDispatch();
  const { data: districts, error } = useSWR<LocationEntity[], Error>(
    swrHookKeys.USE_DISTRICTS,
    fetchDistricts.bind(dispatch),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const isError =
    error &&
    (error instanceof Error || SerializableError.isSerializableError(error));

  return {
    districts,
    isLoading: !error && !districts,
    error: isError ? error : null,
  };
}
