import {IRecommendForYouResponse} from '@/types/home.type';
import { apiClient } from '..';

export default {
  getRecommendForYou(): Promise<IRecommendForYouResponse> {
    return apiClient.get('/recommend')
  },
};
