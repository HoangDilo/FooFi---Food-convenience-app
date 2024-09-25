export interface IDishesBySession {
    id: number;
    img_url: string;
    duration?: number;
    name: string;
}

export interface IRecommendForYouResponse {
    data: {
        id: number;
        name: string;
        img_url: string;
        duration: number;
        description: string;
    }
}