import React from 'react';
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';
import './HomePage.css';
import axios from 'axios';
import { authenticationService } from '../../_services/index';
import config from '../../_config/config';
import { authHeader } from '../../_helpers/auth-header';
import { Link } from 'react-router-dom';
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: authenticationService.currentUserValue,
      examUrl:"",
      statusUrl: false,
      examId: ""
    };
  }

  onChange(event) {
    const url = event.target.value;
    this.setState({examUrl: url});
  }

  async onEnterExam() {
    console.log("Ee vao lam bai  " + this.state.examUrl);
    const array = await this.state.examUrl.split("/");
    const id = array[array.length - 1];
    console.log(id);
    axios.get(config.SERVER_URL + '/api/examinee/get/' + id,
    {
      headers: authHeader()
    })
    .then(async res => {
      console.log(res.data);
      await this.setState({statusUrl: true, examId: id});
    }).catch(error => {
      alert("Mã đề hoặc liên kết không đúng!");
    })
   
  }

  render() {
    return (
      <React.Fragment>
        <Sidebar></Sidebar>
        <div className="main-content bg-img" id="field-main">
          <Header />
          <div className="text-center mt-5">
            <h1>LÀM BÀI NGAY</h1>
            <br />
            <div className="row">
              <div className="col-4" />
              <div className="form-group col-4">
                <label htmlFor="inputPassword2" className="sr-only">
                  Password
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword2"
                  placeholder="Nhập mã đề thi hoặc liên kết tới đề thi"
                  name="examUrl"
                  onChange={(event) => this.onChange(event)}
                />
              </div>
              <div className="col-4" />
            </div>
            {this.state.statusUrl ? <button className="btn btn-success mb-2"> <Link to={"/do-exam/" + this.state.examId} style={{color: "#fff" }} > Vào thi</Link> </button> : <button className="btn btn-primary mb-2" onClick={() => this.onEnterExam()}> Xác nhận </button>}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
