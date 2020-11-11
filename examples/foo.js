import { useState } from 'locomotor'

function App () {
  const [foo] = useState('foobar')
  return (
    <div>{foo}</div>
  )
}

export default App
