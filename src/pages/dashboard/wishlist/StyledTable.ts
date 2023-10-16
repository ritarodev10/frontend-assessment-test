import styled from 'styled-components';

interface ThProps {
  width?: string;
}

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const Th = styled.th<ThProps>`
  color: #fbefdf;
  height: 0px;
  text-align: left;
  width: ${(props) => props.width};
`;

export const Td = styled.td`
  border-bottom: 1px dashed #1f141c;
  height: 125px;
  padding: 8px;
`;

export const Tr = styled.tr`
  // &:nth-child(even) {
  //   background-color: #f2f2f2;
  // }

  // &:hover {
  //   background-color: #ddd;
  // }
`;
