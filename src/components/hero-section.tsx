"use client";

import { SearchResult } from "@/model/SearchResult";
import { useState } from "react";
import SearchForm from "./search-form";

export default function HeroSection() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  return (
    <section className="flex flex-col items-center">
      <div className="flex max-w-xl flex-col items-center pb-16 pt-8 text-center lg:pb-48 lg:pt-32">
        <p className="mb-4 font-semibold text-indigo-500 md:mb-6 md:text-lg xl:text-xl">
          Transforming Learning with AI Assistance
        </p>

        <h1 className="mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-12 md:text-6xl">
          A New Era for Interactive Education
        </h1>

        <SearchForm onSearchResultsReady={setSearchResults} />

        {/* TODO: Exercício - realizar a extração do componente de Lista e de Card */}
        {/* Search Result List */}
        <div className="text-black my-8 w-full">
          <h2 className="text-lg font-bold">Search Results</h2>

          <div className="flex flex-col my-4 gap-4">
            {searchResults.length === 0 && <div>No results found.</div>}

            {/* Search Result Card */}
            {searchResults.map((searchResult, index) => (
              <a
                href={searchResult.url}
                key={`searchResult_${index}`}
                className="flex flex-col p-2 border rounded-lg shadow text-left hover:bg-gray-100"
              >
                <h3 className="font-bold">{searchResult.title}</h3>
                <p>{searchResult.text}</p>
                <small>{searchResult.displayUrl}</small>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* social - start */}
      <div className="flex items-center justify-center gap-4 lg:justify-start">
        <span className="text-sm font-semibolds tracking-widest text-gray-400 sm:text-base">
          Powered by{" "}
          <a
            href="https://plataforma.salvatore.academy/course/frontend-web-intermediario"
            className="underline"
          >
            salvatore.academy ➡️
          </a>
        </span>
      </div>
      {/* social - end */}
    </section>
  );
}
