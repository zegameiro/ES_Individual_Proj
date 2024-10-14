FROM python:3.12.3

WORKDIR /backend

COPY ./requirements.txt .

RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt

COPY ./src /backend/src

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--reload", "--port", "8000"]

