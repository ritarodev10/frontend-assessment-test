// pages/planets/[id].tsx

import React from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from 'components/DashboardLayout';
import { usePlanetFetch } from 'hooks/usePlanetFetch';

const PlanetDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: planet, loading, error } = usePlanetFetch(Number(id));

  if (!planet) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div>
        <h1>{planet.name}</h1>
        <p>
          <strong>Rotation Period:</strong> {planet.rotation_period}
        </p>
        <p>
          <strong>Orbital Period:</strong> {planet.orbital_period}
        </p>
        <p>
          <strong>Diameter:</strong> {planet.diameter}
        </p>
        <p>
          <strong>Climate:</strong> {planet.climate}
        </p>
        <p>
          <strong>Gravity:</strong> {planet.gravity}
        </p>
        <p>
          <strong>Terrain:</strong> {planet.terrain}
        </p>
        <p>
          <strong>Surface Water:</strong> {planet.surface_water}
        </p>
        <p>
          <strong>Population:</strong> {planet.population}
        </p>
        <h3>Residents:</h3>
        <ul>
          {planet.residents.map((resident: string, index: number) => (
            <li key={index}>{resident}</li>
          ))}
        </ul>
        <h3>Films:</h3>
        <ul>
          {planet.films.map((film: string, index: number) => (
            <li key={index}>{film}</li>
          ))}
        </ul>
        <p>
          <strong>Created On:</strong> {new Date(planet.created).toLocaleDateString()}
        </p>
        <p>
          <strong>Last Edited:</strong> {new Date(planet.edited).toLocaleDateString()}
        </p>
      </div>
    </DashboardLayout>
  );
};

export default PlanetDetail;
