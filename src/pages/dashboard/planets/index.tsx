// pages/dashboard/planets/index.tsx

import Link from 'next/link';
import DashboardLayout from '../../../components/DashboardLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Planet {
  name: string;
}

const PlanetsPage = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('/api/planets')
      .then((response) => {
        if (response.data && Array.isArray(response.data.results)) {
          setPlanets(response.data.results);
        } else {
          setPlanets([]);
        }
      })
      .catch((error) => {
        setError(error.response?.data.error || error.message);
        setPlanets([]);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!planets) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <h1>Planets</h1>
      <ul>
        {planets.map((planet, index) => (
          <li key={index}>
            <Link href={`/dashboard/planets/${index + 1}`}>{planet.name}</Link>
          </li>
        ))}
      </ul>
    </DashboardLayout>
  );
};

export default PlanetsPage;
