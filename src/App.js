 
import {BrowserRouter as Router , Route} from 'react-router-dom'
import Join from './components/join/Join'
import Chat from './components/chat/Chat'
const App=()=> {
  // console.log("from app.js")
  return(
   
  <Router>
    <Route path="/"  exact component={Join}></Route>
    <Route path="/chat" component={Chat}></Route>
  </Router> 
  )
   
}

export default App;
