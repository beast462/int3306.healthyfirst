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
import { PurposeEntity } from '@/common/entities';

async function fetchPurposes(this: Dispatch<any>): Promise<PurposeEntity[]> {
  const { statusCode, message, body, errorCode }: ResponseDTO<PurposeEntity[]> =
    await fetch('/api/purpose').then((res) => res.json());

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

export function usePurposes() {
  const dispatch = useDispatch();
  const { data: purposes, error } = useSWR<PurposeEntity[], Error>(
    swrHookKeys.USE_FACILITIES,
    fetchPurposes.bind(dispatch),
  );

  const isError =
    error &&
    (error instanceof Error || SerializableError.isSerializableError(error));

  return {
    purposes,
    isLoading: !error && !purposes,
    error: isError ? error : null,
  };
}
