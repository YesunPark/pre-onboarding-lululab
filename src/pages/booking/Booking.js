import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { BookingBtn } from '../bookablelist/components/BookableCard';
import BookingModal from './components/BookingModal';
import CancleModal from './components/CancleModal';

const Booking = () => {
  const params = useParams();
  const location = useLocation();
  const [bookingInfo, setBookingInfo] = useState({ name: '', types: [] });
  const [bookableTimes, setBookableTimes] = useState([]);
  const [userHandledInfo, setUserHandledInfo] = useState({ name: '', type: '', time: '선택해주세요' });
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [openCancleModal, setOpenCancleModal] = useState(false);
  const [isNoShowUser, setIsNoShowUser] = useState(true);

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

  const handleNoShowBtn = () => {
    if (window.localStorage.getItem('token')) {
      window.localStorage.removeItem('token');
      setIsNoShowUser(true);
    } else {
      window.localStorage.setItem('token', 'notNoShow');
      setIsNoShowUser(false);
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
      <BookingBtn
        className="booking-btn"
        onClick={() => {
          setOpenBookingModal(true);
        }}
        disabled={userHandledInfo.name && userHandledInfo.time !== '선택해주세요' ? false : true}
      >
        예약하기
      </BookingBtn>
      <BookingBtn
        disabled={window.localStorage.getItem('booked') ? false : true}
        onClick={() => {
          window.localStorage.getItem('booked') && setOpenCancleModal(true);
          window.localStorage.removeItem('booked');
        }}
      >
        예약취소하기
      </BookingBtn>
      <br />
      <br />
      <BookingBtn className="no-show-btn" onClick={handleNoShowBtn}>
        {isNoShowUser
          ? '현재 노쇼고객입니다.\n노쇼고객이 아닌 경우로\n테스트하기'
          : '현재 노쇼고객이 아닙니다.\n노쇼고객인 경우로 \n 테스트하기'}
      </BookingBtn>
      {openBookingModal && <BookingModal setOpenBookingModal={setOpenBookingModal} isNoShowUser={isNoShowUser} />}
      {openCancleModal && <CancleModal setOpenCancleModal={setOpenCancleModal} />}
    </Container>
  );
};

const Container = styled.div`
  min-width: 350px;
  max-width: 800px;
  margin: auto;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.borderGray};
  border-radius: 5px;
  white-space: pre-wrap;

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

  .booking-btn {
    margin-right: 10px;
  }

  .no-show-btn {
    width: 180px;
    height: 70px;
  }
`;

export default Booking;
