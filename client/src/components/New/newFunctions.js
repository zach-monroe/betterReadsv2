//Function for getting the ISBN number from an API
async function fetchISBN(title, author_lname) {
  try {
    // API request for getting the ISBN
    const urlTitle = title.toLowerCase().replace(/ /g, "+");
    const urlAuthor = author_lname.toLowerCase();
    const response = await fetch(
      `https://openlibrary.org/search.json?title=${urlTitle}&author=${urlAuthor}`,
    );
    const data = await response.json();

    // Check if ISBN exists
    if (data.docs && data.docs.length > 0 && data.docs[0].isbn) {
      const isbn = data.docs[0].isbn[0];
      return isbn;
    } else {
      return null; // ISBN not found
    }
  } catch (error) {
    throw new Error("Failed to fetch ISBN: " + error.message);
  }
}

// Function that handles adding the book to the database by sending an API post request.
async function addBookToDatabase(bookData, isbn) {
  try {
    //Trying the post request to the api endpoint.
    const response = await fetch("/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...bookData, isbn }), // Include ISBN in the request body
    });

    if (!response.ok) {
      throw new Error("Failed to add book: " + response.statusText);
    }
  } catch (error) {
    throw new Error("Failed to add book to database: " + error.message);
  }
}
export { fetchISBN, addBookToDatabase };
