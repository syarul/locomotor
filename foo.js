/* global it describe beforeEach afterEach Locomotor */
import /* Locomotor, */ { locoDOM, act } from '../'
import { expect } from 'chai'
const { JSDOM } = require('jsdom')

const dom = new JSDOM(`
      <!DOCTYPE html>
        <html>
        <body>
          <div id="app"></div>
        </body>
      </html>`)

global.document = dom.window.document

const window = dom.window

global.window = window

// Event = window.Event

// let rootContainer

beforeEach(() => {
  // rootContainer = document.createElement('div')
  // document.body.appendChild(rootContainer)
})

afterEach(() => {
  // document.getElementById('app').innerHTML = ''
  // rootContainer = null
})

describe('App Component Testing', () => {
  it('has document', function () {
    var div = document.createElement('div')
    expect(div.nodeName).eql('DIV')
  })

  it('render hello', () => {
    // act(() => {
    //     ReactDOM.render(<App />, rootContainer);
    // });
    locoDOM.render(
      <div id='hello'>hello</div>,
      document.getElementById('app')
    )

    act(() => {
      console.log(typeof locoDOM.render)
      expect(document.getElementById('hello').innerHTML).eql('hello')
    })
  })
})
