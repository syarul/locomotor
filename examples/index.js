import { locoDOM } from 'locomotor'
import App from './multi'

const props = { todo: 'called' }

locoDOM.render(
  <App {...props} />,
  document.getElementById('app')
)
