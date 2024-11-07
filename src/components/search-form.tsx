import { SearchResult } from "@/model/SearchResult";
import { FormEvent } from "react";

interface SearchFormProps {
  onSearchResultsReady: (searchResults: SearchResult[]) => void;
}

export default function SearchForm(props: SearchFormProps) {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });

    const data: SearchResult[] = await response.json();
    props.onSearchResultsReady(data);
  }

  return (
    <form className="flex gap-2 text-black w-full" onSubmit={onSubmit}>
      <input
        type="text"
        name="search_input"
        placeholder="Search for learning resources, tutorials..."
        className="border-2 border-gray-300 px-2 py-1 w-full rounded-lg"
      />

      <input
        type="submit"
        className="bg-indigo-500 text-white px-4 rounded-lg hover:bg-indigo-400 cursor-pointer"
        value="Search"
      />
    </form>
  );
}
