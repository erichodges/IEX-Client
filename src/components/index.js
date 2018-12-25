import React from "react";
// import { render } from "react-dom";
import Chart from "./Chart";
import { getData } from "./Utils";

import { TypeChooser } from "react-stockcharts/lib/helper";

class ChartComponent extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    getData().then(data => {
      this.setState({ data: JSON.parse(data) });
    });
    console.log(this.state.data);
  }

  render() {
    if (this.state == null) {
      return <div>Loading...</div>;
    }
    return (
      <TypeChooser>
        {type => <Chart type={type} data={this.state.data} />}
      </TypeChooser>
    );
  }
}

// render(<ChartComponent />);

export default ChartComponent;
