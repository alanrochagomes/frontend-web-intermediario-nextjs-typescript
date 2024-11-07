import { SearchResult } from "@/model/SearchResult";
import { FormEvent, useState } from "react";

interface SearchFormProps {
  onSearchResultsReady: (searchResults: SearchResult[]) => void;
}

export default function SearchForm(props: SearchFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });

    if (response.status === 200) {
      const data: SearchResult[] = await response.json();
      props.onSearchResultsReady(data);
    } else {
      // TODO: Implement toastify to show a beautiful error message
      alert("Ocorreu um erro na busca. Tente novamente mais tarde.");
    }

    setIsLoading(false);
  }

  return (
    <form className="flex gap-2 text-black w-full" onSubmit={onSubmit}>
      <input
        type="text"
        name="search_input"
        placeholder="Search for learning resources, tutorials..."
        className="border-2 border-gray-300 px-2 py-1 w-full rounded-lg"
        disabled={isLoading}
      />

      <input
        type="submit"
        className="bg-indigo-500 text-white px-4 rounded-lg hover:bg-indigo-400 cursor-pointer"
        value={isLoading ? "Loading..." : "Search"}
        disabled={isLoading}
      />
    </form>
  );
}
