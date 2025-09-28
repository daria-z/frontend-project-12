import { Toast, ToastContainer, Button } from 'react-bootstrap';

const ChannelActionsToast = ({ show, onClose, onRename, onDelete }) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={show} onClose={onClose}>
        <Toast.Header>
          <strong className="me-auto">Действия с каналом</strong>
        </Toast.Header>
        <Toast.Body>
          <div className="d-flex flex-column gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={onRename}
            >
              Переименовать
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={onDelete}
            >
              Удалить
            </Button>
          </div>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ChannelActionsToast;
