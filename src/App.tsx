
// function App() {

//   return (
//     <main>
//       <h1>
//         your todo
//       </h1>
//     </main>
//   )
// }

// export default App
// import { useState, useRef } from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from './firebase'; // Import your Firebase auth instance


// const HeroIcons = {
//   Play: () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
//       <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672L12 12.062M12 12.062L8.09 11.672M12 12.062V6m0 6.062v8M12 12.062L16.29 16.29" />
//     </svg>
//   ),
//   Balance: () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M12 6c3.243 0 5.86 2.016 5.86 5.342 0 1.09-.323 2.112-.876 2.946l-4.71 4.71a1.99 1.99 0 0 1-2.828 0l-4.71-4.71a1.99 1.99 0 0 1-.876-2.946C6.14 8.016 8.757 6 12 6Zm0 0V2M6.09 12h11.82" />
//     </svg>
//   ),
//   Chart: () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m0 0l-4-4m4 4l4-4m-9 5h10a2 2 0 0 0 2-2v-10a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
//     </svg>
//   ),
//   Person: () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 13a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm0 0c-2.3 0-4.5.9-6.1 2.5-1.6 1.6-2.5 3.8-2.5 6.1s.9 4.5 2.5 6.1c1.6 1.6 3.8 2.5 6.1 2.5s4.5-.9 6.1-2.5c1.6-1.6 2.5-3.8 2.5-6.1s-.9-4.5-2.5-6.1c-1.6-1.6-3.8-2.5-6.1-2.5Z" />
//     </svg>
//   ),
// };

