import React, { Component } from 'react';
import './LoginAndRegister.css';

import {Link} from 'react-router-dom';
import { authenticationService } from '../../_services/index';
import logoPencilWhite from '../../images/logoPencilWhite.png';


class Register extends Component {
  constructor(props) {
    super(props);
    // redirect to home if already logged in
    if (authenticationService.currentUserValue) {
      this.props.history.push('/');
    }
    this.state = { username: '', password: '', repeatPassword: '', error: '' };
  }

  isValidPassword(password) {
    let pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return pattern.test(password);
  }

  onSubmit() {
    // authenticationService.login()
    console.log('Submit');
    if (
      this.state.username === '' ||
      this.state.password === '' ||
      this.state.repeatPassword === ''
    ) {
      this.setState({ error: 'Vui lòng nhập đủ thông tin!' });
    } else if (!this.isValidPassword(this.state.password)) {
      this.setState({ error: 'Mật khẩu không hợp lệ! Mật khẩu cần tối thiểu 8 kí tự, trong đó có ít nhất một chữ cái và một số, không chứa ký tự đặc biệt!' });
    } else if (this.state.password !== this.state.repeatPassword) {
      this.setState({ error: 'Nhập lại mật khẩu không đúng' });
    } else {
      authenticationService
        .register(this.state.username, this.state.password)
        .then(user => {
          console.log(user);
          const { from } = this.props.location.state || {
            from: { pathname: '/' },
          };
          this.props.history.push(from);
        })
        .catch(err => {
          this.setState({
            error: 'Tài khoản đã tồn tại!',
          });
          console.log(this.state.error);
        });
    }
  }

  onChange(event) {
    const { name, value } = event.target;
    let newState = this.state;
    newState[name] = value;
    newState.error = '';
    this.setState(newState);
    console.log(this.state);
  }

  render() {
    return (
      <div className="login-2 tab-box">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-pad-0 bg-img none-992">
            </div>
            <div className="col-lg-6 col-md-12 col-pad-0 bg-color">
              <div className="login-inner-form">
                <div className="details">
                <img src={logoPencilWhite} alt="logo" />
                  <h3>Đăng kí tài khoản</h3>
                  <form>
                    <div className="form-group">
                      <input
                        type="text"
                        name="username"
                        className="input-text"
                        placeholder="Tên đăng nhập"
                        onChange={e => this.onChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        name="password"
                        className="input-text"
                        placeholder="Mật khẩu"
                        onChange={e => this.onChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        name="repeatPassword"
                        className="input-text"
                        placeholder="Nhập lại mật khẩu"
                        onChange={e => this.onChange(e)}
                      />
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
                        Đăng kí
                      </button>
                    </div>
                  </form>
                  <p className="none-2">
                    Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
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
