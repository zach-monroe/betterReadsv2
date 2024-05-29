import React, { useState, useEffect } from "react";
import "../output.css";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import BookCard from "../components/BookCard";
import BigBookCard from "../components/Book/BigBookCard";

function Profile() {
  const [backendData, setBackendData] = useState({});
  const [selectedBook, setSelectedBook] = useState(null);
  const { user } = useAuth();

  //fetches profile data from server to render onto the page.
  useEffect(() => {
    const fetchData = async () => {
      try {
        //requests the user's data by using their id number.
        const response = await fetch(`/api/profile/${user.id}`);
        if (response.ok) {
          //handles normal response.
          const data = await response.json();
          setBackendData(data);
        } else {
          //prints status and error message if fetch does not work.
          console.error("Failed to fetch data:", response.status);
        }
      } catch (error) {
        //basic error handling
        console.error("Error fetching data:", error);
      }
    };

    //calls fetch data function defined within use effect so that it actually triggers.
    fetchData();
  }, [user]);

  //deconstructing backendData into a "books" array for mapping.
  const { books } = backendData;

  //returns a filtered array where all books except the deleted book appear.
  const handleDelete = (bookId) => {
    setBackendData((prevData) => ({
      ...prevData,
      books: prevData.books.filter((book) => book.book_id !== bookId),
    }));
    console.log("profile handle delete was called.");
  };

  return (
    <div>
      <div className="text-darkFore min-h-screen bg-primary">
        <div className="flex justify-center">
          <h1 className="pt-10">{user?.name}'s Profile</h1>
        </div>
        <div className="flex justify-center">
          <div className="grid pt-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-fore1">
            {books && books.length > 0 ? (
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
        </div>
      </div>
      <BigBookCard
        isProfile={true}
        selectedBook={selectedBook}
        setSelectedBook={setSelectedBook}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default Profile;
