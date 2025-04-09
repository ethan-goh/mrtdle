from apscheduler.schedulers.background import BackgroundScheduler
from exceptions.exceptions import NotFoundException
from db.database import SessionLocal
from db.models import Station, DailyStation
from sqlalchemy.orm import Session
from sqlalchemy.sql import func, text
from datetime import datetime
import pytz


def start_scheduler():
    singapore_tz = pytz.timezone("Asia/Singapore")
    scheduler = BackgroundScheduler(timezone=singapore_tz)
    scheduler.add_job(get_daily_station, "cron", hour=14, minute=24)
    scheduler.start()

def get_daily_station():
    singapore_tz = pytz.timezone("Asia/Singapore")
    today = datetime.now(singapore_tz).strftime('%Y-%m-%d')
    db: Session = SessionLocal()
    station = db.query(Station).order_by(func.random()).first()
    if not station:
        raise NotFoundException("Station not found")
    existing = db.query(DailyStation).filter(DailyStation.selected_date == today).first() 
    if not existing:
        new_station = DailyStation(name=station.name, selected_date=today)
        db.add(new_station)
        db.commit()
    db.close()
        