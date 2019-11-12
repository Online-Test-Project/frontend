import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Layout from '../components/Layout/Layout';
import './ListBankPage.css';

class ListBankPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listBank: [],
      currentEditBank: { id: '', name: '', description: '' },
    };
  }

  async componentDidMount() {
    axios
      .get('http://localhost:5000/api/bank/list', {
        headers: {
          JWT:
            'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlVzZXJuYW1lIjoiTmF0YWxpZTciLCJQYXNzd29yZCI6IjYgICAgICAgICAiLCJJZCI6ImUxZWM1NDQ0LTY1OTYtNWY1MC0xMzM4LTAwMTJiZjQ4OWZlNyJ9LCJ1bmlxdWVfbmFtZSI6ImUxZWM1NDQ0LTY1OTYtNWY1MC0xMzM4LTAwMTJiZjQ4OWZlNyIsImlzcyI6IiIsImlhdCI6MTU3MzQ2MTc5NSwiZXhwIjoxNTc2MDUzNzk1fQ.IJ9D0PDlErcIhXQXXN3nv8SMGJMcnjmtbdkcAz79Pm9-ONwmb0eZQ-_-NEK1n8A3AfXcF1Ga03ZuPK7MwKl-J20jNIwpG-1cFr7fH4Lm5WMoXxd1RcJL_UGbcCEkZAYHZmMMwRs_s3pY_NA3hjvXlFLw1y2zca13cKJtKTnZLFNx5z382bdxzBw68Jk-ITi5lql8ufh67eOUatamKdZ4tVClb7lgr3-FtmZQc4z-omPW5B1VCXWIUzYFBddjEfqXtdMoVwEWeJUezAAv9X0vCu8Ae79rppQgMQgoSkfZP2VWtTURNe4xWjCtjNYOJvj3RfeGsc09egVZ3mP1wWql7A',
        },
      })
      .then(response => {
        console.log(response.data);
        const data = response.data;
        this.setState({ listBank: data });
      });
  }

  onUpdateListBank() {
    axios
      .get('http://localhost:5000/api/bank/list',{
        headers: {
          JWT:
            'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlVzZXJuYW1lIjoiTmF0YWxpZTciLCJQYXNzd29yZCI6IjYgICAgICAgICAiLCJJZCI6ImUxZWM1NDQ0LTY1OTYtNWY1MC0xMzM4LTAwMTJiZjQ4OWZlNyJ9LCJ1bmlxdWVfbmFtZSI6ImUxZWM1NDQ0LTY1OTYtNWY1MC0xMzM4LTAwMTJiZjQ4OWZlNyIsImlzcyI6IiIsImlhdCI6MTU3MzQ2MTc5NSwiZXhwIjoxNTc2MDUzNzk1fQ.IJ9D0PDlErcIhXQXXN3nv8SMGJMcnjmtbdkcAz79Pm9-ONwmb0eZQ-_-NEK1n8A3AfXcF1Ga03ZuPK7MwKl-J20jNIwpG-1cFr7fH4Lm5WMoXxd1RcJL_UGbcCEkZAYHZmMMwRs_s3pY_NA3hjvXlFLw1y2zca13cKJtKTnZLFNx5z382bdxzBw68Jk-ITi5lql8ufh67eOUatamKdZ4tVClb7lgr3-FtmZQc4z-omPW5B1VCXWIUzYFBddjEfqXtdMoVwEWeJUezAAv9X0vCu8Ae79rppQgMQgoSkfZP2VWtTURNe4xWjCtjNYOJvj3RfeGsc09egVZ3mP1wWql7A',
        },
      })
      .then(response => {
        console.log(response.data);
        const data = response.data;
        // let resetCurrentEditBank = this.state.currentEditBank;
        this.setState({ listBank: data });
      });
  }

  onDeleteBank(id) {
    console.log('XOa thang: ' + id);
    axios
      .post('http://localhost:5000/api/bank/delete', id, {
        headers: {
          JWT:
            'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlVzZXJuYW1lIjoiTmF0YWxpZTciLCJQYXNzd29yZCI6IjYgICAgICAgICAiLCJJZCI6ImUxZWM1NDQ0LTY1OTYtNWY1MC0xMzM4LTAwMTJiZjQ4OWZlNyJ9LCJ1bmlxdWVfbmFtZSI6ImUxZWM1NDQ0LTY1OTYtNWY1MC0xMzM4LTAwMTJiZjQ4OWZlNyIsImlzcyI6IiIsImlhdCI6MTU3MzQ2MTc5NSwiZXhwIjoxNTc2MDUzNzk1fQ.IJ9D0PDlErcIhXQXXN3nv8SMGJMcnjmtbdkcAz79Pm9-ONwmb0eZQ-_-NEK1n8A3AfXcF1Ga03ZuPK7MwKl-J20jNIwpG-1cFr7fH4Lm5WMoXxd1RcJL_UGbcCEkZAYHZmMMwRs_s3pY_NA3hjvXlFLw1y2zca13cKJtKTnZLFNx5z382bdxzBw68Jk-ITi5lql8ufh67eOUatamKdZ4tVClb7lgr3-FtmZQc4z-omPW5B1VCXWIUzYFBddjEfqXtdMoVwEWeJUezAAv9X0vCu8Ae79rppQgMQgoSkfZP2VWtTURNe4xWjCtjNYOJvj3RfeGsc09egVZ3mP1wWql7A',
        },
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

                <div
                  class="header-item-wrapper"
                  data-toggle="modal"
                  data-target="#modelAddBank"
                >
                  <div class="fa fa-plus-square fomat-icon-menu"></div>
                  <div class="item-text"></div>Thêm ngân hàng
                </div>
              </div>
              <AddBankModal
                onUpdateListBank={() => this.onUpdateListBank()}
              ></AddBankModal>
            </div>
            {this.state.listBank.map((bank, index) => {
              return (
                <Bank
                  bank={bank}
                  onEditBank={() => this.onUpdateListBank}
                  key={index}
                  onDeleteBank={id => this.onDeleteBank(id)}
                ></Bank>
              );
            })}
          </div>
        </div>
      </Layout>
    );
  }
}

