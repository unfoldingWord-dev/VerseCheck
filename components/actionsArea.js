const React = require('react')
const RB = api.ReactBootstrap
const {Col} = RB

var ActionsArea = function(props) {
  return (
    <div>
      <Col sm={2}>
        Edit
      </Col>
      <Col sm={2}>
        Comment
      </Col>
    </div>
  )
}

module.exports = ActionsArea
