import React, { Component } from 'react';
import axios from 'axios';
import './BankTable.css';
import config from '../../../_config/config';
import { authHeader } from '../../../_helpers/index';

const bank = [];

function normalizeString(str) {
  return str
    .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
    .replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
    .replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
    .replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
    .replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
    .replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
    .replace(/Đ/g, 'D')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: 'Công nghệ phần mềm',
      bankInfo: {},
      description: 'Bộ câu hỏi ôn tập cuối kì cho môn Công nghệ phần mềm',
      bank: bank,
      filteredBank: bank,
      isSearching: false,
      type: [],
      difficulty: [],
      currentEditQuestion: {
        id: '',
        content: '',
        type: 1,
        difficulty: 1,
        answers: [],
      },
    };
  }

  componentDidMount() {
    this.updateBankFromServer();
    axios
      .get(config.SERVER_URL + '/api/bank/get/' + this.state.id, {
        headers: authHeader(),
      })
      .then(response => {
        const bankinfo = response.data;
        this.setState({ bankInfo: bankinfo });
        this.setState({ type: bankinfo.type });
        this.setState({ difficulty: bankinfo.difficulty });
      });
  }

  async updateBankFromServer() {
    await axios
      .get(config.SERVER_URL + '/api/question/list/' + this.state.id, {
        headers: authHeader(),
      })
      .then(res => {
        console.log(res.data);
        const data = res.data;
        this.setState({ bank: data, filteredBank: data });
      });
  }

  /**
   * Handler search question's content
   */
  async onSearch() {
    this.setState({ isSearching: true });
    let content = document.getElementById('content-search').value;
    content = normalizeString(content);

    const selectType = document.getElementById('type-search');
    let type = selectType.options[selectType.selectedIndex].value;

    const selectLevel = document.getElementById('difficulty-search');
    let difficulty = selectLevel.options[selectLevel.selectedIndex].value;

    switch (difficulty) {
      case 'Dễ':
        difficulty = 1;
        break;
      case 'Trung bình':
        difficulty = 2;
        break;
      case 'Khó':
        difficulty = 3;
        break;
      default:
        difficulty = 'Tất cả';
    }

    switch (type) {
      case 'Single Choice':
        type = 1;
        break;
      case 'Multiple Choice':
        type = 2;
        break;
      case 'Text Input':
        type = 3;
        break;
      default:
        type = 'Tất cả';
    }

    const newFilteredBank = await this.state.bank.filter(question => {
      let contentValid = false,
        typeValid = false,
        levelValid = false;
      contentValid = normalizeString(question.content).includes(content);
      if (type === 'Tất cả') {
        typeValid = true;
      } else if (question.type === type) {
        typeValid = true;
      }
      if (difficulty === 'Tất cả') {
        levelValid = true;
      } else if (question.difficulty === difficulty) {
        levelValid = true;
      }
      return contentValid && typeValid && levelValid;
    });
    await this.setState({ filteredBank: newFilteredBank });
    this.setState({ isSearching: false });
  }

  toggleSelect(id) {
    let newBank = this.state.bank;
    for (let i = 0; i < newBank.length; i++) {
      if (newBank[i].id === id) {
        newBank[i].selected = !newBank[i].selected;
        break;
      }
    }
    this.setState({ bank: newBank });
  }

  onDelete() {
    const arrDelete = this.state.bank
      .filter(question => question.selected)
      .map(question => question.id);
    if (arrDelete.length === 0) {
      alert('Vui lòng chọn ít nhất một câu hỏi');
    } else {
      axios
        .post(config.SERVER_URL + '/api/question/delete', arrDelete, {
          headers: authHeader(),
        })
        .then(res => {
          console.log(res.data);

          if (res.data) {
            alert('Bạn đã xóa thành công!');
            let newBank = this.state.bank.filter(
              question => !question.selected,
            );
            this.setState({ bank: newBank, filteredBank: newBank });
          } else {
            alert('Xóa không thành công!');
          }
        });
    }
  }

  renderEditModal() {
    let selectedQuestions = this.state.bank.filter(
      question => question.selected,
    );
    if (selectedQuestions.length === 1) {
      let question = selectedQuestions[0];
      return <div></div>;
    }
  }

  onEditBankInformation() {}

  render() {
    return (
      <div className="content row">
        <div className="table-content infor" id="info">
          <div className="toolbar row">
            <button
              className="row item-center btn-header"
              data-toggle="modal"
              data-target="#addQuestionModal"
            >
              <i className="fa fa-plus-square format-icon-menu "></i>
              <div>Thêm</div>
            </button>

            <button
              className="row item-center btn-header"
              data-toggle="modal"
              data-target="#deleteQuestionModal"
            >
              <i className="fa fa-trash format-icon-menu "></i>
              <div>Xóa</div>
            </button>
          </div>

          <div className="main-table table-responsive-md">
            <table className="table text-left">
              <thead>
                <tr className="align-self-start">
                  <th scope="col" style={{ width: '10%' }}>
                    <label>Sửa</label>
                  </th>
                  <th scope="col" style={{ width: '10%' }}>
                    <label>Đã chọn</label>
                  </th>
                  <th scope="col" style={{ width: '40%' }}>
                    <label>Câu hỏi</label>
                    <input
                      className="form-control"
                      id="content-search"
                      type="text"
                      placeholder="Gõ để tìm kiếm"
                      onKeyPress={event => {
                        if (event.key === 'Enter') {
                          this.onSearch();
                        }
                      }}
                    ></input>
                  </th>
                  <th scope="col" style={{ width: '20%' }}>
                    <label>Loại</label>
                    <select
                      id="type-search"
                      className="form-control"
                      onChange={() => this.onSearch()}
                    >
                      <option defaultValue>Tất cả</option>
                      <option>Single Choice</option>
                      <option>Multiple Choice</option>
                      <option>Text Input</option>
                    </select>
                  </th>
                  <th scope="col" style={{ width: '20%' }}>
                    <label>Độ khó</label>
                    <select
                      id="difficulty-search"
                      className="form-control"
                      onChange={() => this.onSearch()}
                    >
                      <option defaultValue>Tất cả</option>
                      <option>Dễ</option>
                      <option>Trung bình</option>
                      <option>Khó</option>
                    </select>
                  </th>
                </tr>
              </thead>
              {this.state.isSearching ? (
                <tr>
                  <th className="text-center" scope="row"></th>
                  <td className="text-center"></td>
                  <td className="text-right">Đang tìm kiếm</td>
                  <td></td>
                  <td></td>
                </tr>
              ) : this.state.filteredBank.length === 0 ? (
                <tr>
                  <th className="text-center" scope="row"></th>
                  <td className="text-center"></td>
                  <td className="text-right">Không tìm thấy câu hỏi nào</td>
                  <td></td>
                  <td></td>
                </tr>
              ) : (
                <tbody>
                  {this.state.filteredBank.map((e, i) => {
                    return (
                      <React.Fragment key={i}>
                        <tr
                          className={
                            e.selected
                              ? 'checked question-row '
                              : 'question-row'
                          }
                          onClick={() => this.toggleSelect(e.id)}
                        >
                          <th className="text-center" scope="row">
                            <button
                              className="btn btn-warning"
                              data-toggle="modal"
                              data-target={'#editQuestionModal' + e.id}
                            >
                              <i className="fa fa-pencil format-icon-menu "></i>
                            </button>
                          </th>
                          <td className="text-center">
                            <input
                              type="checkbox"
                              checked={e.selected}
                              readOnly
                            ></input>
                          </td>
                          <td className="align-middle">{e.content}</td>
                          <td className="align-middle">
                            {e.type === 1
                              ? 'Single Choice'
                              : e.type === 2
                              ? 'Multiple Choice'
                              : 'Text Input'}
                          </td>
                          <td className="align-middle">
                            {e.difficulty === 1
                              ? 'Dễ'
                              : e.difficulty === 2
                              ? 'Trung bình'
                              : 'Khó'}
                          </td>
                        </tr>
                        <EditQuestionModal
                          question={e}
                          updateBankFromServer={() =>
                            this.updateBankFromServer()
                          }
                        ></EditQuestionModal>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              )}
            </table>
          </div>
          <div
            className="modal fade"
            id="deleteQuestionModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Xóa câu hỏi
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
                  Bạn có chắc chắn muốn xóa câu hỏi? Bạn sẽ không thể hồi phục
                  sau khi xóa.
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-dismiss="modal"
                    onClick={() => this.onDelete()}
                  >
                    Xóa
                  </button>
                </div>
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
                  <div className="form-group">
                    <label>Tên ngân hàng</label>
                    <input
                      className="form-control"
                      type="text"
                      defaultValue={this.state.name}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label>Mô tả</label>
                    <textarea
                      className="form-control"
                      defaultValue={this.state.description}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={() => this.onDelete()}
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
          <AddQuestionModal
            id={this.state.id}
            updateBankFromServer={() => this.updateBankFromServer()}
          ></AddQuestionModal>
        </div>
        <div className="infob-content">
          <div className="mt-2 mb-2">
            <h5 className="font-weight-bold purple-blue-text">
              Thông tin ngân hàng
            </h5>
            <div className="px-1">
              <label>
                <b>Tên:</b> {this.state.bankInfo.name}
              </label>
              <br />
              <label>
                <b>Mô tả:</b> {this.state.bankInfo.description}
              </label>
              <br />
              <label>
                <b>Sửa lần cuối:</b> {this.state.bankInfo.modifiedDate}
              </label>
            </div>

            <br />
          </div>
          <div className="separation"></div>
          <div className="mt-2 mb-2">
            <h5 className="font-weight-bold purple-blue-text">Loại câu hỏi</h5>
            <div className="px-1">
              <label>
                <b>Single choice:</b> {this.state.type[0]}{' '}
              </label>
              <br />
              <label>
                <b>Mutil choice:</b> {this.state.type[1]}
              </label>
              <br />
              <label>
                <b>Text Input:</b> {this.state.type[2]}{' '}
              </label>
            </div>

            <br />
          </div>
          <div className="separation"></div>
          <div className="mt-2 mb-2">
            <h5 className="font-weight-bold purple-blue-text">
              Độ khó câu hỏi
            </h5>
            <div className="px-1">
              <label>
                <b>Dễ:</b> {this.state.difficulty[0]}
              </label>
              <br />
              <label>
                <b>Trung bình:</b> {this.state.difficulty[1]}
              </label>
              <br />
              <label>
                <b>Khó:</b> {this.state.difficulty[2]}
              </label>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class AddQuestionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      content: '',
      type: 1,
      difficulty: 1,
      listAnswer: [],
      numOfBonusAnswer: 0,
    };
  }

  async onChange(event) {
    const { name, value } = event.target;
    const newQuestion = this.state;
    newQuestion[name] = value;
    await this.setState(newQuestion);
  }

  async onChangeType(event) {
    let type = event.target.value;
    switch (type) {
      case 'Single Choice':
        type = 1;
        break;
      case 'Multiple Choice':
        type = 2;
        break;
      case 'Text Input':
        type = 3;
        break;
      default:
        type = 'Single Choice';
    }
    await this.setState({ type: type });
    console.log(this.state);
  }

  async onChangeLevel(event) {
    let difficulty = event.target.value;
    switch (difficulty) {
      case 'Dễ':
        difficulty = 1;
        break;
      case 'Trung bình':
        difficulty = 2;
        break;
      case 'Khó':
        difficulty = 3;
        break;
      default:
        difficulty = 1;
    }
    await this.setState({ difficulty: difficulty });
    console.log(this.state);
  }

  async onSubmit() {
    let listAnswer = [];
    if (this.state.type === 1 || this.state.type === 2) {
      let answers = document.getElementsByName('answer');
      let isCorrectList = document.getElementsByName('isCorrect');
      for (let i = 0; i < answers.length; i++) {
        listAnswer.push({
          content: answers[i].value,
          isCorrect: isCorrectList[i].checked,
        });
      }
    } else {
      const answer = document.getElementById('text-answer').value;
      listAnswer.push({ content: answer, isCorrect: true });
    }
    await this.setState({ listAnswer: listAnswer });
    axios
      .post(
        config.SERVER_URL + '/api/question/create',
        {
          id: this.state.id,
          difficulty: this.state.difficulty,
          type: this.state.type,
          content: this.state.content,
          answers: this.state.listAnswer,
        },
        {
          headers: authHeader(),
        },
      )
      .then(res => {
        if (res.data) {
        this.props.updateBankFromServer();
        this.setState({numOfBonusAnswer: 0, content: '', type: 1, difficulty: 1});
        let answers = document.getElementsByName('answer');
        document.getElementById('content').value = "";
        document.getElementById("typeSelect").value = "Single Choice";
        document.getElementById("levelSelect").value = "Dễ";
        for (let i = 0; i < answers.length; i++) {
          answers[i].value = "";
        }
        alert("Thêm câu hỏi thành công!");
        console.log(this.state);
        }
      }).catch(error => {
        console.log("Có lỗi xảy ra. Vui lòng thử lại!");
      });
      
  }

  render() {
    let element;
    let type = this.state.type;
    let bonusAnswers = [];
    for (let i = 0; i < this.state.numOfBonusAnswer; i++) {
      bonusAnswers.push(
        <div className="input-group mb-2">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <input
                type={type === 1 ? 'radio' : 'checkbox'}
                name="isCorrect"
              />
            </div>
          </div>
          <input
            type="text"
            className="form-control"
            name="answer"
            placeholder="Nhập đáp án, tích nếu đáp án đúng"
          />
        </div>,
      );
    }

    switch (type) {
      case 1:
        element = (
          <div>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <input type="radio" name="isCorrect" defaultChecked />
                </div>
              </div>
              <input
                type="text"
                className="form-control"
                name="answer"
                placeholder="Nhập đáp án, tích nếu đáp án đúng"
              />
            </div>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <input type="radio" name="isCorrect" />
                </div>
              </div>
              <input
                type="text"
                className="form-control"
                name="answer"
                placeholder="Nhập đáp án, tích nếu đáp án đúng"
              />
            </div>
            {bonusAnswers}
            <button
              className="btn btn-info"
              onClick={() => {
                this.setState({
                  numOfBonusAnswer: this.state.numOfBonusAnswer + 1,
                });
              }}
            >
              Thêm đáp án
            </button>
            {"  "}
            <button
              className="btn btn-danger"
              onClick={() => {
                this.setState({
                  numOfBonusAnswer: this.state.numOfBonusAnswer - 1,
                });
              }}
            >
              Xóa đáp án cuối
            </button>
          </div>
        );
        break;
      case 2:
        element = (
          <div>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <input type="checkbox" name="isCorrect" />
                </div>
              </div>
              <input
                type="text"
                className="form-control"
                name="answer"
                placeholder="Nhập đáp án, tích nếu đáp án đúng"
              />
            </div>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <input type="checkbox" name="isCorrect" />
                </div>
              </div>
              <input
                type="text"
                className="form-control"
                name="answer"
                placeholder="Nhập đáp án, tích nếu đáp án đúng"
              />
            </div>
            {bonusAnswers}
            <button
              className="btn btn-info"
              onClick={() => {
                this.setState({
                  numOfBonusAnswer: this.state.numOfBonusAnswer + 1,
                });
              }}
            >
              Thêm đáp án
            </button>
            {"  "}
            <button
              className="btn btn-danger"
              onClick={() => {
                this.setState({
                  numOfBonusAnswer: this.state.numOfBonusAnswer - 1,
                });
              }}
            >
              Xóa đáp án cuối
            </button>
          </div>
        );
        break;

      case 3:
        element = (
          <div>
            <textarea
              className="form-control"
              id="text-answer"
              placeholder="Câu trả lời"
            ></textarea>
          </div>
        );
        break;
      default:
    }
    return (
      <div
        className="modal fade"
        id="addQuestionModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Tạo câu hỏi mới
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
              <div className="form-group">
                <label>Nội dung</label>
                <input
                  className="form-control mb-2"
                  type="text"
                  name="content"
                  id='content'
                  placeholder="Nhập nội dung câu hỏi"
                  defaultValue=''
                  onChange={event => this.onChange(event)}
                ></input>
                <div className="row">
                  <div className="col-6">
                    <select
                      className="form-control"
                      name="type"
                      onChange={event => this.onChangeType(event)}
                      id="typeSelect"
                    >
                      <option>Single Choice</option>
                      <option>Multiple Choice</option>
                      <option>Text Input</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <select
                      className="form-control"
                      name="difficulty"
                      id="levelSelect"
                      onChange={event => this.onChangeLevel(event)}
                    >
                      <option defaultChecked>Dễ</option>
                      <option>Trung bình</option>
                      <option>Khó</option>
                    </select>
                  </div>

                  <br />
                  <br />
                </div>

                {element}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => this.onSubmit()}
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
    );
  }
}

class EditQuestionModal extends Component {
  constructor(props) {
    super(props);
    const question = this.props.question;
    this.state = {
      id: question.id,
      type: question.type,
      content: question.content,
      difficulty: question.difficulty,
      answers: question.answers,
      numOfBonusAnswer: 0,
    };
  }
  async onChangeType(event) {
    let type = event.target.value;
    switch (type) {
      case 'Single Choice':
        type = 1;
        break;
      case 'Multiple Choice':
        type = 2;
        break;
      case 'Text Input':
        type = 3;
        break;
      default:
        type = 'Single Choice';
    }
    await this.setState({ type: type });
    console.log(this.state);
  }

  async onChangeLevel(event) {
    let difficulty = event.target.value;
    switch (difficulty) {
      case 'Dễ':
        difficulty = 1;
        break;
      case 'Trung bình':
        difficulty = 2;
        break;
      case 'Khó':
        difficulty = 3;
        break;
      default:
        difficulty = 1;
    }
    await this.setState({ difficulty: difficulty });
    console.log(this.state);
  }

  async onSubmit() {
    let listAnswer = [];
    if (this.state.type === 1 || this.state.type === 2) {
      let answers = document.getElementsByName('answer' + this.state.id);
      let isCorrectList = document.getElementsByName(
        'isCorrect' + this.state.id,
      );
      for (let i = 0; i < answers.length; i++) {
        listAnswer.push({
          content: answers[i].value,
          isCorrect: isCorrectList[i].checked,
        });
      }
    } else {
      const answer = document.getElementById('text-answer').value;
      listAnswer.push({ content: answer, isCorrect: true });
    }
    const content = document.getElementById('content' + this.state.id).value;
    await this.setState({ answers: listAnswer, content: content });
    console.log(this.state);
    axios
      .post(
        config.SERVER_URL + '/api/question/update',
        {
          id: this.state.id,
          difficulty: this.state.difficulty,
          type: this.state.type,
          content: this.state.content,
          answers: this.state.answers,
        },
        {
          headers: authHeader(),
        },
      )
      .then(res => {
        if (res.data) {
          this.props.updateBankFromServer();
          alert('Sửa câu hỏi thành công');
          
        }
      })
      .catch(error => {
        alert('Sửa không thành công!');
      });
  }

  render() {
    let element;
    let type = this.state.type;
    let bonusAnswers = [];
    for (let i = 0; i < this.state.numOfBonusAnswer; i++) {
      bonusAnswers.push(
        <div className="input-group mb-2">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <input
                type={type === 1 ? 'radio' : 'checkbox'}
                name="isCorrect"
              />
            </div>
          </div>
          <input
            type="text"
            className="form-control"
            name="answer"
            placeholder="Nhập đáp án, tích nếu đáp án đúng"
          />
        </div>,
      );
    }
    switch (type) {
      case 1:
        element = (
          <div>
            {this.state.answers.map((answer, index) => {
              return (
                <div className="input-group mb-2" key={index}>
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      {answer.isCorrect ? (
                        <input
                          type="radio"
                          name={'isCorrect' + this.state.id}
                          defaultChecked
                        />
                      ) : (
                        <input
                          type="radio"
                          name={'isCorrect' + this.state.id}
                        />
                      )}
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name={'answer' + this.state.id}
                    defaultValue={answer.content}
                    placeholder="Nhập đáp án, tích nếu đáp án đúng"
                  />
                </div>
              );
            })}

            {bonusAnswers}
            <button
              className="btn btn-info"
              onClick={() => {
                this.setState({
                  numOfBonusAnswer: this.state.numOfBonusAnswer + 1,
                });
              }}
            >
              Thêm đáp án
            </button>
            {"  "}
            <button
              className="btn btn-danger"
              onClick={() => {
                this.setState({
                  numOfBonusAnswer: this.state.numOfBonusAnswer - 1,
                });
              }}
            >
              Xóa đáp án cuối
            </button>
          </div>
        );
        break;
      case 2:
        element = (
          <div>
            {this.state.answers.map(answer => {
              return (
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <input
                        type="checkbox"
                        name={'isCorrect' + this.state.id}
                        defaultChecked={answer.isCorrect}
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name={'answer' + this.state.id}
                    defaultValue={answer.content}
                    placeholder="Nhập đáp án, tích nếu đáp án đúng"
                  />
                </div>
              );
            })}

            {bonusAnswers}
            <button
              className="btn btn-info"
              onClick={() => {
                this.setState({
                  numOfBonusAnswer: this.state.numOfBonusAnswer + 1,
                });
              }}
            >
              Thêm đáp án
            </button>
            {"  "}
            <button
              className="btn btn-danger"
              onClick={() => {
                this.setState({
                  numOfBonusAnswer: this.state.numOfBonusAnswer - 1,
                });
              }}
            >
              Xóa đáp án cuối
            </button>
          </div>
        );
        break;

      case 3:
        element = (
          <div>
            <textarea
              className="form-control"
              id="text-answer"
              name={'answer' + this.state.id}
              defaultValue={this.state.answers[0].content}
              placeholder="Câu trả lời"
            ></textarea>
          </div>
        );
        break;
      default:
    }
    return (
      <div
        className="modal fade"
        id={'editQuestionModal' + this.state.id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Sửa câu hỏi
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
              <label>Nội dung</label>
              <div className="input-group mb-2">
                <textarea
                  className="form-control"
                  id={'content' + this.state.id}
                  defaultValue={this.state.content}
                ></textarea>
              </div>

              <div className="row mt-2">
                <div className="col-6">
                  <select
                    className="form-control"
                    name="type"
                    onChange={event => this.onChangeType(event)}
                  >
                    <option>Single Choice</option>
                    <option>Multiple Choice</option>
                    <option>Text Input</option>
                  </select>
                </div>
                <div className="col-6">
                  <select
                    className="form-control"
                    name="difficulty"
                    onChange={event => this.onChangeLevel(event)}
                  >
                    <option defaultChecked>Dễ</option>
                    <option>Trung bình</option>
                    <option>Khó</option>
                  </select>
                </div>
                <br />
                <br />
              </div>
              {element}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => this.onSubmit()}
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
    );
  }
}
export default Table;
