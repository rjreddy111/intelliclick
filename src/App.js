
import {BrowserRouter,Routes,Route} from "react-router-dom"


import './App.css';
import Home from "./components/Home"
import DetailsDisplay from "./components/DetailsDisplay"


const App = ()=> 
<BrowserRouter>
<Routes>
  <Route path = "/" element={<Home/>}/> 
  <Route path = "/name/:cityname" element={<DetailsDisplay/>} />
</Routes>
 

</BrowserRouter>

export default App;
