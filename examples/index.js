import { locoDOM } from 'locomotor'
import App from './list'

const props = { todo: 'called' }

locoDOM.render(
  <App {...props} />,
  document.getElementById('app')
)
