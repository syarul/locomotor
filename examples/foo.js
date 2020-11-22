import { useState, act } from 'locomotor'

function App () {
  const [foo, setFoo] = useState('foo')

  return (
    <div>
      <button onclick={() => setFoo(foo === 'bar' && 'foo' || 'bar')}>change</button>
      {foo}
    </div>
  )
}

act(() => console.log(1))

export default App
