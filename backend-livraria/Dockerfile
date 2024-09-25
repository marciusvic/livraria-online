FROM python:3.11

WORKDIR /app

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

# Espera o banco de dados estar pronto (se necessário)
#COPY wait_for_db.py /app/wait_for_db.py

EXPOSE 8000

# Executa o comando de buscar livros e depois inicia o servidor
CMD ["sh", "-c", "python manage.py fetch_books && python manage.py runserver 0.0.0.0:8000"]