class Bank extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.bank;
    this.oldBank = this.state;
  }

  async onChange(event) {
    const { name, value } = event.target;
    const currentEdit = this.state;
    currentEdit[name] = value;
    await this.setState(currentEdit);
  }

  onSaveOldBank() {
    this.oldBank = this.state;
  }

  onSave() {
    axios
      .post(
        'http://localhost:5000/api/bank/update',
        {
          id: this.state.id,
          name: this.state.name,
          description: this.state.description,
        },
        {
          headers: {
            JWT:
              'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlVzZXJuYW1lIjoiTmF0YWxpZTciLCJQYXNzd29yZCI6IjYgICAgICAgICAiLCJJZCI6ImUxZWM1NDQ0LTY1OTYtNWY1MC0xMzM4LTAwMTJiZjQ4OWZlNyJ9LCJ1bmlxdWVfbmFtZSI6ImUxZWM1NDQ0LTY1OTYtNWY1MC0xMzM4LTAwMTJiZjQ4OWZlNyIsImlzcyI6IiIsImlhdCI6MTU3MzQ2MTc5NSwiZXhwIjoxNTc2MDUzNzk1fQ.IJ9D0PDlErcIhXQXXN3nv8SMGJMcnjmtbdkcAz79Pm9-ONwmb0eZQ-_-NEK1n8A3AfXcF1Ga03ZuPK7MwKl-J20jNIwpG-1cFr7fH4Lm5WMoXxd1RcJL_UGbcCEkZAYHZmMMwRs_s3pY_NA3hjvXlFLw1y2zca13cKJtKTnZLFNx5z382bdxzBw68Jk-ITi5lql8ufh67eOUatamKdZ4tVClb7lgr3-FtmZQc4z-omPW5B1VCXWIUzYFBddjEfqXtdMoVwEWeJUezAAv9X0vCu8Ae79rppQgMQgoSkfZP2VWtTURNe4xWjCtjNYOJvj3RfeGsc09egVZ3mP1wWql7A',
          },
        },
      )
      .then(res => {
        if (res.data == true) {
          this.props.onEditBank();
        }
      });
  }

  onCancelEdit() {
    this.setState(this.oldBank);
  }

  render() {
    return (
      <div class="white-box" id={this.state.id}>
        <div class="bank-center p-t-10">
          <div class="bank-body">
            <div class="bank-contnet">
              <Link to={'/admin/bank/' + this.state.id}>
                <h4>{this.state.name}</h4>
              </Link>
              <span class="pl-4">
                Cập nhật lần cuối vào {this.state.modifiedDate}
              </span>
              <span class="bank-desc">{this.state.description}</span>
              <button
                class="btn btn btn-rounded btn-warning btn-outline  mr-1 text-white"
                data-toggle="modal"
                data-target={'#editBankModal' + this.state.id}
                onClick={() => this.onSaveOldBank()}
              >
                <i class="ti-check"></i>Sửa
              </button>
              <a
                href="javacript:void(0)"
                class="btn-rounded btn btn-danger btn-outline"
                data-toggle="modal"
                data-target={'#deleteBankModal' + this.state.id}
              >
                <i class="ti-close"></i> Xóa
              </a>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id={'editBankModal' + this.state.id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
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
                  <label for="exampleFormControlTextarea1">Tên ngân hàng</label>
                  <input
                    class="form-control"
                    type="input"
                    name="name"
                    defaultValue={this.state.name}
                    onChange={event => this.onChange(event)}
                  ></input>
                </div>
                <div class="form-group">
                  <label for="exampleFormControlTextarea1">Mô tả</label>
                  <textarea
                    class="form-control"
                    name="description"
                    onChange={event => this.onChange(event)}
                  >
                    {this.state.description}
                  </textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => this.onSave()}
                >
                  Lưu
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={() => this.onCancelEdit()}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id={'deleteBankModal' + this.state.id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Xóa ngân hàng
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
                Bạn có chắc chắn muốn xóa ngân hàng này?
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => this.props.onDeleteBank(this.state.id)}
                >
                  Xóa
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
  }
}

