import "../../styles/main.scss";
import useForm from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startLogin, startRegister } from '../../actions/auth';
import Swal from 'sweetalert2';

const LoginScreen = () => {

  const dispatch = useDispatch();

  const [ formLoginValues, handleLoginInputChange ] = useForm({
    loginEmail:    "",
    loginPassword: "",
  });

  const { loginEmail, loginPassword } = formLoginValues;

  const [ formRegisterValues, handleRegisterInputChange ] = useForm({
    registerName:          "",
    registerEmail:         "",
    registerPassword:      "",
    passwordConfirmation:  "",
  });

  const { registerName, registerEmail, registerPassword, passwordConfirmation } = formRegisterValues;

  // Login de usuario
  const handleLogin = (event) => {
    event.preventDefault();

    dispatch( startLogin( loginEmail, loginPassword ) );
  };

  // Registro de usuario
  const handleRegister = (event) => {
    event.preventDefault();

    if( registerPassword !== passwordConfirmation ) {
      return Swal.fire("Error", "Las contraseñas deben coincidir", "error");
    }

    dispatch( startRegister( registerName, registerEmail, registerPassword ) );
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1 mb-5">
          <h3>Login</h3>

          <form onSubmit={ handleLogin }>
            <div className="form-group">
              <input
                name="loginEmail"
                value={ loginEmail }
                onChange={ handleLoginInputChange }
                type="text"
                className="form-control"
                placeholder="Correo"
                autoComplete="off"
              />
            </div>
            <div className="form-group mb-4">
              <input
                name="loginPassword"
                value={ loginPassword }
                onChange={ handleLoginInputChange }
                type="password"
                className="form-control"
                autoComplete="off"
              />
            </div>
            <div className="form-group text-center">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>

        </div>

        <div className="col-md-6 login-form-2 mb-5">
          <h3>Register</h3>

          <form onSubmit={ handleRegister }>
            <div className="form-group">
              <input
                name="registerName"
                type="text"
                className="form-control"
                placeholder="Name"
                autoComplete="off"
                onChange={ handleRegisterInputChange }
                value={ registerName }
              />
            </div>
            <div className="form-group">
              <input
                name="registerEmail"
                type="email"
                className="form-control"
                placeholder="Email"
                autoComplete="off"
                onChange={ handleRegisterInputChange }
                value={ registerEmail }
              />
            </div>
            <div className="form-group">
              <input
                name="registerPassword"
                type="password"
                className="form-control"
                placeholder="Password"
                autoComplete="off"
                onChange={ handleRegisterInputChange }
                value={ registerPassword }
              />
            </div>

            <div className="form-group mb-4">
              <input
                name="passwordConfirmation"
                type="password"
                className="form-control"
                placeholder="Password Confirmation"
                autoComplete="off"
                onChange={ handleRegisterInputChange }
                value={ passwordConfirmation }
              />
            </div>

            <div className="form-group text-center">
              <input type="submit" className="btnSubmit" value="Create Account" />
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
