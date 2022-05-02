import { HttpStatus } from '@nestjs/common/enums';
import useSWR from 'swr';

async function fetchUser(url) {
  const { statusCode, message, body } = await fetch(url).then((res) =>
    res.json(),
  );

  if (statusCode !== HttpStatus.OK) throw new Error(message);

  return body;
}

export function useUser() {
  const { data, error } = useSWR('/api/user/me', fetchUser, {
    revalidateOnFocus: false,
  });

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
