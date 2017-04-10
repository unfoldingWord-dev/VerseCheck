import React, { Component, PropTypes } from 'react'
import { Col } from 'react-bootstrap'

class MyTargetVerse extends Component {

  render() {
    let { chapter, verse, verseText, styles} = this.props
    return (
      <Col md={12} sm={12} xs={12} lg={12} style={styles}>
        <div>
          <b>{chapter + ":" + verse + " "}</b>
          {verseText}
        </div>
      </Col>
    )
  }
}

MyTargetVerse.propTypes = {
  chapter: PropTypes.number,
  verse: PropTypes.number,
  verseText: PropTypes.string,
  styles: PropTypes.object
}

export default MyTargetVerse
