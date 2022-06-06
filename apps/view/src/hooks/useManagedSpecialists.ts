import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import useSWR from 'swr';

import { ErrorCodes } from '@/common/constants/error-codes';
import { ResponseDTO } from '@/common/dto/response.dto';
import { SerializableError } from '@/common/models/serializable-error';
import { Specialist } from '@/common/models/specialist';
import { HttpStatus } from '@nestjs/common/enums';

import { swrHookKeys } from '../common/constants/swrHookKeys';
import { NotificationSeverity } from '../common/types/Notification';
import { notify } from '../store/actions/app/notify';
import { useResponsibleLocation } from './useResponsibleLocation';

async function fetchManagedSpecialists(
  this: Dispatch<any>,
  locationCode: number,
): Promise<Specialist[]> {
  if (typeof locationCode !== 'number')
    throw new SerializableError(new Error(ErrorCodes.UNKNOWN_ERROR.toString()));

  const { statusCode, body, message, errorCode }: ResponseDTO<Specialist[]> =
    await fetch(`/api/responsible-area/users/${locationCode}`).then((res) =>
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

export function useManagedSpecialists() {
  const dispatch = useDispatch();
  const { data: responsibleLocationData } = useResponsibleLocation();
  const { data: managedSpecialistsData, error: managedSpecialistsError } =
    useSWR<Specialist[], Error>(
      swrHookKeys.USE_MANAGED_SPECIALISTS,
      fetchManagedSpecialists.bind(
        dispatch,
        responsibleLocationData?.responsibleLocationCode,
      ),
    );

  const isError =
    managedSpecialistsError &&
    (managedSpecialistsError instanceof Error ||
      SerializableError.isSerializableError(managedSpecialistsError));

  return {
    data: managedSpecialistsData,
    isLoading: !managedSpecialistsError && !managedSpecialistsData,
    error: isError ? managedSpecialistsError : null,
  };
}
