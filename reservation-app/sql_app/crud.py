from sqlalchemy.orm import Session
from . import models, schemas


# ユーザー一覧取得
def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


# 会議室一覧取得
def get_rooms(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Room).offset(skip).limit(limit).all()


# 予約一覧取得
def get_bookings(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Booking).offset(skip).limit(limit).all()


# ユーザー登録
def create_user(db: Session, user: schemas.User):
    db_user = models.User(username=user.username)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# 会議室登録
def create_room(db: Session, room: schemas.Room):
    db_room = models.Room(room_name=room.room_name, capacity=room.capacity)
    db.add(db_room)
    db.commit()
    db.refresh(db_room)
    return db_room


# 予約登録
def create_booking(db: Session, booking: schemas.Booking):
    db_booking = models.Booking(
        user_id=booking.user_id,
        room_id=booking.room_id,
        booked_num=booking.booked_num,
        start_datetime=booking.start_datetime,
        end_datetime=booking.end_datetime,
    )
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking


# ユーザー削除
def delete_user(db: Session, user_id: int):
    db_user = db.query(models.User).get(user_id)
    db.delete(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# 会議室削除
def delete_room(db: Session, room_id: int):
    db_room = db.query(models.Room).get(room_id)
    db.delete(db_room)
    db.commit()
    db.refresh(db_room)
    return db_room


# 予約削除
def delete_booking(db: Session, booking_id: int):
    db_booking = db.query(models.Booking).get(booking_id)
    db.delete(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking
