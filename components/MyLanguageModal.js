import React, { Component, PropTypes } from 'react'
import { Modal, Button } from 'react-bootstrap'
import MyTargetVerse from './MyTargetVerse'
import ReactDOM from 'react-dom'

class MyLanguageModal extends Component {

  componentDidMount() {
    let {chapter, currentVerse} = this.props
    let verseReference = chapter.toString() + currentVerse.toString()
    let currentVerseNode = this.refs[verseReference]
    let element = ReactDOM.findDOMNode(currentVerseNode)
    if (element) {
      element.scrollIntoView()
    }
  }

  render() {
    let { show, onHide, targetLangBible, chapter, currentVerse } = this.props
    let MyTargetLanguage = []
    if (show) {
      for (let key in targetLangBible[chapter]) {
        if (targetLangBible[chapter].hasOwnProperty(key)) {
          let verseText = targetLangBible[chapter][key]
          let versePaneStyle = {};
          if (key == currentVerse) {
            if (key % 2 == 0) {
              versePaneStyle = {borderLeft: '6px solid #2196F3', backgroundColor: '#e7e7e7', marginTop: '10px', color: '#000000', padding: '10px'}
            } else {
              versePaneStyle = {borderLeft: '6px solid #2196F3', marginTop: '10px', color: '#000000', padding: '10px'}
            }
          } else if (key % 2 == 0) {
            versePaneStyle = {backgroundColor: '#e7e7e7', marginTop: '10px', color: '#000000', padding: '10px'}
          } else {
            versePaneStyle = {marginTop: '10px', color: '#000000', padding: '10px'}
          }
          MyTargetLanguage.push(
            <MyTargetVerse
              key={key}
              chapter={chapter}
              verse={parseInt(key, 10)}
              verseText={verseText}
              styles={versePaneStyle}
              ref={chapter.toString() + key.toString()}
            />
          )
        }
      }
    }

    return (
      <Modal show={show} onHide={onHide} bsSize="lg" aria-labelledby="contained-modal-title-sm">
        <Modal.Header style={{ backgroundColor: "#333333" }} closeButton>
          <Modal.Title id="contained-modal-title-sm"
            style={{ textAlign: "center", color: "#FFFFFF" }}>

          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{padding: '0px', height: "550px", backgroundColor: "#FFFFFF", overflowY: "auto"}}>
          {MyTargetLanguage}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#333333" }}>
          <Button bsStyle="danger" onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

MyLanguageModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  targetLangBible: PropTypes.object,
  chapter: PropTypes.number,
  currentVerse: PropTypes.number
}

export default MyLanguageModal
