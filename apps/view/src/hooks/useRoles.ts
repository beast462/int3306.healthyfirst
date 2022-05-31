import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import useSWR from 'swr';

import { ErrorCodes } from '@/common/constants/error-codes';
import { ResponseDTO } from '@/common/dto/response.dto';
import { RoleEntity } from '@/common/entities';
import { SerializableError } from '@/common/models/serializable-error';
import { HttpStatus } from '@nestjs/common/enums';

import { NotificationSeverity } from '../common/types/Notification';
import { notify } from '../store/actions/app/notify';

async function fetchRoles(this: Dispatch<any>, url): Promise<RoleEntity[]> {
  const { statusCode, message, body, errorCode }: ResponseDTO<RoleEntity[]> =
    await fetch(url).then((res) => res.json());

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

export function useRoles() {
  const dispatch = useDispatch();
  const { data: roles, error } = useSWR<RoleEntity[], Error>(
    '/api/role',
    fetchRoles.bind(dispatch),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
    },
  );

  const isError =
    error &&
    (error instanceof Error || SerializableError.isSerializableError(error));

  return {
    roles,
    isLoading: !error && !roles,
    error: isError ? error : null,
  };
}
