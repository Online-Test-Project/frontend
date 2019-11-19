import React, { Component } from 'react';
import './LoginAndRegister.css';
import { Link } from 'react-router-dom';

import { authenticationService } from '../../_services/index';

class Login extends Component {
  constructor(props) {
    super(props);
    // redirect to home if already logged in
    if (authenticationService.currentUserValue) {
      this.props.history.push('/');
    }
    this.state = { username: '', password: '', error: '' };
  }

  onSubmit() {
    if (
      this.state.username === '' ||
      this.state.password === '' ||
      this.state.repeatPassword === ''
    ) {
      this.setState({ error: 'Vui lòng nhập đủ thông tin!' });
    } else {
      authenticationService
        .login(this.state.username, this.state.password)
        .then(user => {
          const { from } = this.props.location.state || {
            from: { pathname: '/' },
          };
          this.props.history.push(from);
        })
        .catch(err => {
          this.setState({
            error: 'Tên tài khoản không đúng hoặc mật khẩu không chính xác!',
          });
        });
    }
  }

  onChange(event) {
    const { name, value } = event.target;
    let newState = this.state;
    newState[name] = value;
    newState.error = '';
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <div className="login-2 tab-box">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-7 col-md-12 col-pad-0 bg-img none-992">
                <div className="informeson">
                  <h3>My Test</h3>
                  <p>
                    Giải pháp tốt nhất cho thi online thay thế việc thi truyền
                    thống.
                  </p>
                </div>
              </div>
              <div className="col-lg-7 col-md-12 col-pad-0 bg-color align-self-center">
                <div className="login-inner-form">
                  <div className="details">
                    <a href="../../images/loginbackground.jpg">
                      <img src="../../images/loginbackground.jpg" alt="logo" />
                    </a>
                    <h3>Đăng nhập vào tài khoản của bạn</h3>
                    <form>
                      <div className="form-group">
                        <input
                          type="text"
                          name="username"
                          onChange={event => this.onChange(event)}
                          className="input-text"
                          placeholder="Tên đăng nhập"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          name="password"
                          onChange={event => this.onChange(event)}
                          className="input-text"
                          placeholder="Mật khẩu"
                        />
                      </div>
                      <div className="checkbox clearfix">
                        <div className="form-check checkbox-theme">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="rememberMe"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="rememberMe"
                          >
                            Nhớ tài khoản
                          </label>
                        </div>
                        <a href="forgot-password-2.html">Quên mật khẩu</a>
                      </div>
                      {this.state.error === '' ? (
                        <div></div>
                      ) : (
                        <div className="alert alert-danger">
                          {this.state.error}
                        </div>
                      )}
                      <div className="form-group">
                        <button
                          type="button"
                          className="btn-md btn-theme btn-block"
                          onClick={() => this.onSubmit()}
                        >
                          Đăng nhập
                        </button>
                      </div>
                      <p className="none-2">
                        Bạn chưa có tài khoản?
                        <Link to="/register">Đăng kí</Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
