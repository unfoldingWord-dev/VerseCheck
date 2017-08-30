  /**
  * @author Christopher Klpap
  * @description This component displays the Verse so selection, edit and comments can be made
  */
import React from 'react'
import View from './components/View'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {optimizeSelections, normalizeString} from './utils/selectionHelpers'
// constant declaration
const NAMESPACE = "VerseCheck";

class VerseCheck extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: props.selectionsReducer.selections.length > 0 ? 'default' : 'select',
      comment: undefined,
      commentChanged: false,
      verseText: undefined,
      verseChanged: false,
      selections: [],
      tags: [],
      dialogModalVisibility: false,
      goToNextOrPrevious: null
    }

    let that = this

    this.tagList = [
      ["spelling", "Spelling"],
      ["punctuation", "Punctuation"],
      ["grammar", "Grammar"],
      ["meaning", "Meaning"],
      ["wordChoice", "Word Choice"],
      ["other", "Other"]
    ]

    this.actions = {
      handleGoToNext: function() {
        if (!that.props.loginReducer.loggedInUser) {
          that.props.actions.selectModalTab(1, 1, true);
          that.props.actions.openAlertDialog("You must be logged in to save progress");
          return;
        }
        props.actions.goToNext()
      },
      handleGoToPrevious: function() {
        if (!that.props.loginReducer.loggedInUser) {
          that.props.actions.selectModalTab(1, 1, true);
          that.props.actions.openAlertDialog("You must be logged in to save progress");
          return;
        }
        props.actions.goToPrevious()
      },
      handleOpenDialog(goToNextOrPrevious) {
        that.setState({goToNextOrPrevious})
        that.setState({dialogModalVisibility: true});
      },
      handleCloseDialog() {
        that.setState({dialogModalVisibility: false});
      },
      skipToNext() {
        that.setState({dialogModalVisibility: false});
        props.actions.goToNext()
      },
      skipToPrevious() {
        that.setState({dialogModalVisibility: false});
        props.actions.goToPrevious()
      },
      changeSelectionsInLocalState: function(selections) {
        that.setState({ selections });
      },
      changeMode: function(mode) {
        let newState = that.state
        newState.mode = mode
        that.setState(newState)
      },
      handleComment: function(e) {
        const comment = e.target.value
        let newState = that.state
        newState.comment = comment
        that.setState(newState)
      },
      checkComment: function(e) {
        const newcomment = e.target.value || "";
        const oldcomment = that.props.commentsReducer.text || "";

        that.setState({
          commentChanged: newcomment !== oldcomment
        })
      },
      cancelComment: function(e) {
        that.setState({
          mode: 'default',
          comment: undefined,
          commentChanged: false
        })
      },
      saveComment: function() {
        if (!that.props.loginReducer.loggedInUser) {
          that.props.actions.selectModalTab(1, 1, true);
          that.props.actions.openAlertDialog("You must be logged in to leave a comment", 5);
          return;
        }
        that.props.actions.addComment(that.state.comment, that.props.loginReducer.userdata.username)
        that.setState({
          mode: 'default',
          comment: undefined,
          commentChanged: false
        })
      },
      handleTagsCheckbox: function(tag, e) {
        let newState = that.state
        if (newState.tags === undefined) newState.tags = []
        if (!newState.tags.includes(tag)) {
          newState.tags.push(tag)
        } else {
          newState.tags = newState.tags.filter( _tag => _tag !== tag)
        }
        that.setState(newState)
      },
      handleEditVerse: function(e) {
        const verseText = e.target.value
        let newState = that.state
        newState.verseText = verseText
        that.setState(newState)
      },
      checkVerse: function(e) {
        let {chapter, verse} = that.props.contextIdReducer.contextId.reference;
        const newverse = e.target.value || "";
        const oldverse = that.props.resourcesReducer.bibles.targetLanguage[chapter][verse] || "";

        if (newverse === oldverse) {
          that.setState({
            verseChanged: false,
            tags: []
          })
        } else {
          that.setState({
            verseChanged: true
          })
        }
      },
      cancelEditVerse: function() {
        that.setState({
          mode: 'default',
          verseText: undefined,
          verseChanged: false,
          tags: []
        })
      },
      saveEditVerse: function() {
        let {loginReducer, actions, contextIdReducer, resourcesReducer} = that.props;
        let {chapter, verse} = contextIdReducer.contextId.reference;
        let before = resourcesReducer.bibles.targetLanguage[chapter][verse];
        let username = loginReducer.userdata.username;
        // verseText state is undefined if no changes are made in the text box.
        if (!loginReducer.loggedInUser) {
          that.props.actions.selectModalTab(1, 1, true);
          that.props.actions.openAlertDialog("You must be logged in to edit a verse");
          return;
        }

        const save = () => {
          actions.addVerseEdit(before, that.state.verseText, that.state.tags, username);
          that.setState({
            mode: 'default',
            verseText: undefined,
            verseChanged: false,
            tags: []
          });
        }

        if (that.state.verseText) {  // if verseText === "" is false
          save();
        } else {
          // alert the user if the text is blank
          let message = 'You are saving a blank verse. Please confirm.';
          that.props.actions.openOptionDialog(message, (option)=> {
            if (option !== "Cancel") save();
            that.props.actions.closeAlertDialog();
          }, "Save Blank Verse", "Cancel");
        }

      },
      validateSelections: (verseText) => {
        that.props.actions.validateSelections(verseText)
      },
      toggleReminder: () => {
        that.props.actions.toggleReminder(that.props.loginReducer.userdata.username)
      },
      openAlertDialog: (message) => {
        that.props.actions.openAlertDialog(message)
      },
      selectModalTab: (tab, section, vis) => {
        that.props.actions.selectModalTab(tab, section, vis);
      }
    }
  }

  componentWillMount() {
    let selections = Array.from(this.props.selectionsReducer.selections);
    this.setState({selections});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contextIdReducer.contextId != this.props.contextIdReducer.contextId) {
      let selections = Array.from(nextProps.selectionsReducer.selections);
      this.setState({
        mode: nextProps.selectionsReducer.selections.length > 0 ? 'default' : 'select',
        comments: undefined,
        verseText: undefined,
        selections,
        tags: []
      })
    }
  }

  cancelSelection() {
    this.setState({
      mode: 'default',
      selections: this.props.selectionsReducer.selections
    })
  }

  clearSelection() {
    this.setState({
      selections: []
    })
  }

  saveSelection() {
    let verseText = this.verseText();
    // optimize the selections to address potential issues and save
    let selections = optimizeSelections(verseText, this.state.selections);
    this.props.actions.changeSelections(selections, this.props.loginReducer.userdata.username);
    this.setState({
      mode: 'default'
    })
  }

  verseText() {
    const { chapter, verse, bookId } = this.props.contextIdReducer.contextId.reference;
    const bookAbbr = this.props.projectDetailsReducer.manifest.project.id;
    const { targetLanguage } = this.props.resourcesReducer.bibles;
    let verseText = "";
    if (targetLanguage && targetLanguage[chapter] && bookId == bookAbbr) {
      verseText = targetLanguage[chapter][verse] || "";
      // normalize whitespace in case selection has contiguous whitespace that isn't captured
      verseText = normalizeString(verseText);
    }
    return verseText
  }

  render() {
    return (
      <MuiThemeProvider>
        <View {...this.props} actions={this.actions}
          cancelSelection={this.cancelSelection.bind(this)}
          clearSelection={this.clearSelection.bind(this)}
          saveSelection={this.saveSelection.bind(this)}
          mode={this.state.mode}
          comment={this.props.commentsReducer.text}
          commentChanged={this.state.commentChanged}
          verseText={this.verseText()}
          verseChanged={this.state.verseChanged}
          selections={this.state.selections}
          tags={this.state.tags}
          dialogModalVisibility={this.state.dialogModalVisibility}
          goToNextOrPrevious={this.state.goToNextOrPrevious}
        />
      </MuiThemeProvider>
    );
  }
}

module.exports = {
  name: NAMESPACE,
  container: VerseCheck
}
