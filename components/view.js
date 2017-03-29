import React from 'react'
import {Row, Glyphicon, Col, Button} from 'react-bootstrap'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'

import style from '../css/style'
import CheckArea from './checkArea'
import ActionsArea from './actionsArea'
import SaveArea from './saveArea'

class View extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let { currentCheck } = this.props

    let modeColor
    let titleText
    let saveArea
    switch(this.props.mode) {
      case 'edit':
      modeColor = '#8BC34A'
      titleText = 'Edit Verse'
      saveArea = <div></div>
      break
      case 'comment':
      modeColor = '#F9C000'
      titleText = 'Comment'
      saveArea = <div></div>
      break
      case 'select':
      modeColor = '#2196F3'
      titleText = 'Step 2. Select'
      saveArea = <SaveArea actions={this.props.actions} />
      break
      default:
      modeColor = '#2196F3'
      titleText = 'Step 2. Select'
      saveArea = <SaveArea actions={this.props.actions} />
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
          <CheckArea {...this.props} />
        </Row>
        <Row style={{marginLeft: '0px', marginRight: '0px', height: '100%'}}>
          <ActionsArea mode={this.props.mode} actions={this.props.actions} />
        </Row>
        </Card>
        <Row style={{marginLeft: '0px', marginRight: '0px'}}>
          {saveArea}
        </Row>
      </div>
    )
  }
}

module.exports = View
