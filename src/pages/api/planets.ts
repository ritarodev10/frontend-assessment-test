import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';
import { PlanetsApiResponse, PlanetDataType } from 'type/planets.type';

type ApiResponse = PlanetsApiResponse | PlanetDataType | { error: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  const { id } = req.query;

  try {
    // If an ID is provided, fetch details for a specific planet
    if (id) {
      const response = await axios.get(`https://swapi.dev/api/planets/${id}/`);
      res.status(200).json(response.data);
    }
    // Otherwise, fetch the list of all planets
    else {
      const page = req.query.page || 1;
      const response = await axios.get(`https://swapi.dev/api/planets/?page=${page}`);
      res.status(200).json(response.data);
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    res.status(axiosError.response?.status || 500).json({ error: axiosError.message });
  }
}
