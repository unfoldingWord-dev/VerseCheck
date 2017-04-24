import React from 'react'
import {Row, Glyphicon, Col, Button} from 'react-bootstrap'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import style from '../css/Style'
import CheckArea from './CheckArea'
import ActionsArea from './ActionsArea'
import SaveArea from './SaveArea'
import DialogComponent from './DialogComponent'
import DialogAlert from './DialogAlert'

class View extends React.Component {

  render() {
    let { currentCheck } = this.props
    let modeColor
    let titleText
    let saveArea
    switch (this.props.mode) {
      case 'edit':
        modeColor = '#8BC34A'
        titleText = 'Edit Verse'
        saveArea = <div />
        break
      case 'comment':
        modeColor = '#F9C000'
        titleText = 'Comment'
        saveArea = <div />
        break
      case 'select':
        modeColor = '#2196F3'
        titleText = 'Step 2. Select'
        saveArea = <SaveArea {...this.props} />
        break
      default:
        modeColor = '#2196F3'
        titleText = 'Step 2. Select'
        saveArea = <SaveArea {...this.props} />
    }

    const title = (
      <div style={{'fontSize':'16px', 'fontWeight':'bold', color: '#ffffff', margin: '0px'}}>
        <span>{titleText}</span>
        <Glyphicon glyph="bookmark"
          style={{
            'float': "right",
             color: this.props.remindersReducer.enabled ? "#F44242" : "#FFFFFF"
           }}
          onClick={this.props.actions.toggleReminder}
          />
      </div>
    )
    return (
      <div style={{ margin: '10px' }}>
        <DialogComponent
          dialogModalVisibility={this.props.dialogModalVisibility}
          handleOpen={this.props.actions.handleOpenDialog}
          handleClose={this.props.actions.handleCloseDialog}
          goToNextOrPrevious={this.props.goToNextOrPrevious}
          skipToNext={this.props.actions.skipToNext}
          skipToPrevious={this.props.actions.skipToPrevious}
        />
        <DialogAlert
          open={this.props.alertOpen}
          handleClose={this.props.actions.closeDialogAlert}
        />
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
          <ActionsArea {...this.props} />
        </Row>
        </Card>
        <Row style={{marginLeft: '0px', marginRight: '0px'}}>
          {saveArea}
        </Row>
      </div>
    )
  }
}

export default View
