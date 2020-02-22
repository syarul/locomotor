import { useState, useEffect } from '../'

function App (props) {
  const { todo } = props

  const [timer, setTimer] = useState(false)

  const [time, setTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    console.log(`timer ${todo} ${timer ? 'on' : 'off'}!`)

    if (timer) {
      const intv = setInterval(() => {
        setTime(new Date().toLocaleTimeString())
      }, 1000)

      return () => {
        clearInterval(intv)
      }
    }
  }, [timer])

  const toggle = () => {
    setTimer(!timer)
  }

  return (
    <div>
      <button onClick={toggle}> toggle {timer ? 'on' : 'off'} </button>
      <p>current time {time}</p>
    </div>
  )
}

export default App
