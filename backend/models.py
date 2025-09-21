# from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Enum
# from sqlalchemy.orm import relationship
# from sqlalchemy.ext.declarative import declarative_base
# import enum
# from datetime import datetime

# Base = declarative_base()

# class DocumentStatus(str, enum.Enum):
#     UPLOADED = "uploaded"
#     PROCESSING = "processing"
#     COMPLETED = "completed"
#     FAILED = "failed"

# class Document(Base):
#     __tablename__ = "documents"

#     id = Column(String, primary_key=True, index=True)
#     filename = Column(String, index=True)
#     status = Column(Enum(DocumentStatus), default=DocumentStatus.UPLOADED, nullable=False)
#     created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
#     updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
#     timeline_events = relationship("TimelineEvent", back_populates="document", cascade="all, delete-orphan")

# class TimelineEvent(Base):
#     __tablename__ = "timeline_events"

#     id = Column(Integer, primary_key=True, index=True)
#     document_id = Column(String, ForeignKey("documents.id"), nullable=False)
#     date = Column(String, nullable=True)
#     description = Column(Text, nullable=False)
#     page_number = Column(Integer, nullable=True)
    
#     document = relationship("Document", back_populates="timeline_events")

# from sqlalchemy import Column, Integer, String, JSON
# from .database import Base

# class AnalysisResult(Base):
#     """
#     SQLAlchemy model for storing document/voice analysis results.
#     """
#     __tablename__ = "analysis_results"

#     id = Column(Integer, primary_key=True, index=True)
#     file_name = Column(String, index=True)
#     text_summary = Column(String)
#     timeline_data = Column(JSON)
#     created_at = Column(String)  # We'll store the creation time as a string

from sqlalchemy import Column, Integer, String, JSON
from database import Base

class AnalysisResult(Base):
    """
    SQLAlchemy model for storing document/voice analysis results.
    """
    __tablename__ = "analysis_results"

    id = Column(Integer, primary_key=True, index=True)
    file_name = Column(String, index=True)
    text_summary = Column(String)
    timeline_data = Column(JSON)
    created_at = Column(String)