
import Select from './components/Select/Select'
import { options } from './data/options'

function App() {
  return (
    <>
      <Select placeholder="ЖК, Округ, район, метро" options={options} />
    </>
  )
}

export default App
