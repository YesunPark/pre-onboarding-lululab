import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Booking = () => {
  const params = useParams();
  const location = useLocation();
  const [bookingInfo, setBookingInfo] = useState({ name: '', types: '' });
  const [selectedInfo, setSelectedInfo] = useState({ type: '', time: 0 });

  // console.log(params.info);

  useEffect(() => {
    axios('/data/bookableData.json').then((res) => {
      const bookableDatas = res.data;
      bookableDatas.forEach((data) => {
        if (data.id === Number(params.info)) {
          setBookingInfo({ name: data.name, types: data.types });
        }
      });
    });
  }, []);

  console.log(bookingInfo);

  const getParameter = (key) => {
    return new URLSearchParams(location.search).get(key);
  };

  return (
    <Container>
      <div>
        <span>예약자 이름</span>
        <input />
      </div>
      <div>
        <span>예약 시간</span>
        <select></select>
      </div>
      <div>
        <span>상담/진료/시술</span>
        <select></select>
      </div>
      <button>예약하기</button>
    </Container>
  );
};

const Container = styled.div``;

export default Booking;
