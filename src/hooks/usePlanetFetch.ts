import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import { PlanetsApiResponse } from 'type/planets.type';

const getMorePlanets = async ({ pageParam = 1 }): Promise<PlanetsApiResponse> => {
  const endpoint = `/api/planets/?page=${pageParam}`;
  const response = await axios.get<PlanetsApiResponse>(endpoint);
  return response.data;
};

export const usePlanetsList = () => {
  return useInfiniteQuery<PlanetsApiResponse, Error>('planetsList', getMorePlanets, {
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const nextPage = new URL(lastPage.next).searchParams.get('page');
        return nextPage ? parseInt(nextPage, 10) : undefined;
      }
      return undefined;
    },
    retry: 1,
    refetchOnWindowFocus: false
  });
};
