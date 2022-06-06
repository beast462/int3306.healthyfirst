import { useResponsibleLocation } from '@/view/hooks/useResponsibleLocation';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import useSWR from 'swr';

import { ErrorCodes } from '@/common/constants/error-codes';
import { ResponseDTO } from '@/common/dto/response.dto';
import { SerializableError } from '@/common/models/serializable-error';
import { HttpStatus } from '@nestjs/common/enums';

import { swrHookKeys } from '../common/constants/swrHookKeys';
import { NotificationSeverity } from '../common/types/Notification';
import { notify } from '../store/actions/app/notify';
import { FacilityDetails } from '../common/types/Facility';

async function fetchFacilities(
  this: Dispatch<any>,
  locationCode: number,
): Promise<FacilityDetails[]> {
  if (typeof locationCode !== 'number')
    throw new SerializableError(new Error(ErrorCodes.UNKNOWN_ERROR.toString()));

  const {
    statusCode,
    message,
    body,
    errorCode,
  }: ResponseDTO<FacilityDetails[]> = await fetch(
    `/api/facilities/code/${locationCode}/children/details`,
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

export function useFacilities() {
  const dispatch = useDispatch();
  const { data: responsibleLocation } = useResponsibleLocation();
  const { data: facilities, error } = useSWR<FacilityDetails[], Error>(
    swrHookKeys.USE_FACILITIES,
    fetchFacilities.bind(
      dispatch,
      responsibleLocation?.responsibleLocationCode,
    ),
  );

  const isError =
    error &&
    (error instanceof Error || SerializableError.isSerializableError(error));

  return {
    facilities,
    isLoading: !error && !facilities,
    error: isError ? error : null,
  };
}
