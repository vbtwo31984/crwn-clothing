import Home from './routes/home/home.component'
import {Route, Routes} from 'react-router-dom'
import Navigation from './routes/navigation/navigation.component'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path="shop" element={<h1>Shop</h1>}/>
      </Route>
    </Routes>
  )
}

export default App
