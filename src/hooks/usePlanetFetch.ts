import { useQuery } from 'react-query';
import axios from 'axios';

const fetchPlanetData = async (planetId?: number) => {
  const endpoint = planetId ? `/api/planets?id=${planetId}` : '/api/planets';
  const response = await axios.get(endpoint);
  return response.data;
};

export const usePlanetFetch = (planetId?: number) => {
  const {
    data,
    isLoading: loading,
    isError,
    error
  } = useQuery(['planetData', planetId], () => fetchPlanetData(planetId), {
    retry: 1,
    refetchOnWindowFocus: false
  });

  return { data, loading, error: isError ? (error as any).message : null };
};
