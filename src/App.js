import {Component} from "react";
const { Chart } = require("react-google-charts");

class App extends Component {
  state = {
    real_data: [[]]
  };

  async componentDidMount() {
    const response = await fetch('/chartIncidence2');
    const body = await response.json();
    this.setState({real_data: body});
  }

  render() {
    const incData = this.state.real_data.map(inc => ({
        datum: inc.datum,
        incidence: inc.incidence_7_100000
    }))
    return (
        <div className="col-xl-12 text-center mb-3">
          <h2>Spring Boot Google Charts Example</h2>
          <Chart
              width={1200}
              height={800}
              chartType="ColumnChart"
              loader={<div>Loading Chart</div>}

              columns={[ {type: "string", label: "datum"},
                  {type: "number", label: "Incidence"} ]}

              data={[
                  ['datum', 'Incidence'],
                  ...incData.map(inc => [inc.datum, inc.incidence]),
              ]}

              options={{
                title : 'Incidence',
                hAxis : {
                    title : 'datum',
                },
                vAxis : {
                    title : 'Incidence na 100000'
                }
              }}
              legendToggle
          />
        </div>
    );
  }
}
export default App;

//
// function drawColumnChart() {
//   let data = new google.visualization.DataTable();
//   data.addColumn('string', 'datum');
//   data.addColumn('number', 'Incidence');
//   Object.keys(real_data).forEach(function(key) {
//     data.addRow([ key.datum, real_data.incidence7100000 ]);
//   };
// };

  // var options = {
  //   title : 'Incidence',
  //   hAxis : {
  //     title : 'datum',
  //   },
  //   vAxis : {
  //     title : 'Incidence na 100000'
  //   }
  // };

  // var chart = new google.visualization.ColumnChart(document
  //     .getElementById('chart_div'));
  // chart.draw(data, options);
// }


