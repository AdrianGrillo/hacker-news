import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { ThemeProvider } from '../components/Themes'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import Nav from '../components/Nav'
import Loading from '../components/Loading'
import { fetchItem } from '../utility/api'

const Posts = React.lazy(() => import('../components/Posts'))

export default class App extends React.Component {
  state = {
    theme: 'light',
    toggleTheme: () => {
      this.setState(
        ({ theme }) => ({
          theme: theme === 'light' ? 'dark' : 'light'
        })
      )
    }
  }

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className='container'>
              <Nav />
              <React.Suspense fallback={<Loading />}>
                <Switch>
                  <Route 
                    exact path='/' 
                    render={() => <Posts type='top' />}
                  />
                  <Route 
                    path='/new' 
                    render={() => <Posts type='new' />}
                  />
                  <Route render={() => <h1>404</h1>} />
                </Switch>
              </React.Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);