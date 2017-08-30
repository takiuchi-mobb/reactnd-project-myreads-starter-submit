import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Search from './Search'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => 
          <BookShelf /> 
        } />
        <Route path="/search" render={() => 
          <Search /> 
        } />
      </div>
    )
  }
}

export default BooksApp
