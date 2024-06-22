import './App.css'
import PostPage from "./PostPage"
import Footer from './Footer'
import KudosHeader from './KudosHeader'
import KudosBoard from './KudosBoard'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  const [postNum, setPostNum] = useState(0);

  /*
  Sets post number to the correct card id in order to fetch the posts corresonding to the card
  */
  const setCardId = (num) => {
    setPostNum(num);
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
