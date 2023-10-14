import Link from 'next/link';
import DashboardLayout from '../../../components/DashboardLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { usePlanetFetch } from 'hooks/usePlanetFetch';
import { WishlistProvider, useWishlist } from 'hooks/useWishlist';
import { PlanetDataType } from 'type/planets.type';

const PlanetsPage = () => {
  const { data: planets, loading, error } = usePlanetFetch();
  const { addToWishlist } = useWishlist();

  const handleAddToWishlist = (planet: PlanetDataType) => {
    addToWishlist(planet);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!planets) {
    return <div>Loading...</div>;
  }

  if ('results' in planets) {
    return (
      <DashboardLayout>
        <h1>Planets</h1>
        <ul>
          {planets.results.map((planet: PlanetDataType, index: number) => (
            <li key={index} className="flex gap-8">
              <Link href={`/dashboard/planets/${index + 1}`}>{planet.name}</Link>
              <button onClick={() => handleAddToWishlist(planet)}>Add to Wishlist</button>
            </li>
          ))}
        </ul>
      </DashboardLayout>
    );
  }
  return null;
};

export default PlanetsPage;
