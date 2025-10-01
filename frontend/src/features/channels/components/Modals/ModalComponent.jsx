import { Modal as BootstrapModal, Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { modalConfig } from './modalConfig';

const ModalComponent = ({ type, isOpen, onClose, channel }) => {
  const config = modalConfig[type];
  if (!config) return null;

  if (type === 'deleteChannel' && !config.condition(channel)) {
    return null;
  }

  const validationSchema = config.hasForm
    ? Yup.object().shape({
      name: config.formFields[0].validation,
    })
    : null;

  const [mutate, { isLoading, error }] = config.mutationHook();

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      if (type === 'deleteChannel') {
        await mutate(channel.id).unwrap();
      } else {
        const payload = type === 'renameChannel' ? { id: channel.id, name: values.name } : values;
        await mutate(payload).unwrap();
      }
      resetForm();
      onClose();
    } catch (err) {
      // Ошибка обрабатывается через error из RTK Query
    } finally {
      setSubmitting(false);
    }
  };


  const initialValues = {
    name: type === 'renameChannel' && channel ? channel.name : '',
  };
  console.log(initialValues)

  return (
    <BootstrapModal show={isOpen} onHide={onClose} centered>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{config.title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {config.hasForm ? (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                { config.formFields.map((field) => (
                  <div key={field.name} className="mb-3">
                    <Field
                      id={field.id}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="form-control"
                    />
                    <ErrorMessage
                      name={field.name}
                      component="div"
                      className="text-danger"
                    />
                  </div>
                ))}
                <BootstrapModal.Footer>
                  <Button
                    variant="secondary"
                    onClick={onClose}
                    disabled={isSubmitting || isLoading}
                  >
                    {config.cancelButtonText}
                  </Button>
                  <Button
                    variant={config.submitVariant}
                    type="submit"
                    disabled={isSubmitting || isLoading}
                  >
                    {isLoading ? 'Загрузка...' : config.submitButtonText}
                  </Button>
                </BootstrapModal.Footer>
              </Form>
            )}
          </Formik>
        ) : (
          <>
            <BootstrapModal.Footer>
              <Button
                variant="secondary"
                onClick={onClose}
                disabled={isLoading}
              >
                {config.cancelButtonText}
              </Button>
              <Button
                variant={config.submitVariant}
                onClick={() => handleSubmit({}, { resetForm: () => { }, setSubmitting: () => { } })}
                disabled={isLoading}
              >
                {isLoading ? 'Загрузка...' : config.submitButtonText}
              </Button>
            </BootstrapModal.Footer>
          </>
        )}
        {error && (
          <div className="text-danger mt-2">
            Ошибка: {error.data?.message || 'Не удалось выполнить действие'}
          </div>
        )}
      </BootstrapModal.Body>
    </BootstrapModal>
  );
};

export default ModalComponent;
