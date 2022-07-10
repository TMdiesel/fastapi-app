from typing import List

from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

import schemas
import models
import crud
from database import engine, SessionLocal
from fastapi.middleware.cors import CORSMiddleware

# テーブルを作成
models.Base.metadata.create_all(bind=engine)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def index():
    return {"message": "Hello World"}


@app.get("/work", response_model=List[schemas.Work])
async def read_works(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.read_works(db, skip=skip, limit=limit)


@app.post("/work", response_model=schemas.WorkCreate)
async def create_work(work: schemas.WorkCreate, db: Session = Depends(get_db)):
    return crud.create_work(db, work)


@app.put("/work/{work_id}", response_model=schemas.WorkUpdate)
async def update_work(
    work_id: int, work: schemas.WorkUpdate, db: Session = Depends(get_db)
):
    return crud.update_work(db, work, work_id)


@app.delete("/work/{work_id}", response_model=schemas.Work)
async def delete_work(work_id: int, db: Session = Depends(get_db)):
    return crud.delete_work(db, work_id)
