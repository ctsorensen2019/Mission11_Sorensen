import { useEffect, useState } from 'react';
import { Book } from './types/Book';
import 'bootstrap/dist/css/bootstrap.min.css';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, settotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/Book/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}`,
        {
          credentials: 'include',
        }
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      settotalPages(Math.ceil(totalItems / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, sortOrder, totalItems]);

  return (
    <>
      <h1>Favorite Books</h1>
      <br />
      {books.map((b) => (
        <div id="bookCard" className="card" key={b.bookId}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author:</strong> {b.author}
              </li>
              <li>
                <strong>Book Publisher:</strong> {b.publisher}
              </li>
              <li>
                <strong>ISBN:</strong> {b.publisher}
              </li>
              <li>
                <strong>Classification:</strong> {b.classification}
              </li>
              <li>
                <strong>Category:</strong> {b.category}
              </li>
              <li>
                <strong>Number of Pages:</strong> {b.pageCount}
              </li>
              <li>
                <strong>Price:</strong> {b.price}
              </li>
            </ul>
          </div>
        </div>
      ))}

      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setPageNum(i + 1)}
          disabled={pageNum === i + 1}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />
      <label>
        Sort by Project Name:
        <select
          onChange={(e) => {
            const value = e.target.value;
            setSortOrder(value);
            setPageNum(1); // Reset to page 1
          }}
          value={sortOrder}
        >
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>
      </label>
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => setPageSize(Number(p.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default BookList;
