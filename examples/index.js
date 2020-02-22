import App from './effect'

import { locoDOM } from '../'

let props = { todo: 'called' }

locoDOM.render(
  <App {...props} />,
  document.getElementById('app')
)