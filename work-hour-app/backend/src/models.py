from sqlalchemy import Column, Integer, String, DateTime, Interval
from database import Base


class Work(Base):
    __tablename__ = "work"
    work_id = Column(Integer, primary_key=True)
    item = Column(String)
    memo = Column(String)
    start_datetime = Column(DateTime)
    end_datetime = Column(DateTime)
    duration = Column(Interval)
