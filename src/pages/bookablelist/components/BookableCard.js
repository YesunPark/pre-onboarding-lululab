import styled from 'styled-components';

const BookableCard = ({ product }) => {
  const { name, types } = product;
  return (
    <CardContainer>
      {name}
      <br />
      {types.map((type) => {
        return type.type;
      })}
    </CardContainer>
  );
};

const CardContainer = styled.div`
  width: 480px;
  margin: 0 auto 20px;
  padding: 10px 20px;
  border: 1px solid ${({ theme }) => theme.borderGray};
  border-radius: 5px;
`;

export default BookableCard;
