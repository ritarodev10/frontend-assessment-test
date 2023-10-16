import DashboardLayout from 'components/DashboardLayout';
import { useWishlist } from 'hooks/useWishlist';
import React, { useState } from 'react';
import { Table, Td, Th, Tr } from './StyledTable';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { TbPlayerTrackPrevFilled, TbPlayerTrackNextFilled } from 'react-icons/tb';

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(wishlist.length / itemsPerPage);

  const handlePageChange = (direction: 'next' | 'prev') => {
    setCurrentPage((prev) => {
      if (direction === 'next') return Math.min(prev + 1, totalPages);
      if (direction === 'prev') return Math.max(prev - 1, 1);
      return prev;
    });
  };

  const handleDelete = (planetName: string) => {
    removeFromWishlist(planetName);
  };

  const formatPopulation = (population: string) => {
    const pop = parseInt(population);
    if (isNaN(pop)) return population;

    const thresholds = [
      { value: 1e9, symbol: 'B' },
      { value: 1e6, symbol: 'M' }
    ];

    const { value, symbol } = thresholds.find((threshold) => pop >= threshold.value) || {
      value: 1,
      symbol: ''
    };

    const formatted = (pop / value).toFixed(1);

    // If population is less than 1 million, return it as a decimal number
    if (pop < 1e6) {
      return pop.toLocaleString();
    }

    return formatted.endsWith('.0') ? formatted.slice(0, -2) + symbol : formatted + symbol;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex justify-center bg-[#fbefdf] rounded-2xl relative overflow-hidden">
            <img alt="logo" src="/logo.jpg" className="w-56 z-20" />
            <img
              alt="terrain"
              src="/left-terain.jpg"
              className="w-[350px] absolute bottom-0 left-0 z-10"
            />
            <img
              alt="terrain"
              src="/left-terain.jpg"
              className="w-[350px] absolute bottom-0 right-0 z-10 transform scale-x-[-1]"
            />
          </div>
          <div className="flex w-full h-[50px] text-[#fbefdf] items-center text-sm">
            <span className="w-[17%] pl-6">Planet Id</span>
            <span className="w-[12%] text-center">Population</span>
            <span className="w-[14%] text-center">Rotation Period</span>
            <span className="w-[14%] text-center">Orbital Period</span>
            <span className="w-[15%] text-center">Diameter</span>
            <span className="w-[20%]">Terain</span>
          </div>
          <div className="flex h-[500px] flex-col bg-[#fbefdf] rounded-2xl overflow-hidden">
            <Table>
              <thead>
                <Tr>
                  <Th width="17%"></Th>
                  <Th width="12%"></Th>
                  <Th width="14%"></Th>
                  <Th width="14%"></Th>
                  <Th width="15%"></Th>
                  <Th width="20%"></Th>
                  <Th></Th>
                </Tr>
              </thead>
              <tbody>
                {wishlist
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((planet, index) => (
                    <Tr key={index}>
                      <Td>
                        <span className="pl-4">{planet.name}</span>
                      </Td>
                      <Td className="text-center">{formatPopulation(planet.population)}</Td>
                      <Td className="text-center">
                        {planet.rotation_period === 'unknown'
                          ? 'unknown'
                          : `${planet.rotation_period} hrs`}
                      </Td>
                      <Td className="text-center">
                        {planet.orbital_period === 'unknown'
                          ? 'unknown'
                          : `${planet.orbital_period} days`}
                      </Td>
                      <Td className="text-center">{planet.diameter} km</Td>
                      <Td className="capitalize">{planet.terrain}</Td>
                      <Td>
                        <button onClick={() => handleDelete(planet.name)}>
                          <RiDeleteBin2Fill className="text-3xl text-[#f36d5e]" />
                        </button>
                      </Td>
                    </Tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="h-10 text-[#fbefdf] flex justify-center items-center text-sm font-semibold">
          <div className="flex gap-10">
            <button
              className={`${currentPage === 1 ? 'disabled hidden' : ''} flex gap-3`}
              onClick={() => handlePageChange('prev')}
            >
              <TbPlayerTrackPrevFilled className="text-lg" />
              Previous
            </button>
            <button
              className={`${currentPage === totalPages ? 'disabled hidden' : ''} flex gap-3`}
              onClick={() => handlePageChange('next')}
            >
              Next
              <TbPlayerTrackNextFilled className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WishlistPage;
