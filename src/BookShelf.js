import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Books from './Books'
import * as BooksAPI from './BooksAPI'

class BookShelf extends Component {
	state = {
		currentlyReading: [],
		wantToRead: [],
		read: [],
		none: [],
	}


	moveBook = (book, event) => {
		const dst = event.target.value
		const src = book.shelf

		if (dst === src) {
			return
		}

		this.setState((state) => ({
			[src]: state[src].filter((c) => c.id !== book.id),
			[dst]: state[dst].concat([book])
		}))

		BooksAPI.update(book, dst).then((response) => {
			console.log(response)
			book.shelf = dst
		})
	}


	componentDidMount() {
	 BooksAPI.getAll().then((books) => this.setState({
	 	currentlyReading: books.filter((book) => "currentlyReading" === book.shelf),
	 	wantToRead: books.filter((book) => "wantToRead" === book.shelf),
	 	read: books.filter((book) => "read" === book.shelf),
	 	none: books.filter((book) => "none" === book.shelf)
	 }))
	}

	render() {
		return <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              	<Books onMoveBook={this.moveBook} title="currentlyReading" books={this.state.currentlyReading}/>
              	<Books onMoveBook={this.moveBook} title="wantToRead"  books={this.state.wantToRead}/>
              	<Books onMoveBook={this.moveBook} title="read" books={this.state.read}/>
              </div>
            </div>
            <div className="open-search">
			  <Link to="/search">Add a book</Link>
            </div>
          </div>
 	}
}

export default BookShelf
