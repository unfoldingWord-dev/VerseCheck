/* eslint-disable no-console */
import {describe, it} from 'mocha';
import { expect } from 'chai';
import isEqual from 'lodash/isEqual';
import jsdom from 'jsdom';
const {JSDOM} = jsdom;
//helpers
import * as windowSelectionHelpers from '../helpers/windowSelectionHelpers';


const htmlString = `
<div>
  <div id="one">
    <span>Here is some text.</span>
  </div>
  <div id="two">
    <span>Here is </span><span>some text.</span>
  </div>
  <div id="three">
    <span>Here</span><span> is </span><span>some text.</span>
  </div>
  <div id="four">
    <span>Here</span><span> is</span><span> some text</span><span>.</span>
  </div>
</div>
`
const dom = new JSDOM(`<!DOCTYPE html>` + htmlString);
const { document } = dom.window;

/**
 * @description - gets the spans from the dom for testing
 * @param {String} divId - the string id of the div to use
 * @param {Int} spanIndex - the index of the span 0 based
 * @return {Element} html dom element to use in testing
 */
const getSpanFromDiv = (divId, spanIndex) => {
  const div = document.getElementById(divId);
  const spans = div.children;
  const span = spans[spanIndex];
  return span;
}

describe('windowSelectionHelpers.getPrescedingTextFromElement', () => {
  it('should return prescedingText for single element in div', function (done) {
    const element = getSpanFromDiv('one', 0);
    const selectionRangeStart = 5;
    const output = windowSelectionHelpers.getPrescedingTextFromElement(element, selectionRangeStart);
    const expected = 'Here ';
    expect(output).to.equal(expected);
    done();
  });
  it('should return prescedingText for second of two spans in div', function (done) {
    const element = getSpanFromDiv('two', 1);
    const selectionRangeStart = 5;
    const output = windowSelectionHelpers.getPrescedingTextFromElement(element, selectionRangeStart);
    const expected = 'some ';
    expect(output).to.equal(expected);
    done();
  });
  it('should return prescedingText for second of three spans in div', function (done) {
    const element = getSpanFromDiv('three', 1);
    const selectionRangeStart = 3;
    const output = windowSelectionHelpers.getPrescedingTextFromElement(element, selectionRangeStart);
    const expected = ' is';
    expect(output).to.equal(expected);
    done();
  });
});

describe('windowSelectionHelpers.getPrescedingTextFromElementSiblings', () => {
  it('should return empty prescedingText for single element in div', function (done) {
    const element = getSpanFromDiv('one', 0);
    const output = windowSelectionHelpers.getPrescedingTextFromElementSiblings(element);
    const expected = '';
    expect(output).to.equal(expected);
    done();
  });
  it('should return prescedingText for two elements in div', function (done) {
    const element = getSpanFromDiv('two', 1);
    const output = windowSelectionHelpers.getPrescedingTextFromElementSiblings(element);
    const expected = 'Here is ';
    expect(output).to.equal(expected);
    done();
  });
  it('should return prescedingText for two of three elements in div', function (done) {
    const element = getSpanFromDiv('three', 1);
    const output = windowSelectionHelpers.getPrescedingTextFromElementSiblings(element);
    const expected = 'Here';
    expect(output).to.equal(expected);
    done();
  });
  it('should return prescedingText for three of three elements in div', function (done) {
    const element = getSpanFromDiv('three', 2);
    const output = windowSelectionHelpers.getPrescedingTextFromElementSiblings(element);
    const expected = 'Here is ';
    expect(output).to.equal(expected);
    done();
  });
  it('should return prescedingText for three of four elements in div', function (done) {
    const element = getSpanFromDiv('four', 2);
    const output = windowSelectionHelpers.getPrescedingTextFromElementSiblings(element);
    const expected = 'Here is';
    expect(output).to.equal(expected);
    done();
  });
  it('should return prescedingText for four of four elements in div', function (done) {
    const element = getSpanFromDiv('four', 3);
    const output = windowSelectionHelpers.getPrescedingTextFromElementSiblings(element);
    const expected = 'Here is some text';
    expect(output).to.equal(expected);
    done();
  });
});

describe('windowSelectionHelpers.getPrescedingTextFromElementAndSiblings', () => {
  it('should return empty prescedingText for single element in div', function (done) {
    const element = getSpanFromDiv('one', 0);
    const selectionRangeStart = 5;
    const output = windowSelectionHelpers.getPrescedingTextFromElementAndSiblings(element, selectionRangeStart);
    const expected = 'Here ';
    expect(output).to.equal(expected);
    done();
  });
  it('should return prescedingText for two elements in div', function (done) {
    const element = getSpanFromDiv('two', 1);
    const selectionRangeStart = 1;
    const output = windowSelectionHelpers.getPrescedingTextFromElementAndSiblings(element, selectionRangeStart);
    const expected = 'Here is s';
    expect(output).to.equal(expected);
    done();
  });
  it('should return prescedingText for two of three elements in div', function (done) {
    const element = getSpanFromDiv('three', 1);
    const selectionRangeStart = 2;
    const output = windowSelectionHelpers.getPrescedingTextFromElementAndSiblings(element, selectionRangeStart);
    const expected = 'Here i';
    expect(output).to.equal(expected);
    done();
  });
  it('should return prescedingText for three of three elements in div', function (done) {
    const element = getSpanFromDiv('three', 2);
    const selectionRangeStart = 3;
    const output = windowSelectionHelpers.getPrescedingTextFromElementAndSiblings(element, selectionRangeStart);
    const expected = 'Here is som';
    expect(output).to.equal(expected);
    done();
  });
  it('should return prescedingText for three of four elements in div', function (done) {
    const element = getSpanFromDiv('four', 2);
    const selectionRangeStart = 1;
    const output = windowSelectionHelpers.getPrescedingTextFromElementAndSiblings(element, selectionRangeStart);
    const expected = 'Here is ';
    expect(output).to.equal(expected);
    done();
  });
  it('should return prescedingText for four of four elements in div', function (done) {
    const element = getSpanFromDiv('four', 3);
    const selectionRangeStart = 0;
    const output = windowSelectionHelpers.getPrescedingTextFromElementAndSiblings(element, selectionRangeStart);
    const expected = 'Here is some text';
    expect(output).to.equal(expected);
    done();
  });
  it('should return prescedingText for four of four elements in div', function (done) {
    const element = getSpanFromDiv('four', 3);
    const selectionRangeStart = 1;
    const output = windowSelectionHelpers.getPrescedingTextFromElementAndSiblings(element, selectionRangeStart);
    const expected = 'Here is some text.';
    expect(output).to.equal(expected);
    done();
  });
});
