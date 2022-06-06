import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import useSWR from 'swr';

import { ErrorCodes } from '@/common/constants/error-codes';
import { ResponseDTO } from '@/common/dto/response.dto';
import { FacilityTypeEntity } from '@/common/entities';
import { SerializableError } from '@/common/models/serializable-error';
import { HttpStatus } from '@nestjs/common/enums';

import { swrHookKeys } from '../common/constants/swrHookKeys';
import { NotificationSeverity } from '../common/types/Notification';
import { notify } from '../store/actions/app/notify';

async function fetchFacilityTypes(
  this: Dispatch<any>,
): Promise<FacilityTypeEntity[]> {
  const {
    statusCode,
    message,
    body,
    errorCode,
  }: ResponseDTO<FacilityTypeEntity[]> = await fetch('/api/facility-type').then(
    (res) => res.json(),
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

export function useFacilityTypes() {
  const dispatch = useDispatch();
  const { data: facilityTypes, error } = useSWR<FacilityTypeEntity[], Error>(
    swrHookKeys.USE_FACILITY_TYPES,
    fetchFacilityTypes.bind(dispatch),
    {
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    },
  );

  const isError =
    error &&
    (error instanceof Error || SerializableError.isSerializableError(error));

  return {
    facilityTypes,
    isLoading: !error && !facilityTypes,
    error: isError ? error : null,
  };
}