class AddBankModal extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', description: '' };
  }

  async onChange(event) {
    const { name, value } = event.target;
    const currentEdit = this.state;
    currentEdit[name] = value;
    await this.setState(currentEdit);
    console.log(this.state);
  }

  onAdd() {
    axios
      .post(
        'http://localhost:5000/api/bank/create',
        {
            headers: {
              JWT:
                'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlVzZXJuYW1lIjoiTmF0YWxpZTciLCJQYXNzd29yZCI6IjYgICAgICAgICAiLCJJZCI6ImUxZWM1NDQ0LTY1OTYtNWY1MC0xMzM4LTAwMTJiZjQ4OWZlNyJ9LCJ1bmlxdWVfbmFtZSI6ImUxZWM1NDQ0LTY1OTYtNWY1MC0xMzM4LTAwMTJiZjQ4OWZlNyIsImlzcyI6IiIsImlhdCI6MTU3MzQ2MTc5NSwiZXhwIjoxNTc2MDUzNzk1fQ.IJ9D0PDlErcIhXQXXN3nv8SMGJMcnjmtbdkcAz79Pm9-ONwmb0eZQ-_-NEK1n8A3AfXcF1Ga03ZuPK7MwKl-J20jNIwpG-1cFr7fH4Lm5WMoXxd1RcJL_UGbcCEkZAYHZmMMwRs_s3pY_NA3hjvXlFLw1y2zca13cKJtKTnZLFNx5z382bdxzBw68Jk-ITi5lql8ufh67eOUatamKdZ4tVClb7lgr3-FtmZQc4z-omPW5B1VCXWIUzYFBddjEfqXtdMoVwEWeJUezAAv9X0vCu8Ae79rppQgMQgoSkfZP2VWtTURNe4xWjCtjNYOJvj3RfeGsc09egVZ3mP1wWql7A'
            }
        },
        {
          name: this.state.name,
          description: this.state.description,
        },
      )
      .then(res => {
        console.log(res.data);
        if (res.data == true) {
          this.props.onUpdateListBank();
        }
      });
  }

  render() {
    return (
      <div
        class="modal fade"
        id="modelAddBank"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Thêm ngân hàng</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Tên ngân hàng</label>
                <input
                  class="form-control"
                  type="input"
                  name="name"
                  onChange={event => this.onChange(event)}
                ></input>
              </div>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Mô tả</label>
                <textarea
                  class="form-control"
                  name="description"
                  onChange={event => this.onChange(event)}
                ></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => this.onAdd()}
              >
                Thêm
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListBankPage;
