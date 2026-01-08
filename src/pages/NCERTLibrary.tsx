import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, BookOpen, Download, Star, Filter, Grid, List, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Book {
  id: string;
  title: string;
  subject: string;
  class: string;
  chapters: number;
  pages: number;
  rating: number;
  downloaded: boolean;
  color: string;
}

const NCERTLibrary = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("6");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const classes = ["6", "7", "8", "9", "10", "11", "12"];

  const books: Book[] = [
    {
      id: "1",
      title: "Mathematics",
      subject: "Mathematics",
      class: "6",
      chapters: 14,
      pages: 320,
      rating: 4.8,
      downloaded: true,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "2",
      title: "Science",
      subject: "Science",
      class: "6",
      chapters: 16,
      pages: 280,
      rating: 4.9,
      downloaded: false,
      color: "from-green-500 to-green-600",
    },
    {
      id: "3",
      title: "Social Science",
      subject: "Social Studies",
      class: "6",
      chapters: 12,
      pages: 260,
      rating: 4.7,
      downloaded: true,
      color: "from-amber-500 to-amber-600",
    },
    {
      id: "4",
      title: "English - Honeysuckle",
      subject: "English",
      class: "6",
      chapters: 10,
      pages: 180,
      rating: 4.6,
      downloaded: false,
      color: "from-rose-500 to-rose-600",
    },
    {
      id: "5",
      title: "Hindi - Vasant",
      subject: "Hindi",
      class: "6",
      chapters: 15,
      pages: 200,
      rating: 4.5,
      downloaded: false,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "6",
      title: "Sanskrit - Ruchira",
      subject: "Sanskrit",
      class: "6",
      chapters: 15,
      pages: 160,
      rating: 4.4,
      downloaded: false,
      color: "from-teal-500 to-teal-600",
    },
  ];

  const filteredBooks = books.filter(
    (book) =>
      book.class === selectedClass &&
      (searchQuery === "" ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.subject.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex-1">
              <h1 className="font-semibold text-foreground">NCERT Library</h1>
              <p className="text-sm text-muted-foreground">Access complete NCERT books</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                )}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                )}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search books by name or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        {/* Class Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {classes.map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={cn(
                "px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-200",
                selectedClass === cls
                  ? "gradient-primary text-primary-foreground shadow-glow"
                  : "bg-card border border-border text-foreground hover:bg-secondary"
              )}
            >
              Class {cls}
            </button>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="gradient-primary rounded-2xl p-6 shadow-glow">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-primary-foreground mb-1">
                Class {selectedClass} Books
              </h2>
              <p className="text-primary-foreground/80 text-sm">
                {filteredBooks.length} books available · {filteredBooks.filter(b => b.downloaded).length} downloaded
              </p>
            </div>
            <div className="w-16 h-16 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Books Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                {/* Book Cover */}
                <div className={`h-32 bg-gradient-to-br ${book.color} flex items-center justify-center relative`}>
                  <div className="text-center text-white">
                    <BookOpen className="w-10 h-10 mx-auto mb-2" />
                    <span className="text-xs font-medium opacity-80">NCERT</span>
                  </div>
                  {book.downloaded && (
                    <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                      <Download className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Book Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {book.chapters} chapters · {book.pages} pages
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm text-foreground">
                      <Star className="w-4 h-4 text-warning fill-warning" />
                      {book.rating}
                    </span>
                    <Button variant="gradient" size="sm">
                      {book.downloaded ? "Read" : "Download"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:shadow-card transition-all duration-200 cursor-pointer"
              >
                <div className={`w-16 h-20 bg-gradient-to-br ${book.color} rounded-lg flex items-center justify-center`}>
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{book.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {book.chapters} chapters · {book.pages} pages
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-foreground">
                      <Star className="w-4 h-4 text-warning fill-warning" />
                      {book.rating}
                    </span>
                    {book.downloaded && (
                      <span className="flex items-center gap-1 text-success">
                        <Download className="w-4 h-4" />
                        Downloaded
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No books found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Download All Banner */}
        <div className="bg-card border border-border rounded-2xl p-6 text-center shadow-card">
          <Download className="w-12 h-12 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-foreground mb-2">
            Download for Offline Access
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Download all Class {selectedClass} books and study anytime, anywhere without internet.
          </p>
          <Button variant="gradient" size="lg">
            <Download className="w-5 h-5" />
            Download All Books
          </Button>
        </div>
      </main>
    </div>
  );
};

export default NCERTLibrary;
