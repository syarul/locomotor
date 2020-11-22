import { useState } from 'locomotor'
import App from './duo'

function Container (props) {

  const [s, ss] = useState('foo')

  return (
    <container>
      <button onclick={() => ss(s === 'foo' ? 'bar' : 'foo')}>{s}</button>
      <App todo='duo' />
    </container>
  )
}

export default Container
