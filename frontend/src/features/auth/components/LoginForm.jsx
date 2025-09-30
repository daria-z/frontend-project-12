import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useLoginMutation } from '../authApi';
import { setError } from '../authSlice';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле'),
})

function LoginForm() {
  const [ loginMutation, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loginError = useSelector((state) => state.auth.loginError);

  useEffect(() => {
      if (isLoggedIn) {
        navigate('/channels', { replace: true });
      }
  },[])

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={(values, { setSubmitting, resetForm, setFieldError }) => {
        dispatch(setError(null));
        loginMutation(values)
          .unwrap()
          .then(() => {
            resetForm();
          })
          .catch((error) => {
            const errorMessage = error?.data?.error || 'Ошибка авторизации';
            if (error.status === 401) {
              setFieldError('username', 'Неверный логин или пароль');
              setFieldError('password', 'Неверный логин или пароль');
            }
            dispatch(setError(errorMessage));
          })
          .finally(() => {
            setSubmitting(false);
          });
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

          {loginError && <div className="error server-error">{loginError}</div>}

          <button type="submit" disabled={isSubmitting || isLoading}>
            {isSubmitting || isLoading ? 'Загрузка...' : 'Войти'}
          </button>
        <div></div>
      </Form>)}
    </Formik>
  )
}

export default LoginForm
