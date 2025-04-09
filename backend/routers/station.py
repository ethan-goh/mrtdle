from datetime import datetime, date
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from db.models import Station, DailyStation
from db.database import get_db
from exceptions.exceptions import NotFoundException, BadRequestException
from pydantic import BaseModel
import pytz

router = APIRouter(
    prefix="/station",
    tags=["Station"]
)

class GuessRequest(BaseModel):
    station_name: str
            
@router.get("/stations")
def get_all_stations(db: Session = Depends(get_db)):
    stations = db.query(Station).all()
    if not stations:
        raise NotFoundException(f"HTTP Error: Error getting stations.")
    station_list = [station for station in stations]
    return {
        "stations": station_list
    }

@router.post("/guess")
def check_station_submit(guess: GuessRequest, db: Session = Depends(get_db)):
    station = db.query(Station).filter(Station.name == guess.station_name).first()
    if not station:
        raise NotFoundException(f"{guess.station_name} is not a valid station")
    response = {
        "is_correct": None,
        "name": None,
        "lines": None,
        "is_interchange": None,
        "region": None
    }
    
    singapore_tz = pytz.timezone("Asia/Singapore")
    today = datetime.now(singapore_tz).strftime('%Y-%m-%d')
    daily_station_name = db.query(DailyStation).filter(DailyStation.selected_date == today).first().name
    daily_station = db.query(Station).filter(Station.name == daily_station_name).first()    

    if station.name != daily_station.name:
        response["is_correct"] = False
    else:
        response["is_correct"] = True
    
    response["name"] = station.name
    response["lines"] = bool(set(daily_station.lines) & set(station.lines))
    response["is_interchange"] = station.is_interchange == daily_station.is_interchange 
    response["region"] = station.region if station.region == daily_station.region else False

    return response



