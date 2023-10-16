import Link from 'next/link';
import styled from 'styled-components';
import { FixedSizeList as List } from 'react-window';
import DashboardLayout from '../../../components/DashboardLayout';
import { usePlanetsList } from 'hooks/usePlanetFetch';
import { useWishlist } from 'hooks/useWishlist';
import { PlanetDataType } from 'type/planets.type';
import { CSSProperties, useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { TbSquareRoundedPlusFilled } from 'react-icons/tb';

const PlanetsPage = () => {
  const { data, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    usePlanetsList();
  const { wishlist, addToWishlist } = useWishlist();
  const handleAddToWishlist = (planet: PlanetDataType) => {
    addToWishlist(planet);
  };
  const [showMessage, setShowMessage] = useState(false);

  const isPlanetInWishlist = (planet: PlanetDataType) => {
    return wishlist.some((wishlist) => wishlist.name === planet.name);
  };

  useEffect(() => {
    if (!hasNextPage && !isLoading) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [hasNextPage, isLoading]);

  const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
    const planet = data?.pages.reduce<PlanetDataType[]>(
      (acc, page) => acc.concat(page.results),
      []
    )[index];

    return (
      <div
        className={`row-${index + 1}-isrendered flex justify-between items-center px-4 py-2`}
        key={index}
        style={style}
      >
        <div
          className={`row-${
            index + 1
          }-isrendered flex justify-between items-center h-full w-full bg-[#dfd8bd] overflow-hidden rounded-lg border-2 border-[#1f141c] px-4 inner-shadow-a`}
        >
          <div className="flex-1 flex items-center gap-4">
            <span className="rounded-full w-10 h-10 bg-[#1f141c] flex items-center justify-center text-[#dfd8bd]">
              {index + 1}
            </span>
            <span className="text-lg font-semibold">{planet?.name}</span>
          </div>
          <div className="flex justify-center items-center gap-2">
            <span className="text-[6px] font-semibold">
              ROTATION <br />
              PERIOD
            </span>
            {planet?.rotation_period === 'unknown' ? (
              <span className="text-3xl">?? </span>
            ) : (
              <>
                <span className="text-3xl">{planet?.rotation_period}</span>
                <span className="text-[8px] font-semibold">HOURS</span>
              </>
            )}
          </div>
          <div className="flex-1 flex gap-4 justify-end">
            <Link href={`/dashboard/planets/${index + 1}?planetName=${planet?.name}`} passHref>
              <FaEye className="text-3xl cursor-pointer text-[#1f141c]" />
            </Link>
            <TbSquareRoundedPlusFilled
              className={`${
                planet && isPlanetInWishlist(planet)
                  ? 'disabled cursor-auto text-[#9e9677]'
                  : 'text-[#1f141c] cursor-pointer'
              } text-3xl `}
              onClick={() => planet && !isPlanetInWishlist(planet) && handleAddToWishlist(planet)}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col flex-1 bg-[#fbefdf] rounded-2xl h-full overflow-hidden">
        <div className="flex flex-col justify-between h-full">
          <div className="flex-1 flex items-center justify-center p-4 bg-[#fbefdf] relative">
            <div className="flex flex-1 gap-12 items-center justify-center"></div>
            <div className="flex flex-col items-center justify-center">
              <img alt="logo" src="/logo.jpg" className="w-56 z-20" />
              {isLoading && <span className="mt-6 text-xl">Loading Planets...</span>}
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

          {isSuccess && data?.pages && (
            <div className="border-[#1f141c]">
              <List
                height={500}
                itemCount={data.pages.reduce((acc, page) => acc + page.results.length, 0)}
                itemSize={100}
                width="100%"
                onItemsRendered={({ visibleStopIndex }) => {
                  const totalPlanets = data.pages.reduce(
                    (acc, page) => acc + page.results.length,
                    0
                  );
                  if (visibleStopIndex === totalPlanets - 1 && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                  }
                }}
              >
                {Row}
              </List>
            </div>
          )}
        </div>
      </div>
      <div className="h-10 text-[#fbefdf] flex justify-center items-center text-sm font-semibold">
        {isLoading && <p>Loading...</p>}
        {!isLoading && !isSuccess && <p>Error loading planets!</p>}
        {showMessage && <p>All planets loaded</p>}
        {!hasNextPage || (isFetchingNextPage && <p>Loading more...</p>)}
      </div>
    </DashboardLayout>
  );
};

export default PlanetsPage;

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
  border: 2px solid #f36d5e;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  padding: 10px 15px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0050b3;
  }
`;
