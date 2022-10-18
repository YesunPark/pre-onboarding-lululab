import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { BookingBtn } from '../bookablelist/components/BookableCard';

const Booking = () => {
  const params = useParams();
  const location = useLocation();
  const [bookingInfo, setBookingInfo] = useState({ name: '', types: [] });
  const [bookableTimes, setBookableTimes] = useState([]);
  const [userHandledInfo, setUserHandledInfo] = useState({ name: '', type: '', time: '선택해주세요' });

  const getParameter = (key) => {
    return new URLSearchParams(location.search).get(key);
  };

  useEffect(() => {
    setUserHandledInfo({ ...userHandledInfo, type: getParameter('type') });
  }, []);

  useEffect(() => {
    axios('/data/bookableData.json').then((res) => {
      const bookableDatas = res.data;
      bookableDatas.forEach((data) => {
        if (data.id === Number(params.info)) {
          setBookingInfo({ name: data.name, types: data.types });
          data.types.forEach((type) => {
            if (type.type === userHandledInfo.type) {
              setBookableTimes(type.time);
            }
          });
        }
      });
    });
  }, [userHandledInfo]);

  const handleNameInput = (e) => {
    setUserHandledInfo({ ...userHandledInfo, name: e.target.value });
  };

  const handleSelectBox = (e) => {
    const { id } = e.target;
    const { value } = e.target.options[e.target.selectedIndex];
    if (id === 'type') {
      setUserHandledInfo({ ...userHandledInfo, [id]: value, time: '선택해주세요' });
    } else if (id === 'time') {
      setUserHandledInfo({ ...userHandledInfo, [id]: value });
    }
  };

  return (
    <Container>
      <div className="name">{bookingInfo.name}</div>
      <div>
        <span className="title">예약자 이름</span>
        <input className="booking-info" onChange={handleNameInput} />
      </div>
      <div>
        <span className="title">예약 가능 종류</span>
        <select id="type" className="booking-info" value={userHandledInfo.type} onChange={handleSelectBox}>
          {bookingInfo.types.map((type) => {
            if (type.time.length) {
              return <option key={type.type}>{type.type}</option>;
            }
          })}
        </select>
      </div>
      <div>
        <span className="title">예약 가능 시간</span>
        <select id="time" className="booking-info" value={userHandledInfo.time} onChange={handleSelectBox} required>
          <option className="select-holder">선택해주세요</option>
          {bookableTimes.map((time) => {
            return <option key={time}>{time}:00</option>;
          })}
        </select>
      </div>
      <BookingBtn>예약하기</BookingBtn>
    </Container>
  );
};

const Container = styled.div`
  min-width: 350px;
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.borderGray};
  border-radius: 5px;

  div {
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    .booking-info {
      height: 28px;
      padding: 0 5px;
      font-size: 16px;
    }

    .select-holder {
      display: none;
    }
  }

  .name {
    font-weight: 700;
    font-size: 24px;
  }

  .title {
    margin-right: 10px;
    font-size: 21px;
  }
`;

export default Booking;
