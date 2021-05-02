import "../../styles/main.scss";

const LoginScreen = () => {
  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1 mb-5">
          <h3>Login</h3>

          <form>
            <div className="form-group">
              <input
                name="name"
                type="text"
                className="form-control"
                placeholder="Correo"
                autoComplete="off"
              />
            </div>
            <div className="form-group mb-4">
              <input
                name="password"
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

          <form>
            <div className="form-group">
              <input
                name="name"
                type="text"
                className="form-control"
                placeholder="Name"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Email"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Password"
                autoComplete="off"
              />
            </div>

            <div className="form-group mb-4">
              <input
                name="password_confirmation"
                type="password"
                className="form-control"
                placeholder="Password Confirmation"
                autoComplete="off"
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
