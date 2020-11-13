import { useState, act } from 'locomotor'

function App () {
  const [foo, setFoo] = useState('foo')
  return (
    <div>
      <button onClick={() => setFoo('bar')}>change</button>
      {foo}
    </div>
  )
}

act(() => console.log(1))

export default App
