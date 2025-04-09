from sqlalchemy import Column, Integer, String, Table, ForeignKey, Boolean, Date
from sqlalchemy.orm import relationship
from .database import Base

station_lines = Table(
    "station_lines",
    Base.metadata,
    Column("station_id", Integer, ForeignKey("stations.id"), primary_key=True),
    Column("line_id", Integer, ForeignKey("lines.id"), primary_key=True)
)

class Station(Base):
    __tablename__ = "stations"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    region = Column(String)
    is_interchange = Column(Boolean)
    lines = relationship("Line", secondary=station_lines, back_populates="stations")

class Line(Base):
    __tablename__ = "lines"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    stations = relationship("Station", secondary=station_lines, back_populates="lines")

class DailyStation(Base):
    __tablename__ = "daily_station"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    selected_date = Column(Date, nullable=False)