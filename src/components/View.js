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
    const {contextId, groupsData, projectDetailsReducer, bibles, currentToolName} = this.props;
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
    const {
      translate,
      actions,
      mode,
      verseEditReducer,
      remindersReducer,
      tags,
      verseText,
      verseChanged,
      comment,
      projectDetailsReducer,
      contextId,
      bibles,
      currentToolName,
      dialogModalVisibility,
      goToNextOrPrevious,
      commentChanged,
      selections,
      saveSelection,
      cancelSelection,
      clearSelection,
      newSelections
    } = this.props;

    let titleText;
    let saveArea;
    switch (mode) {
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
        saveArea = (
          <SaveArea
            actions={actions}
            selections={selections}
            translate={translate}
          />);
    }
    return (
      <div style={style.verseCheck}>
        <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
          <div style={style.verseCheckCard}>
            <div style={style.titleBar}>
              <span>{titleText}</span>
              <IconIndicators
                actions={actions}
                verseEdited={this.findIfVerseEdited()}
                selections={selections}
                verseEditReducer={verseEditReducer}
                comment={comment}
                remindersReducer={remindersReducer}
                translate={translate}
              />
            </div>
            <CheckArea
              actions={actions}
              mode={mode}
              tags={tags}
              verseText={verseText}
              verseChanged={verseChanged}
              comment={comment}
              newSelections={newSelections}
              selections={selections}
              translate={translate}
              projectDetailsReducer={projectDetailsReducer}
              contextId={contextId}
              bibles={bibles}
              currentToolName={currentToolName} />
            <ActionsArea
              tags={tags}
              mode={mode}
              actions={actions}
              commentChanged={commentChanged}
              selections={selections}
              newSelections={newSelections}
              remindersReducer={remindersReducer}
              saveSelection={saveSelection}
              cancelSelection={cancelSelection}
              clearSelection={clearSelection}
              translate={translate} />
          </div>
          {saveArea}
        </div>
        <DialogComponent
          dialogModalVisibility={dialogModalVisibility}
          handleOpen={actions.handleOpenDialog}
          handleClose={actions.handleCloseDialog}
          goToNextOrPrevious={goToNextOrPrevious}
          skipToNext={actions.skipToNext}
          skipToPrevious={actions.skipToPrevious}
          translate={translate}
        />
      </div>
    );
  }
}

View.propTypes = {
  newSelections: PropTypes.array.isRequired,
  commentChanged: PropTypes.bool.isRequired,
  selections: PropTypes.array.isRequired,
  saveSelection: PropTypes.func.isRequired,
  cancelSelection: PropTypes.func.isRequired,
  clearSelection: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
  verseText: PropTypes.string.isRequired,
  verseChanged: PropTypes.bool.isRequired,
  comment: PropTypes.string,
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
  goToNextOrPrevious: PropTypes.string,
  verseEditReducer: PropTypes.object.isRequired,
  remindersReducer: PropTypes.object.isRequired
};

export default View;
