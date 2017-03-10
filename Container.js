  /**
  * @author Christopher Klpap
  * @description This component displays the Verse so selection, edit and comments can be made
  ******************************************************************************/
const api = window.ModuleApi;
const React = api.React;
const View = require('./components/View');
const NAMESPACE = "VerseCheck";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class VerseCheck extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: undefined,
      comment: undefined,
      verseText: undefined
    }

    let that = this
    this.actions = {
      reset: function() {
        let newState = {
          mode: undefined,
          comment: undefined,
          verseText: undefined
        }
        that.setState(newState)
      },
      goToNext: function() {
        props.goToNext()
        that.actions.reset()
      },
      goToPrevious: function() {
        props.goToPrevious()
        that.actions.reset()
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
        props.currentCheck.targetLanguage = that.state.verseText
        that.actions.saveCheckInformation(props.currentCheck)
        that.actions.changeMode('select')
      }
    }
  }

  componentWillMount() {
    //get default resources (originalLang, targetLang, gatewayLang) content
    this.getContentFromCheckStore();
  }

  componentWillReceiveProps(nextProps) {
    this.getContentFromCheckStore();
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Stops ScripturePane from re-rendering when the check module changes state
    return nextState !== this.state;
  }
  /**
  * @description This gets the default panes' Content From CheckStore, and target
  * lang direction as well as the the settings for the current resources in the
  * scripture pane.
  * @return {state} panes' content, target lang direction and currentPaneSettings.
  *******************************************************************************/
  getContentFromCheckStore(){
    this.setState({
    });
  }

  render() {

    return (
      <MuiThemeProvider>
        <View actions={this.actions}
          book={this.props.bookName}
          checkInformation={this.props.currentCheck}
          direction={this.props.direction}
          mode={this.state.mode}
          comment={this.state.comment !== undefined ? this.state.comment : this.props.currentCheck.comment}
          verseText={this.state.verseText !== undefined ? this.state.verseText : this.props.currentCheck.targetLanguage}
        />
      </MuiThemeProvider>
    );
  }
}

module.exports = {
  name: NAMESPACE,
  container: VerseCheck
}
