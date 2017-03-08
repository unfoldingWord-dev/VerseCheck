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
  constructor() {
    super();
    this.state = {
    };
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
      <View
        updateCheckStatus={this.props.updateCheckStatus.bind(this)}
        currentCheck={this.props.currentCheck}
        goToNext={this.props.goToNext}
        goToPrevious={this.props.goToPrevious}
      />
      </MuiThemeProvider>
    );
  }
}

module.exports = {
  name: NAMESPACE,
  container: VerseCheck
}
