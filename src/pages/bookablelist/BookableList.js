import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import BookableCard from './components/BookableCard';

const BookableList = () => {
  const [bookableProducts, setBookableProducts] = useState([]);

  useEffect(() => {
    axios('/data/bookableData.json').then((res) => {
      setBookableProducts(res.data);
    });
  }, []);

  return (
    <ListContainer>
      {bookableProducts.length &&
        bookableProducts.map((product) => {
          return <BookableCard key={product.id} product={product} />;
        })}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default BookableList;
