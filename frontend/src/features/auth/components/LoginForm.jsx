import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useLoginMutation } from '../authApi';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле'),
})

function LoginForm() {
  const [ loginMutation, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        loginMutation(values).unwrap()
          .then((response) => {
            localStorage.setItem('token', response.token);
            resetForm();
            navigate('/');
          })
          // Ошибка обрабатывается в authSlice через extraReducers
          .finally(() => setSubmitting(false))
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <label htmlFor="username">Ваш ник</label>
          <Field id="username" name="username" placeholder="Ваш ник" />
          <ErrorMessage name='username' component='div' style={{ color: 'red' }} />

          <label htmlFor="password">Пароль</label>
          <Field id="password" name="password" type="password" placeholder="Пароль" />
          <ErrorMessage name='password' component='div' style={{ color: 'red' }} />
          <button type="submit" disabled={isSubmitting || isLoading}>
            {isSubmitting || isLoading ? 'Загрузка...' : 'Войти'}
          </button>
        <div></div>
      </Form>)}
    </Formik>
  )
}

export default LoginForm
