// pages/planets/[id].tsx

import React from 'react';
import { useRouter } from 'next/router';
import { Planet } from 'type/planets.type';
import DashboardLayout from 'components/DashboardLayout';

const PlanetDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [planet, setPlanet] = React.useState<Planet | null>(null);

  React.useEffect(() => {
    if (typeof id === 'string') {
      fetch(`https://swapi.dev/api/planets/${id}/`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => setPlanet(data))
        .catch((error) => console.error('Error fetching planet details:', error));
    }
  }, [id]);

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
          {planet.residents.map((resident, index) => (
            <li key={index}>{resident}</li>
          ))}
        </ul>
        <h3>Films:</h3>
        <ul>
          {planet.films.map((film, index) => (
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
