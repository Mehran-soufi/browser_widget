import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

// تعریف نوع سفارشی برای recognition
type RecognitionType = {
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onstart: (() => void) | null;
  onend: (() => void) | null;
};

function Search() {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    const encodedQuery = encodeURIComponent(query);
    window.open(`https://www.google.com/search?q=${encodedQuery}`, "_blank");
  };

  const handleVoiceSearch = () => {
    const SpeechRecognitionConstructor =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionConstructor) {
      alert("مرورگر شما از تشخیص صدا پشتیبانی نمی‌کند.");
      return;
    }

    const recognition: RecognitionType = new SpeechRecognitionConstructor();
    recognition.lang = "fa-IR";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      const encodedTranscript = encodeURIComponent(transcript);
      window.open(
        `https://www.google.com/search?q=${encodedTranscript}`,
        "_blank"
      );
    };

    recognition.onerror = (event) => {
      console.error("Voice recognition error:", event.error);
      alert("خطا در تشخیص صدا: " + event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  const handleLensSearch = () => {
    window.open("https://lens.google.com/", "_blank");
  };

  return (
    <div className="sticky lg:relative right-0 w-full flex items-center justify-center bg-zinc-800/40 backdrop-blur-sm rounded-lg p-3">
      <div className="w-full h-full flex items-center justify-between bg-blue-300/30 rounded-full p-2 gap-4">
        {/* search input */}
        <div className="h-full flex-1 flex items-center justify-start gap-1">
          <img src="svg/google.svg" className="md:w-5 sm:w-4 w-3 md:h-5 sm:h-4 h-3" />
          <input
            type="text"
            placeholder="جستجو در گوگل"
            className="sm:flex-1 sm:w-auto w-36 p-1 outline-none border-none placeholder:text-slate-300 placeholder:opacity-80"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
        {/* search buttons */}
        <div className="flex items-center justify-between gap-3">
          <button className="cursor-pointer" onClick={handleVoiceSearch}>
            <img src="svg/Google_mic.svg" className="md:w-4 w-3 md:h-4 h-3" />
          </button>
          <button className="cursor-pointer" onClick={handleLensSearch}>
            <img src="svg/Google_Lens.svg" className="md:w-5 w-4 md:h-5 h-4" />
          </button>
          <button
            className="sm:inline hidden rounded-full md:px-5 px-3 py-2 bg-blue-500 cursor-pointer transition duration-200 hover:bg-blue-600"
            onClick={handleSearch}
          >
            <IoSearchOutline />
          </button>
        </div>
      </div>

      {/* وضعیت ضبط صدا */}
      {isListening && (
        <div className="text-sm text-blue-300 animate-pulse mt-2">
          🎤 در حال گوش دادن...
        </div>
      )}
    </div>
  );
}

export default Search;
