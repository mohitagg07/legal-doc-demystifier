from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from .models import DocumentStatus

class DocumentBase(BaseModel):
    filename: str

class DocumentCreate(DocumentBase):
    pass

class Document(DocumentBase):
    id: str
    status: DocumentStatus
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class TimelineEventBase(BaseModel):
    date: Optional[str]
    description: str
    page_number: Optional[int]

class TimelineEventCreate(TimelineEventBase):
    pass

class TimelineEvent(TimelineEventBase):
    id: int
    document_id: str
    
    class Config:
        from_attributes = True

class DocumentAndTimeline(BaseModel):
    document: Document
    timeline: List[TimelineEvent]