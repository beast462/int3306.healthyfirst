import { Middleware, SWRHook, useSWRConfig } from 'swr';

import { ErrorCodes } from '@/common/constants/error-codes';
import { SerializableError } from '@/common/models/serializable-error';

import { swrHookKeys } from '../common/constants/swrHookKeys';

export const revalidateUser: Middleware =
  (useSwrNext: SWRHook) => (key, fetcher, config) => {
    const { mutate } = useSWRConfig();
    const swr = useSwrNext(key, fetcher, config);

    if (key === swrHookKeys.USE_USER)
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
    mutate(swrHookKeys.USE_USER);

    return swr;
  };
