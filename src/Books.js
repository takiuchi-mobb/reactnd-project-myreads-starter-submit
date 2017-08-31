import React, { Component } from 'react';

class Books extends Component {
	state = {
		title: {
				currentlyReading: "Currently Reading",
				wantToRead: "Want To Read",
				read: "Read",
				none: "All Book"
		}
	}
  render() {
	return  <div className="bookshelf">
	          <h2 className="bookshelf-title">{this.state.title[this.props.title]}</h2>
	          <div className="bookshelf-books">
		 		<ol className="books-grid">
					{this.props.books.map((book) =>(
						<li key={book.id}>
		                    <div className="book">
		                          <div className="book-top">
		                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${(book.imageLinks) ? book.imageLinks.thumbnail : ""})` }}></div>
		                            <div className="book-shelf-changer">
		                              <select value={book.shelf} onChange={(event) => this.props.onMoveBook(book, event)}>
		                                <option value="none" disabled>Move to...</option>
		                                <option value="currentlyReading">Currently Reading</option>
		                                <option value="wantToRead">Want to Read</option>
		                                <option value="read">Read</option>
		                                <option value="none">None</option>
		                              </select>
		                            </div>
		                          </div>
		                          <div className="book-title">{book.title}</div>
		                          <div className="book-authors">{book.authors}</div>
		                    </div>
		                </li>
					))}
		         </ol>
	          </div>
	        </div>  	
  }

}

export default Books