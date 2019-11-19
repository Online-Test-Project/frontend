import React, { Component } from 'react';
import Layout from '../components/Layout/Layout';
import './ViewExamAdmin.css';
import axios from 'axios';
import config from '../../_config/config';
import { authHeader } from '../../_helpers/auth-header';

class ViewExamAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      exam: {},
      examData: [],
    };
    console.log(this.state);
  }

  async componentDidMount() {
    axios
      .get(config.SERVER_URL + '/api/exam/get/' + this.state.id, {
        headers: authHeader(),
      })
      .then(response => {
        console.log(response.data);
        const data = response.data;
        this.setState({ examData: data.questions });
        this.setState({ exam: data });
      });
  }

  render() {
    const questions = this.state.examData.map((question, index) => {
      if (question.type === 1) {
        return (
          <div className="question" id={index + 1} key={index + 1}>
            <div className="question-title">
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
                      <div className="select-answer">
                        {question.answers.map((answer, i) => (
                          <div className="options col-sm mb-2 md-4">
                            <div className="select-check">
                              {String.fromCharCode(i + 65)}
                            </div>
                            <div className="text-wrap">{answer.content}</div>
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
      } else if (question.type == 2) {
        return (
          <div className="question" id={index + 1} key={index + 1}>
            <div className="question-title">
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
                      <div className="select-answer">
                        {question.answers.map((answer, i) => (
                          <div className="options col-sm mb-2 md-4 multiselect-checked">
                            <div className="multiselect-check">
                              {/* <i className="fa fa-check" aria-hidden="" /> */}
                            </div>
                            <div className="text-wrap">{answer.content}</div>
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
      } else if (question.type == 3) {
        return (
          <div className="question" id={index + 1} key={index + 1}>
            <div className="question-title">
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
                      <div className="select-answer">
                        <div className="options col-sm mb-2 md-4">
                          <div className="text-wrap float-left">Đáp án: </div>
                          <input
                            type="text"
                            className="input-answer"
                            disabled
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
    });

    const linkQuestion = this.state.examData.map((question, index) => {
      return (
        <li className="page-item float-left ">
          <a className="page-link" href={'#' + (index + 1)}>
            {index + 1}
          </a>
        </li>
      );
    });

    return (
      <Layout>
        <div id="content">
          <div id="list-question" className="list-question col-sm-2 mt-3">
            <div className="time">
              Thời gian: {this.state.exam.time + ' phút'}
            </div>
            <div className="row-fluid" id="pagination-question">
              <ul
                className="pagination pagination-sm d-inline-block"
                id="question-nos"
              >
                {linkQuestion}
              </ul>
            </div>
          </div>
          <div id="exam-test" className="exam-test col-sm-10 mt-3">
            <h4>{this.state.exam.name}</h4>
            {questions}
          </div>
        </div>
      </Layout>
    );
  }
}
export default ViewExamAdmin;
