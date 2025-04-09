from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import models
from db.database import engine
from routers.station import router as station
from utils.utils import start_scheduler

models.Base.metadata.create_all(engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    start_scheduler()
    yield
    
app = FastAPI(lifespan=lifespan)

app.include_router(station)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)




