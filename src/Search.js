import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import escapeStringRegexp from 'escape-string-regexp'
import sortBy from 'sort-by'
import _ from 'lodash';
import { Link } from 'react-router-dom'
import Books from './Books'

class Search extends Component {

	state = {
		query: "",
		books: [],
		currentlyReading: [],
		wantToRead: [], 
		read: []
	}

	moveBook = (book, event) => {
		const dst = event.target.value
		const src = book.shelf
		if (dst === src) {
			return
		}

		book.shelf = dst

		this.setState((state) => ({
			[src]: state[src].filter((c) => c.id !== book.id),
			[dst]: state[dst].concat([book])
		}))

		BooksAPI.update(book, dst).then((response) => {
			console.log(response)
		})
	}

	updateQuery = (query) => {
		this.setState({query: query.trim() })
 		BooksAPI.search(query.trim(), 50).then((books) => { 
 			if(books.error && books.error === "empty query") {
 				this.setState({books: [] })
 			} else {
 				this.setState({books: books})
 			}
		})
	}

	appendShelfState = (books) => {
		return  books.map((book) => { 
			book.shelf = "none"
			return book 
		}).map((book) => {
			["currentlyReading","wantToRead", "read"].map((key) => {
				this.state[key].map((org_book) => {
					if(org_book.id === book.id) {
						book.shelf = key
					}
					return org_book
				})
				return key
			})
			return book
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
		let showingBooks 
		if(this.state.query) {
			const match = new RegExp(escapeStringRegexp(this.state.query), 'i')
			const filterByBooks = this.state.books.filter((book) => match.test(book.title))
			const filterByAuthors = this.state.books.filter((book) => (book.authors) ? match.test(book.authors.join(" ")) : false )
			showingBooks = _.uniqBy(filterByBooks.concat(filterByAuthors), 'id') //filterByBooks.concat(filterByAuthors) //
		} else {
			showingBooks = this.state.books
		}
		let sortedBooks = this.appendShelfState(showingBooks).sort(sortBy('title'))
		// showingBooks
		return <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                  type="text" 
                  placeholder="Search by title or author" 
                  value={this.state.query} 
                  onChange={(event) => this.updateQuery(event.target.value)} 
                />
                
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              <div>
              	<Books onMoveBook={this.moveBook} title="All Books" books={sortedBooks}/>
              </div>
              </ol>
            </div>
          </div>
		
	}
}

export default Search



