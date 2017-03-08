
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

    this.actions = {
    }
  }

  render() {
    let { currentCheck } = this.props
    console.log(this.props)
    let checkInformation = {
      version: 'Spanish - ULB',
      reference: '1:1',
      verse: 'Here is a verse that goes here.',
      quote: 'Among Us'
    }

      const title = (
        <div style={{'fontSize':'16px', 'fontWeight':'bold', color: '#ffffff', margin: "0px"}}>
          <span>Step 2. Select</span>
        </div>
      )

      return (
        <div style={{ margin: '10px' }}>
          <Card zDepth={2}>
            <CardHeader
              style={{ background: '#2196F3', padding: "10px"}}
              textStyle={{display: "block"}}
              children={title}
            />
          <Row style={{marginLeft: '0px', marginRight: '0px', height: "100%", borderBottom: '1px solid #eee'}}>
            <CheckArea checkInformation={checkInformation} actions={this.actions} />
          </Row>
          <Row style={{marginLeft: '0px', marginRight: '0px', height: "100%"}}>
            <ActionsArea actions={this.props.actions} />
          </Row>
          </Card>
          <Row style={{marginLeft: '0px', marginRight: '0px', height: "100%"}}>
            <SaveArea actions={this.props.actions} />
          </Row>
        </div>
      );
    }
  }

module.exports = View
