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

async function fetchProvinces(this: Dispatch<any>): Promise<LocationEntity[]> {
  const {
    statusCode,
    message,
    body,
    errorCode,
  }: ResponseDTO<LocationEntity[]> = await fetch('/api/location').then((res) =>
    res.json(),
  );

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

export function useProvinces() {
  const dispatch = useDispatch();
  const { data: provinces, error } = useSWR<LocationEntity[], Error>(
    swrHookKeys.USE_PROVINCES,
    fetchProvinces.bind(dispatch),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
    },
  );

  const isError =
    error &&
    (error instanceof Error || SerializableError.isSerializableError(error));

  return {
    provinces,
    isLoading: !error && !provinces,
    error: isError ? error : null,
  };
}
