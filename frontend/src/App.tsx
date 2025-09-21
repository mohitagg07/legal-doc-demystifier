import { useState, useRef, useEffect } from 'react';

// --- Reusable SVG Icons for a Professional UI ---
const FeatureIcon1 = () => (
  <svg className="w-12 h-12 text-indigo-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
);
const FeatureIcon2 = () => (
  <svg className="w-12 h-12 text-indigo-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
);
const FeatureIcon3 = () => (
  <svg className="w-12 h-12 text-indigo-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
);
const UploadCloudIcon = () => (
    <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M12 15v-6m0 0l-3 3m3-3l3 3"></path></svg>
);
const MicrophoneIcon = () => (
    <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
);
const PlayIcon = () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
);
const PauseIcon = () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
);

// --- Type Definitions for Props and Data ---
type TimelineItemType = 'milestone' | 'payment' | 'deadline' | 'notice';

interface TimelineItemData {
    date: string;
    title: string;
    description: string;
    type: TimelineItemType;
}

// --- Mock Data for the Results Dashboard ---
const mockTimelineData: TimelineItemData[] = [
    { date: '2025-09-19', title: 'Contract Signed', description: 'The agreement was officially executed by all parties.', type: 'milestone' },
    { date: '2025-10-01', title: 'Initial Payment Due', description: 'First installment of $5,000 is due.', type: 'payment' },
    { date: '2025-11-15', title: 'Project Milestone 1', description: 'Completion of the initial project phase as defined in Section 3.1.', type: 'deadline' },
    { date: '2026-08-31', title: 'Contract Renewal Notice', description: 'A 30-day notice is required for contract renewal or termination.', type: 'notice' },
];
const mockTextSummary = "This contract outlines a 12-month service agreement. Key obligations include an initial payment by October 1st and the completion of Project Milestone 1 by November 15th. The confidentiality clause (Section 5) is standard but has a high penalty for breach. A 30-day notice is required for renewal.";

// --- Main Application Component ---
function App() {
  const [view, setView] = useState('landing');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState('');
  const [processedItemName, setProcessedItemName] = useState('');

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
        if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
        if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setAudioBlob(new Blob());
    } else {
      setRecordingTime(0);
      setAudioBlob(null);
      setIsRecording(true);
    }
  };

  const handleProcessVoice = () => {
    if (!audioBlob) return;
    setIsProcessing(true);
    setProcessedItemName(`Voice Message (${formatTime(recordingTime)})`);
    setTimeout(() => {
      setIsProcessing(false);
      setView('results');
    }, 2000);
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleProcessDocument = () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setProcessedItemName(selectedFile.name);
    setTimeout(() => {
      setIsProcessing(false);
      setView('results');
    }, 2000);
  };
  
  const handleAnalyzeAnother = () => {
      setView('landing');
      setSelectedFile(null);
      setFileName('');
      setIsRecording(false);
      setRecordingTime(0);
      setAudioBlob(null);
  }

  if (view === 'results') {
    return <ResultsDashboard 
                fileName={processedItemName} 
                onAnalyzeAnother={handleAnalyzeAnother} 
            />;
  }

  return (
    <div className="bg-white text-gray-800 font-sans">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <ActionSection 
            fileInputRef={fileInputRef} 
            handleFileChange={handleFileChange}
            handleProcessDocument={handleProcessDocument}
            fileName={fileName}
            isProcessing={isProcessing}
            selectedFile={selectedFile}
            isRecording={isRecording}
            recordingTime={recordingTime}
            audioBlob={audioBlob}
            handleToggleRecording={handleToggleRecording}
            handleProcessVoice={handleProcessVoice}
            formatTime={formatTime}
        />
      </main>
      <Footer />
    </div>
  );
}

// --- UI Components ---
const Header = () => ( <header>...</header> );
const HeroSection = () => ( <section>...</section> );
const FeaturesSection = () => ( <section>...</section> );
const HowItWorksSection = () => ( <section>...</section> );

// --- THIS IS THE FIX ---
interface ActionSectionProps {
    fileInputRef: React.RefObject<HTMLInputElement | null>; // Changed this line
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleProcessDocument: () => void;
    fileName: string;
    isProcessing: boolean;
    selectedFile: File | null;
    isRecording: boolean;
    recordingTime: number;
    audioBlob: Blob | null;
    handleToggleRecording: () => void;
    handleProcessVoice: () => void;
    formatTime: (seconds: number) => string;
}

const ActionSection = ({ fileInputRef, handleFileChange, handleProcessDocument, fileName, isProcessing, selectedFile, isRecording, recordingTime, audioBlob, handleToggleRecording, handleProcessVoice, formatTime }: ActionSectionProps) => (
    <section id="upload" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Get Started Now</h2>
            <p className="mt-3 text-gray-600">Choose your preferred method to analyze an agreement.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Analyze Document Card */}
            <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Analyze a Document</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center mt-4 transition hover:border-indigo-500 flex-grow flex flex-col justify-center">
                <UploadCloudIcon />
                <p className="mb-2 text-gray-600 text-sm">Drag & drop or</p>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx" />
                <button onClick={() => fileInputRef.current?.click()} className="font-semibold text-indigo-600 hover:text-indigo-800 transition">Browse Files</button>
                {fileName && <p className="text-sm text-gray-500 mt-2 truncate" title={fileName}>{fileName}</p>}
            _git </div>
              <div className="mt-6">
                <button onClick={handleProcessDocument} disabled={isProcessing || !selectedFile} className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center justify-center">
                  {isProcessing && selectedFile ? 'Analyzing...' : 'Process Document'}
                </button>
              </div>
            </div>
            {/* Record Voice Message Card */}
            <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Record a Voice Message</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center mt-4 transition flex-grow flex flex-col justify-center items-center">
                    <MicrophoneIcon />
                    <p className="text-sm text-gray-500 my-2">{isRecording ? "Recording in progress..." : "Record a summary of your agreement"}</p>
                    {isRecording && <p className="text-2xl font-mono font-semibold text-gray-800 my-2">{formatTime(recordingTime)}</p>}
                    <button onClick={handleToggleRecording} className={`w-48 font-semibold py-2 px-4 rounded-full transition text-white shadow-md ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}>
                        {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </button>
                </div>
                <div className="mt-6">
                    <button onClick={handleProcessVoice} disabled={isProcessing || !audioBlob} className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center justify-center">
                        {isProcessing && audioBlob ? 'Analyzing...' : 'Process Voice Message'}
                    </button>
                </div>
            </div>
        </div>
      </div>
    </section>
);

const Footer = () => ( <footer >...</footer > );
const ResultsDashboard = ({ fileName, onAnalyzeAnother }: any) => { ... };
const TimelineItem = ({ item, isLast }: any) => { ... };
const ToggleButton = ({ label, isActive, onClick }: any) => { ... };
const TextSummaryComponent = () => ( <div>...</div> );
const VisualDiagramComponent = () => ( <div>...</div> );
const AudioPlayerComponent = () => { ... };

export default App;

