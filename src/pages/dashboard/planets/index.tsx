import Link from 'next/link';
import styled from 'styled-components';
import { FixedSizeList as List } from 'react-window';
import DashboardLayout from '../../../components/DashboardLayout';
import { usePlanetsList } from 'hooks/usePlanetFetch';
import { useWishlist } from 'hooks/useWishlist';
import { PlanetDataType } from 'type/planets.type';
import { CSSProperties } from 'react';

const PlanetsPage = () => {
  const { data, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    usePlanetsList();
  const { addToWishlist } = useWishlist();
  const handleAddToWishlist = (planet: PlanetDataType) => {
    addToWishlist(planet);
  };

  const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
    const planet = data?.pages.reduce<PlanetDataType[]>(
      (acc, page) => acc.concat(page.results),
      []
    )[index];

    return (
      <PlanetCard className={`row-${index + 1}-isrendered`} key={index} style={style}>
        <PlanetName href={`/dashboard/planets/${index + 1}`}>{planet?.name}</PlanetName>
        <AddButton onClick={() => planet && handleAddToWishlist(planet)}>Add to Wishlist</AddButton>
      </PlanetCard>
    );
  };

  return (
    <DashboardLayout>
      <h1>Planets</h1>
      {isLoading && <p>Loading...</p>}
      {isSuccess && data?.pages && (
        <>
          <List
            height={600}
            itemCount={data.pages.reduce((acc, page) => acc + page.results.length, 0)}
            itemSize={80}
            width="100%"
            onItemsRendered={({ visibleStopIndex }) => {
              const totalPlanets = data.pages.reduce((acc, page) => acc + page.results.length, 0);
              if (visibleStopIndex === totalPlanets - 1 && hasNextPage) {
                fetchNextPage();
              }
            }}
          >
            {Row}
          </List>
          {!hasNextPage || (isFetchingNextPage && <p>Loading more...</p>)}
        </>
      )}
      {!isLoading && !isSuccess && <p>Error loading planets.</p>}
      {!hasNextPage && <p>All planets loaded.</p>}
    </DashboardLayout>
  );
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
