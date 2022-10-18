import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BookingBtn } from '../../bookablelist/components/BookableCard';

const BookingModal = ({ setOpenBookingModal, isNoShowUser }) => {
  const navigate = useNavigate();
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem('booked')) {
      setBooked(true);
    }
  }, []);

  return (
    <ModalContainer>
      <div className="container">
        <div className="msg">
          {!booked && (!isNoShowUser ? '예약이 완료되었습니다.' : '죄송합니다. 노쇼고객은 예약이 불가합니다.')}
          {booked && '예약내역이 있습니다.\n\n중복예약은 불가합니다.'}
        </div>
        <BookingBtn
          onClick={() => {
            setOpenBookingModal(false);
            !isNoShowUser && window.localStorage.setItem('booked', 'booked');
            !isNoShowUser && !booked && navigate('/');
          }}
        >
          확인
        </BookingBtn>
      </div>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #00000050;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 330px;
    height: 180px;
    background-color: #ffff;
    border-radius: 5px;
    margin: auto;
    padding: 0 20px;

    .msg {
    }
  }
`;

const Modal = styled.div`
  width: 600px;
  height: 300px;
  margin: auto;
  border: 1px solid black;
`;

export default BookingModal;
