import { useState } from 'react';
import axios from 'axios';
import styled, { ThemeContext } from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import theme from '../../styles/theme';

const BookingList = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState({
    bookingNum: 0,
    createdAt: '',
    userName: '',
    product: '',
    type: '',
    time: 0,
  });

  const handleSearch = () => {
    axios('/data/bookingList.json').then((res) => {
      console.log(res.data);
    });
  };

  return (
    <Container>
      <div className="search-container">
        <input
          className="search-input"
          placeholder="예약자 성함 또는 예약번호"
          onKeyDown={(e) => {
            e.key === 'Enter' && handleSearch();
          }}
        ></input>
        <FiSearch size={30} color={theme.mainColor} onClick={handleSearch} />
      </div>
      <CardContainer>
        <div className="empty-result">예약자 성함 또는 예약번호로 검색해주세요.</div>
      </CardContainer>
      <CardContainer>
        <div className="empty-result">검색 결과가 없습니다.</div>
      </CardContainer>
      {/* <CardContainer>
        <div className="title">
          <div>예약번호 :</div>
          <div>예약자 성함 :</div>
          <div>예약상품 :</div>
          <div>예약시간 :</div>
        </div>

        <div className="search-result">
          <div>123345</div>
          <div>홍길동</div>
          <div>토닝/진료</div>
          <div>9:00</div>
        </div>
      </CardContainer> */}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  min-height: 700px;
  margin: auto;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.borderGray};
  border-radius: 5px;

  .search-container {
    border-bottom: 1px solid ${({ theme }) => theme.borderGray};
    display: flex;
    align-items: center;
    margin: 0 auto 30px;
    .search-input {
      max-width: 480px;
      height: 40px;
      margin-right: 5px;
      padding: 0 10px;
      border: none;
      font-size: 16px;
    }
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 480px;
  margin: 0 auto;
  padding: 10px 20px;
  border: 1px solid ${({ theme }) => theme.borderGray};
  border-radius: 5px;

  .title {
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
  }

  .search-result {
    font-size: 18px;
    line-height: 30px;
    text-align: right;
  }

  .empty-result {
    margin: 30px;
  }
`;

export default BookingList;
