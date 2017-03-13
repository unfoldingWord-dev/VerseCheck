  /**
  * @author Christopher Klpap
  * @description This component displays the Verse so selection, edit and comments can be made
  ******************************************************************************/
import React from 'react'
import View from './components/View'
const NAMESPACE = "VerseCheck";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class VerseCheck extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.lastCheck = props.currentCheck

    let that = this
    this.actions = {
      goToNext: function() {
        props.goToNext()
      },
      goToPrevious: function() {
        props.goToPrevious()
      },
      saveCheckInformation: function(checkInformation) {
        props.updateCurrentCheck(checkInformation)
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
      cancelComment: function(e) {
        let newState = that.state
        newState.comment = props.currentCheck.comment
        that.setState(newState)
        that.actions.changeMode('select')
      },
      saveComment: function() {
        props.currentCheck.comment = that.state.comment
        that.actions.saveCheckInformation(props.currentCheck)
        that.actions.changeMode('select')
      },
      handleEditVerseCheckbox: function(tag, e) {
        let newState = that.state
        const checked = e.target.value == 'on'
        if (checked && !newState.tags.includes(tag)) {
          newState.tags.push(tag)
          that.setState(newState)
        } else {
          newState.tags = newState.tags.filter( _tag => _tag === tag)
          that.setState(newState)
        }
      },
      handleEditVerse: function(e) {
        const verseText = e.target.value
        let newState = that.state
        newState.verseText = verseText
        that.setState(newState)
      },
      cancelEditVerse: function(e) {
        let newState = that.state
        newState.verseText = props.currentCheck.targetLanguage
        that.setState(newState)
        that.actions.changeMode('select')
      },
      saveEditVerse: function() {
        let checkInformation = props.currentCheck
        that.tagList.forEach(function(tag) {
          checkInformation[tag[0]] = that.state.tags.includes(tag[0])
        })
        that.actions.saveCheckInformation(checkInformation)
        that.actions.changeMode('select')
      }
    }
  }

  componentWillMount() {
    this.resetState();
  }

  componentWillReceiveProps(nextProps) {
    this.resetState();
  }

  resetState(){
    let that = this
    this.tagList = [
      ["spelling","Spelling"],
      ["punctuation","Punctuation"],
      ["grammar","Grammar"],
      ["meaning","Meaning"],
      ["wordChoice","Word Choice"],
      ["other","Other"]
    ]
    let tags = []
    this.tagList.forEach(function(tag){
      if (that.props.currentCheck[tag[0]]) {
        tags.push(tag[1])
      }
    })
    this.setState({
      mode: undefined,
      comment: undefined,
      verseText: undefined,
      tags: tags
    });
  }

  render() {

    return (
      <MuiThemeProvider>
        <View actions={this.actions}
          book={this.props.bookName}
          quote={this.props.currentCheck.phrase}
          checkInformation={this.props.currentCheck}
          direction={this.props.direction}
          mode={this.state.mode}
          comment={this.state.comment !== undefined ? this.state.comment : this.props.currentCheck.comment}
          verseText={this.state.verseText !== undefined ? this.state.verseText : this.props.currentCheck.targetLanguage}
          tags={this.state.tags}
        />
      </MuiThemeProvider>
    );
  }
}

module.exports = {
  name: NAMESPACE,
  container: VerseCheck
}
