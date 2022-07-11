from sqlalchemy.orm import Session
import models
import schemas


def read_works(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Work).offset(skip).limit(limit).all()


def create_work(db: Session, work: schemas.WorkCreate):
    db_work = models.Work(
        item=work.item, start_datetime=work.start_datetime, is_active=work.is_active
    )
    db.add(db_work)
    db.commit()
    db.refresh(db_work)
    return db_work


def read_work(db: Session, work_id: int):
    return db.query(models.Work).filter(models.Work.work_id == work_id).first()


def update_work(db: Session, work: schemas.WorkUpdate, work_id: int):
    db.query(models.Work).filter(models.Work.work_id == work_id).update(work.dict())
    db.commit()
    return work


def delete_work(db: Session, work_id: int):
    db_work = db.query(models.Work).get(work_id)
    db.delete(db_work)
    db.commit()
    return db_work
