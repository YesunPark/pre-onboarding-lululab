import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { GrCursor } from 'react-icons/gr';
import BookableCard from './components/BookableCard';

const BookableList = () => {
  const navigate = useNavigate();
  const [bookableProducts, setBookableProducts] = useState([]);

  useEffect(() => {
    axios('/data/bookableData.json').then((res) => {
      setBookableProducts(res.data);
    });
  }, []);

  return (
    <ListContainer>
      <button
        className="search-btn"
        onClick={() => {
          navigate('/search-booking');
        }}
      >
        예약내역 조회하러 가기
        <GrCursor size={25} />
      </button>
      <div className="bookable-list">
        {bookableProducts.length &&
          bookableProducts.map((product) => {
            return <BookableCard key={product.id} product={product} />;
          })}
      </div>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  .search-btn {
    display: flex;
    align-items: center;
    margin: 0 0 20px 16px;
    padding: 12px;
    border: none;
    border-bottom: 5px solid ${({ theme }) => theme.mainColor};
    background-color: #ffffff;
    font-size: 17px;
    &:hover {
      cursor: pointer;
    }
  }

  .bookable-list {
    display: flex;
    flex-wrap: wrap;
  }
`;

export default BookableList;