// function App() {
//   const [file, setFile] = useState<File | null>(null);
//   const [isRecording, setIsRecording] = useState<boolean>(false);
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const audioChunksRef = useRef<Blob[]>([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginError, setLoginError] = useState('');

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       setIsLoggedIn(true);
//       setLoginError('');
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//     setLoginError(error.message); // If it's a standard error object
//     console.error(error.message);
//   } else {
//     setLoginError('An unknown error occurred.'); // For other types of errors
//     console.error(error);
//   }
//     }
//   };

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorderRef.current = new MediaRecorder(stream);
//       audioChunksRef.current = [];
      
//       mediaRecorderRef.current.ondataavailable = (event) => {
//         audioChunksRef.current.push(event.data);
//       };
      
//       mediaRecorderRef.current.onstop = () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
//         console.log('Audio recorded:', audioBlob);
//       };

//       mediaRecorderRef.current.start();
//       setIsRecording(true);
//     } catch (err) {
//       console.error('Error accessing microphone:', err);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   return (
//     <div className="bg-white text-gray-800 font-sans">
//       {/* Hero Section */}
//       <div
//         className="relative bg-cover bg-center h-[500px] text-white flex flex-col items-center justify-center p-8"
//         style={{ backgroundImage: 'url("/hero-bg.jpg")' }}
//       >
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//         <div className="z-10 text-center">
//           <h1 className="text-5xl font-extrabold tracking-tight mb-4">
//             Multi-Modal Legal Document Demystifier
//           </h1>
//           <p className="text-xl font-light mb-8">
//             “Turning complex contracts into safe, interactive, and accessible timelines”
//           </p>
//           <div className="flex items-center justify-center space-x-4">
//             <span className="text-lg font-semibold">Hackathon Team Name</span>
//           </div>
//         </div>
//       </div>

//       {/* Login & Main Content */}
//       <div className="container mx-auto px-4 py-16 text-center">
//         {!isLoggedIn ? (
//           <div className="bg-gray-100 p-8 rounded-xl shadow-lg inline-block w-full max-w-md">
//             <h3 className="text-2xl font-bold mb-4">Login to get started</h3>
//             <form onSubmit={handleLogin} className="space-y-4">
//               <input
//                 type="email"
//                 placeholder="Email (e.g., testuser@example.com)"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
//               >
//                 Login
//               </button>
//             </form>
//           </div>
//         ) : (
//           <div>
//             <h2 className="text-4xl font-bold mb-4">Our Solution</h2>
//             <p className="text-lg max-w-2xl mx-auto mb-8">
//               Upload a contract or record a voice message to get started. Our AI will extract key information and present it in an accessible way.
//             </p>
//             <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8">
//               {/* Document Upload */}
//               <div className="bg-gray-100 p-8 rounded-xl shadow-lg flex-1">
//                 <h3 className="text-2xl font-bold mb-4">Upload a Contract</h3>
//                 <input
//                   type="file"
//                   onChange={handleFileChange}
//                   className="block w-full text-sm text-gray-500
//                     file:mr-4 file:py-2 file:px-4
//                     file:rounded-full file:border-0
//                     file:text-sm file:font-semibold
//                     file:bg-blue-50 file:text-blue-700
//                     hover:file:bg-blue-100"
//                 />
//                 {file && <p className="mt-4 text-green-600">File ready: {file.name}</p>}
//                 <button
//                   className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
//                 >
//                   Process Document
//                 </button>
//               </div>
              
//               {/* Voice Message Recording */}
//               <div className="bg-gray-100 p-8 rounded-xl shadow-lg flex-1">
//                 <h3 className="text-2xl font-bold mb-4">Record a Voice Message</h3>
//                 <div className="flex justify-center space-x-4">
//                   <button
//                     onClick={isRecording ? stopRecording : startRecording}
//                     className={`flex items-center justify-center font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ${isRecording ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
//                   >
//                     {isRecording ? 'Stop Recording' : 'Start Recording'}
//                   </button>
//                 </div>
//                 {isRecording && <p className="mt-4 text-red-600">Recording...</p>}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Icons Section */}
//       <div className="bg-red-700 text-white py-12">
//         <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center px-4">
//           <div className="flex flex-col items-center">
//             <HeroIcons.Play />
//             <p className="mt-4 font-semibold">View interactive timeline</p>
//           </div>
//           <div className="flex flex-col items-center">
//             <HeroIcons.Balance />
//             <p className="mt-4 font-semibold">Toggle Text</p>
//           </div>
//           <div className="flex flex-col items-center">
//             <HeroIcons.Chart />
//             <p className="mt-4 font-semibold">Toggle Visuals</p>
//           </div>
//           <div className="flex flex-col items-center">
//             <HeroIcons.Person />
//             <p className="mt-4 font-semibold">Toggle Audio</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
import { useState, useRef } from 'react';

const HeroIcons = {
  Play: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672L12 12.062M12 12.062L8.09 11.672M12 12.062V6m0 6.062v8M12 12.062L16.29 16.29" />
    </svg>
  ),
  Balance: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6c3.243 0 5.86 2.016 5.86 5.342 0 1.09-.323 2.112-.876 2.946l-4.71 4.71a1.99 1.99 0 0 1-2.828 0l-4.71-4.71a1.99 1.99 0 0 1-.876-2.946C6.14 8.016 8.757 6 12 6Zm0 0V2M6.09 12h11.82" />
    </svg>
  ),
  Chart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m0 0l-4-4m4 4l4-4m-9 5h10a2 2 0 0 0 2-2v-10a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
    </svg>
  ),
  Person: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 13a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm0 0c-2.3 0-4.5.9-6.1 2.5-1.6 1.6-2.5 3.8-2.5 6.1s.9 4.5 2.5 6.1c1.6 1.6 3.8 2.5 6.1 2.5s4.5-.9 6.1-2.5c1.6-1.6 2.5-3.8 2.5-6.1s-.9-4.5-2.5-6.1c-1.6-1.6-3.8-2.5-6.1-2.5Z" />
    </svg>
  ),
};

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        console.log('Audio recorded:', audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[500px] text-white flex flex-col items-center justify-center p-8"
        style={{ backgroundImage: 'url("/hero-bg.jpg")' }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="z-10 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            Multi-Modal Legal Document Demystifier
          </h1>
          <p className="text-xl font-light mb-8">
            “Turning complex contracts into safe, interactive, and accessible timelines”
          </p>
          <div className="flex items-center justify-center space-x-4">
            <span className="text-lg font-semibold">Hackathon Team Name</span>
          </div>
        </div>
      </div>

      {/* Intro & Upload/Record Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold mb-4">Our Solution</h2>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Upload a contract or record a voice message to get started. Our AI will extract key information and present it in an accessible way.
        </p>
        <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8">
          {/* Document Upload */}
          <div className="bg-gray-100 p-8 rounded-xl shadow-lg flex-1">
            <h3 className="text-2xl font-bold mb-4">Upload a Contract</h3>
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {file && <p className="mt-4 text-green-600">File ready: {file.name}</p>}
            <button
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
            >
              Process Document
            </button>
          </div>
          
          {/* Voice Message Recording */}
          <div className="bg-gray-100 p-8 rounded-xl shadow-lg flex-1">
            <h3 className="text-2xl font-bold mb-4">Record a Voice Message</h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`flex items-center justify-center font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ${isRecording ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
              >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
            </div>
            {isRecording && <p className="mt-4 text-red-600">Recording...</p>}
          </div>
        </div>
      </div>

      {/* Icons Section */}
      <div className="bg-red-700 text-white py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center px-4">
          <div className="flex flex-col items-center">
            <HeroIcons.Play />
            <p className="mt-4 font-semibold">View interactive timeline</p>
          </div>
          <div className="flex flex-col items-center">
            <HeroIcons.Balance />
            <p className="mt-4 font-semibold">Toggle Text</p>
          </div>
          <div className="flex flex-col items-center">
            <HeroIcons.Chart />
            <p className="mt-4 font-semibold">Toggle Visuals</p>
          </div>
          <div className="flex flex-col items-center">
            <HeroIcons.Person />
            <p className="mt-4 font-semibold">Toggle Audio</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;