import requests
from django.core.management.base import BaseCommand
from livraria.models import Book

class Command(BaseCommand):
    help = 'Fetch books from Google Books API'

    def handle(self, *args, **options):
        query = 'fiction'
        response = requests.get(f'https://www.googleapis.com/books/v1/volumes?q={query}')
        books = response.json().get('items', [])
        
        for book in books:
            book_info = book['volumeInfo']
            Book.objects.update_or_create(
                google_books_id=book['id'],
                defaults={
                    'title': book_info.get('title'),
                    'author': ', '.join(book_info.get('authors', [])),
                    'published_date': book_info.get('publishedDate'),
                    'categories': ', '.join(book_info.get('categories', [])),
                    'description': book_info.get('description', 'No description available'),
                    'thumbnail': book_info.get('imageLinks', {}).get('thumbnail', ''),
                }
            )
        self.stdout.write(self.style.SUCCESS('Books successfully fetched and updated!'))
