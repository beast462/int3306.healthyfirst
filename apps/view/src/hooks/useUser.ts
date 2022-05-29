import { PublicUser } from '@/common/models/public-user';
import { SerializableError } from '@/common/models/serializable-error';
import { HttpStatus } from '@nestjs/common/enums';
import useSWR from 'swr';

async function fetchUser(url): Promise<PublicUser> {
  const { statusCode, message, body } = await fetch(url).then((res) =>
    res.json(),
  );

  if (statusCode !== HttpStatus.OK) {
    const error = new SerializableError(new Error(message));
    throw error;
  }

  return body;
}

export function useUser() {
  const { data, error } = useSWR<PublicUser, Error>('/api/user/me', fetchUser, {
    revalidateOnFocus: false,
  });

  const isError =
    error &&
    (error instanceof Error || SerializableError.isSerializableError(error));

  console.log({
    user: data,
    isLoading: !error && !data,
    error: isError ? error : null,
  });

  return {
    user: data,
    isLoading: !error && !data,
    error: isError ? error : null,
  };
}
