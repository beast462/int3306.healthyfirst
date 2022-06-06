import { facilities } from './../../test/mock-data/facilities/facilities';
import { useResponsibleLocation } from '@/view/hooks/useResponsibleLocation';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import useSWR from 'swr';

import { ErrorCodes } from '@/common/constants/error-codes';
import { ResponseDTO } from '@/common/dto/response.dto';
import { FacilityEntity, LocationEntity } from '@/common/entities';
import { SerializableError } from '@/common/models/serializable-error';
import { HttpStatus } from '@nestjs/common/enums';

import { swrHookKeys } from '../common/constants/swrHookKeys';
import { NotificationSeverity } from '../common/types/Notification';
import { notify } from '../store/actions/app/notify';

async function fetchFacilities(
  this: Dispatch<any>,
  locationCode: number,
): Promise<FacilityEntity[]> {
  const {
    statusCode,
    message,
    body,
    errorCode,
  }: ResponseDTO<FacilityEntity[]> = await fetch(
    `/api/facilities/code/${locationCode}/children`,
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
  const { responsibleLocationCode } = useResponsibleLocation().data;
  const { data: facilities, error } = useSWR<FacilityEntity[], Error>(
    swrHookKeys.USE_FACILITIES,
    fetchFacilities.bind(dispatch, responsibleLocationCode),
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
