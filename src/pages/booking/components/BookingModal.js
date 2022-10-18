import styled from 'styled-components';
import { BookingBtn } from '../../bookablelist/components/BookableCard';

const BookingModal = ({ setOpenBookingModal }) => {
  return (
    <ModalContainer>
      <div className="container">
        <div className="msg">예약이 완료되었습니다.</div>
        <BookingBtn
          onClick={() => {
            setOpenBookingModal(false);
          }}
        >
          확인
        </BookingBtn>
      </div>
      {/* <div>죄송합니다. 노쇼 고객은 예약이 불가합니다. </div> */}
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
    width: 300px;
    height: 180px;
    background-color: #ffff;
    border-radius: 5px;
    margin: auto;

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
