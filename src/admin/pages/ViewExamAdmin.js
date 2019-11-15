import React, { Component } from 'react';
import Layout from '../components/Layout/Layout';
// import './ViewExamAdmin.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../_config/config'
import { authHeader } from '../../_helpers/auth-header';

class ViewExamAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {id: this.props.match.params.id};
        console.log(this.state);
    }

    render() {
      return(
        <Layout>
             <div>
        <div id="content">
          <div id="list-question" className="list-question col-sm-2">
            <div className="time">Thời gian còn: 39:45</div>
            <div className="row-fluid" id="pagination-question">
              <ul className="pagination pagination-sm d-inline-block" id="question-nos">
                <li className="page-item float-left ">
                  <a className="page-link" href="javascript:void(0)">01</a>
                </li>
                <li className="page-item float-left is-answered active">
                  <a className="page-link" href="javascript:void(0)">02</a>
                </li>
                <li className="page-item float-left is-answered active">
                  <a className="page-link" href="javascript:void(0)">03</a>
                </li>
                <li className="page-item float-left active">
                  <a className="page-link" href="javascript:void(0)">04</a>
                </li>
                <li className="page-item float-left ">
                  <a className="page-link" href="javascript:void(0)">05</a>
                </li>
                <li className="page-item float-left">
                  <a className="page-link" href="javascript:void(0)">06</a>
                </li>
                <li className="page-item float-left ">
                  <a className="page-link" href="javascript:void(0)">07</a>
                </li>
                <li className="page-item float-left ">
                  <a className="page-link" href="javascript:void(0)">08</a>
                </li>
                <li className="page-item float-left ">
                  <a className="page-link" href="javascript:void(0)">09</a>
                </li>
                <li className="page-item float-left">
                  <a className="page-link" href="javascript:void(0)">10</a>
                </li>
                <li className="page-item float-left ">
                  <a className="page-link" href="javascript:void(0)">11</a>
                </li>
                <li className="page-item float-left ">
                  <a className="page-link" href="javascript:void(0)">12</a>
                </li>
                <li className="page-item float-left ">
                  <a className="page-link" href="javascript:void(0)">13</a>
                </li>
                <li className="page-item float-left ">
                  <a className="page-link" href="javascript:void(0)">14</a>
                </li>
                <li className="page-item float-left ">
                  <a className="page-link" href="javascript:void(0)">15</a>
                </li>
                <li className="page-item float-left ">
                  <a className="page-link" href="javascript:void(0)">16</a>
                </li>
                <li className="page-item float-left ">
                  <a className="page-link" href="javascript:void(0)">17</a>
                </li>
                <li className="page-item float-left ">
                  <a className="page-link" href="javascript:void(0)">18</a>
                </li>
                <li className="page-item float-left ">
                  <a className="page-link" href="javascript:void(0)">19</a>
                </li>
                <li className="page-item float-left ">
                  <a className="page-link" href="javascript:void(0)">20</a>
                </li>
              </ul>
            </div>
            <div className="clssubmit">
              <a href="javacript:void(0)" className="btn-rounded btn btn-success submit">Nộp bài</a>
            </div>
          </div>
        </div>
        <div id="exam-test" className="exam-test col-sm-10">
          <h4>Công nghệ phần mềm( Giữa kì 19-20)</h4>
          <div className="question">
            <div className="question-title pt-2">
              <div className="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">1.</div>
              "I love you 3000"
            </div>
            <div className="d-flex bd-highlight">
              <div className="w-100 bd-highlight">
                <div className="card card-question">
                  <div className="card-body">
                    <div className="content">
                      <div className="row select-answer">
                        <div className="options col-sm mb-2 md-4">
                          <div className="select-check">A</div>
                          <div className="text-wrap">True</div>
                        </div>
                        <div className="options col-sm mb-2 md-4">
                          <div className="select-check">A</div>
                          <div className="text-wrap">True</div>
                        </div>
                        <div className="options col-sm mb-2 md-4">
                          <div className="select-check">B</div>
                          <div className="text-wrap">False</div>
                        </div>
                        <div className="options col-sm mb-2 md-4">
                          <div className="select-check">C</div>
                          <div className="text-wrap">I love you 3000</div>
                        </div>
                        <div className="options col-sm mb-2 md-4">
                          <div className="select-check">D</div>
                          <div className="text-wrap">Cause you my ironman and i love you 3000</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="question">
            <div className="question-title pt-2">
              <div className="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">2.</div>
              "V-ed để chỉ cảm giác mang chủ nghĩa cá nhân"
            </div>
            <div className="d-flex bd-highlight">
              <div className="w-100 bd-highlight">
                <div className="card card-question">
                  <div className="card-body">
                    <div className="content">
                      <div className="row select-answer">
                        <div className="options col-sm mb-2 md-4 ">
                          <div className="select-check">A</div>
                          <div className="text-wrap">True</div>
                        </div>
                        <div className="options col-sm mb-2 md-4 ">
                          <div className="select-check">D</div>
                          <div className="text-wrap">Cause you my ironman and i love you 3000</div>
                        </div>
                        <div className="options col-sm mb-2 md-4 ">
                          <div className="select-check">B</div>
                          <div className="text-wrap">False</div>
                        </div>
                        <div className="options col-sm mb-2 md-4 ">
                          <div className="select-check">C</div>
                          <div className="text-wrap">I love you 3000</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="question">
            <div className="question-title pt-2">
              <div className="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">3.</div>
              "so sánh hơn the more SV, the more SV"
            </div>
            <div className="d-flex bd-highlight">
              <div className="w-100 bd-highlight">
                <div className="card card-question">
                  <div className="card-body">
                    <div className="content">
                      <div className="row select-answer">
                        <div className="options col-sm mb-2 md-4 ">
                          <div className="select-check">A</div>
                          <div className="text-wrap">True</div>
                        </div>
                        <div className="options col-sm mb-2 md-4 ">
                          <div className="select-check">B</div>
                          <div className="text-wrap">False</div>
                        </div>
                        <div className="options col-sm mb-2 md-4 ">
                          <div className="select-check">C</div>
                          <div className="text-wrap">I love you 3000</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* cau hoi chon dap an */}
          <div className="question">
            <div className="question-title pt-2">
              <div className="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">4.</div>
              "The more i love him, the more he hates me"
            </div>
            <div className="d-flex bd-highlight">
              <div className="w-100 bd-highlight">
                <div className="card card-question">
                  <div className="card-body">
                    <div className="content">
                      <div className="row select-answer">
                        <div className="options col-sm mb-2 md-4 multiselect-checked">
                          <div className="multiselect-check">
                            <i className="fa fa-check" aria-hidden="true" />
                          </div>
                          <div className="text-wrap">True</div>
                        </div>
                        <div className="options col-sm mb-2 md-4">
                          <div className="multiselect-check">
                            <i className="fa fa-check" aria-hidden="true" />
                          </div>
                          <div className="text-wrap">False</div>
                        </div>
                        <div className="options col-sm mb-2 md-4">
                          <div className="multiselect-check" />
                          <div className="text-wrap">I love you 3000</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="question">
            <div className="question-title pt-2">
              <div className="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">5.</div>
              "Choose the best answer"
            </div>
            <div className="d-flex bd-highlight">
              <div className="w-100 bd-highlight">
                <div className="card card-question">
                  <div className="card-body">
                    <div className="content">
                      <div className="row select-answer">
                        <div className="options col-sm mb-2 md-4 multiselect-checked">
                          <div className="multiselect-check">
                            <i className="fa fa-check" aria-hidden="true" />
                          </div>
                          <div className="text-wrap">True</div>
                        </div>
                        <div className="options col-sm mb-2 md-4">
                          <div className="multiselect-check">
                            <i className="fa fa-check" aria-hidden="true" />
                          </div>
                          <div className="text-wrap">False</div>
                        </div>
                        <div className="options col-sm mb-2 md-4">
                          <div className="multiselect-check" />
                          <div className="text-wrap">I love you 3000</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="question">
            <div className="question-title pt-2">
              <div className="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">6.</div>
              "Choose the best answer"
            </div>
            <div className="d-flex bd-highlight">
              <div className="w-100 bd-highlight">
                <div className="card card-question">
                  <div className="card-body">
                    <div className="content">
                      <div className="row select-answer">
                        <div className="options col-sm mb-2 md-4">
                          <div className="multiselect-check">
                          </div>
                          <div className="text-wrap">True</div>
                        </div>
                        <div className="options col-sm mb-2 md-4">
                          <div className="multiselect-check" />
                          <div className="text-wrap">In another life, i would be your girls</div>
                        </div>
                        <div className="options col-sm mb-2 md-4">
                          <div className="multiselect-check" />
                          <div className="text-wrap">False</div>
                        </div>
                        <div className="options col-sm mb-2 md-4">
                          <div className="multiselect-check" />
                          <div className="text-wrap">I love you 3000</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="question">
            <div className="question-title pt-2">
              <div className="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">7.</div>
              "Choose the best answer"
            </div>
            <div className="d-flex bd-highlight">
              <div className="w-100 bd-highlight">
                <div className="card card-question">
                  <div className="card-body">
                    <div className="content">
                      <div className="row select-answer">
                        <div className="options col-sm mb-2 md-4">
                          <div className="multiselect-check" />
                          <div className="text-wrap">True</div>
                        </div>
                        <div className="options col-sm mb-2 md-4">
                          <div className="multiselect-check" />
                          <div className="text-wrap">I, i, i only love you when you don't love me</div>
                        </div>
                        <div className="options col-sm mb-2 md-4">
                          <div className="multiselect-check" />
                          <div className="text-wrap">oh baby, why do you why do you love me</div>
                        </div>
                        <div className="options col-sm mb-2 md-4">
                          <div className="multiselect-check" />
                          <div className="text-wrap">False</div>
                        </div>
                        <div className="options col-sm mb-2 md-4">
                          <div className="multiselect-check" />
                          <div className="text-wrap">I love you 3000</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="question">
            <div className="question-title pt-2">
              <div className="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">8.</div>
              Điền vào chỗ trống: "I love you..."
            </div>
            <div className="d-flex bd-highlight">
              <div className="w-100 bd-highlight">
                <div className="card card-question">
                  <div className="card-body">
                    <div className="content">
                      <div className="row select-answer">
                        <div className="options col-sm mb-2 md-4">
                          <div className="text-wrap float-left">Đáp án: </div>   
                          <input type="text" className="input-answer" /> 
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="question">
              <div className="question-title pt-2">
                <div className="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">9.</div>
                Điền vào chỗ trống: "I love you..."
              </div>
              <div className="d-flex bd-highlight">
                <div className="w-100 bd-highlight">
                  <div className="card card-question">
                    <div className="card-body">
                      <div className="content">
                        <div className="row select-answer">
                          <div className="options col-sm mb-2 md-4">
                            <div className="text-wrap float-left">Đáp án: </div>   
                            <input type="text" className="input-answer" /> 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="question">
                <div className="question-title pt-2">
                  <div className="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">10.</div>
                  Điền vào chỗ trống: "I love you..."
                </div>
                <div className="d-flex bd-highlight">
                  <div className="w-100 bd-highlight">
                    <div className="card card-question">
                      <div className="card-body">
                        <div className="content">
                          <div className="row select-answer">
                            <div className="options col-sm mb-2 md-4">
                              <div className="text-wrap float-left">Đáp án: </div>   
                              <input type="text" className="input-answer" /> 
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="question">
                  <div className="question-title pt-2">
                    <div className="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">11.</div>
                    "Choose the best answer"
                  </div>
                  <div className="d-flex bd-highlight">
                    <div className="w-100 bd-highlight">
                      <div className="card card-question">
                        <div className="card-body">
                          <div className="content">
                            <div className="row select-answer">
                              <div className="options col-sm mb-2 md-4">
                                <div className="multiselect-check" />
                                <div className="text-wrap">True</div>
                              </div>
                              <div className="options col-sm mb-2 md-4">
                                <div className="multiselect-check" />
                                <div className="text-wrap">I, i, i only love you when you don't love me</div>
                              </div>
                              <div className="options col-sm mb-2 md-4">
                                <div className="multiselect-check" />
                                <div className="text-wrap">oh baby, why do you why do you love me</div>
                              </div>
                              <div className="options col-sm mb-2 md-4">
                                <div className="multiselect-check" />
                                <div className="text-wrap">False</div>
                              </div>
                              <div className="options col-sm mb-2 md-4">
                                <div className="multiselect-check" />
                                <div className="text-wrap">I love you 3000</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="question">
                  <div className="question-title pt-2">
                    <div className="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">12.</div>
                    "Choose the best answer"
                  </div>
                  <div className="d-flex bd-highlight">
                    <div className="w-100 bd-highlight">
                      <div className="card card-question">
                        <div className="card-body">
                          <div className="content">
                            <div className="row select-answer">
                              <div className="options col-sm mb-2 md-4">
                                <div className="multiselect-check" />
                                <div className="text-wrap">True</div>
                              </div>
                              <div className="options col-sm mb-2 md-4">
                                <div className="multiselect-check" />
                                <div className="text-wrap">I, i, i only love you when you don't love me</div>
                              </div>
                              <div className="options col-sm mb-2 md-4">
                                <div className="multiselect-check" />
                                <div className="text-wrap">oh baby, why do you why do you love me</div>
                              </div>
                              <div className="options col-sm mb-2 md-4">
                                <div className="multiselect-check" />
                                <div className="text-wrap">False</div>
                              </div>
                              <div className="options col-sm mb-2 md-4">
                                <div className="multiselect-check" />
                                <div className="text-wrap">I love you 3000</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="question">
                  <div className="question-title pt-2">
                    <div className="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">13.</div>
                    "Choose the best answer"
                  </div>
                  <div className="d-flex bd-highlight">
                    <div className="w-100 bd-highlight">
                      <div className="card card-question">
                        <div className="card-body">
                          <div className="content">
                            <div className="row select-answer">
                              <div className="options col-sm mb-2 md-4">
                                <div className="multiselect-check" />
                                <div className="text-wrap">True</div>
                              </div>
                              <div className="options col-sm mb-2 md-4">
                                <div className="multiselect-check" />
                                <div className="text-wrap">I, i, i only love you when you don't love me</div>
                              </div>
                              <div className="options col-sm mb-2 md-4">
                                <div className="multiselect-check" />
                                <div className="text-wrap">oh baby, why do you why do you love me</div>
                              </div>
                              <div className="options col-sm mb-2 md-4">
                                <div className="multiselect-check" />
                                <div className="text-wrap">False</div>
                              </div>
                              <div className="options col-sm mb-2 md-4">
                                <div className="multiselect-check" />
                                <div className="text-wrap">I love you 3000</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="question">
                  <div className="question-title pt-2">
                    <div className="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">14.</div>
                    "Choose the best answer"
                  </div>
                  <div className="d-flex bd-highlight">
                    <div className="w-100 bd-highlight">
                      <div className="card card-question">
                        <div className="card-body">
                          <div className="content">
                            <div className="row select-answer">
                              <div className="options col-sm mb-2 md-4">
                                <div className="multiselect-check" />
                                <div className="text-wrap">True</div>
                              </div>
                              <div className="options col-sm mb-2 md-4">
                                <div className="multiselect-check" />
                                <div className="text-wrap">I, i, i only love you when you don't love me</div>
                              </div>
                              <div className="options col-sm mb-2 md-4">
                                <div className="multiselect-check" />
                                <div className="text-wrap">oh baby, why do you why do you love me</div>
                              </div>
                              <div className="options col-sm mb-2 md-4">
                                <div className="multiselect-check" />
                                <div className="text-wrap">False</div>
                              </div>
                              <div className="options col-sm mb-2 md-4">
                                <div className="multiselect-check" />
                                <div className="text-wrap">I love you 3000</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>    
              </div>
              <div className="clear" />
            </div>
          </div></div></div>
        </Layout>
    
      );
        }
}
export default ViewExamAdmin;