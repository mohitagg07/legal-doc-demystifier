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

// --- Mock Data for the Results Dashboard ---
const mockTimelineData = [
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

  // New state for voice recording
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const timerRef = useRef<number | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Voice Recording Logic ---
  useEffect(() => {
    if (isRecording) {
        timerRef.current = window.setInterval(() => {
            setRecordingTime(prevTime => prevTime + 1);
        }, 1000);
    } else {
        if (timerRef.current) window.clearInterval(timerRef.current);
    }
    return () => {
        if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const handleToggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      // In a real app, you would get the audio blob from the MediaRecorder API
      setAudioBlob(new Blob()); // Create a dummy blob for the prototype
    } else {
      // Start recording
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

  // --- File Upload Logic ---
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

  // --- Conditional Rendering ---
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

const Header = () => (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800"><span className="text-indigo-600">Legal</span>Demystifier</div>
          <div className="hidden md:flex space-x-6 items-center">
            <a href="#features" className="text-gray-600 hover:text-indigo-600 transition">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 transition">How It Works</a>
            <a href="#upload" className="bg-indigo-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-indigo-700 transition shadow-sm">Get Started</a>
          </div>
        </nav>
    </header>
);

const HeroSection = () => (
    <section className="bg-gray-50">
        <div className="container mx-auto px-6 py-24 md:py-32 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">Understand Your Legal Documents, Instantly.</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">Our AI analyzes complex contracts and spoken agreements, transforming them into simple, interactive, and actionable timelines.</p>
            <a href="#upload" className="mt-8 inline-block bg-indigo-600 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-1">Analyze Now</a>
        </div>
    </section>
);

const FeaturesSection = () => (
    <section id="features" className="py-20">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-gray-900">Powerful Features, Simple Interface</h2><p className="mt-3 text-gray-600 max-w-2xl mx-auto">Everything you need to gain clarity and confidence in your legal agreements.</p></div>
            <div className="grid md:grid-cols-3 gap-10">
                <div className="text-center p-8 bg-gray-50 rounded-xl shadow-sm"><FeatureIcon1 /><h3 className="text-xl font-semibold mb-2 text-gray-900">Clause Extraction & Summaries</h3><p className="text-gray-600">Our AI automatically identifies key clauses and translates dense legal jargon into plain, simple English.</p></div>
                <div className="text-center p-8 bg-gray-50 rounded-xl shadow-sm"><FeatureIcon2 /><h3 className="text-xl font-semibold mb-2 text-gray-900">AI-Powered Risk Highlighting</h3><p className="text-gray-600">Instantly flag potential risks, obligations, and penalties, so you know exactly where to focus your attention.</p></div>
                <div className="text-center p-8 bg-gray-50 rounded-xl shadow-sm"><FeatureIcon3 /><h3 className="text-xl font-semibold mb-2 text-gray-900">Interactive Event Timeline</h3><p className="text-gray-600">Never miss a deadline again. All critical dates are extracted and plotted on a visual timeline for easy tracking.</p></div>
            </div>
        </div>
    </section>
);

const HowItWorksSection = () => (
    <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">A Simple, Three-Step Process</h2>
            <div className="relative">
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200" style={{transform: 'translateY(-50%)', zIndex: 1}}></div>
                <div className="relative grid md:grid-cols-3 gap-12 text-center z-10">
                    <div className="flex flex-col items-center"><div className="bg-white border-2 border-indigo-500 rounded-full h-20 w-20 flex items-center justify-center text-3xl font-bold text-indigo-600 mb-4 shadow-md">1</div><h3 className="text-xl font-semibold mb-2">Upload or Record</h3><p className="text-gray-600">Securely upload a document or record a voice message about the agreement.</p></div>
                    <div className="flex flex-col items-center"><div className="bg-white border-2 border-indigo-500 rounded-full h-20 w-20 flex items-center justify-center text-3xl font-bold text-indigo-600 mb-4 shadow-md">2</div><h3 className="text-xl font-semibold mb-2">AI Analysis</h3><p className="text-gray-600">Our platform scans, parses, and analyzes the content in seconds.</p></div>
                    <div className="flex flex-col items-center"><div className="bg-white border-2 border-indigo-500 rounded-full h-20 w-20 flex items-center justify-center text-3xl font-bold text-indigo-600 mb-4 shadow-md">3</div><h3 className="text-xl font-semibold mb-2">Explore Results</h3><p className="text-gray-600">Receive an interactive report with summaries, risks, and a visual timeline.</p></div>
                </div>
            </div>
        </div>
    </section>
);

const ActionSection = ({ fileInputRef, handleFileChange, handleProcessDocument, fileName, isProcessing, selectedFile, isRecording, recordingTime, audioBlob, handleToggleRecording, handleProcessVoice, formatTime }: any) => (
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
              </div>
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

const Footer = () => (
    <footer className="bg-gray-800 text-gray-400">
        <div className="container mx-auto px-6 py-10 text-center">
            <p>&copy; 2025 LegalDemystifier. All Rights Reserved.</p>
            <p className="text-sm mt-2">This is a project showcase and not a provider of legal advice.</p>
        </div>
    </footer>
);

const ResultsDashboard = ({ fileName, onAnalyzeAnother }: any) => {
    const [showText, setShowText] = useState(true);
    const [showVisual, setShowVisual] = useState(true);
    const [showAudio, setShowAudio] = useState(true);
    return (
        <div className="bg-gray-50 min-h-screen">
            <header className="bg-white shadow-sm"><div className="container mx-auto px-6 py-4 flex justify-between items-center"><div className="text-2xl font-bold text-gray-800 truncate pr-4"><span className="text-indigo-600">Results:</span> {fileName}</div><button onClick={onAnalyzeAnother} className="bg-indigo-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-indigo-700 transition shadow-sm flex-shrink-0">Analyze Another</button></div></header>
            <main className="container mx-auto px-6 py-12"><div className="grid lg:grid-cols-3 gap-8"><div className="lg:col-span-1"><h2 className="text-2xl font-bold text-gray-900 mb-6">Interactive Timeline</h2><div className="relative border-l-2 border-gray-200 pl-8">{mockTimelineData.map((item, index) => (<TimelineItem key={index} item={item} isLast={index === mockTimelineData.length - 1} />))}</div></div><div className="lg:col-span-2"><h2 className="text-2xl font-bold text-gray-900 mb-6">Document Analysis</h2><div className="bg-white p-6 rounded-xl shadow-md"><div className="flex flex-wrap gap-4 border-b border-gray-200 pb-4 mb-6"><ToggleButton label="Text Summary" isActive={showText} onClick={() => setShowText(!showText)} /><ToggleButton label="Visual Diagram" isActive={showVisual} onClick={() => setShowVisual(!showVisual)} /><ToggleButton label="Audio Explanation" isActive={showAudio} onClick={() => setShowAudio(!showAudio)} /></div><div className="space-y-8">{showText && <TextSummaryComponent />}{showVisual && <VisualDiagramComponent />}{showAudio && <AudioPlayerComponent />}</div></div></div></div></main>
        </div>
    );
};
const TimelineItem = ({ item, isLast }: any) => {
    const typeColorClasses = { milestone: 'bg-green-100 text-green-800', payment: 'bg-blue-100 text-blue-800', deadline: 'bg-red-100 text-red-800', notice: 'bg-yellow-100 text-yellow-800', };
    return (<div className={`pb-10 ${isLast ? '' : ''}`}><div className="absolute -left-4 mt-1.5 w-6 h-6 bg-indigo-600 rounded-full border-4 border-white"></div><p className="text-sm font-semibold text-indigo-600">{item.date}</p><h3 className="text-lg font-bold text-gray-900 mt-1">{item.title}</h3><p className="text-gray-600 mt-1">{item.description}</p><span className={`inline-block mt-2 px-2 py-0.5 text-xs font-medium rounded-full ${typeColorClasses[item.type as keyof typeof typeColorClasses] || 'bg-gray-100 text-gray-800'}`}>{item.type}</span></div>);
};
const ToggleButton = ({ label, isActive, onClick }: any) => (<button onClick={onClick} className={`px-4 py-2 text-sm font-semibold rounded-full transition ${isActive ? 'bg-indigo-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{label}</button>);
const TextSummaryComponent = () => (<div><h3 className="text-xl font-bold text-gray-900 mb-3">AI Text Summary</h3><p className="text-gray-700 leading-relaxed">{mockTextSummary}</p></div>);
const VisualDiagramComponent = () => (<div><h3 className="text-xl font-bold text-gray-900 mb-4">Clause Relationship Diagram</h3><div className="flex items-center justify-center gap-4 text-center"><div className="bg-gray-100 p-4 rounded-lg shadow-sm w-40"><p className="font-semibold">Party A</p><p className="text-xs text-gray-500">(Client)</p></div><div className="font-semibold text-gray-500 flex flex-col items-center"><span>Confidentiality</span><span className="text-2xl">&harr;</span><span className="text-xs">(Section 5)</span></div><div className="bg-gray-100 p-4 rounded-lg shadow-sm w-40"><p className="font-semibold">Party B</p><p className="text-xs text-gray-500">(Service Provider)</p></div></div></div>);
const AudioPlayerComponent = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    return (<div><h3 className="text-xl font-bold text-gray-900 mb-4">Audio Explanation</h3><div className="bg-gray-100 p-4 rounded-lg flex items-center gap-4"><button onClick={() => setIsPlaying(!isPlaying)} className="text-indigo-600 hover:text-indigo-800 transition">{isPlaying ? <PauseIcon /> : <PlayIcon />}</button><div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: isPlaying ? '45%' : '0%', transition: isPlaying ? 'width 10s linear' : 'none' }}></div></div><span className="text-sm text-gray-600 font-mono">0:45</span></div></div>);
};

export default App;
// import React, { useState, useRef, useEffect } from 'react';

// // --- Reusable SVG Icons for a Professional UI ---
// const FeatureIcon1 = () => (
//   <svg className="w-12 h-12 text-indigo-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
// );
// const FeatureIcon2 = () => (
//   <svg className="w-12 h-12 text-indigo-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
// );
// const FeatureIcon3 = () => (
//   <svg className="w-12 h-12 text-indigo-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
// );
// const UploadCloudIcon = () => (
//     <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M12 15v-6m0 0l-3 3m3-3l3 3"></path></svg>
// );
// const MicrophoneIcon = () => (
//     <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
// );
// const PlayIcon = () => (
//     <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
// );
// const PauseIcon = () => (
//     <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
// );

// interface TimelineItem {
//   date: string;
//   title: string;
//   description: string;
//   type: 'milestone' | 'payment' | 'deadline' | 'notice';
// }

// interface AnalysisResults {
//   text_summary: string;
//   timeline: TimelineItem[];
// }

// // --- Main Application Component ---
// function App() {
//   const [view, setView] = useState<"landing" | "results">('landing');
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [isProcessing, setIsProcessing] = useState<boolean>(false);
//   const [fileName, setFileName] = useState<string>('');
//   const [processedItemName, setProcessedItemName] = useState<string>('');
//   const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
//   const [error, setError] = useState<string>('');

//   // New state for voice recording
//   const [isRecording, setIsRecording] = useState<boolean>(false);
//   const [recordingTime, setRecordingTime] = useState<number>(0);
//   const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
//   const timerRef = useRef<number | null>(null);
  
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);

//   // --- Voice Recording Logic ---
//   useEffect(() => {
//     if (isRecording) {
//       timerRef.current = window.setInterval(() => {
//         setRecordingTime(prevTime => prevTime + 1);
//       }, 1000);
//     } else {
//       if (timerRef.current) window.clearInterval(timerRef.current);
//     }
//     return () => {
//       if (timerRef.current) window.clearInterval(timerRef.current);
//     };
//   }, [isRecording]);

//   const handleToggleRecording = async () => {
//     if (isRecording) {
//       if (mediaRecorderRef.current) {
//         mediaRecorderRef.current.stop();
//       }
//       setIsRecording(false);
//     } else {
//       setRecordingTime(0);
//       setAudioBlob(null);
//       setError('');
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//         mediaRecorderRef.current = new MediaRecorder(stream);
//         let audioChunks: Blob[] = [];
//         mediaRecorderRef.current.ondataavailable = event => {
//           audioChunks.push(event.data);
//         };
//         mediaRecorderRef.current.onstop = () => {
//           const blob = new Blob(audioChunks, { type: 'audio/wav' });
//           setAudioBlob(blob);
//           audioChunks = [];
//         };
//         mediaRecorderRef.current.start();
//         setIsRecording(true);
//       } catch (err) {
//         console.error('Error accessing microphone:', err);
//         setError('Could not access microphone. Please ensure permissions are granted.');
//       }
//     }
//   };

//   const handleProcessVoice = async () => {
//     if (!audioBlob) {
//         setError('No voice message recorded.');
//         return;
//     }
//     setIsProcessing(true);
//     setProcessedItemName(`Voice Message (${formatTime(recordingTime)})`);
//     setError('');

//     const formData = new FormData();
//     formData.append('file', audioBlob, 'voice_message.wav');

//     try {
//         const response = await fetch('http://127.0.0.1:8000/analyze-voice', {
//             method: 'POST',
//             body: formData,
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.detail || `Server error: ${response.statusText}`);
//         }

//         const data: AnalysisResults = await response.json();
//         setAnalysisResults(data);
//         setView('results');
//     } catch (err: any) {
//         console.error('Failed to analyze voice:', err);
//         setError(`Failed to analyze voice: ${err.message}. Ensure the backend server is running.`);
//     } finally {
//         setIsProcessing(false);
//     }
//   };
  
//   const formatTime = (seconds: number): string => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   // --- File Upload Logic ---
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//       setFileName(file.name);
//       setError('');
//     }
//   };

//   const handleProcessDocument = async () => {
//     if (!selectedFile) {
//         setError('Please select a file to process.');
//         return;
//     }
//     setIsProcessing(true);
//     setProcessedItemName(selectedFile.name);
//     setError('');

//     const formData = new FormData();
//     formData.append('file', selectedFile);

//     try {
//         const response = await fetch('http://127.0.0.1:8000/analyze-document', {
//             method: 'POST',
//             body: formData,
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.detail || `Server error: ${response.statusText}`);
//         }

//         const data: AnalysisResults = await response.json();
//         setAnalysisResults(data);
//         setView('results');
//     } catch (err: any) {
//         console.error('Failed to analyze document:', err);
//         setError(`Failed to analyze document: ${err.message}. Ensure the backend server is running.`);
//     } finally {
//         setIsProcessing(false);
//     }
//   };
  
//   const handleAnalyzeAnother = () => {
//       setView('landing');
//       setSelectedFile(null);
//       setFileName('');
//       setIsRecording(false);
//       setRecordingTime(0);
//       setAudioBlob(null);
//       setAnalysisResults(null);
//       setError('');
//   }

//   // --- Conditional Rendering ---
//   if (view === 'results' && analysisResults) {
//     return <ResultsDashboard 
//                 fileName={processedItemName} 
//                 onAnalyzeAnother={handleAnalyzeAnother}
//                 analysisResults={analysisResults} 
//             />;
//   }
  
//   const isDocumentProcessing = isProcessing && !!selectedFile;
//   const isVoiceProcessing = isProcessing && !!audioBlob;

//   return (
//     <div className="bg-white text-gray-800 font-sans">
//       <Header />
//       <main>
//         <HeroSection />
//         <FeaturesSection />
//         <HowItWorksSection />
//         <ActionSection 
//             fileInputRef={fileInputRef} 
//             handleFileChange={handleFileChange}
//             handleProcessDocument={handleProcessDocument}
//             fileName={fileName}
//             isProcessing={isDocumentProcessing}
//             selectedFile={selectedFile}
//             isRecording={isRecording}
//             recordingTime={recordingTime}
//             audioBlob={audioBlob}
//             handleToggleRecording={handleToggleRecording}
//             handleProcessVoice={handleProcessVoice}
//             formatTime={formatTime}
//             error={error}
//             isVoiceProcessing={isVoiceProcessing}
//         />
//       </main>
//       <Footer />
//     </div>
//   );
// }

// // --- UI Components ---

// const Header = () => (
//     <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
//         <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
//           <div className="text-2xl font-bold text-gray-800"><span className="text-indigo-600">Legal</span>Demystifier</div>
//           <div className="hidden md:flex space-x-6 items-center">
//             <a href="#features" className="text-gray-600 hover:text-indigo-600 transition">Features</a>
//             <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 transition">How It Works</a>
//             <a href="#upload" className="bg-indigo-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-indigo-700 transition shadow-sm">Get Started</a>
//           </div>
//         </nav>
//     </header>
// );

// const HeroSection = () => (
//     <section className="bg-gray-50">
//         <div className="container mx-auto px-6 py-24 md:py-32 text-center">
//             <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">Understand Your Legal Documents, Instantly.</h1>
//             <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">Our AI analyzes complex contracts and spoken agreements, transforming them into simple, interactive, and actionable timelines.</p>
//             <a href="#upload" className="mt-8 inline-block bg-indigo-600 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-1">Analyze Now</a>
//         </div>
//     </section>
// );

// const FeaturesSection = () => (
//     <section id="features" className="py-20">
//         <div className="container mx-auto px-6">
//             <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-gray-900">Powerful Features, Simple Interface</h2><p className="mt-3 text-gray-600 max-w-2xl mx-auto">Everything you need to gain clarity and confidence in your legal agreements.</p></div>
//             <div className="grid md:grid-cols-3 gap-10">
//                 <div className="text-center p-8 bg-gray-50 rounded-xl shadow-sm"><FeatureIcon1 /><h3 className="text-xl font-semibold mb-2 text-gray-900">Clause Extraction & Summaries</h3><p className="text-gray-600">Our AI automatically identifies key clauses and translates dense legal jargon into plain, simple English.</p></div>
//                 <div className="text-center p-8 bg-gray-50 rounded-xl shadow-sm"><FeatureIcon2 /><h3 className="text-xl font-semibold mb-2 text-gray-900">AI-Powered Risk Highlighting</h3><p className="text-gray-600">Instantly flag potential risks, obligations, and penalties, so you know exactly where to focus your attention.</p></div>
//                 <div className="text-center p-8 bg-gray-50 rounded-xl shadow-sm"><FeatureIcon3 /><h3 className="text-xl font-semibold mb-2 text-gray-900">Interactive Event Timeline</h3><p className="text-gray-600">Never miss a deadline again. All critical dates are extracted and plotted on a visual timeline for easy tracking.</p></div>
//             </div>
//         </div>
//     </section>
// );

// const HowItWorksSection = () => (
//     <section id="how-it-works" className="py-20 bg-gray-50">
//         <div className="container mx-auto px-6 text-center">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">A Simple, Three-Step Process</h2>
//             <div className="relative">
//                 <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200" style={{transform: 'translateY(-50%)', zIndex: 1}}></div>
//                 <div className="relative grid md:grid-cols-3 gap-12 text-center z-10">
//                     <div className="flex flex-col items-center"><div className="bg-white border-2 border-indigo-500 rounded-full h-20 w-20 flex items-center justify-center text-3xl font-bold text-indigo-600 mb-4 shadow-md">1</div><h3 className="text-xl font-semibold mb-2">Upload or Record</h3><p className="text-gray-600">Securely upload a document or record a voice message about the agreement.</p></div>
//                     <div className="flex flex-col items-center"><div className="bg-white border-2 border-indigo-500 rounded-full h-20 w-20 flex items-center justify-center text-3xl font-bold text-indigo-600 mb-4 shadow-md">2</div><h3 className="text-xl font-semibold mb-2">AI Analysis</h3><p className="text-gray-600">Our platform scans, parses, and analyzes the content in seconds.</p></div>
//                     <div className="flex flex-col items-center"><div className="bg-white border-2 border-indigo-500 rounded-full h-20 w-20 flex items-center justify-center text-3xl font-bold text-indigo-600 mb-4 shadow-md">3</div><h3 className="text-xl font-semibold mb-2">Explore Results</h3><p className="text-gray-600">Receive an interactive report with summaries, risks, and a visual timeline.</p></div>
//                 </div>
//             </div>
//         </div>
//     </section>
// );

// const ActionSection = ({ fileInputRef, handleFileChange, handleProcessDocument, fileName, isProcessing, selectedFile, isRecording, recordingTime, audioBlob, handleToggleRecording, handleProcessVoice, formatTime, error, isVoiceProcessing }: { fileInputRef: React.RefObject<HTMLInputElement>, handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void, handleProcessDocument: () => void, fileName: string, isProcessing: boolean, selectedFile: File | null, isRecording: boolean, recordingTime: number, audioBlob: Blob | null, handleToggleRecording: () => void, handleProcessVoice: () => void, formatTime: (seconds: number) => string, error: string, isVoiceProcessing: boolean }) => (
//     <section id="upload" className="py-20 bg-white">
//       <div className="container mx-auto px-6">
//         <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Get Started Now</h2>
//             <p className="mt-3 text-gray-600">Choose your preferred method to analyze an agreement.</p>
//             {error && <p className="mt-4 text-red-500 font-semibold">{error}</p>}
//         </div>
//         <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//             {/* Analyze Document Card */}
//             <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 flex flex-col">
//               <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Analyze a Document</h3>
//               <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center mt-4 transition hover:border-indigo-500 flex-grow flex flex-col justify-center">
//                 <UploadCloudIcon />
//                 <p className="mb-2 text-gray-600 text-sm">Drag & drop or</p>
//                 <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx" />
//                 <button onClick={() => fileInputRef.current?.click()} className="font-semibold text-indigo-600 hover:text-indigo-800 transition">Browse Files</button>
//                 {fileName && <p className="text-sm text-gray-500 mt-2 truncate" title={fileName}>{fileName}</p>}
//               </div>
//               <div className="mt-6">
//                 <button onClick={handleProcessDocument} disabled={isProcessing || !selectedFile} className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center justify-center">
//                   {isProcessing ? 'Analyzing...' : 'Process Document'}
//                 </button>
//               </div>
//             </div>
//             {/* Record Voice Message Card */}
//             <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 flex flex-col">
//                 <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Record a Voice Message</h3>
//                 <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center mt-4 transition flex-grow flex flex-col justify-center items-center">
//                     <MicrophoneIcon />
//                     <p className="text-sm text-gray-500 my-2">{isRecording ? "Recording in progress..." : "Record a summary of your agreement"}</p>
//                     {isRecording && <p className="text-2xl font-mono font-semibold text-gray-800 my-2">{formatTime(recordingTime)}</p>}
//                     <button onClick={handleToggleRecording} className={`w-48 font-semibold py-2 px-4 rounded-full transition text-white shadow-md ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}>
//                         {isRecording ? 'Stop Recording' : 'Start Recording'}
//                     </button>
//                 </div>
//                 <div className="mt-6">
//                     <button onClick={handleProcessVoice} disabled={isVoiceProcessing || !audioBlob} className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center justify-center">
//                         {isVoiceProcessing ? 'Analyzing...' : 'Process Voice Message'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//       </div>
//     </section>
// );

// const Footer = () => (
//     <footer className="bg-gray-800 text-gray-400">
//         <div className="container mx-auto px-6 py-10 text-center">
//             <p>&copy; 2025 LegalDemystifier. All Rights Reserved.</p>
//             <p className="text-sm mt-2">This is a project showcase and not a provider of legal advice.</p>
//         </div>
//     </footer>
// );

// const ResultsDashboard = ({ fileName, onAnalyzeAnother, analysisResults }: { fileName: string, onAnalyzeAnother: () => void, analysisResults: AnalysisResults }) => {
//     const [showText, setShowText] = useState(true);
//     const [showVisual, setShowVisual] = useState(true);
//     const [showAudio, setShowAudio] = useState(true);

//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <header className="bg-white shadow-sm"><div className="container mx-auto px-6 py-4 flex justify-between items-center"><div className="text-2xl font-bold text-gray-800 truncate pr-4"><span className="text-indigo-600">Results:</span> {fileName}</div><button onClick={onAnalyzeAnother} className="bg-indigo-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-indigo-700 transition shadow-sm flex-shrink-0">Analyze Another</button></div></header>
//             <main className="container mx-auto px-6 py-12"><div className="grid lg:grid-cols-3 gap-8"><div className="lg:col-span-1"><h2 className="text-2xl font-bold text-gray-900 mb-6">Interactive Timeline</h2><div className="relative border-l-2 border-gray-200 pl-8">{analysisResults.timeline.map((item, index) => (<TimelineItem key={index} item={item} isLast={index === analysisResults.timeline.length - 1} />))}</div></div><div className="lg:col-span-2"><h2 className="text-2xl font-bold text-gray-900 mb-6">Document Analysis</h2><div className="bg-white p-6 rounded-xl shadow-md"><div className="flex flex-wrap gap-4 border-b border-gray-200 pb-4 mb-6"><ToggleButton label="Text Summary" isActive={showText} onClick={() => setShowText(!showText)} /><ToggleButton label="Visual Diagram" isActive={showVisual} onClick={() => setShowVisual(!showVisual)} /><ToggleButton label="Audio Explanation" isActive={showAudio} onClick={() => setShowAudio(!showAudio)} /></div><div className="space-y-8">{showText && <TextSummaryComponent textSummary={analysisResults.text_summary} />}{showVisual && <VisualDiagramComponent />}{showAudio && <AudioPlayerComponent />}</div></div></div></div></main>
//         </div>
//     );
// };
// const TimelineItem = ({ item, isLast }: { item: TimelineItem, isLast: boolean }) => {
//     const typeColorClasses = { milestone: 'bg-green-100 text-green-800', payment: 'bg-blue-100 text-blue-800', deadline: 'bg-red-100 text-red-800', notice: 'bg-yellow-100 text-yellow-800', };
//     return (<div className={`pb-10 ${isLast ? '' : ''}`}><div className="absolute -left-4 mt-1.5 w-6 h-6 bg-indigo-600 rounded-full border-4 border-white"></div><p className="text-sm font-semibold text-indigo-600">{item.date}</p><h3 className="text-lg font-bold text-gray-900 mt-1">{item.title}</h3><p className="text-gray-600 mt-1">{item.description}</p><span className={`inline-block mt-2 px-2 py-0.5 text-xs font-medium rounded-full ${typeColorClasses[item.type] || 'bg-gray-100 text-gray-800'}`}>{item.type}</span></div>);
// };
// const ToggleButton = ({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) => (<button onClick={onClick} className={`px-4 py-2 text-sm font-semibold rounded-full transition ${isActive ? 'bg-indigo-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{label}</button>);
// const TextSummaryComponent = ({ textSummary }: { textSummary: string }) => (<div><h3 className="text-xl font-bold text-gray-900 mb-3">AI Text Summary</h3><p className="text-gray-700 leading-relaxed">{textSummary}</p></div>);
// const VisualDiagramComponent = () => (<div><h3 className="text-xl font-bold text-gray-900 mb-4">Clause Relationship Diagram</h3><div className="flex items-center justify-center gap-4 text-center"><div className="bg-gray-100 p-4 rounded-lg shadow-sm w-40"><p className="font-semibold">Party A</p><p className="text-xs text-gray-500">(Client)</p></div><div className="font-semibold text-gray-500 flex flex-col items-center"><span>Confidentiality</span><span className="text-2xl">&harr;</span><span className="text-xs">(Section 5)</span></div><div className="bg-gray-100 p-4 rounded-lg shadow-sm w-40"><p className="font-semibold">Party B</p><p className="text-xs text-gray-500">(Service Provider)</p></div></div></div>);
// const AudioPlayerComponent = () => {
//     const [isPlaying, setIsPlaying] = useState(false);
//     return (<div><h3 className="text-xl font-bold text-gray-900 mb-4">Audio Explanation</h3><div className="bg-gray-100 p-4 rounded-lg flex items-center gap-4"><button onClick={() => setIsPlaying(!isPlaying)} className="text-indigo-600 hover:text-indigo-800 transition">{isPlaying ? <PauseIcon /> : <PlayIcon />}</button><div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: isPlaying ? '45%' : '0%', transition: isPlaying ? 'width 10s linear' : 'none' }}></div></div><span className="text-sm text-gray-600 font-mono">0:45</span></div></div>);
// };

// export default App;
