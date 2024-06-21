import './App.css'
import PostPage from "./PostPage"
import Footer from './Footer'
import KudosHeader from './KudosHeader'
import KudosBoard from './KudosBoard'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  const [postNum, setPostNum] = useState(0);

  const setCardId = (num) => {
    setPostNum(num);
    console.log(num);
  }

  return (
    <Router>
      <div>
        <KudosHeader />
        <Switch>
          <Route exact path="/">
            <KudosBoard passCardId={setCardId}/>
          </Route>
          <Route path="/posts">
            <PostPage cardId={postNum} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
