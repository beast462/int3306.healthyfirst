import { ErrorCodes } from '@/common/constants/error-codes';
import { SerializableError } from '@/common/models/serializable-error';
import { Middleware, SWRHook, useSWRConfig } from 'swr';
import { key as useUserKey } from '../hooks/useUser';

export const revalidateUser: Middleware =
  (useSwrNext: SWRHook) => (key, fetcher, config) => {
    const { mutate } = useSWRConfig();
    const swr = useSwrNext(key, fetcher, config);

    if (key === '/api/user/me')
      // skip revalidation if request is for fetching current user
      return swr;

    if (!swr.error)
      // skip revalidation if there is no error
      return swr;

    if (
      (swr.error as SerializableError).message !==
      ErrorCodes.AUTH_TOKEN_MISSING.toString()
    )
      // skip revalidation if error is not auth token missing
      return swr;

    // revalidate if auth token is missing
    mutate(useUserKey);

    return swr;
  };
