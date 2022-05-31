import useSWR from 'swr';

import { ResponseDTO } from '@/common/dto/response.dto';
import { PublicUser } from '@/common/models/public-user';
import { SerializableError } from '@/common/models/serializable-error';
import { HttpStatus } from '@nestjs/common/enums';

export const key = '/api/user/me';

async function fetchUser(url): Promise<PublicUser> {
  const { statusCode, body, errorCode }: ResponseDTO<PublicUser> = await fetch(
    url,
  ).then((res) => res.json());

  if (statusCode === HttpStatus.OK) return body;

  throw new SerializableError(new Error(errorCode.toString()));
}

export function useUser() {
  const { data, error } = useSWR<PublicUser, Error>(key, fetchUser, {
    revalidateOnFocus: false,
  });

  const isError =
    error &&
    (error instanceof Error || SerializableError.isSerializableError(error));

  return {
    user: data,
    isLoading: !error && !data,
    error: isError ? error : null,
  };
}
