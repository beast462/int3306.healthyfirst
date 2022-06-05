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

async function fetchProvinces(
  this: Dispatch<any>,
  locationCode: number,
): Promise<LocationEntity[]> {
  const {
    statusCode,
    message,
    body,
    errorCode,
  }: ResponseDTO<LocationEntity[]> = await fetch(
    `/api/location/${locationCode}/children`,
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

export function useLocations(locationCode: number) {
  const dispatch = useDispatch();
  const { data: locations, error } = useSWR<LocationEntity[], Error>(
    swrHookKeys.USE_LOCATIONS,
    fetchProvinces.bind(dispatch, locationCode),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
    },
  );

  const isError =
    error &&
    (error instanceof Error || SerializableError.isSerializableError(error));

  return {
    locations,
    isLoading: !error && !locations,
    error: isError ? error : null,
  };
}
