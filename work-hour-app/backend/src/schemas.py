from typing import Optional
import datetime
from pydantic import BaseModel


class WorkCreate(BaseModel):
    item: str
    start_datetime: datetime.datetime
    is_active: bool

    class Config:
        orm_mode = True


class WorkUpdate(WorkCreate):
    memo: Optional[str]
    end_datetime: Optional[datetime.datetime]
    duration: Optional[datetime.timedelta]


class Work(WorkUpdate):
    work_id: int
