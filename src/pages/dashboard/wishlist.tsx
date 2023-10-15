import DashboardLayout from 'components/DashboardLayout';
import { useWishlist } from 'hooks/useWishlist';
import React from 'react';

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  const handleDelete = (planetName: string) => {
    removeFromWishlist(planetName);
  };

  return (
    <DashboardLayout>
      <div>
        <h2>Wishlist</h2>
        <ul>
          {wishlist.map((planet, index) => (
            <li key={index}>
              {planet.name}
              <button onClick={() => handleDelete(planet.name)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default WishlistPage;
