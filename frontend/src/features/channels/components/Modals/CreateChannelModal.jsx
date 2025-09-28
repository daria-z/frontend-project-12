import { Modal, Button } from 'react-bootstrap';
import { Formik, Field, Form } from 'formik';
// import * as Yup from 'yup';
import { useAddChannelMutation } from '../../channelsApi';

// TODO:
// - добавить валидацию
// - обработка ошибок


const CreateChannelModal = ({ isOpen, onClose }) => {
  const [ addChannel, { isLoading }] = useAddChannelMutation();

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            channelName: '',
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            addChannel(values)
              .unwrap()
              .then(() => {
                resetForm();
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field id="channelName" name="channelName" placeholder="" />
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Отменить
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting || isLoading}
                >
                  Отправить
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default CreateChannelModal;
