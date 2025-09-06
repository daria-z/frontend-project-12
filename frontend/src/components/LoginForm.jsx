import axios from 'axios';
import { Formik, Field, Form } from 'formik';
function LoginForm() {
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={async (values, { setErrors }) => {
        const response = await axios.post('/api/v1/login', values)
        console.log(response.data.token)
        localStorage.setItem('token', response.data.token)
      }}
    >
      <Form>
        <label htmlFor="username">Ваш ник</label>
        <Field id="username" name="username" placeholder="Ваш ник" />

        <label htmlFor="password">Пароль</label>
        <Field id="password" name="password" placeholder="Пароль" />

        <button type="submit">Войти</button>
      </Form>
    </Formik>
  )
}

export default LoginForm
