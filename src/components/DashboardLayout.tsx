// components/DashboardLayout.tsx

import { ReactNode } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

type DashboardLayoutProps = {
  children: ReactNode;
};

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.nav`
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 20px 0;
  width: 250px;
`;

const SidebarLink = styled.a`
  color: inherit;
  display: block;
  padding: 10px 20px;
  text-decoration: none;
  &:hover {
    background-color: #34495e;
  }
`;

const Content = styled.div`
  flex: 1;
  overflow: auto;
  padding: 20px;
`;

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <Container>
      <Sidebar>
        <Link href="/dashboard/planets" passHref>
          <SidebarLink>Planets</SidebarLink>
        </Link>
        <Link href="/dashboard/wishlist" passHref>
          <SidebarLink>Wishlist</SidebarLink>
        </Link>
        {/* Add other links as necessary */}
      </Sidebar>
      <Content>{children}</Content>
    </Container>
  );
};

export default DashboardLayout;
