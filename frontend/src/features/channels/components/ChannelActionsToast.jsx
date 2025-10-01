import { Toast, ToastContainer, Button } from 'react-bootstrap';
import { useState } from 'react';

import ModalComponent from '../components/Modals/ModalComponent';

const ChannelActionsToast = ({ channel, show, onClose }) => {
  const [modalType, setModalType] = useState(null);

  const handleOpenModal = (type) => {
    setModalType(type);
  };

  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={show} onClose={onClose}>
        <Toast.Body>
          <button
            className="btn btn-link"
            onClick={() => handleOpenModal('renameChannel', channel)}
          >
            Переименовать
          </button>


          <button
            className="btn btn-link"
            onClick={() => handleOpenModal('deleteChannel', channel)}
          >
            Удалить
          </button>
        <ModalComponent
          type={modalType}
          isOpen={!!modalType}
          channel={channel}
          onClose={() => setModalType(null)}
        />
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ChannelActionsToast;
