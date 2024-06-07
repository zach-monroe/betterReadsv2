import React, { useState, useEffect } from "react";
import "../output.css";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import BookCard from "../components/BookCard";
import AnimateBigBookCard from "../components/Book/BigBookCard";
import AnimateHighlight from "../components/Highlight/AnimateHighlight";
import LoadingSpinner from "../components/LoadingSpinner";

function Profile() {
  const [backendData, setBackendData] = useState({});
  const [selectedBook, setSelectedBook] = useState(null);
  const [highlightIsOpen, setHighlight] = useState(false);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  // Fetches profile data from server to render onto the page.
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Requests the user's data by using their id number.
        const response = await fetch(`http://18.219.34.33:5000/api/profile/${user.id}`);
        if (response.ok) {
          // Handles normal response.
          const data = await response.json();
          setBackendData(data);
          setLoading(false);
        } else {
          // Prints status and error message if fetch does not work.
          console.error("Failed to fetch data:", response.status);
          setLoading(false);
        }
      } catch (error) {
        // Basic error handling
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    // Calls fetch data function defined within useEffect so that it actually triggers.
    fetchData();
  }, [user]);

  // Deconstructing backendData into a "books" array for mapping.
  const { books } = backendData;

  // Returns a filtered array where all books except the deleted book appear.
  const handleDelete = (bookId) => {
    setBackendData((prevData) => ({
      ...prevData,
      books: prevData.books.filter((book) => book.book_id !== bookId),
    }));
    console.log("Profile handle delete was called.");
  };

  return (
    <div>
      <div className="text-darkFore min-h-screen bg-primary">
        <div className="flex justify-center">
          <h1 className="pt-10 text-xl font-libre-baskerville text-bold">
            Welcome {user?.name}
          </h1>
        </div>
        <div className="flex justify-center">
          {loading ? (
            <div className="min-h-screen items-center flex">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="grid pt-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-fore1">
              {books && books.length > 0 && !loading ? (
                books.map((book, i) => (
                  <div className="mx-2 my-2" key={i}>
                    <BookCard
                      key={i}
                      index={i}
                      id={book.book_id}
                      title={book.title}
                      author_fname={book.author_fname}
                      author_lname={book.author_lname}
                      notes={book.notes}
                      rating={book.rating}
                      isbn={book.book_isbn}
                      handleDelete={handleDelete}
                      onSelect={() => setSelectedBook(book)}
                    />
                  </div>
                ))
              ) : (
                <div className="flex col-span-full justify-center text-center pb-4">
                  <p>
                    You haven't added any reads!
                    <br />
                    <Link className="hover:italic" to="/new">
                      Make a New Post!
                    </Link>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <AnimateBigBookCard
        isProfile={true}
        selectedBook={selectedBook}
        setSelectedBook={setSelectedBook}
        setHighlight={setHighlight}
        handleDelete={handleDelete}
      />
      <AnimateHighlight
        highlightIsOpen={highlightIsOpen}
        setHighlight={setHighlight}
        selectedBook={selectedBook}
      />
    </div>
  );
}

export default Profile;
