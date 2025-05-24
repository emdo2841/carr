
import './App.css'
import Header from './component/header'
import User from './component/User'

function App() {
  

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <Header />
      <User />
      {/* <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-sm text-center">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">
            Test Blue Color
          </h1>
          <div className="w-24 h-24 mx-auto rounded-full border-4 border-blue-600 mb-4"></div>
          <p className="text-blue-700">This text should be blue.</p>
        </div>
      </div> */}
    </main>
  );
}

export default App
