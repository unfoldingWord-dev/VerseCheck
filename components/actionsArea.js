const React = require('react')
const RB = api.ReactBootstrap
const {Col, Button} = RB

var ActionsArea = function(props) {
  const changeModeArea = (
    <div>
      <Col sm={2}>
        <Button onClick={props.actions.changeMode.bind(this,'edit')}>
          Edit
        </Button>
      </Col>
      <Col sm={2}>
        <Button onClick={props.actions.changeMode.bind(this,'comment')}>
          Comment
        </Button>
      </Col>
    </div>
  )

  const confirmEditVerseArea = (
    <div style={{textAlign: 'right'}}>
      <Col sm={3} smOffset={6}>
        <Button onClick={props.actions.cancelEditVerse.bind(this)}>
          Cancel
        </Button>
      </Col>
      <Col sm={3}>
        <Button onClick={props.actions.saveEditVerse.bind(this)}>
          Save Changes
        </Button>
      </Col>
    </div>
  )

  const confirmCommentArea = (
    <div style={{textAlign: 'right'}}>
      <Col sm={3} smOffset={6}>
        <Button onClick={props.actions.cancelComment.bind(this)}>
          Cancel
        </Button>
      </Col>
      <Col sm={3}>
        <Button onClick={props.actions.saveComment.bind(this)}>
          Save Changes
        </Button>
      </Col>
    </div>
  )

  let modeArea
  switch(props.mode) {
    case 'edit':
    modeArea = confirmEditVerseArea
    break
    case 'comment':
    modeArea = confirmCommentArea
    break
    case 'select':
    modeArea = changeModeArea
    break
    default:
    modeArea = changeModeArea
  }

  return modeArea
}

module.exports = ActionsArea
