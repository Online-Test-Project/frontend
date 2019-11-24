import React, { Component } from 'react';
import Layout from '../components/Layout/Layout';
import './ListAdminExam.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../_config/config';
import { authHeader } from '../../_helpers/auth-header';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ClipLoader } from 'react-spinners';

class ListAdminExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listExam: [{ id: '', name: '', password: '' }],
      loading: true,
    };
  }

  async componentDidMount() {
    axios
      .get(config.SERVER_URL + '/api/exam/list', {
        headers: authHeader(),
      })
      .then(async response => {
        const data = response.data;
        await this.setState({ listExam: data });
        this.setState({ loading: false });
      });
  }

  onDeleteExam(id) {
    axios
      .post(config.SERVER_URL + '/api/exam/delete', JSON.stringify(id), {
        headers: authHeader(),
      })
      .then(async response => {
        if (response.data) {
          let newListExam = await this.state.listExam.filter(
            exam => exam.id !== id,
          );
          await this.setState({ listExam: newListExam });
          alert('Xóa đề thành công!');
        }
      })
      .catch(error => {
        alert('Có lỗi xảy ra. Vui lòng thử lại!');
      });
  }

  render() {
    return (
      <Layout>
        <div className="content row">
          <div className="table-content">
            <div className="header-row-list">
              <div className="title">
                <h3
                  style={{
                    marginTop: '10px',
                    marginLeft: '40px',
                    fontWeight: 'bold',
                  }}
                >
                  Đề thi đã tạo
                </h3>
              </div>
              <div className="row justify-content-end header-wrapper-end">
                <div
                  className="header-item-wrapper"
                  data-toggle="modal"
                  data-target="#modelAddExam"
                >
                  <div className="fa fa-plus-square fomat-icon-menu"></div>
                  <Link to={'/create-exam'}>
                    <div className="item-text">Thêm đề thi</div>
                  </Link>
                </div>
              </div>
            </div>
            {this.state.loading && (
              <div className="d-flex justify-content-center">
                <ClipLoader
                  sizeUnit={'px'}
                  size={30}
                  color={'#254994'}
                  loading={this.state.loading}
                />
              </div>
            )}
            {!this.state.loading && this.state.listExam.map((exam, index) => {
              return (
                <div className="white-box" key={index} id={exam.id}>
                  <div className="bank-center">
                    <div className="bank-body">
                      <div className="bank-contnet">
                        <div className="row justify-content-end header-wrapper-end">
                          <button
                            type="button"
                            className="btn btn-sm dt-delete"
                            data-toggle="modal"
                            data-target={'#modelConfirmDelete' + exam.id}
                          >
                            <span className="" aria-hidden="true">
                              <div className="fa fa-remove fomat-icon-menu"></div>
                            </span>
                          </button>
                          <div
                            className="modal fade"
                            id={'modelConfirmDelete' + exam.id}
                            tabIndex="-1"
                            role="dialog"
                            aria-labelledby="modelTitleId"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog" role="document">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title">Xóa đề thi</h5>
                                  <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  Bạn có chắc chắn muốn xóa đề thi này?
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-dismiss="modal"
                                    onClick={this.onDeleteExam.bind(
                                      this,
                                      exam.id,
                                    )}
                                  >
                                    Xóa
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                  >
                                    Hủy
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {exam.isRandom ? (
                          <h4>{exam.name}</h4>
                        ) : (
                          <Link to={'/created-exam/' + exam.id}>
                            <h4>{exam.name}</h4>
                          </Link>
                        )}

                        <span className="Updatetime">
                          <b>Mật khẩu: </b>
                          {exam.password}
                        </span>
                        <span className="bank-desc">
                          <span>
                            <b>Thời gian làm bài: </b>
                            {exam.time}
                          </span>
                          <br></br>
                          <span>
                            <b>Thời gian mở: </b> từ <b>{exam.startTime}</b> đến{' '}
                            <b>{exam.endTime}</b>
                          </span>
                          <br></br>
                          <span>
                            <b>Số câu hỏi: </b>
                            {exam.count}
                          </span>
                          <br></br>
                          <span>
                            <b>Loại đề: </b>
                            {exam.isRandom === true ? 'Ngẫu nhiên' : 'Tự chọn'}
                          </span>
                          <br></br>
                          <Link to={'/created-exam/statistics/' + exam.id}>
                            <button className="btn btn-success">
                              <span> Thống kê kết quả</span>
                            </button>
                          </Link>
                          <CopyToClipboard
                            text={'http://localhost:3000/do-exam/' + exam.id}
                          >
                            <button type="button" className="btn btn-warning">
                              <i className="fa fa-clone" />
                              <span> Copy liên kết</span>
                            </button>
                          </CopyToClipboard>
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
