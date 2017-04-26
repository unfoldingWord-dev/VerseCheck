  /**
  * @author Christopher Klpap
  * @description This component displays the Verse so selection, edit and comments can be made
  ******************************************************************************/
import React from 'react'
import View from './components/View'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SelectionHelpers from './utils/selectionHelpers'
// constant declaration
const NAMESPACE = "VerseCheck";

class VerseCheck extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'select',
      comment: undefined,
      commentChanged: false,
      verseText: undefined,
      tags: [],
      dialogModalVisibility: false,
      alertOpen: false,
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
        props.actions.goToNext()
      },
      handleGoToPrevious: function() {
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
      closeDialogAlert() {
        that.setState({alertOpen: false});
      },
      changeSelections: function(selections) {
        // optimize the selections to address potential issues and save
        selections = SelectionHelpers.optimizeSelections(that.verseText, selections);
        props.actions.changeSelections(selections, props.loginReducer.userdata.username)
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
          mode: 'select',
          comment: undefined,
          commentChanged: false,
        })
      },
      saveComment: function() {
        that.props.actions.addComment(that.state.comment, that.props.loginReducer.userdata.username)
        that.setState({
          mode: 'select',
          comment: undefined,
          commentChanged: false,
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
      cancelEditVerse: function(e) {
        that.setState({
          mode: 'select',
          verseText: undefined,
          tags: []
        })
      },
      saveEditVerse: function() {
        let {loginReducer, actions, contextIdReducer, resourcesReducer} = that.props;
        let {chapter, verse} = contextIdReducer.contextId.reference;
        let before = resourcesReducer.bibles.targetLanguage[chapter][verse];
        let username = loginReducer.userdata.username;

        if (that.state.tags.length > 0) {
          // verseText state is undefined if no changes are made in the text box.
          if (that.state.verseText) {
            actions.addVerseEdit(before, that.state.verseText, that.state.tags, username);
          }
          that.setState({
            mode: 'select',
            tags: []
          });
        } else {
          that.setState({alertOpen: true})
        }
      },
      validateSelections: function(verseText) {
        that.props.actions.validateSelections(verseText)
      },
      toggleReminder: function() {
        that.props.actions.toggleReminder(that.props.loginReducer.userdata.username)
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contextIdReducer.contextId != this.props.contextIdReducer.contextId) {
      this.setState({
        mode: 'select',
        comments: undefined,
        verseText: undefined,
        tags: []
      })
    }
  }

  render() {
    let {chapter, verse, bookId} = this.props.contextIdReducer.contextId.reference
    let bookAbbr = this.props.projectDetailsReducer.params.bookAbbr;
    if (this.props.resourcesReducer.bibles.targetLanguage && bookId == bookAbbr) {
      this.verseText = this.props.resourcesReducer.bibles.targetLanguage[chapter][verse];
    } else {
      this.verseText = null;
    }

    return (
      <MuiThemeProvider>
        <View {...this.props} actions={this.actions}
          mode={this.state.mode}
          comment={this.props.commentsReducer.text}
          commentChanged={this.state.commentChanged}
          verseText={this.verseText}
          tags={this.state.tags}
          dialogModalVisibility={this.state.dialogModalVisibility}
          alertOpen={this.state.alertOpen}
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
