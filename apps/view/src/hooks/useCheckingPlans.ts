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
import { Plan } from '../common/types/Plan';

async function fetchPlans(
  this: Dispatch<any>,
  locationCode: number,
): Promise<Plan[]> {
  if (typeof locationCode !== 'number')
    throw new SerializableError(new Error(ErrorCodes.UNKNOWN_ERROR.toString()));

  const { statusCode, message, body, errorCode }: ResponseDTO<Plan[]> =
    await fetch(
      `/api/facilities/code/${locationCode}/children/plan/details`,
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

export function useCheckingPlans() {
  const dispatch = useDispatch();
  const { data: responsibleLocation } = useResponsibleLocation();
  const { data: plans, error } = useSWR<Plan[], Error>(
    swrHookKeys.USE_CHECKING_PLANS,
    fetchPlans.bind(dispatch, responsibleLocation?.responsibleLocationCode),
  );

  const isError =
    error &&
    (error instanceof Error || SerializableError.isSerializableError(error));

  console.log(plans);

  return {
    plans,
    isLoading: !error && !plans,
    error: isError ? error : null,
  };
}
