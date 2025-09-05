import { Formik, Field, Form } from 'formik';
function LoginForm() {
  return (


    <Formik
      initialValues={{
        login: '',
        password: '',
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <label htmlFor="login">Ваш ник</label>
        <Field id="login" name="login" placeholder="Ваш ник" />

        <label htmlFor="password">Пароль</label>
        <Field id="password" name="password" placeholder="Пароль" />

        <button type="submit">Войти</button>
      </Form>
    </Formik>
  )
}

export default LoginForm
