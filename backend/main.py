


import time
import json
from typing import List, Dict, Any, Optional
from pydantic import BaseModel
from fastapi import FastAPI, File, UploadFile, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import AnalysisResult

# --- Pydantic Schemas ---

class TimelineItem(BaseModel):
    date: str
    title: str
    description: str
    type: str

class AnalysisResults(BaseModel):
    text_summary: str
    timeline: List[TimelineItem]

# --- FastAPI Application Setup ---

app = FastAPI(
    title="LegalDemystifier API",
    description="Backend for a document and voice analysis application.",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Database Dependency ---

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Mock Data and Business Logic ---

MOCK_ANALYSIS_RESULTS = AnalysisResults(
    text_summary="This contract outlines a 12-month service agreement. Key obligations include an initial payment by October 1st and the completion of Project Milestone 1 by November 15th. The confidentiality clause (Section 5) is standard but has a high penalty for breach. A 30-day notice is required for renewal.",
    timeline=[
        TimelineItem(date='2025-09-19', title='Contract Signed', description='The agreement was officially executed by all parties.', type='milestone'),
        TimelineItem(date='2025-10-01', title='Initial Payment Due', description='First installment of $5,000 is due.', type='payment'),
        TimelineItem(date='2025-11-15', title='Project Milestone 1', description='Completion of the initial project phase as defined in Section 3.1.', type='deadline'),
        TimelineItem(date='2026-08-31', title='Contract Renewal Notice', description='A 30-day notice is required for contract renewal or termination.', type='notice'),
    ]
)

# --- API Endpoints ---

@app.get("/", status_code=status.HTTP_200_OK)
async def health_check():
    return {"status": "ok"}

@app.post("/analyze-document", response_model=AnalysisResults)
async def analyze_document(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if file.content_type not in ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]:
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Only .pdf, .doc, and .docx are supported."
        )

    print(f"Received file for analysis: {file.filename}")
    time.sleep(2)
    
    new_analysis_result = AnalysisResult(
        file_name=file.filename,
        text_summary=MOCK_ANALYSIS_RESULTS.text_summary,
        timeline_data=json.dumps([item.model_dump() for item in MOCK_ANALYSIS_RESULTS.timeline]),
        created_at=str(time.time())
    )
    db.add(new_analysis_result)
    db.commit()
    db.refresh(new_analysis_result)
    
    return MOCK_ANALYSIS_RESULTS

@app.post("/analyze-voice", response_model=AnalysisResults)
async def analyze_voice(file: UploadFile = File(...), db: Session = Depends(get_db)):
    print(f"Received voice file for analysis: {file.filename}")
    time.sleep(2)
    
    new_analysis_result = AnalysisResult(
        file_name=file.filename,
        text_summary=MOCK_ANALYSIS_RESULTS.text_summary,
        timeline_data=json.dumps([item.model_dump() for item in MOCK_ANALYSIS_RESULTS.timeline]),
        created_at=str(time.time())
    )
    db.add(new_analysis_result)
    db.commit()
    db.refresh(new_analysis_result)
    
    return MOCK_ANALYSIS_RESULTS
