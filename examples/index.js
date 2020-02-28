import { locoDOM } from 'locomotor'
import App from './effect'

const props = { todo: 'called' }

locoDOM.render(
  <App {...props} />,
  document.getElementById('app')
)
