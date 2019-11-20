import React, { Component, PureComponent } from 'react';
import Layout from '../components/Layout/Layout';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Sector,
  Cell,
  Label,
  ResponsiveContainer,
} from 'recharts';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../_config/config';
import { authHeader } from '../../_helpers/auth-header';

import './StatisticsPageAdmin.css';

class StatisticsPageAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = { id: this.props.match.params.id };
  }

  componentDidMount() {
      axios.get(config.SERVER_URL + "/api/examinee/get/" + this.state.id, {
          headers: authHeader()
      }).then(res => {
          console.log(res.data);
      })
  }

  render() {
    return (
      <Layout>
        <div className="content">
          <div className="separation-y" />
          <div className="container-fluid">
            <div className="header-row-list">
                <h3></h3>
            </div>
            <OverallDataRow examId={this.state.id}></OverallDataRow>
            {/* Biểu đồ đường/tròn */}
            <div className="row">
              {/* Biểu đồ đường */}
              <ScoreLineChart examId={this.state.id}></ScoreLineChart>
              {/* Biểu đồ tròn */}
              <RaitoPieChart examId={this.state.id}></RaitoPieChart>
            </div>
            {/* biểu đồ progress */}
            <div className="row">
              {/*  Biểu đồ dạng progress bar tỉ lệ trả lời đúng câu hỏi Dễ/ TB/ Khó */}
              <DifficultyProgressBar
                examId={this.state.id}
              ></DifficultyProgressBar>
              {/*  Biểu đồ dạng progress bar tỉ lệ trả lời đúng câu hỏi text/ single-choice/ multil-choice */}
              <TypeProgressBar examId={this.state.id}></TypeProgressBar>
            </div>
            {/* Bảng thống kê người làm bài */}
            <UserExamTable examId={this.state.id}></UserExamTable>
          </div>
        </div>
      </Layout>
    );
  }
}

