import { locoDOM } from 'locomotor'
import App from './context-provider'

const props = { todo: 'called' }

locoDOM.render(
  <App {...props} />,
  document.getElementById('app')
)
