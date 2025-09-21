# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker, declarative_base

# # The database URL. For SQLite, this is a file path.
# SQLALCHEMY_DATABASE_URL = "sqlite:///./app.db"

# # Create a SQLAlchemy engine. The `connect_args` are specific to SQLite
# # and are needed for multithreading.
# engine = create_engine(
#     SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
# )

# # Create a session factory. Each time you need to talk to the DB,
# # you'll create a new session.
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# # This is the base class for our models.
# Base = declarative_base()

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# The database URL. For SQLite, this is a file path.
SQLALCHEMY_DATABASE_URL = "sqlite:///./app.db"

# Create a SQLAlchemy engine.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Create a session factory.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# This is the base class for our models.
Base = declarative_base()