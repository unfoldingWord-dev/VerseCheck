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

    let checkInformation = props.currentCheck

    this.state = {
      mode: 'select',
      comment: checkInformation.comment
    }

    let that = this
    this.actions = {
      goToNext: props.goToNext,
      goToPrevious: props.goToPrevious,
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
        newState.comment = checkInformation.comment
        that.setState(newState)
        that.actions.changeMode('select')
      },
      saveComment: function() {
        checkInformation.comment = that.state.comment
        that.actions.saveCheckInformation(checkInformation)
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
    let checkInformation = this.props.currentCheck
    checkInformation.book = this.props.bookName

    return (
      <MuiThemeProvider>
        <View actions={this.actions}
          checkInformation={checkInformation}
          direction={this.props.direction}
          mode={this.state.mode}
          comment={this.state.comment}
        />
      </MuiThemeProvider>
    );
  }
}

module.exports = {
  name: NAMESPACE,
  container: VerseCheck
}
