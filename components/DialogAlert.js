import React, {Component, PropTypes} from 'react';
import {Dialog, FlatButton} from 'material-ui';

export default class DialogAlert extends Component {

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.props.handleClose}
      />
    ];

    return (
        <Dialog
          title="Attention:"
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
        >
          Please indicate what type of edit this is by selecting a checkbox.
        </Dialog>
    );
  }
}

DialogAlert.PropTypes = {
  open: PropTypes.boolean,
  handleClose: PropTypes.func
};
