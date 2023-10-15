import { useQuery } from 'react-query';
import axios from 'axios';
import { PlanetDataType } from 'type/planets.type';

const fetchPlanetData = async (planetId: number): Promise<PlanetDataType> => {
  const endpoint = `/api/planets?id=${planetId}`;
  const response = await axios.get<PlanetDataType>(endpoint);
  return response.data;
};

export const usePlanetDetails = (planetId: number) => {
  const {
    data,
    isLoading: loading,
    isError,
    error
  } = useQuery<PlanetDataType, Error>(['planetData', planetId], () => fetchPlanetData(planetId), {
    retry: 1,
    refetchOnWindowFocus: false
  });

  return { data, loading, error: isError ? error.message : null };
};
