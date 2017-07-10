import React from 'react';
import style from '../css/Style';
import CheckArea from './CheckArea';
import ActionsArea from './ActionsArea';
import SaveArea from './SaveArea';
import DialogComponent from './DialogComponent';
import IconIndicators from './IconIndicators';

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
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={style.verseCheckCard}>
          <div style={style.titleBar}>
            <span>{titleText}</span>
            <IconIndicators
              actions={this.props.actions}
              selectionsReducer={this.props.selectionsReducer}
              verseEditReducer={this.props.verseEditReducer}
              commentsReducer={this.props.commentsReducer}
              remindersReducer={this.props.remindersReducer}
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
