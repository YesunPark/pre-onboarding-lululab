import styled from 'styled-components';

const BookableCard = ({ product }) => {
  const { name, types } = product;

  return (
    <CardContainer>
      <span className="name">{name}</span>
      <div className="type-list">
        {types.map((type) => {
          return (
            <div className="type" key={type.type}>
              <span>{type.type}</span>
              <ReservationBtn disabled={type.time.length ? false : true}>
                {type.time.length ? '예약하기' : '예약마감'}
              </ReservationBtn>
            </div>
          );
        })}
      </div>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 480px;
  margin: 0 auto 20px;
  padding: 10px 20px;
  border: 1px solid ${({ theme }) => theme.borderGray};
  border-radius: 5px;

  .name {
    margin-right: 10px;
    font-size: 22px;
  }

  .type-list {
    width: 160px;
    .type {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
    }
  }
`;

const ReservationBtn = styled.button`
  width: 100px;
  height: 28px;
  background-color: ${({ theme }) => theme.mainBgColor};
  border: none;
  border-radius: 3px;
  font-weight: 700;
  &:hover {
    cursor: pointer;
  }

  :disabled {
    border: none;
    background-color: #c3c3c3;
    &:hover {
      cursor: default;
    }
  }
`;

export default BookableCard;
