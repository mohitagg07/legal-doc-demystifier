from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from config import settings

# Create a SQLAlchemy engine instance for a SQLite database.
# The `connect_args` are necessary for SQLite in FastAPI.
engine = create_engine(
    settings.DATABASE_URL,
    connect_args={"check_same_thread": False}
)

# Create a SessionLocal class that will be our session factory.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db() -> Session:
    """
    Dependency to get a database session.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()