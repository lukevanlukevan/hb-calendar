from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List
from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

# Initialize FastAPI app
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# SQLite database setup
DATABASE_URL = "sqlite:///./calendar.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()


# SQLAlchemy model
class CalendarItem(Base):
    __tablename__ = "calendar_items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    tag = Column(String, nullable=True)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)


# Create tables
Base.metadata.create_all(bind=engine)


# Pydantic schema
class CalendarItemCreate(BaseModel):
    title: str = Field(..., example="Team Meeting")
    tag: str = Field(None, example="Work")
    start_date: datetime = Field(..., example="2025-05-16T09:00:00")
    end_date: datetime = Field(..., example="2025-05-16T10:00:00")


class CalendarItemResponse(CalendarItemCreate):
    id: int


# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Routes
@app.post("/calendar/", response_model=CalendarItemResponse)
def create_item(item: CalendarItemCreate):
    db = next(get_db())
    db_item = CalendarItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@app.put("/calendar/{item_id}", response_model=CalendarItemResponse)
def update_item(item_id: int, item: CalendarItemCreate, db: Session = Depends(get_db)):
    db_item = db.query(CalendarItem).filter(CalendarItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")

    db_item.title = item.title
    db_item.tag = item.tag
    db_item.start_date = item.start_date
    db_item.end_date = item.end_date

    db.commit()
    db.refresh(db_item)
    return db_item


@app.get("/calendar/", response_model=List[CalendarItemResponse])
def read_items():
    db = next(get_db())
    return db.query(CalendarItem).all()


@app.get("/calendar/{item_id}", response_model=CalendarItemResponse)
def read_item(item_id: int):
    db = next(get_db())
    item = db.query(CalendarItem).filter(CalendarItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.delete("/calendar/{item_id}")
def delete_item(item_id: int):
    db = next(get_db())
    item = db.query(CalendarItem).filter(CalendarItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item)
    db.commit()
    return {"message": f"Item {item_id} deleted"}
