import React, { Component } from 'react';
import Layout from '../components/Layout/Layout';
import './ListUserExam.css';

class ListUserExam extends Component {
    render() {
        return (
            <Layout>
                <div class="content row">
                    <div class="table-content">
                        <div class="header-row-list">
                            <div class="title">
                                <h3 style={{ marginTop: "10px", marginLeft: "40px", fontWeight: "bold" }} >Đề thi đã làm</h3>
                            </div>
                            <div class="row justify-content-end header-wrapper-end">
                                <div class="header-item-wrapper">
                                    <div class="search-box">
                                        <input placeholder="Tìm kiếm..." />
                                            <span class="icon"><div class="fa fa-search fomat-icon-menu"></div></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="white-box">
                            <div class="bank-center">
                                <div class="bank-body">
                                    <div class="bank-contnet">
                                        <div class="row justify-content-end header-wrapper-end">
                                        </div>
                                        <h4 class="exam-name">Công nghệ phần mềm (Giữa kì 19-20)</h4>
                                        <span class="Updatetime">Thi vào ngày 03/09/2019</span>
                                        <span class="bank-desc">Điểm: 9</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="white-box">
                            <div class="bank-center">
                                <div class="bank-body">
                                    <div class="bank-contnet">
                                        <div class="row justify-content-end header-wrapper-end">
                                        </div>
                                        <h4 class="exam-name">Công nghệ phần mềm (Giữa kì 19-20)</h4>
                                        <span class="Updatetime">Thi vào ngày 03/09/2019</span>
                                        <span class="bank-desc">Điểm: 9</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="white-box">
                            <div class="bank-center">
                                <div class="bank-body">
                                    <div class="bank-contnet">
                                        <div class="row justify-content-end header-wrapper-end">
                                        </div>
                                        <h4 class="exam-name">Công nghệ phần mềm (Giữa kì 19-20)</h4>
                                        <span class="Updatetime">Thi vào ngày 03/09/2019</span>
                                        <span class="bank-desc">Điểm: 9</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="white-box">
                            <div class="bank-center">
                                <div class="bank-body">
                                    <div class="bank-contnet">
                                        <div class="row justify-content-end header-wrapper-end">
                                        </div>
                                        <h4 class="exam-name">Công nghệ phần mềm (Giữa kì 19-20)</h4>
                                        <span class="Updatetime">Thi vào ngày 03/09/2019</span>
                                        <span class="bank-desc">Điểm: 9</span>
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

export default ListUserExam;