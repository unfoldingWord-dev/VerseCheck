import React, { Component, PropTypes } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Dialog, FlatButton} from 'material-ui'

class DialogComponent extends Component {
  constructor(props) {
    injectTapEventPlugin();
    super(props);
  }

  handleSkip() {
    if (this.props.goToNextOrPrevious == "next") {
      this.props.skipToNext()
    } else if (this.props.goToNextOrPrevious == "previous") {
      this.props.skipToPrevious()
    } else {
       // do nothing
    }
  }

  render() {
    let {dialogModalVisibility} = this.props

    const actions = [
      <FlatButton
        label="Skip"
        primary={true}
        onTouchTap={this.handleSkip.bind(this)}
      />,
      <FlatButton
        label="Close"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.handleClose}
      />
    ];

    return (
      <div>
        <Dialog
          title="Attention:"
          actions={actions}
          modal={false}
          open={dialogModalVisibility}
          onRequestClose={this.props.handleClose}
        >
          <div>
            <p>
              Please <span style={{color: "#03a9f4", fontWeight: "bold"}}>select </span>
              the correct translation for your current check.
            </p>
            <p>
              If you are unable to perform this check, you may
              <span style={{color: "#03a9f4", fontWeight: "bold"}}> skip it </span>
              and come back to it later.
            </p>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default DialogComponent
