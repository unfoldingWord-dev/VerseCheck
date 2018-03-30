import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Dialog, CardHeader} from 'material-ui';
import {Glyphicon} from 'react-bootstrap';
import {getTranslatedParts} from '../helpers/localizationHelpers';

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
    let {dialogModalVisibility, translate} = this.props;

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
        {translate("skip")}
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
        {translate("close")}
      </button>
    ];

    const headerContent = (
      <div>
        <span>{translate("attention")}</span>
        <Glyphicon
          onClick={this.props.handleClose}
          glyph={"remove"}
          style={{color: "var(--reverse-color)", cursor: "pointer", fontSize: "18px", float: "right"}}
        />
       </div>
    );
    
    let select = getTranslatedParts(translate, "select_translation", "${span}", 3);
    let skip = getTranslatedParts(translate, "can_skip", "${span}", 3);
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
              {select[0]} <span style={{color: "var(--accent-color)", fontWeight: "bold"}}> {select[1]} </span> {select[1]}
            </p>
            <p>
              {skip[0]} <span style={{color: "var(--accent-color)", fontWeight: "bold"}}> {skip[1]} </span> {skip[1]}
            </p>
          </div>
        </Dialog>
      </div>
    );
  }
}

DialogComponent.propTypes = {
  translate: PropTypes.func.isRequired,
  goToNextOrPrevious: PropTypes.string,
  skipToPrevious: PropTypes.func.isRequired,
  skipToNext: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  dialogModalVisibility: PropTypes.bool.isRequired
};

export default DialogComponent;
