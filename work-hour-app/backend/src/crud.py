from sqlalchemy.orm import Session
import models
import schemas


def read_works(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Work).offset(skip).limit(limit).all()


def create_work(db: Session, work: schemas.WorkCreate):
    db_work = models.Work(
        item=work.item,
        memo=work.memo,
        start_datetime=work.start_datetime,
        end_datetime=work.end_datetime,
        duration=work.duration,
    )
    db.add(db_work)
    db.commit()
    db.refresh(db_work)
    return db_work


def update_work(db: Session, work: schemas.WorkCreate, work_id: int):
    db.query(models.Work).filter(models.Work.work_id == work_id).update(work.dict())
    db.commit()
    return work


def delete_work(db: Session, work_id: int):
    db_work = db.query(models.Work).get(work_id)
    db.delete(db_work)
    db.commit()
    return db_work
