from typing import List
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session


app = FastAPI()


@app.get("/")
async def index():
    return {"message": "Hello World"}
