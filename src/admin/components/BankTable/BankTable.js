import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import './BankTable.css';

const bank = [
	{
		id: '001',
		content: 'Ai là người thông minh nhất thế giới',
		type: 1,
		level: 1,
		listAnswer: [
			{ content: 'Ming', isCorrect: true },
			{ content: 'Không phải Ming', isCorrect: false },
			{ content: 'Không phải Ming part 2', isCorrect: false },
		],
		selected: false,
	},
	{
		id: '002',
		content: 'Top 3 thành phố đắt đỏ nhất thế giới',
		type: 2,
		level: 2,
		listAnswer: [
			{ content: 'Ming', isCorrect: true },
			{ content: 'Không phải Ming', isCorrect: false },
			{ content: 'Không phải Ming part 2', isCorrect: false },
		],
		selected: false,
	},
	{
		id: '003',
		content: 'Chiếc điện thoại mới nhất của Samsung tính đến 24/09/2019 là?',
		type: 1,
		level: 3,
		listAnswer: [
			{ content: 'Ming', isCorrect: true },
			{ content: 'Không phải Ming', isCorrect: false },
			{ content: 'Không phải Ming part 2', isCorrect: false },
		],
		selected: false,
	},
	{
		id: '004',
		content: 'Khổ thơ đầu bài thơ Đồng chí?',
		type: 3,
		level: 2,
		listAnswer: [{ content: 'Ming', isCorrect: true }],
		selected: false,
	},
	{
		id: '005',
		content: 'Ai là người thông minh nhất thế giới',
		type: 1,
		level: 1,
		listAnswer: [
			{ content: 'Ming', isCorrect: true },
			{ content: 'Không phải Ming', isCorrect: false },
			{ content: 'Không phải Ming part 2', isCorrect: false },
		],
		selected: false,
	},
	{
		id: '006',
		content: 'Top 3 thành phố đắt đỏ nhất thế giới',
		type: 2,
		level: 2,
		listAnswer: [
			{ content: 'Ming', isCorrect: true },
			{ content: 'Không phải Ming', isCorrect: false },
			{ content: 'Không phải Ming part 2', isCorrect: false },
		],
		selected: false,
	},
	{
		id: '007',
		content: 'Chiếc điện thoại mới nhất của Samsung tính đến 24/09/2019 là?',
		type: 1,
		level: 3,
		listAnswer: [{ content: 'Ming', isCorrect: true }],
		selected: false,
	},
	{
		id: '008',
		content: 'Khổ thơ đầu bài thơ Đồng chí?',
		type: 3,
		level: 2,
		listAnswer: [
			{ content: 'Ming', isCorrect: true },
			{ content: 'Không phải Ming', isCorrect: false },
			{ content: 'Không phải Ming part 2', isCorrect: false },
		],
		selected: false,
	},
];

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
			description: 'Bộ câu hỏi ôn tập cuối kì cho môn Công nghệ phần mềm',
			bank: bank,
			filteredBank: bank,
			isSearching: false,
		};
		console.log(this.state);
	}

	componentDidMount() {
		// axios.get('')
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

		const selectLevel = document.getElementById('level-search');
		let level = selectLevel.options[selectLevel.selectedIndex].value;

		switch (level) {
			case 'Dễ':
				level = 1;
				break;
			case 'Trung bình':
				level = 2;
				break;
			case 'Khó':
				level = 3;
			default:
				level = 'Tất cả';
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
			if (level === 'Tất cả') {
				levelValid = true;
			} else if (question.level === level) {
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
		let newBank = this.state.bank.filter(question => !question.selected);
		this.setState({ bank: newBank, filteredBank: newBank });
	}

	// onEdit() {
	// 	let selectedQuestions = this.state.bank.filter(question => question.selected);
	// 	if (selectedQuestions.length === 0) {
	// 		alert("Bạn chưa chọn câu hỏi nào. Vui lòng chọn 1 câu hỏi duy nhất!");
	// 	} else if (selectedQuestions.length > 1) {
	// 		alert("Bạn không thể sửa nhiều câu một lúc. Vui lòng chỉ chọn một câu!");
	// 	} else {
	// 		$("#editQuestionModal").modal("show");
	// 	}
	// }

	renderEditModal() {
		let selectedQuestions = this.state.bank.filter(
			question => question.selected,
		);
		if (selectedQuestions.length === 1) {
			let question = selectedQuestions[0];
			return <div></div>;
		}
	}

	onEditBankInformation() { }

	render() {
		return (
			<div className="content row">
				<div className="table-content">
					<div className="toolbar row">
						<button className="row item-center btn-header" data-toggle="modal" data-target="#addQuestionModal">
							<i className="fa fa-plus-square format-icon-menu "></i>
							<div>Thêm</div>
						</button>
						<AddQuestionModal></AddQuestionModal>
						<button
							className="row item-center btn-header"
							data-toggle="modal"
							data-target="#editBankModal"
						>
							<i className="fa fa-pencil format-icon-menu "></i>
							<div>Sửa</div>
						</button>
						<button
							className="row item-center btn-header"
							data-toggle="modal"
							data-target="#deleteQuestionModal"
						>
							<i className="fa fa-trash format-icon-menu "></i>
							<div>Xóa</div>
						</button>
						<button className="row item-center btn-header">
							<i className="fa fa-plus-square format-icon-menu "></i>
							<div>Nhập</div>
						</button>

						<div
							className="modal fade"
							id="deleteQuestionModal"
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
											onClick={() => this.onDelete()}
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
											<label for="exampleFormControlTextarea1">
												Tên ngân hàng
                      </label>
											<input
												className="form-control"
												type="text"
												defaultValue={this.state.name}
											></input>
										</div>
										<div className="form-group">
											<label for="exampleFormControlTextarea1">Mô tả</label>
											<textarea className="form-control">
												{this.state.description}
											</textarea>
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
					</div>

					<div className="main-table table-responsive-md">
						<table className="table text-left">
							<thead>
								<tr className="align-self-start">
									<th scope="col" style={{ width: '10%' }}>
										<label>STT</label>
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
											placeholder="Type to search"
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
											id="level-search"
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
													<tr
														className={
															e.selected ? 'checked question-row' : 'question-row'
														}
														key={i}
														onClick={() => this.toggleSelect(e.id)}
														onDouble
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
														<td>{e.content}</td>
														<td>
															{e.type === 1
																? 'Single Choice'
																: e.type === 2
																	? 'Multiple Choice'
																	: 'Text Input'}
														</td>
														<td>
															{e.level === 1
																? 'Dễ'
																: e.level === 2
																	? 'Trung bình'
																	: 'Khó'}
														</td>
														<div
															className="modal fade"
															id={'editQuestionModal' + e.id}
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
																			Sửa
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
																		<div className="input-group">
																			<textarea className="form-control">
																				{e.id}
																			</textarea>
																		</div>
																		<br />
																		<div className="input-group mb-2">
																			<div className="input-group-prepend">
																				<div className="input-group-text">
																					<input type="radio" />
																					
                                    </div>
																			</div>
																			<input
																				type="text"
																				className="form-control"
																				defaultValue="Hậu "
																			/>
																		</div>
																		<div className="input-group mb-2">
																			<div className="input-group-prepend">
																				<div className="input-group-text">
																					<input type="radio" />
																					
                                    </div>
																			</div>
																			<input
																				type="text"
																				className="form-control"
																				defaultValue="Minh"
																			/>
																		</div>
																		<div className="input-group mb-2">
																			<div className="input-group-prepend">
																				<div className="input-group-text">
																					<input type="radio" />
																					
                                    </div>
																			</div>
																			<input
																				type="text"
																				className="form-control"
																				defaultValue="Thành"
																			/>
																		</div>
																		<div className="input-group mb-2">
																			<div className="input-group-prepend">
																				<div className="input-group-text">
																					<input type="radio" />
																					
                                    </div>
																			</div>
																			<input
																				type="text"
																				className="form-control"
																				defaultValue="Ngọc "
																			/>
																		</div>
																		<div className="input-group mb-2">
																			<div className="input-group-prepend">
																				<div className="input-group-text">+</div>
																			</div>
																			<input
																				type="text"
																				className="form-control"
																				id="inlineFormInputGroup"
																				placeholder="Thêm đáp án"
																			/>
																		</div>
																	</div>
																	<div className="modal-footer">
																		<button
																			type="button"
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
													</tr>
												);
											})}
										</tbody>
									)}
						</table>
					</div>
				</div>
				<div className="infob-content">
					<div className="mt-2 mb-2">
						<h5>Thông tin ngân hàng</h5>
						<label>Tên: {this.state.name}</label>
						<br />
						<label>Mô tả: {this.state.description}</label>
						<br />
						<label>Sửa lần cuối: </label>
						<br />
					</div>
					<div className="separation"></div>
					<div className="mt-2 mb-2">
						<h5>Cấu trúc ngân hàng</h5>
						<label>Số câu dễ: </label>
						<br />
						<label>Số câu TB: </label>
						<br />
						<label>Số câu khó: </label>
						<br />
					</div>
					<div className="separation"></div>
					<div className="mt-2 mb-2">
						<h5>Cấu trúc ngân hàng</h5>
						<label>Single choice: </label>
						<br />
						<label>Mutil choice: </label>
						<br />
						<label>Text Input: </label>
						<br />
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
			content: '',
			type: 1,
			level: 1,
			listAnswer: [
				{ content: 'Ming', isCorrect: true },
				{ content: 'Không phải Ming', isCorrect: false },
				{ content: 'Không phải Ming part 2', isCorrect: false },
			],
			numOfBonusAnswer: 0
		};
	}

	async onChange(event) {
		const { name, value } = event.target;
		const newQuestion = this.state;
		newQuestion[name] = value;
		await this.setState(newQuestion);
		console.log(this.state);
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
			default: type = 'Single Choice';
		}
		await this.setState({type: type});
		console.log(this.state);
	}

	async onChangeLevel(event) {
		let level = event.target.value;
		switch (level) {
			case 'Dễ':
				level = 1;
				break;
			case 'Trung bình':
				level = 2;
				break;
			case 'Khó':
				level = 3;
			default: level = 1;
		}
		await this.setState({level: level});
		console.log(this.state);
	}

	onSubmit() {
		
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
							<input type={type === 1 ? "radio" : "checkbox"} name="isCorrect" />
							
						</div>
					</div>
					<input type="text" className="form-control" defaultValue="" name="answer" placeholder="Nhập đáp án, tích nếu đáp án đúng"/>
				</div>
			);
		}
		
		switch (type) {
      case 1:
        element = (
          <div>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <input type="radio" name="gia tri" checked />
                </div>
              </div>
              <input
                type="text"
                className="form-control"
                defaultValue=""
                name="answer"
                placeholder="Nhập đáp án, tích nếu đáp án đúng"
              />
            </div>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <input type="radio" name="gia tri" />
                </div>
              </div>
              <input
                type="text"
                className="form-control"
                defaultValue=""
                name="answer"
                placeholder="Nhập đáp án, tích nếu đáp án đúng"
              />
            </div>
            {bonusAnswers}
            <button
              class="btn btn-info"
              onClick={() => {
                this.setState({
                  numOfBonusAnswer: this.state.numOfBonusAnswer + 1,
                });
              }}
            >
              Thêm đáp án
            </button>
            <button
              class="btn btn-danger"
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
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <input type="checkbox" name="gia tri" checked />
                </div>
              </div>
              <input
                type="text"
                class="form-control"
                value="Hậu "
                name="answer"
                placeholder="Nhập đáp án, tích nếu đáp án đúng"
              />
            </div>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <input type="checkbox" name="gia tri" />
                </div>
              </div>
              <input
                type="text"
                class="form-control"
                name="answer"
                value="Hậu "
              />
            </div>
            {bonusAnswers}
            <button
              class="btn btn-info"
              onClick={() => {
                this.setState({
                  numOfBonusAnswer: this.state.numOfBonusAnswer + 1,
                });
              }}
            >
              Thêm đáp án
            </button>
            <button
              class="btn btn-danger"
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
            <textarea class="form-control" placeholder="Câu trả lời"></textarea>
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
                <label for="exampleFormControlTextarea1">Nội dung</label>
                <input
                  className="form-control"
                  type="text"
                  name="content"
                  placeholder="Nhập nội dung câu hỏi"
                  defaultValue={this.state.content}
                  onChange={event => this.onChange(event)}
                ></input>
                <br />
                <div className="row">
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
                      name="level"
                      onChange={event => this.onChangeLevel(event)}
                    >
                      <option>Dễ</option>
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
    );
	}
}

export default Table;
