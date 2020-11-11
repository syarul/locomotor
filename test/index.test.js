/* global test expect */
require('@testing-library/jest-dom')
const locomotor = require('../dist/locomotor')

const {
  act,
  locoDOM,
  useState,
  useEffect
} = locomotor

const queryByTestId = (testId, container) => container.querySelector(`[data-testid="${testId}"]`)

function render (vdom) {
  const container = document.createElement('div')
  container.id = 'test-container'
  locoDOM.render(vdom, container)

  // Some tests need to look up global ids with document.getElementById()
  // so we need to be inside an actual document.
  document.body.innerHTML = ''
  document.body.appendChild(container)

  return {
    container,
    queryByTestId: testId => queryByTestId(testId, container)
  }
}

// use cases already covered be the useState tests will not be covered again here
test('index exports are correct', () => {
  const exportKeys = [
    'locomotor',
    'locoDOM',
    'useReducer',
    'useState',
    'useEffect',
    'useLayoutEffect',
    'createContext',
    'useContext',
    'L',
    'act'
  ]
  const keys = Object.keys(locomotor)
  expect(keys.length).toBe(exportKeys.length)
  expect(exportKeys.every(key => key.indexOf(keys) > 1))
})

test('render plain object element to be in the document', () => {
  const tag = 'plain-element'
  const { queryByTestId } = render({
    elementName: 'div',
    attributes: {},
    children: [
      {
        elementName: 'p',
        attributes: { 'data-testid': tag },
        children: [
          'hello'
        ]
      }
    ]
  })

  const plainElement = queryByTestId(tag)
  expect(plainElement).toBeInTheDocument()
})

test('render jsx element to be in the document', done => {
  const tag = 'jsx-element'
  ;(
    <div>
      <p data-testid={tag}>jsx element</p>
    </div>
  ).then(render).then(({ queryByTestId }) => {
    const jsxelement = queryByTestId(tag)
    expect(jsxelement).toBeInTheDocument()
    done()
  })

  // act(() => {
  //   console.log('foo')
  // })
})

test('setState from event click', done => {
  const tagButton = 'button-click'
  const tagState = 'el-with-state'
  const App = () => {
    const [state, setState] = useState('foo')

    useEffect(() => {
      // console.log('state ===>', state)
    }, [])

    return (
      <div>
        <button data-testid={tagButton} onClick={() => setState('bar')}>
          click
        </button>
        <p data-test-id={tagState}>{state}</p>
      </div>
    )
  }

  let el

  // run after dom patching finish 100ms ++
  act(() => {
    if (el) {
      expect(el.children[1].innerHTML).toBe('bar')
    }
    act(null, true)
    done()
  })

  ;(<App />).then(render).then(({ container, queryByTestId }) => {
    el = container
    const button = queryByTestId(tagButton)
    button.click()
  })
})
