import React, { useEffect, useState } from "react";
import { fetchBooks } from "../../services/api";
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

// Definição do tipo Book
type Book = {
  id: number;
  google_books_id: string;
  title: string;
  author: string;
  published_date: string;
  categories: string;
  description: string;
  thumbnail: string;
};

export const ListBooksComponent: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(0); // Estado para controlar a página atual
  const booksPerPage = 9; // Mostrar 9 livros por página (3 por linha)

  useEffect(() => {
    const fetchBooksFromAPI = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooksFromAPI();
  }, []);

  // Calcular os livros da página atual
  const currentBooks = books.slice(
    page * booksPerPage,
    (page + 1) * booksPerPage
  );

  return (
    <div className="container mx-auto p-4">
      {currentBooks.length === 0 ? (
        <p className="text-center text-lg">No books available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentBooks.map((book) => (
            <Card key={book.id} className="shadow-lg">
              <CardMedia
                component="img"
                image={book.thumbnail}
                alt={book.title}
                className="h-64 object-cover"
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Author: {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {book.categories}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Published: {book.published_date}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-4"
                  fullWidth
                >
                  Adicionar ao Carrinho
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Navegação de Páginas */}
      <div className="flex justify-center mt-8">
        <Button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 0))}
          disabled={page === 0}
          className="mr-2"
          variant="contained"
        >
          Previous
        </Button>
        <Button
          onClick={() =>
            setPage((prevPage) =>
              (prevPage + 1) * booksPerPage < books.length
                ? prevPage + 1
                : prevPage
            )
          }
          disabled={(page + 1) * booksPerPage >= books.length}
          variant="contained"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
