"use client";

import { useState, useEffect, useCallback, useRef, SetStateAction } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search, X, Mic, Sparkles, Users, Star } from "lucide-react";

const mockSuggestions = [
  "Algebra Basics",
  "Quantum Physics",
  "Machine Learning",
  "Organic Chemistry",
  "World History",
];

interface SearchInputProps {
  onResultsChange?: (stats: { results: number }) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onResultsChange }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef(null);

  const currentQuery = searchParams.get("topic") || "";

  const [inputValue, setInputValue] = useState(currentQuery);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [charCount, setCharCount] = useState(0);
  const [stats, setStats] = useState({
    avgRating: 4.2,
    totalUsers: 5000,
    results: 42,
  });

  // Debounced URL update
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (inputValue.trim()) {
        params.set("topic", inputValue.trim());
      } else {
        params.delete("topic");
      }
      router.replace(
        `${pathname}${params.toString() ? `?${params.toString()}` : ""}`,
        { scroll: false }
      );
      // Mock stats update based on query
      if (onResultsChange) {
        onResultsChange({ results: Math.floor(Math.random() * 100) + 1 });
      }
      setStats((prev) => ({
        ...prev,
        results: Math.floor(Math.random() * 100) + 1,
      }));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [inputValue, pathname, router, searchParams, onResultsChange]);

  // Sync input with URL changes
  useEffect(() => {
    setInputValue(currentQuery);
  }, [currentQuery]);

  // Update suggestions and char count
  useEffect(() => {
    setCharCount(inputValue.length);
    const filtered = mockSuggestions
      .filter((sug) => sug.toLowerCase().includes(inputValue.toLowerCase()))
      .slice(0, 5);
    setSuggestions(filtered);
  }, [inputValue]);

  const handleClear = useCallback(() => {
    setInputValue("");
    setIsFocused(false);
    setSuggestions([]);
  }, []);

  const handleSuggestionClick = (sug: SetStateAction<string>) => {
    setInputValue(sug);
    setSuggestions([]);
  };

  // Enhanced animations: Border glow with spring, floating particles on focus
  const containerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeInOut" as const}, // valid easing function
    },
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      backgroundColor: "rgba(255, 255, 255, 0.98)",
      transition: { type: "spring" as const, stiffness: 400, damping: 25 },
    },
    rest: {
      scale: 1,
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      transition: { type: "spring", stiffness: 400, damping: 25 },
    },
  };

  const suggestionVariants = {
    initial: { opacity: 0, y: -10, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: "easeInOut" as const}, // valid easing function
    },
    exit: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.15 } },
  };

  const particleVariants = {
    initial: { opacity: 0, x: 0, y: 0 },
    animate: (i: number) => ({
      opacity: [0, 1, 0],
      x: [0, Math.sin(i) * 20, 0],
      y: [0, -Math.cos(i) * 15, 0],
      transition: { duration: 2, repeat: Infinity, delay: i * 0.1 },
    }),
  };

  return (
    <motion.div
      className="relative w-full max-w-lg mt-6 max-sm:mt-3"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Animated particles on focus */}
      <AnimatePresence>
        {isFocused && (
          <div className="absolute inset-0 pointer-events-none">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full top-1/2 left-1/2"
                style={{ top: `${20 + i * 10}%`, left: `${20 + i * 15}%` }}
                variants={particleVariants}
                initial="initial"
                animate={`animate-${i}`}
                exit={{ opacity: 0 }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
      {/* we need to find a solution to remove the boxShadow */}
      <motion.div
        className="relative flex items-center focus:ring-0 focus:shadow-none"
        variants={inputVariants}
        initial="rest"
        animate={isFocused ? "focus" : "rest"}
      >
        <motion.div
          className="absolute left-3 flex items-center gap-1"
          initial={{ opacity: 0, x: -10 }}
          animate={isFocused ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          <Search className="h-4 w-4 text-gray-500" />
          <Sparkles className="h-3 w-3 text-blue-400 animate-pulse" />
        </motion.div>

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay to allow suggestion click
          placeholder="Discover topics like 'Algebra' or 'Physics'..."
          className={cn(
            "w-full pl-12 pr-12 py-4 text-base rounded-2xl border-2 bg-white/90 backdrop-blur-md focus:outline-none transition-all duration-300 placeholder:text-gray-500",
            "shadow-lg hover:shadow-xl"
          )}
          autoComplete="off"
        />

        {/* Voice search button */}
        <motion.button
          type="button"
          className="absolute right-10 flex items-center justify-center h-5 w-5 text-gray-400 hover:text-blue-500 transition-colors"
          whileHover={{ rotate: 10, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => alert("Voice search activated!")} // Placeholder for voice
        >
          <Mic className="h-4 w-4" />
        </motion.button>

        {inputValue && (
          <motion.button
            type="button"
            onClick={handleClear}
            className="absolute right-3 flex items-center justify-center h-5 w-5 text-gray-400 hover:text-red-500 transition-colors"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="h-4 w-4" />
          </motion.button>
        )}
      </motion.div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            className="absolute top-full left-0 w-full mt-2 bg-white backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {suggestions.map((sug, i) => (
              <motion.button
                key={sug}
                onClick={() => handleSuggestionClick(sug)}
                className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-blue-50 transition-colors flex items-center gap-3"
                variants={suggestionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ delay: i * 0.05 }}
              >
                <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span>{sug}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Bar */}
      <motion.div
        className="flex justify-between items-center mt-3 px-3 py-2 bg-gray-50/50 rounded-xl text-xs text-gray-600"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <div className="flex items-center gap-2">
          <Users className="h-3 w-3" />
          <span>{stats.totalUsers.toLocaleString()} users</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="h-3 w-3 text-yellow-500" />
          <span>{stats.avgRating}/5</span>
        </div>
        <div className="flex items-center gap-2">
          <Search className="h-3 w-3" />
          <span>{stats.results} results</span>
        </div>
        <div className="text-right">
          <span>{charCount}/100 chars</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SearchInput;
