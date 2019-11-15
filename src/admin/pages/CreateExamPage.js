import React, { Component } from 'react';
import Layout from '../components/Layout/Layout';
import './CreateExamPage.css';
import { Link } from 'react-router-dom';
import ListAdminExam from './ListAdminExam';
import axios from 'axios';
import config from '../../_config/config'
import { authHeader } from '../../_helpers/auth-header';

class CreateExamPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameExam: "",
      time:"",
      difficulty: {easy: '', medium: '', hard: ''},
      bankId: "",
      listBank: [],
    };
  }
  async componentDidMount() {
    axios
      .get(config.SERVER_URL+'/api/bank/list', {
        headers: authHeader()
      })
      .then(response => {
        console.log(response.data);
        const data = response.data;
        let arrBank = data.map((bank, index) => {
          return {id: bank.id, name: bank.name };
        });
        this.setState({ listBank: arrBank, bankId: arrBank[0].id});
      });
  }    
    handleChange(e){
    const { name, value } = e.target;
    const currentEdit = this.state;
    currentEdit[name] = value;
    this.setState(currentEdit);
    console.log(this.state);
  }

  



  onRandom() {
    console.log("random de thi");
      axios
      .post(config.SERVER_URL+'/api/exam/createrandom', {
        bankId: this.state.bankId,
        name: this.state.nameExam,
        difficulty : [parseInt(this.state.easy), parseInt(this.state.medium), parseInt(this.state.hard)],
        time: this.state.time,
    },
     {
        headers: authHeader()
      })
        .then(response => {
          console.log(response.data);
        });
  }




  render() {
    let banks = this.state.listBank.map((bank, index) => {
      return(
        <option name="bankName" value={bank.id}>{bank.name}</option>
      );
    })
    return (
      
      <Layout>
        
        <div className="main-content" id="field-main">
          {/* <div className="header row">
            <div className="row justify-content-end header-wrapper-end">
              <div className="header-item-wrapper">
                <div className="fa fa-user-circle-o fomat-icon-menu" />
                <div className="item-text">Nguyễn Thị Ngọc</div>
              </div>
              <div className="header-item-wrapper">
                <div className="fa fa-question-circle fomat-icon-menu" />
                <div className="item-text">Trợ giúp</div>
              </div>
              <div className="header-item-wrapper">
                <div className="fa fa-phone fomat-icon-menu" />
                <div className="item-text">Liên hệ</div>
              </div>
            </div>
          </div> */}
          <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand">Tạo đề thi</a>
            <form className="form-inline">
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Tạo đề
              </button>
              <div className style={{ width: '8px' }} />
              <button
                className="btn btn-outline-danger my-2 my-sm-0"
                type="submit"
              >
                Hủy
              </button>
            </form>

          </nav>

          <div className="p-3">
            <form>
              <fieldset>
                <legend>Thông tin đề thi</legend>
                <div className="form-row">
                  <div className="form-group row col-6">
                    <label
                      htmlFor="colFormLabel"
                      className="col-sm-3 col-form-label"
                    >
                      Tên đề thi:
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        name="nameExam"
                        value={this.state.nameExam}
                        id="colFormLabel"
                        placeholder="Nhập tên đề thi"
                        onChange={e => this.handleChange(e)}
                      />
                    </div>
                  </div>
                  <div className="form-group row col-6">
                    <label
                      htmlFor="colFormLabel"
                      className="col-sm-3 col-form-label"
                    >
                      Thời gian thi:
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="input"
                        className="form-control"
                        name="time"
                        id="colFormLabel"
                        placeholder="Nhập thời gian thi"
                        value={this.state.time}
                        onChange={(e) => this.handleChange(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row align-items-center">
                  <div className="form-group row col-6">
                    <label
                      htmlFor="colFormLabel"
                      className="col-sm-3 col-form-label"
                    >
                      Ngân hàng:
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="custom-select mr-sm-2"
                        id="inlineFormCustomSelect"
                        name="bankId"
                        onChange={e => this.handleChange(e)}
                      >
                        {banks}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <label>Dễ: </label>
                  <input type="text" name="easy" placeholder="Chỉ nhập khi bạn muốn tạo đề random..." className="form-control"
                  onChange={e => this.handleChange(e)}
                  // value={this.state.difficulty.easy}
                  ></input>
                  <label>Trung bình: </label>
                  <input type="text" name = "medium" placeholder="Chỉ nhập khi bạn muốn tạo đề random..." className="form-control"
                  // value={this.state.difficulty.medium}
                  onChange={e => this.handleChange(e)}
                  ></input>
                  <label>Khó: </label>
                  <input type="text" name = "hard" placeholder="Chỉ nhập khi bạn muốn tạo đề random..." className="form-control"
                  // value={this.state.difficulty.hard}
                  onChange={e => this.handleChange(e)}
                  ></input>
                </div>
                <div className="form-row">
                  <button type="button" className="btn btn-primary m-3" onClick={() => this.onRandom()}>
                    Random
                  </button>
                  <button type="button" className="btn btn-primary mt-3 mb-3">
                    fixed
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
          <div className="p-3 wrap-table">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Nội dung</th>
                  <th scope="col">Loại câu hỏi</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <i className="fa fa-trash-o" />
                  </td>
                </tr>
                <tr>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>
                    <i className="fa fa-trash-o" />
                  </td>
                </tr>
                <tr>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                  <td>
                    <i className="fa fa-trash-o" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    );
  }
}
export default CreateExamPage;
