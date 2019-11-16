import React, { Component } from 'react';
import Layout from '../components/Layout/Layout';
import './ListUserExam.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../_config/config';
import { authHeader } from '../../_helpers/auth-header';

class ListUserExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listReviewExam: [],
    };
  }

  async componentDidMount() {
    axios
      .get(config.SERVER_URL + '/api/review/list', {
        headers: authHeader(),
      })
      .then(response => {
        console.log(response.data);
        const data = response.data;
        this.setState({ listReviewExam: data });
      });
  }
  render() {
    return (
      <Layout>
        <div class="content row">
          <div class="table-content">
            <div class="header-row-list">
              <div class="title">
                <h3
                  style={{
                    marginTop: '10px',
                    marginLeft: '40px',
                    fontWeight: 'bold',
                  }}
                >
                  Đề thi đã làm
                </h3>
              </div>
              <div class="row justify-content-end header-wrapper-end">
                <div class="header-item-wrapper">
                  <div class="search-box">
                    <input placeholder="Tìm kiếm..." />
                    <span class="icon">
                      <div class="fa fa-search fomat-icon-menu"></div>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {this.state.listReviewExam.map((exam, index) => {
              return (
                <div class="white-box" key={index} id={exam.id}>
                  <div class="bank-center">
                    <div class="bank-body">
                      <div class="bank-contnet">
                        <div class="row justify-content-end header-wrapper-end"></div>
                        <Link to={'/preview-exam/' + exam.id}>
                          <h4>{exam.name}</h4>
                        </Link>
                        <span class="Updatetime">
                          <b>Điểm: </b>
                          {exam.score}
                        </span>
                        <span class="bank-desc">
                          <b>Thời gian làm bài: </b>
                          {exam.time}
                        </span>
                        <span class="bank-desc">
                          <b>Ngày thi: </b>
                          {exam.date}
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

export default ListUserExam;
