import { ReactNode, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';

type DashboardLayoutProps = {
  children: ReactNode;
};

const Container = styled.div`
  background-color: #371d21;
  display: flex;
  height: 100vh;
  justify-content: center;
  //   padding: 3rem;
  background-image: url('/wanderlist-hero-image-2.webp');
  background-position: top center;
  background-repeat: no-repeat;
  background-size: fill;
`;

const InnerContainer = styled.div`
  //   border-radius: 2rem;
  height: 100%;
  position: relative;
  width: 100%;
`;

const HeroHeader = styled.header`
  align-items: center;
  background-color: #0e2d34;
  background-image: url('/wanderlist-hero-image-2.webp');
  background-position: center;
  background-repeat: no-repeat;
  background-size: fill;
  border-radius: 2rem 2rem 0 0;
  color: #ecf0f1;
  display: flex;
  font-size: 2em;
  height: 1100px;
  justify-content: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  width: 100%;
`;

const Navbar = styled.nav`
  //   background-color: #002135;
  color: #ecf0f1;
  display: flex;
  justify-content: space-around;
  margin-top: -10px;
  padding: 10px 0;
  z-index: 10;
`;

const NavbarLink = styled.a`
  color: inherit;
  padding: 10px 20px;
  text-decoration: none;
  &:hover {
    background-color: #34495e;
  }
`;

const Content = styled.div`
  //   background-color: #002135;
  flex: 1;
  overflow: auto;
  padding: 20px;
`;

type NavItemType = {
  id: string;
  label: string;
  path: string;
};

const navItems = [
  {
    id: 'planets',
    label: 'Planets',
    path: '/dashboard/planets'
  },
  {
    id: 'wishlist',
    label: 'Wishlist',
    path: '/dashboard/wishlist'
  }
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const router = useRouter();

  return (
    <Container>
      {/* <InnerContainer>
        <Navbar>
          <Link href="/dashboard/planets" passHref>
            <NavbarLink>Planets</NavbarLink>
          </Link>
          <Link href="/dashboard/wishlist" passHref>
            <NavbarLink>Wishlist</NavbarLink>
          </Link>
        </Navbar>
        <Content>{children}</Content>
      </InnerContainer> */}
      <div className="flex flex-col w-[1080px] h-[860px] bg-[#1f141c] mt-10 rounded-3xl shadow-box overflow-hidden relative px-20 ">
        <div className="w-full h-20 bg-[#1f141c] flex justify-between items-center overflow-hidden pr-6">
          <div className="flex items-center justify-center gap-8">
            <span className="rounded-full h-2 w-2 bg-[#f36d5e]" />
            <title className=" text-[#fbefdf] h-14 flex items-center py-1 font-bold text-2xl">
              PLANET WANDERLIST ADVENTURE
            </title>
            <span className="rounded-full h-2 w-2 bg-[#f36d5e]" />
          </div>
          <div className="flex gap-10 relative">
            {navItems.map((item) => {
              const { id, label, path } = item;
              const isActive = router.asPath === path;
              return (
                <Link key={id} href={path} passHref>
                  <span
                    className={`${
                      isActive
                        ? 'text-[#1f141c] bg-[#f36d5e]'
                        : 'text-[#f36d5e] bg-[#1f141c] hover:border-[#f36d5e]'
                    } border-2 border-[#1f141c] rounded-full px-6 text-sm py-1 cursor-pointer transition-all duration-300 ease-in-out `}
                  >
                    {label}
                  </span>
                </Link>
              );
            })}
            {/* <div
              className={`bg-[#f36d5e] [transition:width_300ms_ease-in-out,left_300ms_ease-in-out,transform_1000ms_ease-in-out_1800ms,background-color_300ms_ease-out] absolute w-[2rem] rounded-full bg-orange-neon transition-all hover:bg-red-neon h-8 duration-500 ease-in-out z-0`}
              style={{
                width,
                left
              }}
            /> */}
          </div>
        </div>
        {children}
      </div>
    </Container>
  );
};

export default DashboardLayout;
