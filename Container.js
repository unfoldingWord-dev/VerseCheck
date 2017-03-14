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
    this.state = {
      mode: 'select',
      comment: undefined,
      verseText: undefined,
      tags: undefined
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
        that.setState({
          mode: 'select',
          comment: undefined
        })
      },
      saveComment: function() {
        let checkInformation = props.currentCheck
        checkInformation.comment = that.state.comment
        that.actions.saveCheckInformation(checkInformation)
        that.setState({
          mode: 'select',
          comment: undefined
        })
      },
      handleEditVerseCheckbox: function(tag, e) {
        let checkInformation = props.currentCheck
        let tags = []
        that.tagList.forEach(function(tag){
          if (checkInformation[tag[0]]) {
            tags.push(tag[0])
          }
        })
        let newState = that.state
        if (newState.tags === undefined) newState.tags = tags
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
          tags: undefined
        })
      },
      saveEditVerse: function() {
        let checkInformation = props.currentCheck
        let newState = that.state
        if (newState.tags === undefined) {
          let tags = []
          that.tagList.forEach(function(tag){
            if (checkInformation[tag[0]]) {
              tags.push(tag[0])
            }
          })
          newState.tags = tags
        }
        that.tagList.forEach(function(tag) {
          checkInformation[tag[0]] = newState.tags.includes(tag[0])
        })
        that.actions.saveCheckInformation(checkInformation)
        that.setState({
          mode: 'select',
          verseText: undefined,
          tags: undefined
        })
      }
    }
  }

  componentWillMount() {
    this.setState({
      mode: undefined,
      comments: undefined,
      verseText: undefined,
      tags: undefined
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      mode: undefined,
      comments: undefined,
      verseText: undefined,
      tags: undefined
    })
  }

  render() {
    let that = this

    let tags = []
    that.tagList.forEach(function(tag){
      if (that.props.currentCheck[tag[0]]) {
        tags.push(tag[0])
      }
    })

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
          tags={this.state.tags !== undefined ? this.state.tags : tags}
        />
      </MuiThemeProvider>
    );
  }
}

module.exports = {
  name: NAMESPACE,
  container: VerseCheck
}
