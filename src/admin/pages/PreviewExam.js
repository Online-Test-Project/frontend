import React, { Component } from 'react';
import Layout from '../components/Layout/Layout';
import './PreviewExam.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../_config/config';
import { authHeader } from '../../_helpers/auth-header';
class PreviewExam extends Component{
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
          .get(config.SERVER_URL + '/api/review/get/' + this.state.id, {
            headers: authHeader(),
          })
          .then(response => {
            console.log(response.data);
            const data = response.data;
            this.setState({ examData: data.reviewQuestions });
            this.setState({ exam: data });
          });
      }
    render(){

        const linkQuestion = this.state.examData.map((question, index) => {
                  
                  if(question.isCorrect=== true){
                      return(
                        <li className="page-item float-left is-answered-true">
                        <a className="page-link" href={'#' + (index + 1)}>
                          {index + 1}
                        </a>
                      </li>
                      );    
                  } else {
                    return(
                        <li className="page-item float-left is-answered-false">
                        <a className="page-link" href={'#' + (index + 1)}>
                          {index + 1}
                        </a>
                      </li>
                      );    
                  }      
          });

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
                         {question.reviewAnswers.map((answer, i) => {
                                  if (answer.isSelected ===true){
                                      if (question.isCorrect) {
                                          return (
                                            <div className="options col-sm mb-2 md-4 select-checked-true disable">
                                            <div className="select-check">
                                              {String.fromCharCode(i + 65)}
                                            </div>
                                            <div className="text-wrap">{answer.content}</div>
                                          </div>
                                          );
                                      } else {
                                          return(
                                              <div className="options col-sm mb-2 md-4 select-checked-false disable">
                                        <div className="select-check">
                                          {String.fromCharCode(i + 65)}
                                        </div>
                                        <div className="text-wrap">{answer.content}</div>
                                      </div>
                                          );
                                      }
                                  } else {
                                    return(
                                        <div className="options col-sm mb-2 md-4 disable">
                                        <div className="select-check">
                                          {String.fromCharCode(i + 65)}
                                        </div>
                                        <div className="text-wrap">{answer.content}</div>
                                      </div>
                                      );
                                  }
                                
                              }
                              )}
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
                              {question.reviewAnswers.map((answer, i) => {
                                  if (answer.isSelected ===true){
                                      if(question.isCorrect === true){
                                        return(
                                            <div className="options col-sm mb-2 md-4 disable multiselect-checked-true">
                                            <div className="multiselect-check">
                                              <i className="fa fa-check" aria-hidden="" />
                                            </div>
                                            <div className="text-wrap">{answer.content}</div>
                                          </div>
                                          );
                                      }else {
                                    return(
                                        <div className="options col-sm mb-2 md-4 disable multiselect-checked-false">
                                        <div className="multiselect-check">
                                          <i className="fa fa-check" aria-hidden="" />
                                        </div>
                                        <div className="text-wrap">{answer.content}</div>
                                      </div>
                                      );
                                  }
                                }else{
                                    return(
                                        <div className="options col-sm mb-2 md-4 disable multiselect-checked">
                                        <div className="multiselect-check">
                                          {/* <i className="fa fa-check" aria-hidden="" /> */}
                                        </div>
                                        <div className="text-wrap">{answer.content}</div>
                                      </div>
                                      );
                                }
                                
                              }
                              )
                              }
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
                <div className="question"  id={index + 1} key={index + 1}>
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
                            {question.reviewAnswers.map((answer, i) => {
                              if (answer.isCorrect ===true){
                                      return(
                                        <div className="options col-sm mb-2 md-4 disable input-answer-true">
                                  <div className="text-wrap float-left">Đáp án: </div>
                                <input
                                  type="text"
                                  className="input-answer"
                                  disabled
                                  value={answer.content}
                                />       
                              </div>
                                      );
                                  } else {
                                    return(
                                <div className="options col-sm mb-2 md-4 disable input-answer-false">
                                <div className="text-wrap float-left">Đáp án: </div>
                                <input
                                  type="text"
                                  className="input-answer"
                                  disabled
                                  value={answer.content}
                                />
                              </div>
                                      );
                                  }
                                
                              })}
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

      
        return(
            <Layout>

        <div id="content">
          <div id="list-question" className="list-question col-sm-2">
            <div className="time">Điểm: {this.state.exam.score}</div>

            <div className="row-fluid" id="pagination-question">
              <ul
                className="pagination pagination-sm d-inline-block"
                id="question-nos"
              >
                {linkQuestion}
              </ul>
            </div>
          </div>
          <div id="exam-test" className="exam-test col-sm-10">
            <h4>{this.state.exam.name}</h4>
            {questions}
          </div>
        </div>
            </Layout>
        );
    }
}
export default PreviewExam;