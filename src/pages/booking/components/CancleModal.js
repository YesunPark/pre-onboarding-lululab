import { ModalContainer } from './BookingModal';
import { BookingBtn } from '../../bookablelist/components/BookableCard';

const CancleModal = ({ setOpenCancleModal }) => {
  return (
    <ModalContainer>
      <div className="container">
        <div>예약이 취소되었습니다.</div>
        <BookingBtn
          onClick={() => {
            setOpenCancleModal(false);
          }}
        >
          확인
        </BookingBtn>
      </div>
    </ModalContainer>
  );
};

export default CancleModal;
