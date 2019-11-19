import React, { Component } from 'react';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../_config/config';
import { authHeader } from '../../_helpers/auth-header';
import Countdown from 'react-countdown-now';

import './ExamPage.css';

const timeRenderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <div>Chạy xong rồi!</div>;
  } else {
    // Render a countdown
    return (
      <span>
        {minutes}:{seconds}
      </span>
    );
  }
};

class DoingExam extends Component {
  //state={status: "early"|"late"|"intime"|"doing"|"viewResult"}
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      status: 'intime',
      name: '',
      time: 0,
      startTime: '',
      endTime: '',
      password: '',
      timeRemaining: '',
      examData: [],
      isRandom: false,
      scrore: 0,
    };
  }

  componentDidMount() {
    axios
      .get(config.SERVER_URL + '/api/examinee/get/' + this.state.id, {
        headers: authHeader(),
      })
      .then(res => {
        console.log(res.data);
        const exam = res.data;
        this.setState({
          name: exam.name,
          time: exam.time,
          startTime: exam.startTime,
          endTime: exam.endTime,
          status: exam.status,
          isRandom: exam.isRandom,
        });
      });
  }

  getTime() {
    return Number.parseInt(this.state.timeRemaining);
  }

  updateTimeRemaining() {
    this.setState({
      timeRemaining: Number.parseInt(this.state.timeRemaining) - 1000,
    });
  }

  onChange(event) {
    const { name, value } = event.target;
    const currentEdit = this.state;
    currentEdit[name] = value;
    this.setState(currentEdit);
    console.log(this.state.password);
  }

  onEnterExam() {
    console.log('id: ' + this.state.id + ' pass: ' + this.state.password);
    axios
      .post(
        config.SERVER_URL + '/api/examinee/do',
        { id: this.state.id, password: this.state.password },
        {
          headers: authHeader(),
        },
      )
      .then(async res => {
        const examData = await res.data.examineeQuestions.map(question => {
          const listAnswer = question.answers.map(answer => {
            return { id: answer.id, content: answer.content, selected: false };
          });
          return {
            id: question.id,
            type: question.type,
            content: question.content,
            answers: listAnswer,
            isAnswered: false,
          };
        });
        await this.setState({
          timeRemaining: res.data.timeRemaining,
          examData: examData,
          status: 'doing',
        });
        console.log(this.state);
      })
      .catch(error => {
        alert('Có lỗi xảy ra!');
      });
  }

  onChangeAnswer(questionId, answerId) {
    let newExamData = this.state.examData;
    for (let i = 0; i < newExamData.length; i++) {
      if (newExamData[i].id === questionId) {
        let newQuestion = newExamData[i];
        if (newQuestion.type === 1) {
          for (let j = 0; j < newQuestion.answers.length; j++) {
            if (newQuestion.answers[j].id === answerId) {
              newQuestion.answers[j].selected = true;
            } else {
              newQuestion.answers[j].selected = false;
            }
          }
          newQuestion.isAnswered = true;
          newExamData[i] = newQuestion;
          break;
        } else if (newQuestion.type === 2) {
          for (let j = 0; j < newQuestion.answers.length; j++) {
            if (newQuestion.answers[j].id === answerId) {
              newQuestion.answers[j].selected = !newQuestion.answers[j]
                .selected;
            }
          }
          newQuestion.isAnswered = true;
          newExamData[i] = newQuestion;
          break;
        }
      }
    }
    this.setState({ examData: newExamData });
  }

  onChangeInputAnswer(questionId, name) {
    let newExamData = this.state.examData;
    for (let i = 0; i < newExamData.length; i++) {
      if (newExamData[i].id === questionId) {
        const answer = document.getElementsByName(name)[0].value;
        newExamData[i].answers[0].content = answer;
        newExamData[i].answers[0].selected = 'true';
        newExamData[i].isAnswered = true;
        break;
      }
    }
    this.setState({ examData: newExamData });
  }

  async onSubmit() {
    let listAnswerDetail = await this.state.examData.map(question => {
      const userAnswers = question.answers.map(answer => {
        return { AnswerId: answer.id, IsSelected: answer.selected.toString() };
      });
      if (question.type === 1 || question.type === 2) {
        return {
          QuestionId: question.id,
          UserAnswers: userAnswers,
          Content: '',
        };
      } else if (question.type === 3) {
        return {
          QuestionId: question.id,
          UserAnswers: [],
          Content: question.answers[0].content,
        };
      }
    });
    console.log(listAnswerDetail);
    await axios
      .post(
        config.SERVER_URL + '/api/examinee/submit',
        {
          ExamId: this.state.id,
          AnswerDetails: listAnswerDetail,
        },
        {
          headers: authHeader(),
        },
      )
      .then(res => {
        console.log(res.data);
        if (res.data) {
          this.setState({ status: 'viewResult', score: res.data.score });
        }
      });
  }

  render() {
    return (
      <Layout>
        <div className="table-content">
          <div className="header-row-list">
            <div className="title">
              <h3 className="pt-2 ml-3 font-weight-bold">Làm bài</h3>
            </div>
          </div>
          {this.state.status === 'doing' ? (
            <React.Fragment>
              <div id="content row">
                <div id="list-question" className="list-question col-sm-2">
                  <div className="time">
                    Thời gian còn:{' '}
                    <Countdown
                      date={Date.now() + this.getTime()}
                      onTick={() => {
                        this.updateTimeRemaining();
                      }}
                      renderer={timeRenderer}
                      onComplete={() => this.onSubmit()}
                    ></Countdown>
                  </div>
                  <div className="row-fluid" id="pagination-question">
                    <ul
                      className="pagination pagination-sm d-inline-block"
                      id="question-nos"
                    >
                      {this.state.examData.map((question, index) => {
                        return (
                          <li
                            className={
                              question.isAnswered
                                ? 'page-item float-left is-answered active'
                                : 'page-item float-left'
                            }
                            key={index + 1}
                          >
                            <a className="page-link" href={'#' + (index + 1)}>
                              {index + 1}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="clssubmit">
                    <button
                      className="btn-rounded btn btn-success submit"
                      data-toggle="modal"
                      data-target="#submitModal"
                    >
                      Nộp bài
                    </button>
                  </div>
                </div>
                <div id="exam-test" className="exam-test col-sm-10">
                  <h4>{this.state.name}</h4>
                  {this.state.examData.map((question, index) => {
                    if (question.type === 1) {
                      return (
                        <div
                          className="question"
                          id={index + 1}
                          key={index + 1}
                        >
                          <div className="question-title pt-2">
                            <div className="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">
                              {index + 1}.
                            </div>
                            {question.content}
                          </div>
                          <div className="d-flex bd-highlight">
                            <div className="w-100 bd-highlight">
                              <div className="card card-question">
                                <div className="card-body">
                                  <div className="content">
                                    <div className="row select-answer">
                                      {question.answers.map((answer, i) => {
                                        return (
                                          <div
                                            className={
                                              answer.selected
                                                ? 'options col-sm mb-2 md-4 select-checked'
                                                : 'options col-sm mb-2 md-4'
                                            }
                                          >
                                            <div
                                              className="select-check"
                                              onClick={() =>
                                                this.onChangeAnswer(
                                                  question.id,
                                                  answer.id,
                                                )
                                              }
                                            >
                                              {String.fromCharCode(i + 65)}
                                            </div>
                                            <div className="text-wrap">
                                              {answer.content}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    } else if (question.type === 2) {
                      return (
                        <div
                          className="question"
                          id={index + 1}
                          key={index + 1}
                        >
                          <div className="question-title pt-2">
                            <div className="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">
                              {' '}
                              {index + 1}.{' '}
                            </div>
                            {question.content}
                          </div>
                          <div className="d-flex bd-highlight">
                            <div className="w-100 bd-highlight">
                              <div className="card card-question">
                                <div className="card-body">
                                  <div className="content">
                                    <div className="row select-answer">
                                      {question.answers.map((answer, i) => (
                                        <div
                                          className={
                                            answer.selected
                                              ? 'options col-sm mb-2 md-4 multiselect-checked'
                                              : 'options col-sm mb-2 md-4'
                                          }
                                          onClick={() =>
                                            this.onChangeAnswer(
                                              question.id,
                                              answer.id,
                                            )
                                          }
                                        >
                                          <div className="multiselect-check">
                                            {answer.selected ? (
                                              <i
                                                className="fa fa-check"
                                                aria-hidden=""
                                              />
                                            ) : (
                                              ''
                                            )}
                                          </div>
                                          <div className="text-wrap">
                                            {answer.content}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    } else if (question.type === 3) {
                      return (
                        <div
                          className="question"
                          id={index + 1}
                          key={index + 1}
                        >
                          <div className="question-title pt-2">
                            <div className="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">
                              {index + 1}.{' '}
                            </div>
                            {question.content}
                          </div>
                          <div className="d-flex bd-highlight">
                            <div className="w-100 bd-highlight">
                              <div className="card card-question">
                                <div className="card-body">
                                  <div className="content">
                                    <div className="row select-answer">
                                      <div className="options col-sm mb-2 md-4">
                                        <div className="text-wrap float-left">
                                          Đáp án:{' '}
                                        </div>
                                        <textarea
                                          type="text"
                                          className="input-answer"
                                          name={'input' + question.id}
                                          onChange={() =>
                                            this.onChangeInputAnswer(
                                              question.id,
                                              'input' + question.id,
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div
                className="modal fade"
                id="submitModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLongTitle">
                        Nộp bài
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      Bạn sẽ không thể thay đổi bài làm sau khi nộp.
                      <br />
                      Bạn có muốn nộp bài ngay?{' '}
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Hủy
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-dismiss="modal"
                        onClick={() => this.onSubmit()}
                      >
                        Nộp bài ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="clear"></div>
            </React.Fragment>
          ) : this.state.status === 'viewResult' ? (
            <div className="container white-box col-6">
              <h4 className="mt-2 font-weight-bold">{this.state.name}</h4>
              <span>
                <b>Thời gian: </b> {this.state.time} phút
              </span>
              <br />
              <span>
                <b>Thời gian mở đề: </b>từ <b>{this.state.startTime} </b> đến{' '}
                <b> {this.state.endTime}</b>
              </span>
              <br />
              <br />
              <div className="text-center">
                <h5>
                  <b>Điểm: </b>
                  {this.state.score}
                </h5>
              </div>
            </div>
          ) : (
            <div className="container white-box col-6">
              <h4 className="mt-2 font-weight-bold">{this.state.name}</h4>
              <span>
                <b>Thời gian: </b> {this.state.time} phút
              </span>
              <br />
              <span>
                <b>Thời gian mở đề: </b>từ <b>{this.state.startTime} </b> đến{' '}
                <b> {this.state.endTime}</b>
              </span>
              <br />
              <div className="exam-status mt-2">
                {this.state.status === 'early' ? (
                  <div className="alert alert-danger">
                    Chưa đến thời gian làm bài
                  </div>
                ) : this.state.status === 'late' ? (
                  <div className="alert alert-danger">
                    Đã hết thời gian mở đề
                  </div>
                ) : (
                  <div>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Nhập mật khẩu đề thi"
                      name="password"
                      onChange={event => this.onChange(event)}
                    />
                    <button
                      className="btn btn-success mt-2"
                      onClick={() => this.onEnterExam()}
                    >
                      Vào làm
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Layout>
    );
  }
}

export default DoingExam;
