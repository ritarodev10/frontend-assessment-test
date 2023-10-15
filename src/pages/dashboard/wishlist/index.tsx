import DashboardLayout from 'components/DashboardLayout';
import { useWishlist } from 'hooks/useWishlist';
import React, { useState } from 'react';
import { Table, Td, Th, Tr } from './StyledTable';

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const [itemsPerPage, setItemPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(wishlist.length / itemsPerPage);

  const handlePageChange = (direction: 'next' | 'prev') => {
    setCurrentPage((prev) => {
      if (direction === 'next') return Math.min(prev + 1, totalPages);
      if (direction === 'prev') return Math.max(prev - 1, 1);
      return prev;
    });
  };

  const handleItemsPerPageChange = (count: number) => {
    setItemPerPage(count);
    setCurrentPage(1); // Reset current page to 1 whenever items per page changes
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
      <div className="flex flex-col w-full">
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col flex-1 bg-[#fbefdf] rounded-2xl h-full overflow-hidden">
            <div className="flex-1 flex items-center justify-center p-4 bg-[#fbefdf] relative">
              <div className="flex flex-1 gap-12 items-center justify-center"></div>
              <div className="flex flex-col items-center justify-center">
                <img alt="logo" src="/logo.jpg" className="w-56 z-20" />{' '}
                {/* Increase z-index here */}
                <img
                  alt="terrain"
                  src="/left-terain.jpg"
                  className="w-[450px] absolute bottom-0 left-0 z-10"
                />
                <img
                  alt="terrain"
                  src="/left-terain.jpg"
                  className="w-[450px] absolute bottom-0 right-0 z-10 transform scale-x-[-1]"
                />
              </div>
              <div className="flex flex-1 gap-12 w-full items-center justify-center"></div>
            </div>
          </div>
          <div className="flex w-full h-[50px] text-[#fbefdf]">TES</div>
          <div className="flex h-[500px] flex-col flex-1 bg-[#fbefdf] rounded-2xl overflow-hidden">
            <Table className="h-500px">
              <thead>
                <Tr>
                  <Th width="15%"></Th>
                  <Th width="12%"></Th>
                  <Th width="12%"></Th>
                  <Th width="15%"></Th>
                  <Th width="25%"></Th>
                  <Th width="15%"></Th>
                  <Th></Th>
                </Tr>
              </thead>
              <tbody>
                {wishlist
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((planet, index) => (
                    <Tr key={index}>
                      <Td>{planet.name}</Td>
                      <Td>
                        {planet.rotation_period === 'unknown'
                          ? 'unknown'
                          : `${planet.rotation_period} hrs`}
                      </Td>
                      <Td>
                        {planet.orbital_period === 'unknown'
                          ? 'unknown'
                          : `${planet.orbital_period} days`}
                      </Td>
                      <Td>{planet.diameter} km</Td>
                      <Td className="capitalize">{planet.terrain}</Td>
                      <Td>{formatPopulation(planet.population)}</Td>
                      <Td>
                        <button onClick={() => handleDelete(planet.name)}>Delete</button>
                      </Td>
                    </Tr>
                  ))}
              </tbody>
            </Table>
            <div className="flex justify-between">
              {/* <div className="flex gap-4">
              <span>Item per page</span>
              {[2, 5, 10].map((item) => {
                return (
                  <button key={item} onClick={() => handleItemsPerPageChange(item)}>
                    {item}
                  </button>
                );
              })}
            </div> */}
            </div>
          </div>
        </div>
        <div className="h-10 text-[#fbefdf] flex justify-center items-center text-sm font-semibold">
          <div>
            <button disabled={currentPage === 1} onClick={() => handlePageChange('prev')}>
              Previous
            </button>
            {currentPage} / {totalPages}
            <button disabled={currentPage === totalPages} onClick={() => handlePageChange('next')}>
              Next
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WishlistPage;
