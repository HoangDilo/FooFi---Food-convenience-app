import {useCheckValidToken} from './useAuth';

export const useAllPost = () => {
  const queryFn = useCheckValidToken();
};
