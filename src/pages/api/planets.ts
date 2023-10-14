import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';
import { PlanetsApiResponse } from 'type/planets.type';

type ApiResponse = PlanetsApiResponse | { error: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  try {
    const response = await axios.get('https://swapi.dev/api/planets/');
    res.status(200).json(response.data);
  } catch (error) {
    const axiosError = error as AxiosError;
    res.status(axiosError.response?.status || 500).json({ error: axiosError.message });
  }
}
