import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';

import Layout from '../components/Layout/Layout';
import './ListBankPage.css';

class ListBankPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listBank: [
        {
          id: 'abc',
          name: 'Công nghệ phần mềm',
          description: 'Bộ câu hỏi ôn thi cuối kì',
          modifiedDate: '03/12/1999',
        },
        {
          id: 'XYZ',
          name: 'ToaN',
          description: 'Bộ câu hỏi ôn thi cuối kì',
          modifiedDate: '03/12/1999',
        },
      ],
    };
  }

  async componentDidMount() {
    const cookies = new Cookies();
    // await axios.post("http://localhost:5000/api/users/Login", {
    //     "Username" : "Natalie7",
    //     "Password" : "6         "
    // }).then(res => res.data);

    await cookies.set(
      'JWT',
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlVzZXJuYW1lIjoiTmF0YWxpZTciLCJQYXNzd29yZCI6IjYgICAgICAgICAiLCJJZCI6ImUxZWM1NDQ0LTY1OTYtNWY1MC0xMzM4LTAwMTJiZjQ4OWZlNyJ9LCJ1bmlxdWVfbmFtZSI6ImUxZWM1NDQ0LTY1OTYtNWY1MC0xMzM4LTAwMTJiZjQ4OWZlNyIsImlzcyI6IiIsImlhdCI6MTU3MzQ2MTc5NSwiZXhwIjoxNTc2MDUzNzk1fQ.IJ9D0PDlErcIhXQXXN3nv8SMGJMcnjmtbdkcAz79Pm9-ONwmb0eZQ-_-NEK1n8A3AfXcF1Ga03ZuPK7MwKl-J20jNIwpG-1cFr7fH4Lm5WMoXxd1RcJL_UGbcCEkZAYHZmMMwRs_s3pY_NA3hjvXlFLw1y2zca13cKJtKTnZLFNx5z382bdxzBw68Jk-ITi5lql8ufh67eOUatamKdZ4tVClb7lgr3-FtmZQc4z-omPW5B1VCXWIUzYFBddjEfqXtdMoVwEWeJUezAAv9X0vCu8Ae79rppQgMQgoSkfZP2VWtTURNe4xWjCtjNYOJvj3RfeGsc09egVZ3mP1wWql7A',
      { path: '/' },
    );
    console.log(cookies.get('Cookie'));
    // axios
    //   .request(
    //       {
    //           url: 'http://192.168.43.33/api/bank/list',
    //           method: "get",
    //           headers: {
    //             'Cookie': "JWT=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlVzZXJuYW1lIjoiTmF0YWxpZTciLCJQYXNzd29yZCI6IjYgICAgICAgICAiLCJJZCI6ImUxZWM1NDQ0LTY1OTYtNWY1MC0xMzM4LTAwMTJiZjQ4OWZlNyJ9LCJ1bmlxdWVfbmFtZSI6ImUxZWM1NDQ0LTY1OTYtNWY1MC0xMzM4LTAwMTJiZjQ4OWZlNyIsImlzcyI6IiIsImlhdCI6MTU3MzQ1OTM0OCwiZXhwIjoxNTc2MDUxMzQ4fQ.dc-how-2zYCDzcfKHf353QiDiqUQiWaUM8WI6AsHB-nOopoE3stMG99fHX8cOLG0as9m143bya3iGmSQb5V8CLQf6P4AAmev5VJmN9cfLRpgQM5BObdIZUgKCz3_fMwiQt5WxachYNsvZwLXTt_6XRPPEnEUk67h-2GzGAXiL4FcIcnXTsfZlORMAthL5KONuxa6lwfFVbJ3b3wivyAPzT0uP42zYM41uK7_wjiW-Y8w3kvH-8Hc0piIkuwRovI1TxqBjXnbVyr7LhVQwNQ7gpWBRjUKDZYOwBZ4sfcXyh7_yvW3qxzNHrjL8PzjVYEHVlAVB-7e0eZqYdB7iPHG1w",
    //             'content-Type': 'application/json',
    //             'Accept': "/",
    //             "Cache-Control": "no-cache"
    //         }
    //       })
    //   .then(res => console.log(res.data));

    const axiosConfig = {
      headers: {
        'content-Type': 'application/json',
        Accept: '/',
        'Cache-Control': 'no-cache',
        Cookie: 'JWT=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlVzZXJuYW1lIjoiTmF0YWxpZTciLCJQYXNzd29yZCI6IjYgICAgICAgICAiLCJJZCI6ImUxZWM1NDQ0LTY1OTYtNWY1MC0xMzM4LTAwMTJiZjQ4OWZlNyJ9LCJ1bmlxdWVfbmFtZSI6ImUxZWM1NDQ0LTY1OTYtNWY1MC0xMzM4LTAwMTJiZjQ4OWZlNyIsImlzcyI6IiIsImlhdCI6MTU3MzQ1OTM0OCwiZXhwIjoxNTc2MDUxMzQ4fQ.dc-how-2zYCDzcfKHf353QiDiqUQiWaUM8WI6AsHB-nOopoE3stMG99fHX8cOLG0as9m143bya3iGmSQb5V8CLQf6P4AAmev5VJmN9cfLRpgQM5BObdIZUgKCz3_fMwiQt5WxachYNsvZwLXTt_6XRPPEnEUk67h-2GzGAXiL4FcIcnXTsfZlORMAthL5KONuxa6lwfFVbJ3b3wivyAPzT0uP42zYM41uK7_wjiW-Y8w3kvH-8Hc0piIkuwRovI1TxqBjXnbVyr7LhVQwNQ7gpWBRjUKDZYOwBZ4sfcXyh7_yvW3qxzNHrjL8PzjVYEHVlAVB-7e0eZqYdB7iPHG1w' ,
      },
      credentials: 'same-origin',
    };

    axios.defaults.withCredentials = true;
    axios
      .get('http://192.168.43.33/api/bank/list', axiosConfig)
      .then(res => {
        // Some result here
      })
      .catch(err => {
        console.log(':(');
      });
  }

  render() {
    return (
      <Layout>
        <div class="content row">
          <div class="table-content">
            <div class="header-row-list">
              <div class="title">
                <h3 className="pt-2 ml-3 font-weight-bold">
                  Ngân hàng câu hỏi
                </h3>
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
                  <div class="item-text">Thêm ngân hàng</div>
                </div>
              </div>
            </div>
            {this.state.listBank.map((bank, index) => {
              return (
                <div class="white-box" key={index} id={bank.id}>
                  <div class="bank-center p-t-10">
                    <div class="bank-body">
                      <div class="bank-contnet">
                        <h4>{bank.name}</h4>
                        <span class="pl-4">
                          Cập nhật lần cuối vào {bank.modifiedDate}
                        </span>
                        <span class="bank-desc">{bank.description}</span>
                        <Link
                          to="/admin/bank/abc"
                          class="btn btn btn-rounded btn-warning btn-outline  mr-1 text-white"
                          data-toggle="modal"
                          data-target="#editBankModal"
                        >
                          <i class="ti-check"></i>Sửa
                        </Link>
                        <a
                          href="javacript:void(0)"
                          class="btn-rounded btn btn-danger btn-outline"
                        >
                          <i class="ti-close"></i> Xóa
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    className="modal fade"
                    id="editBankModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                  >
                    <div
                      className="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5
                            className="modal-title"
                            id="exampleModalLongTitle"
                          >
                            Sửa thông tin ngân hàng
                          </h5>
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
                          <div class="form-group">
                            <label for="exampleFormControlTextarea1">
                              Tên ngân hàng
                            </label>
                            <input
                              class="form-control"
                              type="input"
                              value={bank.name}
                            ></input>
                          </div>
                          <div class="form-group">
                            <label for="exampleFormControlTextarea1">
                              Mô tả
                            </label>
                            <textarea class="form-control">
                              {bank.description}
                            </textarea>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="submit"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Lưu
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-dismiss="modal"
                          >
                            Hủy
                          </button>
                        </div>
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

export default ListBankPage;
