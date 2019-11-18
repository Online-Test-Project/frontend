import React, { Component } from 'react';
import './ExamPage.css';
import axios from 'axios';
import config from '../../_config/config';
import { authHeader } from '../../_helpers/auth-header';

class ExamPage extends Component {
    constructor(props) {
        super(props);
        this.state ={id: window.location.pathname.split("/")[2]};
    }

    componentDidMount() {
          axios.post(config.SERVER_URL + "/api/examinee/do", {
              headers: authHeader()
          })
    }

    render() {
        return (
            <React.Fragment>
                <div id="content">
                    <div id="list-question" class="list-question col-sm-2">
                        <div class="time">Thời gian còn: 39:45</div>
                        <div class="row-fluid" id="pagination-question">
                            <ul class="pagination pagination-sm d-inline-block" id="question-nos">
                                <li class="page-item float-left ">
                                    <a class="page-link" href="javascript:void(0)">01</a>
                                </li>
                                <li class="page-item float-left is-answered active">
                                    <a class="page-link" href="javascript:void(0)">02</a>
                                </li>
                                <li class="page-item float-left is-answered active">
                                    <a class="page-link" href="javascript:void(0)">03</a>
                                </li>
                                <li class="page-item float-left active">
                                    <a class="page-link" href="javascript:void(0)">04</a>
                                </li>
                                <li class="page-item float-left ">
                                    <a class="page-link" href="javascript:void(0)">05</a>
                                </li>
                                <li class="page-item float-left">
                                    <a class="page-link" href="javascript:void(0)">06</a>
                                </li>
                                <li class="page-item float-left ">
                                    <a class="page-link" href="javascript:void(0)">07</a>
                                </li>
                                <li class="page-item float-left ">
                                    <a class="page-link" href="javascript:void(0)">08</a>
                                </li>
                                <li class="page-item float-left ">
                                    <a class="page-link" href="javascript:void(0)">09</a>
                                </li>
                                <li class="page-item float-left">
                                    <a class="page-link" href="javascript:void(0)">10</a>
                                </li>
                                <li class="page-item float-left ">
                                    <a class="page-link" href="javascript:void(0)">11</a>
                                </li>
                                <li class="page-item float-left ">
                                    <a class="page-link" href="javascript:void(0)">12</a>
                                </li>
                                <li class="page-item float-left ">
                                    <a class="page-link" href="javascript:void(0)">13</a>
                                </li>
                                <li class="page-item float-left ">
                                    <a class="page-link" href="javascript:void(0)">14</a>
                                </li>
                                <li class="page-item float-left ">
                                    <a class="page-link" href="javascript:void(0)">15</a>
                                </li>
                                <li class="page-item float-left ">
                                    <a class="page-link" href="javascript:void(0)">16</a>
                                </li>
                                <li class="page-item float-left ">
                                    <a class="page-link" href="javascript:void(0)">17</a>
                                </li>
                                <li class="page-item float-left ">
                                    <a class="page-link" href="javascript:void(0)">18</a>
                                </li>
                                <li class="page-item float-left ">
                                    <a class="page-link" href="javascript:void(0)">19</a>
                                </li>
                                <li class="page-item float-left ">
                                    <a class="page-link" href="javascript:void(0)">20</a>
                                </li>
                            </ul>
                        </div>
                        <div class="clssubmit">
                            <a href="javacript:void(0)" class="btn-rounded btn btn-success submit">Nộp bài</a>
                        </div>
                    </div>
                </div>
                <div id="exam-test" class="exam-test ">
                    <h4>Công nghệ phần mềm( Giữa kì 19-20)</h4>
                    <div class="question">
                        <div class="question-title pt-2">
                            <div class="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">1.</div>
                            "I love you 3000"
                    </div>
                        <div class="d-flex bd-highlight">
                            <div class="w-100 bd-highlight">
                                <div class="card card-question">
                                    <div class="card-body">
                                        <div class="content">
                                            <div class="select-answer">
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="select-check">A</div>
                                                    <div class="text-wrap">True</div>

                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="select-check">A</div>
                                                    <div class="text-wrap">True</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="select-check">B</div>
                                                    <div class="text-wrap">False</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="select-check">C</div>
                                                    <div class="text-wrap">I love you 3000</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="select-check">D</div>
                                                    <div class="text-wrap">Cause you my ironman and i love you 3000</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="question">
                        <div class="question-title pt-2">
                            <div class="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">2.</div>
                            "V-ed để chỉ cảm giác mang chủ nghĩa cá nhân"
                        </div>
                        <div class="d-flex bd-highlight">
                            <div class="w-100 bd-highlight">
                                <div class="card card-question">
                                    <div class="card-body">
                                        <div class="content">
                                            <div class="select-answer">
                                                <div class="options col-sm mb-2 md-4 ">
                                                    <div class="select-check">A</div>
                                                    <div class="text-wrap">True</div>

                                                </div>
                                                <div class="options col-sm mb-2 md-4 ">
                                                    <div class="select-check">D</div>
                                                    <div class="text-wrap">Cause you my ironman and i love you 3000</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4 ">
                                                    <div class="select-check">B</div>
                                                    <div class="text-wrap">False</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4 ">
                                                    <div class="select-check">C</div>
                                                    <div class="text-wrap">I love you 3000</div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="question">
                        <div class="question-title pt-2">
                            <div class="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">3.</div>
                            "so sánh hơn the more SV, the more SV"
                    </div>
                        <div class="d-flex bd-highlight">
                            <div class="w-100 bd-highlight">
                                <div class="card card-question">
                                    <div class="card-body">
                                        <div class="content">
                                            <div class="select-answer">
                                                <div class="options col-sm mb-2 md-4 ">
                                                    <div class="select-check">A</div>
                                                    <div class="text-wrap">True</div>

                                                </div>
                                                <div class="options col-sm mb-2 md-4 ">
                                                    <div class="select-check">B</div>
                                                    <div class="text-wrap">False</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4 ">
                                                    <div class="select-check">C</div>
                                                    <div class="text-wrap">I love you 3000</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="question">
                        <div class="question-title pt-2">
                            <div class="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">4.</div>
                            "The more i love him, the more he hates me"
                    </div>
                        <div class="d-flex bd-highlight">
                            <div class="w-100 bd-highlight">
                                <div class="card card-question">
                                    <div class="card-body">
                                        <div class="content">
                                            <div class="select-answer">
                                                <div class="options col-sm mb-2 md-4 multiselect-checked">
                                                    <div class="multiselect-check">
                                                        <i class="fa fa-check" aria-hidden="true"></i>
                                                    </div>
                                                    <div class="text-wrap">True</div>

                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check">
                                                        <i class="fa fa-check" aria-hidden="true"></i>
                                                    </div>
                                                    <div class="text-wrap">False</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">I love you 3000</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="question">
                        <div class="question-title pt-2">
                            <div class="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">5.</div>
                            "Choose the best answer"
                        </div>
                        <div class="d-flex bd-highlight">
                            <div class="w-100 bd-highlight">
                                <div class="card card-question">
                                    <div class="card-body">
                                        <div class="content">
                                            <div class="select-answer">
                                                <div class="options col-sm mb-2 md-4 multiselect-checked">
                                                    <div class="multiselect-check">
                                                        <i class="fa fa-check" aria-hidden="true"></i>
                                                    </div>
                                                    <div class="text-wrap">True</div>

                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check">
                                                        <i class="fa fa-check" aria-hidden="true"></i>
                                                    </div>
                                                    <div class="text-wrap">False</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">I love you 3000</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="question">
                        <div class="question-title pt-2">
                            <div class="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">6.</div>
                            "Choose the best answer"
                                </div>
                        <div class="d-flex bd-highlight">
                            <div class="w-100 bd-highlight">
                                <div class="card card-question">
                                    <div class="card-body">
                                        <div class="content">
                                            <div class="select-answer">
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check">

                                                    </div>
                                                    <div class="text-wrap">True</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">In another life, i would be your girls</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">False</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">I love you 3000</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="question">
                        <div class="question-title pt-2">
                            <div class="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">7.</div>
                            "Choose the best answer"
                                    </div>
                        <div class="d-flex bd-highlight">
                            <div class="w-100 bd-highlight">
                                <div class="card card-question">
                                    <div class="card-body">
                                        <div class="content">
                                            <div class="select-answer">
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">True</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">I, i, i only love you when you don't love me</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">oh baby, why do you why do you love me</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">False</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">I love you 3000</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="question">
                        <div class="question-title pt-2">
                            <div class="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">8.</div>
                            Điền vào chỗ trống: "I love you..."
                                        </div>
                        <div class="d-flex bd-highlight">
                            <div class="w-100 bd-highlight">
                                <div class="card card-question">
                                    <div class="card-body">
                                        <div class="content">
                                            <div class="row select-answer">
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="text-wrap float-left">Đáp án: </div>
                                                    <input type="text" class="input-answer" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="question">
                        <div class="question-title pt-2">
                            <div class="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">9.</div>
                            Điền vào chỗ trống: "I love you..."
                                            </div>
                        <div class="d-flex bd-highlight">
                            <div class="w-100 bd-highlight">
                                <div class="card card-question">
                                    <div class="card-body">
                                        <div class="content">
                                            <div class="row select-answer">
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="text-wrap float-left">Đáp án: </div>
                                                    <input type="text" class="input-answer" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="question">
                        <div class="question-title pt-2">
                            <div class="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">10.</div>
                            Điền vào chỗ trống: "I love you..."
                                                </div>
                        <div class="d-flex bd-highlight">
                            <div class="w-100 bd-highlight">
                                <div class="card card-question">
                                    <div class="card-body">
                                        <div class="content">
                                            <div class="row select-answer">
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="text-wrap float-left">Đáp án: </div>
                                                    <input type="text" class="input-answer" />>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="question">
                        <div class="question-title pt-2">
                            <div class="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">11.</div>
                            "Choose the best answer"
                                                </div>
                        <div class="d-flex bd-highlight">
                            <div class="w-100 bd-highlight">
                                <div class="card card-question">
                                    <div class="card-body">
                                        <div class="content">
                                            <div class="select-answer">
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">True</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">I, i, i only love you when you don't love me</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">oh baby, why do you why do you love me</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">False</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">I love you 3000</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="question">
                        <div class="question-title pt-2">
                            <div class="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">12.</div>
                            "Choose the best answer"
                                                </div>
                        <div class="d-flex bd-highlight">
                            <div class="w-100 bd-highlight">
                                <div class="card card-question">
                                    <div class="card-body">
                                        <div class="content">
                                            <div class="select-answer">
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">True</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">I, i, i only love you when you don't love me</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">oh baby, why do you why do you love me</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">False</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">I love you 3000</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="question">
                        <div class="question-title pt-2">
                            <div class="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">13.</div>
                            "Choose the best answer"
                            </div>
                        <div class="d-flex bd-highlight">
                            <div class="w-100 bd-highlight">
                                <div class="card card-question">
                                    <div class="card-body">
                                        <div class="content">
                                            <div class="select-answer">
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">True</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">I, i, i only love you when you don't love me</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">oh baby, why do you why do you love me</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">False</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">I love you 3000</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="question">
                        <div class="question-title pt-2">
                            <div class="flex-shrink-1 bd-highlight float-left font-weight-bold pr-2">14.</div>
                            "Choose the best answer"
                                                </div>
                        <div class="d-flex bd-highlight">
                            <div class="w-100 bd-highlight">
                                <div class="card card-question">
                                    <div class="card-body">
                                        <div class="content">
                                            <div class="select-answer">
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">True</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">I, i, i only love you when you don't love me</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">oh baby, why do you why do you love me</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">False</div>
                                                </div>
                                                <div class="options col-sm mb-2 md-4">
                                                    <div class="multiselect-check"></div>
                                                    <div class="text-wrap">I love you 3000</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="clear"></div>
            </React.Fragment >
        );
    }
}

export default ExamPage;