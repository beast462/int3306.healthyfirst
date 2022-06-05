import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import useSWR from 'swr';

import { ErrorCodes } from '@/common/constants/error-codes';
import { ResponseDTO } from '@/common/dto/response.dto';
import { GetUserCreationsResDTO } from '@/common/dto/user/get-user-creations.res.dto';
import { PublicUser } from '@/common/models/public-user';
import { SerializableError } from '@/common/models/serializable-error';
import { SortOrders } from '@/common/types/sort-orders';
import { HttpStatus } from '@nestjs/common/enums';

import { swrHookKeys } from '../common/constants/swrHookKeys';
import { NotificationSeverity } from '../common/types/Notification';
import { notify } from '../store/actions/app/notify';
import { Specialist } from '@/common/models/specialist';

interface IProps {
  limit: number;
  offset: number;
  order: SortOrders;
  orderBy: keyof PublicUser;
}

async function fetchManagedSpecialists(
  this: Dispatch<any>,
): Promise<PublicUser[]> {
  const { statusCode, body, message, errorCode }: ResponseDTO<Specialist[]> =
    await fetch(`/api/responsible-area/users/${}`).then((res) => res.json());

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

export function useCreatedAccounts({ limit, offset, order, orderBy }: IProps) {
  const dispatch = useDispatch();
  const { specialists, error } = useSWR<GetUserCreationsResDTO, Error>(
    swrHookKeys.USE_MANAGED_SPECIALISTS,
    fetchManagedSpecialists.bind(dispatch),
  );

  const isError =
    error &&
    (error instanceof Error || SerializableError.isSerializableError(error));

  return {
    specialists,
    isLoading: !error && !specialists,
    error: isError ? error : null,
  };
}
