from typing import List
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)
app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def index():
    return {"message": "Hello World"}


# read
@app.get("/users", response_model=List[schemas.User])
async def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(skip=skip, limit=limit, db=db)
    return users


@app.get("/rooms", response_model=List[schemas.Room])
async def read_rooms(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    rooms = crud.get_rooms(skip=skip, limit=limit, db=db)
    return rooms


@app.get("/bookings", response_model=List[schemas.Booking])
async def read_bookings(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    bookings = crud.get_bookings(skip=skip, limit=limit, db=db)
    return bookings


# create
@app.post("/users", response_model=schemas.User)
async def create_users(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db=db, user=user)


@app.post("/rooms", response_model=schemas.Room)
async def create_rooms(room: schemas.RoomCreate, db: Session = Depends(get_db)):
    return crud.create_room(db=db, room=room)


@app.post("/bookings", response_model=schemas.Booking)
async def create_bookings(
    booking: schemas.BookingCreate, db: Session = Depends(get_db)
):
    return crud.create_booking(db=db, booking=booking)


# delete
@app.delete("/users/{user_id}", response_model=schemas.User)
async def delete_users(user_id: int, db: Session = Depends(get_db)):
    return crud.delete_user(db=db, user_id=user_id)


@app.delete("/rooms/{room_id}", response_model=schemas.Room)
async def delete_rooms(room_id: int, db: Session = Depends(get_db)):
    return crud.delete_room(db=db, room_id=room_id)


@app.delete("/bookings/{booking_id}", response_model=schemas.Booking)
async def delete_bookings(booking_id: int, db: Session = Depends(get_db)):
    return crud.delete_booking(db=db, booking_id=booking_id)


# update
@app.put("/users/{user_id}", response_model=schemas.UserUpdate)
async def update_users(
    user_id: int, user: schemas.UserUpdate, db: Session = Depends(get_db)
):
    return crud.update_user(db=db, user_id=user_id, user=user)
