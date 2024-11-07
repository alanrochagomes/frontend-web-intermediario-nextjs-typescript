import { NextRequest, NextResponse } from "next/server";
import { SearchResult } from "@/model/SearchResult";
// import searchResultsMock from "@/api-response-mock/search-results.json";
// import { ScrapflyClient, ScrapeConfig } from "scrapfly-sdk";

// const key = process.env.SCRAPFLY_API_KEY ?? "";
// const client = new ScrapflyClient({ key });

export async function POST(
  request: NextRequest
): Promise<NextResponse<SearchResult[]>> {
  const data = await request.formData();
  const [firstEntry] = data.entries();
  // TODO: Improve this because "1" isn't the best way to get search input value
  const searchInput = firstEntry[1];

  const query: string = String(searchInput);

  try {
    const key = process.env.SCRAPFLY_API_KEY;
    const searchUrl = `https://www.google.com.br/search?q=${encodeURIComponent(
      query
    )}`;
    const url = `https://api.scrapfly.io/scrape?tags=player%2Cproject%3Asmart-assistant-library-frontend-web-intermediario-nextjs-typescript&format=json&extraction_model=search_engine_results&country=br&asp=true&key=${key}&url=${searchUrl}`;

    const response = await fetch(url);
    const result = await response.json();
    const searchResultsApi = result.result.extracted_data.data.results;

    const searchResults: SearchResult[] = searchResultsApi.map(
      // TODO: Remove `any` by adding type for SearchResultApi
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (searchResultApi: any) => ({
        displayUrl: searchResultApi.displayUrl,
        text: searchResultApi.snippet,
        title: searchResultApi.title,
        url: searchResultApi.url,
      })
    );

    // Uncomment to use mock value
    // const result = searchResultsMock;
    // const searchResults: SearchResult[] = [
    //   {
    //     displayUrl: "pt.wikipedia.org",
    //     text: "Programação é o processo de escrita, teste e manutenção de um programa de computador . O programa é escrito em uma linguagem de programação, ...",
    //     title: "Programação de computadores - Wikipédia",
    //     url: "https://pt.wikipedia.org/wiki/Programa%C3%A7%C3%A3o_de_computadores",
    //   },
    //   {
    //     displayUrl: "pt.wikipedia.org",
    //     text: "Programação é o processo de escrita, teste e manutenção de um programa de computador . O programa é escrito em uma linguagem de programação, ...",
    //     title: "Programação de computadores - Wikipédia",
    //     url: "https://pt.wikipedia.org/wiki/Programa%C3%A7%C3%A3o_de_computadores",
    //   },
    // ];

    return NextResponse.json(searchResults);

    // FIXME: Error in Scrapfly: https://github.com/scrapfly/typescript-scrapfly/issues/12
    // const apiResponse = await client.scrape(
    //   new ScrapeConfig({
    //     tags: [
    //       "player",
    //       "project:frontend-web-intermediario-nextjs-typescript",
    //     ],
    //     format: "json",
    //     extraction_model: "search_engine_results",
    //     asp: true,
    //     url: `https://www.google.com.br/search?q=${encodeURIComponent(query)}`,
    //   })
    // );
    // return apiResponse.data; // Process and return the necessary data
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    throw new Error("Falha na busca, tente novamente.");
  }
}
