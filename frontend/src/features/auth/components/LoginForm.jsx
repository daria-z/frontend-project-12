import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';

import { useLoginMutation } from '../authApi'
import { setLogin, setError } from '../authSlice'

function LoginForm() {
  const [ login ] = useLoginMutation();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={async (values) => {
        console.log('onSubmit')
        try {
          const response = await login(values).unwrap();
          dispatch(setLogin({ username: response.username, token: response.token }));
          localStorage.setItem('token', response.token);
          console.log('в localStorage: ', localStorage.getItem('token'));
          navigate('/');
        } catch {
          dispatch(setError('Unauthorized'));
          // TODO: нужна нормальная обработка ошибок. 401 и проблем с сетью
        }
      }}
    >
      <Form>
        <label htmlFor="username">Ваш ник</label>
        <Field id="username" name="username" placeholder="Ваш ник" />

        <label htmlFor="password">Пароль</label>
        <Field id="password" name="password" type="password" placeholder="Пароль" />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Войти</button>
        <div></div>
      </Form>
    </Formik>
  )
}

export default LoginForm
