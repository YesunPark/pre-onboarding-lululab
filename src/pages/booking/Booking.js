import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

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

  console.log(userHandledInfo);

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
      <div>{bookingInfo.name}</div>
      <div>
        <span>예약자 이름</span>
        <input onChange={handleNameInput} />
      </div>
      <div>
        <span>예약 가능 종류</span>
        <select id="type" value={userHandledInfo.type} onChange={handleSelectBox}>
          {bookingInfo.types.map((type) => {
            if (type.time.length) {
              return <option key={type.type}>{type.type}</option>;
            }
          })}
        </select>
      </div>
      <div>
        <span>예약 가능 시간</span>
        <select id="time" value={userHandledInfo.time} onChange={handleSelectBox} required>
          <option className="select-holder">선택해주세요</option>
          {bookableTimes.map((time) => {
            return <option key={time}>{time}:00</option>;
          })}
        </select>
      </div>
      <button>예약하기</button>
    </Container>
  );
};

const Container = styled.div`
  .select-holder {
    display: none;
  }
`;

export default Booking;