class OverallDataRow extends Component {
  constructor(props) {
    super(props);
    this.state = { examId: this.props.examId };
  }
  render() {
    return (
      <div className="row">
        <div className="col-xl-4 col-md-6 col-sm-12 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Số lượng người làm
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800 fs-22">
                    215,000
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fa fa-user fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-6 col-sm-12 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1 ">
                    Điểm trung bình
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800 fs-22">
                    7.5
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fa fa-star fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-6 col-sm-12 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1 ">
                    Thời gian trung bình
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800 ">
                    45 phút 36 giây
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fa fa-hourglass-end fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ScoreLineChart extends PureComponent {
  constructor(props) {
    super(props);
    const data = [
      {
        name: '0-1',
        total: 4000,
      },
      {
        name: '1-2',
        total: 3000,
      },
      {
        name: '2-3',
        total: 2000,
      },
      {
        name: '3-4',
        total: 2780,
      },
      {
        name: '4-5',
        total: 1890,
      },
      {
        name: '5-6',
        total: 2390,
      },
      {
        name: '6-7',
        total: 3490,
      },
      {
        name: '7-8',
        total: 2009,
      },
      {
        name: '8-9',
        total: 2390,
      },
      {
        name: '9-10',
        total: 3490,
      },
    ];
    this.state = { examId: this.props.examId, data: data };
  }
  render() {
    return (
      <div className="col-xl-8 col-lg-7">
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Phổ điểm</h6>
            <div className="dropdown no-arrow">
              <a
                className="dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-ellipsis-v fa-sm fa-fw text-gray-400" />
              </a>
              <div
                className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                aria-labelledby="dropdownMenuLink"
              >
                <div className="dropdown-header">step</div>
                <div className="dropdown-item" href="#">
                  1
                </div>
                <div className="dropdown-item" href="#">
                  0.5
                </div>
              </div>
            </div>
          </div>
          <div className="card-body  d-flex align-items-center">
            <div className="chart-area">
              {/* đổ biểu đồ đường trong thẻ canvas */}
              <LineChart
                width={600}
                height={300}
                data={this.state.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name">
                  <Label
                    value="Phổ điểm"
                    offset="-5"
                    position="insideBottom"
                  ></Label>
                </XAxis>
                <YAxis
                  dataKey="total"
                  label={{
                    value: 'Số lượng',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                ></YAxis>
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#82ca9d" />
              </LineChart>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class RaitoPieChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { examId: this.props.examId, data: [] };
    console.log(RaitoPieChart.COLORS);
  }

  componentDidMount() {
    const data = [
      { name: 'Yếu', value: 100 },
      { name: 'Trung bình', value: 200 },
      { name: 'Khá', value: 600 },
      { name: 'Giỏi', value: 250 },
    ];
    this.setState({ data: data });
  }
  render() {
    const COLORS = ['#dc3545', '#ffc107', '#007bff', '#28a745'];
    return (
      <div className="col-xl-4 col-lg-5">
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">
              Tỉ lệ theo mức điểm
            </h6>
          </div>
          <div>
            <div className="text-center">
              <span className="mr-2">
                <i className="fa fa-circle text-danger" /> Yếu
              </span>
              <span className="mr-2">
                <i className="fa fa-circle text-warning" /> Trung bình
              </span>
              <span className="mr-2">
                <i className="fa fa-circle text-primary" /> Khá
              </span>
              <span className="mr-2">
                <i className="fa fa-circle text-success" /> Giỏi
              </span>
            </div>
            <div className="card-body d-flex align-items-center">
              {/* đổ biểu đồ tròn vào trong thẻ canvas */}
              <PieChart width={300} height={245} onMouseEnter={this.onPieEnter}>
                <Pie
                  data={this.state.data}
                  cx={145}
                  cy={90}
                  innerRadius={70}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {this.state.data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class DifficultyProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = { examId: this.props.examId };
  }
  render() {
    return (
      <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Tỉ lệ trả lời đúng
            </h6>
          </div>
          <div className="card-body">
            <h4 className="small font-weight-bold">
              Khó<span className="float-right">20%</span>
            </h4>
            <div className="progress mb-4">
              <div
                className="progress-bar bg-danger"
                role="progressbar"
                style={{ width: '20%' }}
                aria-valuenow={20}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <h4 className="small font-weight-bold">
              Trung bình<span className="float-right">40%</span>
            </h4>
            <div className="progress mb-4">
              <div
                className="progress-bar bg-warning"
                role="progressbar"
                style={{ width: '40%' }}
                aria-valuenow={40}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <h4 className="small font-weight-bold">
              Dễ<span className="float-right">60%</span>
            </h4>
            <div className="progress mb-4">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: '60%' }}
                aria-valuenow={60}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class TypeProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = { examId: this.props.examId };
  }
  render() {
    return (
      <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Tỉ lệ trả lời đúng theo loại câu hỏi
            </h6>
          </div>
          <div className="card-body">
            <h4 className="small font-weight-bold">
              Dạng Text Input<span className="float-right">20%</span>
            </h4>
            <div className="progress mb-4">
              <div
                className="progress-bar bg-danger"
                role="progressbar"
                style={{ width: '20%' }}
                aria-valuenow={20}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <h4 className="small font-weight-bold">
              Dạng Multiple Choice<span className="float-right">40%</span>
            </h4>
            <div className="progress mb-4">
              <div
                className="progress-bar bg-warning"
                role="progressbar"
                style={{ width: '40%' }}
                aria-valuenow={40}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <h4 className="small font-weight-bold">
              Dạng Single Choice<span className="float-right">60%</span>
            </h4>
            <div className="progress mb-4">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: '60%' }}
                aria-valuenow={60}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <h4 className="small font-weight-bold">
              Dạng Yes/No<span className="float-right">80%</span>
            </h4>
            <div className="progress mb-4">
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: '60%' }}
                aria-valuenow={80}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          
          </div>
        </div>
      </div>
    );
  }
}

class UserExamTable extends Component {
  constructor(props) {
    super(props);
    this.state = { examId: this.props.examId };
  }
  render() {
    return (
      <div className="card shadow mb-4 m-15">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Bảng thống kê người làm bài
          </h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <div
              id="dataTable_wrapper"
              className="dataTables_wrapper dt-bootstrap4"
            >
              <div className="row">
                <div className="col-sm-12">
                  <table
                    className="table table-striped"
                    width="100%"
                    cellSpacing={0}
                    style={{ width: '100%' }}
                  >
                    <thead>
                      <tr role="row">
                        <th
                          tabIndex={0}
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: '30.6px' }}
                        >
                          STT
                        </th>
                        <th tabIndex={0} rowSpan={1} colSpan={1}>
                          Người làm bài
                        </th>
                        <th
                          tabIndex={0}
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: '30.6px' }}
                        >
                          Điểm
                        </th>
                        <th tabIndex={0} rowSpan={1} colSpan={1}>
                          Thời gian làm bài
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr role="row" className="odd">
                        <td className="sorting_1 text-center">1</td>
                        <td>Accountant</td>
                        <td className="text-center">10</td>
                        <td className="text-center">33</td>
                      </tr>
                      <tr role="row" className="even">
                        <td className="sorting_1 text-center">2</td>
                        <td>Chief Executive Officer (CEO)</td>
                        <td className="text-center">10</td>
                        <td className="text-center">47</td>
                      </tr>
                      <tr role="row" className="odd">
                        <td className="sorting_1 text-center">3</td>
                        <td>Junior Technical Author</td>
                        <td className="text-center">10</td>
                        <td className="text-center">66</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StatisticsPageAdmin;
