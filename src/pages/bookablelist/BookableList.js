import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const BookableList = () => {
  const [bookableProducts, setBookableProducts] = useState([]);

  useEffect(() => {
    axios('/data/bookableData.json').then((res) => {
      setBookableProducts(res.data);
    });
  }, []);

  return (
    <Container>
      {bookableProducts.length &&
        bookableProducts.map((product) => {
          return <div key={product.id}>{product.name}</div>;
        })}
    </Container>
  );
};

const Container = styled.div``;

export default BookableList;
