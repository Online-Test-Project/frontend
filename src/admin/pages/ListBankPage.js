import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../components/Layout/Layout';
import './ListBankPage.css';

class ListBankPage extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <Layout>
                <div class="content row">
                    <div class="table-content">
                        <div class="header-row-list">
                            <div class="title">
                                <h3 style={{ marginTop: "10px", marginLeft: "40px", fontWeight: "bold" }} >Đề thi đã tạo</h3>
                            </div>
                            <div class="row justify-content-end header-wrapper-end">
                                <div class="header-item-wrapper">
                                    <div class="search-box">
                                        <input placeholder="Tìm kiếm..." />
                                        <span class="icon glyphicon glyphicon-search"></span>
                                    </div>
                                </div>

                                <div class="header-item-wrapper">
                                    <div class="fa fa-plus-square fomat-icon-menu"></div>
                                    <div class="item-text">Thêm đề thi</div>

                                </div>
                            </div>
                        </div>

                        <div class="white-box">
                            <div class="bank-center">
                                <div class="bank-body">
                                    <div class="bank-contnet">
                                        <div class="row justify-content-end header-wrapper-end">
                                            <button type="button" class="btn btn-default btn-sm dt-delete" style={{ borderColor: "fff" }} onclick="ConfirmDelete()">
                                                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                            </button>
                                        </div>
                                        <Link to="/admin/bank/abcbank">
                                            <h4 class="exam-name">Công nghệ phần mềm (Giữa kì 19-20)</h4>
                                        </Link>

                                        <span class="time">Cập nhật lần cuối vào 03/09/2019</span>
                                        <span class="bank-desc">
                                            <span>Số lượng câu hỏi: 50</span>
                                            <br />
                                            <span>Dễ: 25</span>
                                            <span>Trung bình: 15</span>
                                            <span>Khó: 10</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="white-box">
                            <div class="bank-center">
                                <div class="bank-body">
                                    <div class="bank-contnet">
                                        <div class="row justify-content-end header-wrapper-end">
                                            <button type="button" class="btn btn-default btn-sm dt-delete" style={{ borderColor: "fff" }} onclick="ConfirmDelete()">
                                                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                            </button>
                                        </div>

                                        <h4 class="exam-name">Công nghệ phần mềm (Giữa kì 19-20)</h4>
                                        <span class="time">Cập nhật lần cuối vào 03/09/2019</span>
                                        <span class="bank-desc">
                                            <span>Số lượng câu hỏi: 50</span>
                                            <br />
                                            <span>Dễ: 25</span>
                                            <span>Trung bình: 15</span>
                                            <span>Khó: 10</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="white-box">
                            <div class="bank-center">
                                <div class="bank-body">
                                    <div class="bank-contnet">
                                        <div class="row justify-content-end header-wrapper-end">
                                            <button type="button" class="btn btn-default btn-sm dt-delete" style={{ borderColor: "fff" }} onclick="ConfirmDelete()">
                                                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                            </button>
                                        </div>
                                        <h4 class="exam-name">Công nghệ phần mềm (Giữa kì 19-20)</h4>
                                        <span class="time">Cập nhật lần cuối vào 03/09/2019</span>
                                        <span class="bank-desc">
                                            <span>Số lượng câu hỏi: 50</span>
                                            <br />
                                            <span>Dễ: 25</span>
                                            <span>Trung bình: 15</span>
                                            <span>Khó: 10</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="white-box">
                            <div class="bank-center">
                                <div class="bank-body">
                                    <div class="bank-contnet">
                                        <div class="row justify-content-end header-wrapper-end">
                                            <button type="button" class="btn btn-default btn-sm dt-delete" onclick="ConfirmDelete()">
                                                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                            </button>
                                        </div>
                                        <h4 class="exam-name">Công nghệ phần mềm (Giữa kì 19-20)</h4>
                                        <span class="time">Cập nhật lần cuối vào 03/09/2019</span>
                                        <span class="bank-desc">
                                            <span>Số lượng câu hỏi: 50</span>
                                            <br />
                                            <span>Dễ: 25</span>
                                            <span>Trung bình: 15</span>
                                            <span>Khó: 10</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>

        );
    }
}

export default ListBankPage;