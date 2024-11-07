import {useQuery} from '@tanstack/react-query';
import homeService from '../services/home.service';

export const useRecommendForYou = () => {
  return useQuery({
    queryKey: ['recommend_for_you'],
    queryFn: homeService.getRecommendForYou,
  });
};
