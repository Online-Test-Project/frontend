import React, { Component } from 'react';
import Layout from '../components/Layout/Layout';
import './ListAdminExam.css';
import ExamPage from './ExamPage';
import axios from 'axios';

class ListAdminExam extends Component {
    constructor(props) {
        super(props);
        this.state = { listExam: []};
    }

    async componentDidMount() {
        axios
        .get('http://localhost:5000/api/exam/list', {
          headers: {
            JWT:
              'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlVzZXJuYW1lIjoiTmF0YWxpZTciLCJQYXNzd29yZCI6IjYgICAgICAgICAiLCJJZCI6ImUxZWM1NDQ0LTY1OTYtNWY1MC0xMzM4LTAwMTJiZjQ4OWZlNyJ9LCJ1bmlxdWVfbmFtZSI6ImUxZWM1NDQ0LTY1OTYtNWY1MC0xMzM4LTAwMTJiZjQ4OWZlNyIsImlzcyI6IiIsImlhdCI6MTU3MzQ2MTc5NSwiZXhwIjoxNTc2MDUzNzk1fQ.IJ9D0PDlErcIhXQXXN3nv8SMGJMcnjmtbdkcAz79Pm9-ONwmb0eZQ-_-NEK1n8A3AfXcF1Ga03ZuPK7MwKl-J20jNIwpG-1cFr7fH4Lm5WMoXxd1RcJL_UGbcCEkZAYHZmMMwRs_s3pY_NA3hjvXlFLw1y2zca13cKJtKTnZLFNx5z382bdxzBw68Jk-ITi5lql8ufh67eOUatamKdZ4tVClb7lgr3-FtmZQc4z-omPW5B1VCXWIUzYFBddjEfqXtdMoVwEWeJUezAAv9X0vCu8Ae79rppQgMQgoSkfZP2VWtTURNe4xWjCtjNYOJvj3RfeGsc09egVZ3mP1wWql7A',
          },
        })
        .then(response => {
          console.log(response.data);
          const data = response.data;
          this.setState({ listExam: data });
        });
      }

    render() { 
        return (
            <Layout>
                <div class="content row">
                    <div class="table-content">
                        <div class="header-row-list">
                            <div class="title">
                                <h3 style={{ marginTop: "10px", marginLeft: "40px", fontWeight: "bold" }}>Đề thi đã tạo</h3>
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
                      
                      {this.state.listExam.map((exam, index) =>{
                          return (
                            <div class="white-box" key={index} id={exam.id}>
                            <div class="bank-center">
                                <div class="bank-body">
                                    <div class="bank-contnet">
                                        <div class="row justify-content-end header-wrapper-end">
                                            <button type="button" class="btn btn-default btn-sm dt-delete" onClick="ConfirmDelete()">
                                                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                            </button>
                                        </div>
                                        <h4 class="exam-name">{exam.name}</h4>
                                        <span class="Updatetime"><b>Sửa đổi lần cuối: </b>{exam.time}</span>
                                        <span class="bank-desc">
                                        <span><b>Mã đề thi: </b>{exam.password}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                      })}
                        
                
                    </div>
                </div>
            </Layout>
        );
    }
}

export default ListAdminExam;