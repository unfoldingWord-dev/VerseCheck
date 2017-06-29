import React from 'react'
import {Row, Glyphicon, Col} from 'react-bootstrap'
import style from '../css/Style';
import CheckArea from './CheckArea'
import ActionsArea from './ActionsArea'
import SaveArea from './SaveArea'
import DialogComponent from './DialogComponent'

class View extends React.Component {

  render() {
    let { currentCheck } = this.props
    let titleText
    let saveArea
    switch (this.props.mode) {
      case 'edit':
        titleText = 'Edit Verse'
        saveArea = <div />
        break
      case 'comment':
        titleText = 'Comment'
        saveArea = <div />
        break
      case 'select':
        titleText = 'Step 2. Select'
        saveArea = <SaveArea {...this.props} />
        break
      default:
        titleText = 'Step 2. Select'
        saveArea = <SaveArea {...this.props} />
    }

    return (
      <div style={style.verseCheck}>
        <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
        <div style={style.verseCheckCard}>
          <div style={style.titleBar}>
            <span>{titleText}</span>
              <Glyphicon glyph="bookmark"
                style={{cursor: 'pointer', color: this.props.remindersReducer.enabled ? "var(--warning-color)" : "var(--reverse-color)"}}
                title={this.props.remindersReducer.enabled ? "Remove bookmark from this check" : "Bookmark this check for further review later"}
                onClick={this.props.actions.toggleReminder}
              />
            </div>
            <CheckArea {...this.props} />
            <ActionsArea {...this.props} />
          </div>
          {saveArea}
        </div>
        <DialogComponent
          dialogModalVisibility={this.props.dialogModalVisibility}
          handleOpen={this.props.actions.handleOpenDialog}
          handleClose={this.props.actions.handleCloseDialog}
          goToNextOrPrevious={this.props.goToNextOrPrevious}
          skipToNext={this.props.actions.skipToNext}
          skipToPrevious={this.props.actions.skipToPrevious}
        />
      </div>
    )
  }
}

export default View
