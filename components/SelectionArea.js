import React, { Component } from 'react';
import DirectionsArea from './DirectionsArea';

class SelectionArea extends Component {
  render() {
    let { quote } = this.props;

    return (
      <div>
        <div style={{ flex: "0.2", justifyContent: "center", alignItems: "center", borderBottom: '1px solid var(--border-color)', width: "100%" }}>
          <DirectionsArea quote={quote} />
        </div>
        <div style={{ flex: "0.8", justifyContent: "center", alignItems: "center" }}>
          "Selection area"
        </div>
      </div>
    );
  }
}

export default SelectionArea;