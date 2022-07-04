import styled from 'styled-components';

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0;
  padding: 0;
`;

export const Item = styled.li`
  display: flex;
  list-style-type: none;
  justify-content: space-between;
  width: 400px;
  align-items: center;
  justify-content: space-around;
`;

export const Text = styled.p`
  margin: 0;
`;

export const Btn = styled.button`
  width: 100px;

  padding: 5px;
  font-size: 16px;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 5px 5px 15px 0px #000000;

  color: orange;
  cursor: pointer;
  :hover,
  :focus {
    color: red;
  }
`;
