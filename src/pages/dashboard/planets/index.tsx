import Link from 'next/link';
import DashboardLayout from '../../../components/DashboardLayout';
import styled from 'styled-components';
import { usePlanetsList } from 'hooks/usePlanetFetch';
import { useWishlist } from 'hooks/useWishlist';
import { PlanetDataType } from 'type/planets.type';
import useInfiniteScroll from 'hooks/useInfiniteScroll';

const PlanetsPage = () => {
  const { data, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    usePlanetsList();
  const { addToWishlist } = useWishlist();
  const loadMoreRef = useInfiniteScroll(fetchNextPage, hasNextPage || false);
  const handleAddToWishlist = (planet: PlanetDataType) => {
    addToWishlist(planet);
  };

  if (data?.pages) {
    return (
      <DashboardLayout>
        <h1>Planets</h1>
        <ul>
          {isSuccess &&
            data.pages.map((page) =>
              page.results.map((planet: PlanetDataType, index: number) => (
                <PlanetCard key={index}>
                  <PlanetName href={`/dashboard/planets/${index + 1}`}>{planet.name}</PlanetName>
                  <AddButton onClick={() => handleAddToWishlist(planet)}>Add to Wishlist</AddButton>
                </PlanetCard>
              ))
            )}
        </ul>
        <div ref={loadMoreRef} className={`${!hasNextPage ? 'hidden' : ''}`}>
          {isFetchingNextPage && <p>Loading more...</p>}
        </div>
      </DashboardLayout>
    );
  }

  return null;
};

export default PlanetsPage;

const PlanetCard = styled.li`
  align-items: center;
  background-color: #f9f9f9;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  padding: 20px;
`;

const PlanetName = styled(Link)`
  color: #333;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const AddButton = styled.button`
  background-color: #0070f3;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  padding: 10px 15px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0050b3;
  }
`;
