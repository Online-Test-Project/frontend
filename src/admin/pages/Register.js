import React, { Component } from 'react';
import './LoginAndRegister.css';

import { authenticationService } from '../../_services/index';

class Register extends Component {
  constructor(props) {
    super(props);
    // redirect to home if already logged in
    if (authenticationService.currentUserValue) {
      this.props.history.push('/');
    }
    this.state = { username: '', password: '', repeatPassword: '', error: '' };
  }

  onSubmit() {
    // authenticationService.login()
    console.log('Submit');
    authenticationService
      .login(this.state.username, this.state.password)
      .then(user => {
        console.log(user);
        const { from } = this.props.location.state || {
          from: { pathname: '/' },
        };
        this.props.history.push(from);
      })
      .catch(err => {
        this.setState({
          error: 'Có lỗi xảy ra. Vui lòng thử lại!',
        });
        console.log(this.state.error);
      });
  }

  onChange(event) {
    const { name, value } = event.target;
    let newState = this.state;
    newState[name] = value;
    newState.error = "";
    this.setState(newState);
  }

  render() {
    return (
      <div className="login-2 tab-box">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-5 col-md-12 col-pad-0 bg-img none-992">
              <div className="informeson">
                <h3>My Test</h3>
                <p>
                  Giải pháp tốt nhất cho thi online thay thế việc thi truyền
                  thống.
                </p>
              </div>
            </div>
            <div className="col-lg-7 col-md-12 col-pad-0 bg-color">
              <div className="login-inner-form">
                <div className="details">
                  <a href="#">
                    <img src="assets/img/logos/logo.png" alt="logo" />
                  </a>
                  <h3>Đăng kí tài khoản</h3>
                  <form
                    action="http://storage.googleapis.com/themevessel-products/logdy/index.html"
                    method="GET"
                  >
                    <div className="form-group">
                      <input
                        type="text"
                        name="usẻname"
                        className="input-text"
                        placeholder="Tên đăng nhập"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        className="input-text"
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        name="password"
                        className="input-text"
                        placeholder="Mật khẩu"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        name="confirm-password"
                        className="input-text"
                        placeholder="Nhập lại mật khẩu"
                      />
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn-md btn-theme btn-block"
                      >
                        Đăng kí
                      </button>
                    </div>
                  </form>
                  <p className="none-2">
                    Bạn đã có tài khoản? <a href="login-2.html">Đăng nhập</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
