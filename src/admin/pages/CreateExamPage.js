import React, { Component } from 'react';
import Layout from '../components/Layout/Layout';
import './CreateExamPage.css';
import { Link } from 'react-router-dom';
import ListAdminExam from './ListAdminExam';
import axios from 'axios';
import config from '../../_config/config';
import { authHeader } from '../../_helpers/auth-header';
import DateTimePicker from 'react-datetime-picker';

class CreateExamPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameExam: '',
      time: '',
      startTime: new Date(),
      endTime: new Date(),
      difficulty: { easy: '', medium: '', hard: '' },
      bankId: '',
      listBank: [],
      bankData: [],
    };
  }

  async componentDidMount() {
    await axios
      .get(config.SERVER_URL + '/api/bank/list', {
        headers: authHeader(),
      })
      .then(response => {
        console.log(response.data);
        const data = response.data;
        let arrBank = data.map((bank, index) => {
          return { id: bank.id, name: bank.name };
        });
        this.setState({ listBank: arrBank, bankId: arrBank[0].id });
      });
    axios
      .get(config.SERVER_URL + '/api/question/list/' + this.state.bankId, {
        headers: authHeader(),
      })
      .then(res => {
        const bankQuestions = res.data;
        let bankData = bankQuestions.map(question => {
          return {
            id: question.id,
            difficulty: question.difficulty,
            type: question.type,
            content: question.content,
            answers: question.answers,
            selected: false,
          };
        });
        this.setState({ bankData: bankData });
        console.log(this.state);
      });
  }
  handleChange(e) {
    const { name, value } = e.target;
    const currentEdit = this.state;
    currentEdit[name] = value;
    this.setState(currentEdit);
    console.log(this.state);
  }

  async onChangeBank(e) {
    const bankId = e.target.value;
    await this.setState({ bankId: bankId });
    await axios
      .get(config.SERVER_URL + '/api/question/list/' + this.state.bankId, {
        headers: authHeader(),
      })
      .then(async res => {
        await this.setState({ bankData: res.data });
      });
    console.log(this.state);
  }

  onCreateRandomExam(e) {
    e.preventDefault();
    if (
      this.state.nameExam === '' ||
      this.state.time === '' ||
      this.state.bankId === ''
    ) {
      alert('Bạn chưa nhập đủ thông tin đề thi!');
    } else {
      axios
        .post(
          config.SERVER_URL + '/api/exam/createrandom',
          {
            bankId: this.state.bankId,
            name: this.state.nameExam,
            difficulty: [
              parseInt(this.state.easy),
              parseInt(this.state.medium),
              parseInt(this.state.hard),
            ],
            startTime: this.state.startTime.toUTCString(),
            endTime: this.state.endTime.toUTCString(),
            time: this.state.time,
          },
          {
            headers: authHeader(),
          },
        )
        .then(response => {
          console.log(response.data);
          if (response.data === true) {
            alert('Tạo đề ngẫu nhiên thành công!');
          } else {
            alert('Tạo đề không thành công');
          }
          console.log(this.state.startTime);
        });
    }
  }

  onCreateFixedExam() {
    const listQuestions = this.state.bankData.filter(
      question => question.selected,
    );
    const listQuestionsId = listQuestions.map(question => question.id);
    console.log(listQuestionsId);
    if (
      this.state.nameExam === '' ||
      this.state.time === '' ||
      this.state.bankId === ''
    ) {
      alert('Bạn chưa nhập đủ thông tin đề thi!');
    } else {
      axios
        .post(
          config.SERVER_URL + '/api/exam/create',
          {
            bankID: this.state.bankId,
            name: this.state.nameExam,
            time: this.state.time,
            questionId: listQuestionsId,
            startTime: this.state.startTime.toUTCString(),
            endTime: this.state.endTime.toUTCString()
          },
          {
            headers: authHeader(),
          },
        )
        .then(res => {
          console.log(res.data);
          if (res.data == true) {
            alert('Tạo đề tự chọn thành công!');
          } else {
            alert('Tạo đề không thành công');
          }
        });
    }
  }

  async toggleSelect(id) {
    let newQuestion = this.state.bankData;
    for (let i = 0; i < newQuestion.length; i++) {
      if (newQuestion[i].id === id) {
        newQuestion[i].selected = !newQuestion[i].selected;
        break;
      }
    }
    await this.setState({ question: newQuestion });
  }

  onChangeStartTime = startTime => {
    this.setState({
      startTime: startTime,
    });
    console.log(startTime);
  };

  onChangeEndTime = endTime =>
    this.setState({
      endTime: endTime,
    });

  render() {
    let banks = this.state.listBank.map((bank, index) => {
      return (
        <option name="bankName" value={bank.id}>
          {bank.name}
        </option>
      );
    });
    return (
      <Layout>
        <div>
          <nav className="navbar navbar-light bg-light">
            <h3 className="font-weight-bold">Tạo đề thi</h3>
            <div className="form-inline">
              <div className style={{ width: '8px' }} />
              <button
                className="btn btn-outline-danger my-2 my-sm-0"
                type="submit"
              >
                Hủy
              </button>
            </div>
          </nav>
        </div>

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
                      type="number"
                      className="form-control"
                      name="time"
                      min="0"
                      id="colFormLabel"
                      placeholder="Nhập thời gian thi"
                      value={this.state.time}
                      onChange={e => this.handleChange(e)}
                    />{' '}
                    <label> phút</label>
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
                      onChange={e => this.onChangeBank(e)}
                    >
                      {banks}
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group row col-6">
                <label
                  htmlFor="colFormLabel"
                  className="col-sm-3 col-form-label"
                >
                  Thời gian bắt đầu:
                </label>
                <div className="col-sm-9">
                  <DateTimePicker
                    format="dd-MM-yyyy HH:mm"
                    onChange={this.onChangeStartTime}
                    value={this.state.startTime}
                  />
                </div>
              </div>

              <div className="form-group row col-6">
                <label
                  htmlFor="colFormLabel"
                  className="col-sm-3 col-form-label"
                >
                  Thời gian đóng:
                </label>
                <div className="col-sm-9">
                  <DateTimePicker
                    onChange={this.onChangeEndTime}
                    value={this.state.endTime}
                  />
                </div>
              </div>

              <div
                class="modal fade"
                id="randomModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="modelTitleId"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">Modal title</h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div className="form-row">
                        <label>Dễ: </label>
                        <input
                          type="number"
                          name="easy"
                          placeholder="Nhập số câu"
                          className="form-control"
                          onChange={e => this.handleChange(e)}
                          // value={this.state.difficulty.easy}
                        ></input>
                        <label>Trung bình: </label>
                        <input
                          type="number"
                          name="medium"
                          placeholder="Nhập số câu"
                          className="form-control"
                          // value={this.state.difficulty.medium}
                          onChange={e => this.handleChange(e)}
                          required
                        ></input>
                        <label>Khó: </label>
                        <input
                          type="number"
                          name="hard"
                          placeholder="Nhập số câu"
                          className="form-control"
                          // value={this.state.difficulty.hard}
                          onChange={e => this.handleChange(e)}
                        ></input>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        class="btn btn-primary"
                        data-dismiss="modal"
                        onClick={e => this.onCreateRandomExam(e)}
                      >
                        Tạo ngẫu nhiên
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <button
                  type="button"
                  className="btn btn-primary m-3"
                  data-toggle="modal"
                  data-target="#randomModal"
                >
                  Tạo ngẫu nhiên
                </button>
                <button
                  type="button"
                  className="btn btn-primary mt-3 mb-3"
                  onClick={() => this.onCreateFixedExam()}
                >
                  Tạo tự chọn
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
              {this.state.bankData.map(question => (
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      checked={!!question.selected}
                      onClick={() => this.toggleSelect(question.id)}
                      readOnly
                    ></input>
                  </td>
                  <td>{question.content}</td>
                  <td>
                    {question.type === 1
                      ? 'Single Choice'
                      : question.type === 2
                      ? 'Multiple Choice'
                      : 'Text Input'}
                  </td>
                  <td>
                    <i className="fa fa-trash-o" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    );
  }
}
export default CreateExamPage;
