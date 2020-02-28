import { locoDOM } from 'locomotor'
import App from './single'

const props = { todo: 'called' }

locoDOM.render(
  <App {...props} />,
  document.getElementById('app')
)
