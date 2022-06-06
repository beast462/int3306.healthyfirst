import useSWR from 'swr';

import { ResponseDTO } from '@/common/dto/response.dto';
import { PublicUser } from '@/common/models/public-user';
import { SerializableError } from '@/common/models/serializable-error';
import { HttpStatus } from '@nestjs/common/enums';

import { swrHookKeys } from '../common/constants/swrHookKeys';

async function fetchUser(): Promise<PublicUser> {
  const { statusCode, body, errorCode }: ResponseDTO<PublicUser> = await fetch(
    '/api/user/me',
  ).then((res) => res.json());

  if (statusCode === HttpStatus.OK) return body;

  throw new SerializableError(new Error(errorCode.toString()));
}

export function useUser() {
  const { data, error } = useSWR<PublicUser, Error>(
    swrHookKeys.USE_USER,
    fetchUser,
    {
      revalidateOnFocus: false,
    },
  );

  const isError =
    error &&
    (error instanceof Error || SerializableError.isSerializableError(error));

  return {
    user: data,
    isLoading: !error && !data,
    error: isError ? error : null,
  };
}
