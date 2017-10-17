import React, { Component } from 'react';
import style from '../css/Style';
// components
import RenderSelectionTextComponent from './RenderSelectionTextComponent';

class SelectionArea extends Component {
  constructor() {
    super();
    this.state = {
      inBox: false,
      modalVisibility: false
    };
  }

  render() {
    const {
      projectDetailsReducer: {
        manifest
      }
    } = this.props;
    const bookName = manifest.project.name;
    const reference = this.props.contextIdReducer.contextId.reference;
    // const bibles = this.props.resourcesReducer.bibles;
    const languageName = manifest.target_language ? manifest.target_language.name : null;
    // const dir = manifest.target_language ? manifest.target_language.direction : null;
    return (
      <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
        <div style={style.verseTitle}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={style.pane.title}>
              {languageName}
            </span>
            <span style={style.pane.subtitle}>
              {bookName} {reference.chapter + ':' + reference.verse}
            </span>
          </div>
        </div>
        <div style={this.props.projectDetailsReducer.manifest.target_language.direction === 'ltr' ? style.pane.contentLTR : style.pane.contentRTL}>
          <RenderSelectionTextComponent
            actions={this.props.actions}
            mode={this.props.mode}
            verseText={this.props.verseText}
            selections={this.props.selections}
          />
        </div>
      </div>
    );
  }
}

export default SelectionArea;
