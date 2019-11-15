import React, { Component } from 'react';
import Layout from '../components/Layout/Layout';
import './ListAdminExam.css';
import { Link } from 'react-router-dom';
import ExamPage from './ExamPage';
import axios from 'axios';
import config from '../../_config/config';
import { authHeader } from '../../_helpers/auth-header';
class ListAdminExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
             listExam: [{id: "alskjfalsdf", name:"kasjdfhksdjaf", password: "132451234"}]};
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


  onDeleteExam(id) {
    axios
    .post(config.SERVER_URL+'/api/exam/delete', JSON.stringify(id), {
      headers: authHeader(), "Content-Type" : "application/json",
    })
      .then(async response => {
        console.log(response.data);
        if (response.data) {
          let newListExam = await this.state.listExam.filter(exam => exam.id !== id);
          console.log(newListExam);
          await this.setState({ listExam: newListExam });
          console.log(this.state.listExam);
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
                            <Link to={'/admin/exam'}>
                                <h3 style={{ marginTop: "10px", marginLeft: "40px", fontWeight: "bold" }}>Đề thi đã tạo</h3>
                                </Link>
                            </div>
                            <div class="row justify-content-end header-wrapper-end">

                                <div class="header-item-wrapper" data-toggle="modal" data-target="#modelAddExam" >
                                    <div class="fa fa-plus-square fomat-icon-menu"></div>
                                    <Link to={'/admin/exam/create'}>
                                    <div class="item-text">Thêm đề thi</div>
                                        </Link>
                                    

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
                                                            <button type="button" class="btn btn-primary"  data-dismiss="modal" onClick={this.onDeleteExam.bind(this, exam.id)}>Xóa</button>
                                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Link to={'/exam' + exam.id}>
                                            <h4>{exam.name}</h4>
                                        </Link>
                                        {/* <h4 class="exam-name">{exam.name}</h4> */}
                                        <span class="Updatetime"><b>Thời gian làm bài: </b>{exam.time}</span>
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