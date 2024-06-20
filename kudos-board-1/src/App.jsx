import './App.css'
import PostPage from "./PostPage"
import Footer from './Footer'
import KudosHeader from './KudosHeader'
import KudosBoard from './KudosBoard'
import KudosCard from './KudosCard'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {

  return (
    <Router>
      <div>
        <KudosHeader />
        <Switch>
          <Route exact path="/">
            <KudosBoard />
          </Route>
          <Route path="/posts">
            <PostPage />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
