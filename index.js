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
import Top from '../components/Top'
import Loading from '../components/Loading'

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
            {/* <Nav /> */}
            <Loading />
            {/* <Top /> */}

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