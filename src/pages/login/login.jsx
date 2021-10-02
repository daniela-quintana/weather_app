import './login.css';
import * as Yup from "yup";
import React from 'react';
import { Link } from "react-router-dom";
import { Formik, Field, ErrorMessage } from 'formik';

function Login() {

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Por favor ingresa un correo válido')
      .required('Campo requerido'),
    password: Yup.string()
      .required('Campo requerido')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[+*-_])[A-Za-z\d@$!%*#?&]/,
        'La contraseña debe contener minúsculas, una letra mayúscula, números y un caracter especial entre "+*-_"'),
  })

  const onSubmit = () => {
    <Link to="/weather" />
    console.log('submit');
  }

  return (
    <div className="container" id="container">
      <div className="form-container sign-in-container">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <form action="#" onSubmit={onSubmit}>
              <h1>Iniciar sesión</h1>
              <br />
              <Field name="email" type="email " placeholder="Correo" />
              {errors.email && touched.email ? (
                <ErrorMessage name="email" />
              ) : null}

              <Field name="password" type="password" placeholder="Contraseña" />
              {errors.password && touched.password ? (
                <ErrorMessage name="password" />
              ) : null}
              <br />
              <button type="submit"><Link className="signup" to="/weather"
                state={!errors}>Iniciar sesión</Link></button>
            </form>
          )}
        </Formik>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1>¡Bienvenido!</h1>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Login;
