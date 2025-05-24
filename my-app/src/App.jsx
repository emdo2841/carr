
import './App.css'
import Head from './head'
import Counter from './counter'

function App() {
  const a = 4
  const b = 5
  const result = a + b

  return (
    <main>
      <Head/>
      <h1>CareerEX</h1>

      <h3>{result}</h3>
      <Counter/>
    </main>
  );
}

export default App
