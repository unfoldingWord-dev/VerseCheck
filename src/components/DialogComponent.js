import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Dialog, CardHeader} from 'material-ui';
import {Glyphicon} from 'react-bootstrap';

class DialogComponent extends Component {
  constructor(props) {
    super(props);
    this.handleSkip = this.handleSkip.bind(this);
  }

  handleSkip() {
    if (this.props.goToNextOrPrevious == "next") {
      this.props.skipToNext();
    } else if (this.props.goToNextOrPrevious == "previous") {
      this.props.skipToPrevious();
    } else {
       // do nothing
    }
  }

  render() {
    let {dialogModalVisibility} = this.props;

    const actions = [
      <button
        key={1}
        className="btn-second"
        onClick={
          (e) => {
            e.preventDefault();
            this.handleSkip();
          }
        }
      >
      Skip
      </button>,
      <button
        key={2}
        className="btn-prime"
        onClick={
          (e) => {
            e.preventDefault();
            this.props.handleClose();
          }
        }
      >
      Close
      </button>
    ];

    const headerContent = (
      <div>
        <span>{"Attention:"}</span>
        <Glyphicon
          onClick={this.props.handleClose}
          glyph={"remove"}
          style={{color: "var(--reverse-color)", cursor: "pointer", fontSize: "18px", float: "right"}}
        />
       </div>
    );

    return (
      <div>
        <Dialog
          style={{padding: "0px"}}
          actions={actions}
          modal={false}
          open={dialogModalVisibility}
          onRequestClose={this.props.handleClose}
        >
        <CardHeader
          style={{ color: "var(--reverse-color)", backgroundColor: 'var(--accent-color-dark)', padding: '15px', margin: "-44px -24px -24px -24px"}}
        >{headerContent}</CardHeader><br /><br />
          <div>
            <p>
              Please <span style={{color: "var(--accent-color)", fontWeight: "bold"}}>select </span>
              the correct translation for your current check.
            </p>
            <p>
              If you are unable to perform this check, you may
              <span style={{color: "var(--accent-color)", fontWeight: "bold"}}> skip it </span>
              and come back to it later.
            </p>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default DialogComponent;
