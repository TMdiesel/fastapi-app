from sqlalchemy import Column, Integer, String, DateTime, Interval, Boolean
from database import Base


class Work(Base):
    __tablename__ = "work"
    work_id = Column(Integer, primary_key=True)
    item = Column(String)
    is_active = Column(Boolean)
    memo = Column(String)
    start_datetime = Column(DateTime)
    end_datetime = Column(DateTime)
    duration = Column(Interval)
