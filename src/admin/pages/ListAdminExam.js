import React, { Component } from 'react';
import Layout from '../components/Layout/Layout';
import './ListAdminExam.css';
import { Link } from 'react-router-dom';
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

      async onSearch() {
		// this.setState({ isSearching: true });
		// let content = document.getElementById("search").value;
		// content = normalizeString(content);

		// const newFilteredExam = await this.state.listExam.filter(exam => {
		// 	let contentValid = false;
		// 	contentValid = normalizeString(exam.name).includes(content);
        //     return contentValid;
		// });
		// await this.setState({ listExam: newFilteredExam });
        // this.setState({ isSearching: false });
  }

    render() { 
        return (
            <Layout>
                <div class="content row">
                    <div class="table-content">
                        <div class="header-row-list">
                            <div class="title">
                            <Link to={'/admin/exam/'}>
                                <h3 style={{ marginTop: "10px", marginLeft: "40px", fontWeight: "bold" }}>Đề thi đã tạo</h3>
                                </Link>
                            </div>
                            <div class="row justify-content-end header-wrapper-end">
                                <div class="header-item-wrapper">
                                    <div class="search-box">
                                        <input placeholder="Tìm kiếm..." id="search"
                                         onKeyPress={(event) => {
											if (event.key === "Enter") {
												this.onSearch();
											}
										}}
                                        />
                                        <span class="icon"><div class="fa fa-search fomat-icon-menu"></div></span>
                                    </div>
                                </div>

                                <div class="header-item-wrapper" data-toggle="modal" data-target="#modelAddExam" >
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
                                        <div class="row justify-content-end header-wrapper-end" data-toggle="modal" data-target="#modelConfirmDelete">
                                            <button type="button" class="btn btn-sm dt-delete" onClick="ConfirmDelete()">
                                                <span class="" aria-hidden="true"><div class="fa fa-remove fomat-icon-menu"></div></span>
                                            </button>
                                            <div class="modal fade" id="modelConfirmDelete" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                                                <div class="modal-dialog" role="document">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title">Xóa đề thi</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                        </div>
                                                        <div class="modal-body">
                                                        Bạn có chắc chắn muốn xóa đề thi này?
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-primary">Xóa</button>
                                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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

function normalizeString(str) {
	return str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
		.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
		.replace(/ì|í|ị|ỉ|ĩ/g, "i")
		.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
		.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
		.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
		.replace(/đ/g, "d")
		.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A")
		.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E")
		.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I")
		.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O")
		.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U")
		.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y")
		.replace(/Đ/g, "D")
		.trim()
		.replace(/\s+/g, ' ')
		.toLowerCase();
}

export default ListAdminExam;