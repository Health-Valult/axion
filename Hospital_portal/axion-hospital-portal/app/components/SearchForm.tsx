"use client"

import { Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface SearchFormProps {
  searchQuery: string;
  isSearching: boolean;
  onSearchQueryChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchForm = ({ searchQuery, isSearching, onSearchQueryChange, onSubmit }: SearchFormProps) => {
  return (
    <Card className="glass-card fade-in delay-100 max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Patient Lookup</CardTitle>
        <CardDescription>Enter the National ID to find patient records</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter National ID"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              className="search-input"
            />
            <button type="submit" disabled={isSearching} className="btn-primary whitespace-nowrap">
              {isSearching ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white/60 border-t-white rounded-full" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  Search
                </>
              )}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchForm;
