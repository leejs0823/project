import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border: 1px solid ${({ theme }) => theme.colors.primary2};
  width: 230px;
  padding: 10px;
  border-radius: 10px;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const Color = styled.div`
  background-color: ${({ theme, color }) => theme.colors[color]};
  border-radius: 50px;
  width: 40px;
  height: 40px;
`;

export const Title = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

export const Description = styled.p`
  font-size: 12px;
`;

export const Point = styled.p`
  font-size: 11px;
`;

export const PurchaseButton = styled.button`
  background-color: ${({ color, theme }) => (color === 'first' ? theme.colors.primary2 : 'white')};
  color: ${({ color, theme }) => (color === 'first' ? 'white' : theme.colors.primary2)};
  border: 1px solid ${({ color, theme }) => (color === 'first' ? 'white' : theme.colors.primary2)};
  padding: 5px 10px;
  border-radius: 10px;
`;
