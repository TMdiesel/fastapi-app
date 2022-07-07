import datetime
from pydantic import BaseModel, Field


class WorkCreate(BaseModel):
    item: str
    memo: str
    start_datetime: datetime.datetime
    end_datetime: datetime.datetime
    duration: datetime.timedelta

    class Config:
        orm_mode = True


class Work(WorkCreate):
    work_id: int
