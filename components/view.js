
const api = window.ModuleApi
const React = api.React
const RB = api.ReactBootstrap
const {Row, Glyphicon, Col, Button} = RB
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'

const style = require('../css/style')
const CheckArea = require('./checkArea')
const ActionsArea = require('./actionsArea')
const SaveArea = require('./saveArea')

class View extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let { currentCheck } = this.props

    let modeColor
    let titleText
    switch(this.props.mode) {
      case 'edit':
      modeColor = '#8BC34A'
      titleText = 'Edit Verse'
      break
      case 'comment':
      modeColor = '#F9C000'
      titleText = 'Comment'
      break
      case 'select':
      modeColor = '#2196F3'
      titleText = 'Step 2. Select'
      break
      default:
      modeColor = '#2196F3'
      titleText = 'Step 2. Select'
    }

    const title = (
      <div style={{'fontSize':'16px', 'fontWeight':'bold', color: '#ffffff', margin: '0px'}}>
        <span>{titleText}</span>
      </div>
    )

    return (
      <div style={{ margin: '10px' }}>
        <Card zDepth={2}>
          <CardHeader
            style={{ background: modeColor, padding: '10px'}}
            textStyle={{display: 'block'}}
            children={title}
          />
        <Row style={{marginLeft: '0px', marginRight: '0px', height: '100%', borderBottom: '1px solid #eee'}}>
          <CheckArea
            actions={this.props.actions}
            checkInformation={this.props.checkInformation}
            book={this.props.book}
            direction={this.props.direction}
            mode={this.props.mode}
            comment={this.props.comment}
            verseText={this.props.verseText}
          />
        </Row>
        <Row style={{marginLeft: '0px', marginRight: '0px', height: '100%'}}>
          <ActionsArea mode={this.props.mode} actions={this.props.actions} />
        </Row>
        </Card>
        <Row style={{marginLeft: '0px', marginRight: '0px', height: '100%'}}>
          <SaveArea actions={this.props.actions} />
        </Row>
      </div>
    )
  }
}

module.exports = View
