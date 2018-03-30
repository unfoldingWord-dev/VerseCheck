import React from 'react';
import PropTypes from 'prop-types';
import style from '../css/Style';
// components
import CheckArea from './CheckArea';
import ActionsArea from './ActionsArea';
import SaveArea from './SaveArea';
import DialogComponent from './DialogComponent';
import IconIndicators from './IconIndicators';
import isEqual from 'deep-equal';

class View extends React.Component {

  findIfVerseEdited() {
    const {
      contextIdReducer: {
        contextId
      },
      groupsDataReducer: {
        groupsData
      }
    } = this.props;
    let result = false;

    if (groupsData[contextId.groupId]) {
      let groupData = groupsData[contextId.groupId].filter(groupData => {
        return isEqual(groupData.contextId, contextId);
      });
      result = groupData[0].verseEdits;
    }
    return result;
  }

  render() {
    const {translate} = this.props;
    let titleText;
    let saveArea;
    switch (this.props.mode) {
      case 'edit':
        titleText = translate('edit_verse');
        saveArea = <div />;
        break;
      case 'comment':
        titleText = translate('comment');
        saveArea = <div />;
        break;
      case 'select':
        titleText = translate('select');
        saveArea = <div />;
        break;
      default:
        titleText = translate('step2_check');
        saveArea = <SaveArea {...this.props} />;
    }
    return (
      <div style={style.verseCheck}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={style.verseCheckCard}>
            <div style={style.titleBar}>
              <span>{titleText}</span>
              <IconIndicators
                actions={this.props.actions}
                verseEdited={this.findIfVerseEdited()}
                selectionsReducer={this.props.selectionsReducer}
                verseEditReducer={this.props.verseEditReducer}
                commentsReducer={this.props.commentsReducer}
                remindersReducer={this.props.remindersReducer}
                translate={translate}
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
          translate={translate}
        />
      </div>
    );
  }
}

View.propTypes = {
  translate: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  contextIdReducer: PropTypes.shape({
    contextId: PropTypes.object
  }).isRequired,
  groupsDataReducer: PropTypes.shape({
    groupsData: PropTypes.object
  }).isRequired,
  dialogModalVisibility: PropTypes.bool.isRequired,
  goToNextOrPrevious: PropTypes.func,
  selectionsReducer: PropTypes.object.isRequired,
  verseEditReducer: PropTypes.object.isRequired,
  commentsReducer: PropTypes.object.isRequired,
  remindersReducer: PropTypes.object.isRequired
};

export default View;
