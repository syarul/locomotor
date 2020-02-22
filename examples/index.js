import App from './effect'

import { locoDOM } from '../'

const props = { todo: 'called' }

locoDOM.render(
  <App {...props} />,
  document.getElementById('app')
)
