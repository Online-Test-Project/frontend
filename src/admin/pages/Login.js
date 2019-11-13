import React, { Component } from 'react';

import { authenticationService } from '../../_services/index';

class Login extends Component {
  constructor(props) {
    super(props);
    // redirect to home if already logged in
    if (authenticationService.currentUserValue) {
      this.props.history.push('/');
    }
    this.state = { username: "", password: "", error: "" };
  }

  onSubmit() {
    // authenticationService.login()
    console.log("Submit");
    authenticationService.login(this.state.username, this.state.password)
      .then(user => {
        console.log(user);
        const { from } = this.props.location.state || {
          from: { pathname: '/' },
        };
        this.props.history.push(from);
      })
      .catch(err => {
        this.setState({ error: "Tên tài khoản không đúng hoặc mật khẩu không chính xác!" });
        console.log(this.state.error);
      })
  }

  onChange(event) {
    const { name, value } = event.target;
    let newState = this.state;
    newState[name] = value;
    this.setState(newState);
    console.log(newState);
  }

  render() {
    return (
      <div className="container">
        <form>
          <div class="form-group">
            <label for=""></label>
            <input type="text"
              class="form-control" name="username" aria-describedby="helpId" placeholder="" onChange={(event) => this.onChange(event)} />
            <small id="helpId" class="form-text text-muted">Help text</small>
          </div>
          <div class="form-group">
            <label for=""></label>
            <input type="password" class="form-control" name="password" placeholder="" onChange={(event) => this.onChange(event)} />
          </div>
          {this.state.error === "" ? <div></div> : <div className="alert alert-danger">{this.state.error}</div>}
          <button type="button" class="btn btn-primary" onClick={() => this.onSubmit()} >Đăng nhập</button>
        </form>

      </div>

    );
  }
}

export default Login;