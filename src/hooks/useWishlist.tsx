import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PlanetDataType } from 'type/planets.type';

interface WishlistContextType {
  wishlist: PlanetDataType[];
  addToWishlist: (planet: PlanetDataType) => void;
  removeFromWishlist: (planetName: string) => void;
}

const defaultWishlistContext: WishlistContextType = {
  wishlist: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {}
};

const WishlistContext = createContext<WishlistContextType>(defaultWishlistContext);

interface WishlistProviderProps {
  children: ReactNode;
}

const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [wishlist, setWishlist] = useState<PlanetDataType[]>(() => {
    if (typeof window !== 'undefined') {
      const savedWishlist = localStorage.getItem('wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (planet: PlanetDataType) => {
    if (!wishlist.some((item) => item.name === planet.name)) {
      setWishlist((prevWishlist) => [...prevWishlist, planet]);
    }
  };

  const removeFromWishlist = (planetName: string) => {
    setWishlist((prevWishlist) => prevWishlist.filter((planet) => planet.name !== planetName));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export { WishlistProvider, useWishlist };
