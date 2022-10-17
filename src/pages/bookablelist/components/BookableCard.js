import styled from 'styled-components';

const BookableCard = ({ product }) => {
  const { name, bookable } = product;
  return <CardContainer>{name}</CardContainer>;
};

const CardContainer = styled.div`
  border: 1px solid black;
`;

export default BookableCard;
