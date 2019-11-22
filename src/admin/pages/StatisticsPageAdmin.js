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
    this.state = { id: this.props.match.params.id, name: '' };
  }

  componentDidMount() {
    axios
      .get(config.SERVER_URL + '/api/examinee/get/' + this.state.id, {
        headers: authHeader(),
      })
      .then(res => {
        this.setState({ name: res.data.name });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Layout>
        <div className="content">
          <div className="separation-y" />
          <div className="container-fluid">
            <div className="header-row-list">
              <h3 className="ml-3 py-3">{this.state.name}</h3>
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
            {/*  Biểu đồ dạng progress bar tỉ lệ trả lời đúng câu hỏi Dễ/ TB/ Khó */}
            <ProgressBar examId={this.state.id}></ProgressBar>
            {/* Bảng thống kê người làm bài */}
            <ParticipantsTable examId={this.state.id}></ParticipantsTable>
          </div>
        </div>
      </Layout>
    );
  }
}

class OverallDataRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      examId: this.props.examId,
      participants: 0,
      avgScore: 0,
      avgTimeSpent: '',
    };
  }

  componentDidMount() {
    axios
      .post(
        config.SERVER_URL + '/API/statistic/statistics',
        JSON.stringify(this.state.examId),
        {
          headers: authHeader(),
        },
      )
      .then(res => {
        const data = res.data;
        this.setState({
          participants: data.participants,
          avgScore: data.avgScore,
          avgTimeSpent: data.avgTimeSpent,
        });
      })
      .catch(error => {
        console.log(error);
      });
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
                    {this.state.participants}
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
                    {this.state.avgScore}
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
                    {this.state.avgTimeSpent}
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
    this.state = { examId: this.props.examId, step: 1, data: [] };
  }

  componentDidMount() {
    this.updateLineChart();
  }

  updateLineChart() {
    let list;
    axios
      .post(
        config.SERVER_URL + '/api/statistic/line-chart',
        { examId: this.state.examId, step: this.state.step },
        {
          headers: authHeader(),
        },
      )
      .then(async res => {
        list = res.data;
        const data = await this.renderData(this.state.step, list);
        await this.setState({ data: data });
        console.log(this.state);
      });
  }

  renderData(step, list) {
    const data = [];
    for (let i = 0; i < 10 / step; i++) {
      data.push({ name: i * step + '-' + (i + 1) * step, total: list[i] });
    }
    return data;
  }

  render() {
    return (
      <div className="col-xl-8 col-lg-7">
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Phổ điểm</h6>
            <div>
              <div className="dropdown no-arrow">
                <select
                  className="form-control"
                  onChange={async event => {
                    await this.setState({ step: event.target.value });
                    this.updateLineChart();
                  }}
                >
                  <option disabled selected value>
                    Chọn bước nhảy
                  </option>
                  <option value="0.5">0.5</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="2.5">2.5</option>
                </select>
              </div>
            </div>
          </div>
          <div className="card-body  d-flex align-items-center">
            <div className="chart-area">
              {/* đổ biểu đồ đường trong thẻ canvas */}
              <LineChart
                width={700}
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
                    offset={-5}
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
                <Line type="monotone" dataKey="total" stroke="#0055ff" />
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
  }

  componentDidMount() {
    axios
      .post(
        config.SERVER_URL + '/api/statistic/pie-chart',
        JSON.stringify(this.state.examId),
        { headers: authHeader() },
      )
      .then(res => {
        const data = res.data;
        const chartData = [
          { name: 'Yếu', value: data[0] },
          { name: 'Trung bình', value: data[1] },
          { name: 'Khá', value: data[2] },
          { name: 'Giỏi', value: data[3] },
        ];
        this.setState({ data: chartData });
      });
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

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = { examId: this.props.examId, difficulty: [], type: [] };
  }

  componentDidMount() {
    axios
      .post(
        config.SERVER_URL + '/api/statistic/progressbar',
        JSON.stringify(this.state.examId),
        {
          headers: authHeader(),
        },
      )
      .then(async res => {
        const data = res.data;
        await this.setState({
          difficulty: data.difficulty,
          type: data.type,
        });
        console.log(this.state);
      });
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Tỉ lệ trả lời đúng
              </h6>
            </div>
            <div className="card-body">
              <h4 className="small font-weight-bold">
                Dễ
                <span className="float-right">
                  {this.state.difficulty[0] + '%'}
                </span>
              </h4>
              <div className="progress mb-4">
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: this.state.difficulty[0] + '%' }}
                  aria-valuenow={this.state.difficulty[0]}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <h4 className="small font-weight-bold">
                Trung bình
                <span className="float-right">
                  {this.state.difficulty[1] + '%'}
                </span>
              </h4>
              <div className="progress mb-4">
                <div
                  className="progress-bar bg-warning"
                  role="progressbar"
                  style={{ width: this.state.difficulty[1] + '%' }}
                  aria-valuenow={this.state.difficulty[1]}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <h4 className="small font-weight-bold">
                Khó
                <span className="float-right">
                  {this.state.difficulty[2] + '%'}
                </span>
              </h4>
              <div className="progress mb-4">
                <div
                  className="progress-bar bg-danger"
                  role="progressbar"
                  style={{ width: this.state.difficulty[2] + '%' }}
                  aria-valuenow={this.state.difficulty[2]}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 mb-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Tỉ lệ trả lời đúng theo loại câu hỏi
              </h6>
            </div>
            <div className="card-body">
              <h4 className="small font-weight-bold">
                Dạng Text Input
                <span className="float-right">{this.state.type[0] + '%'}</span>
              </h4>
              <div className="progress mb-4">
                <div
                  className="progress-bar bg-danger"
                  role="progressbar"
                  style={{ width: this.state.type[0] + '%' }}
                  aria-valuenow={this.state.type[0]}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <h4 className="small font-weight-bold">
                Dạng Multiple Choice
                <span className="float-right">{this.state.type[1] + '%'}</span>
              </h4>
              <div className="progress mb-4">
                <div
                  className="progress-bar bg-warning"
                  role="progressbar"
                  style={{ width: this.state.type[1] + '%' }}
                  aria-valuenow={this.state.type[1]}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <h4 className="small font-weight-bold">
                Dạng Single Choice
                <span className="float-right">{this.state.type[2] + '%'}</span>
              </h4>
              <div className="progress mb-4">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: this.state.type[2] + '%' }}
                  aria-valuenow={this.state.type[2]}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <h4 className="small font-weight-bold">
                Dạng Yes/No
                <span className="float-right">{this.state.type[3] + '%'}</span>
              </h4>
              <div className="progress mb-4">
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: this.state.type[3] + '%' }}
                  aria-valuenow={this.state.type[3]}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ParticipantsTable extends Component {
  constructor(props) {
    super(props);
    this.state = { examId: this.props.examId };
  }

  componentDidMount() {
    axios
      .post(
        config.SERVER_URL + '/API/statistic/participant',
        JSON.stringify(this.state.examId),
        {
          headers: authHeader(),
        },
      )
      .then(res => {
        const data = res.data;
      });
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
