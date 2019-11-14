import React, { Component } from 'react';
import Layout from '../components/Layout/Layout';
import './ListAdminExam.css';
import { Link } from 'react-router-dom';
import ExamPage from './ExamPage';
import axios from 'axios';
import config from '../../_config/config'
import { authHeader } from '../../_helpers/auth-header';
class ListAdminExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
             listExam: []};
    }

    async componentDidMount() {
        axios
      .get(config.SERVER_URL+'/api/exam/list', {
        headers: authHeader()
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


  onDeleteExam(id) {
    
      console.log("xoa ne");
    console.log('XOa thang: ' + id);
    axios
    .post(config.SERVER_URL+'/api/exam/delete', JSON.stringify(id), {
        
      headers: authHeader(), "Content-Type" : "application/json",
    })
      .then(response => {
        console.log(response.data);
        if (!response.data) {
          let newListBank = this.state.listBank.filter(bank => bank.id !== id);
          console.log(newListBank);
          this.setState({ listBank: newListBank });
        }
      });
      
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
                                        <div class="row justify-content-end header-wrapper-end">
                                            <button type="button" class="btn btn-sm dt-delete" data-toggle="modal" data-target={"#modelConfirmDelete" + exam.id}>
                                                <span class="" aria-hidden="true"><div class="fa fa-remove fomat-icon-menu"></div></span>
                                            </button>
                                            <div class="modal fade" id={"modelConfirmDelete" + exam.id} tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
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
                                                            <button type="submit" class="btn btn-primary"  data-dismiss="modal" onClick={this.onDeleteExam.bind(this, exam.id)}>Xóa</button>
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