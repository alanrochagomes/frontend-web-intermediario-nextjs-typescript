import { NextRequest, NextResponse } from "next/server";
// import { ScrapflyClient, ScrapeConfig } from "scrapfly-sdk";

// const key = process.env.SCRAPFLY_API_KEY ?? "";
// const client = new ScrapflyClient({ key });

export async function POST(request: NextRequest) {
  const data = await request.formData();

  // TODO: Implement form submission
  console.log("server", data);

  const query: string = "programação";

  try {
    const key = process.env.SCRAPFLY_API_KEY;
    const searchUrl = `https://www.google.com.br/search?q=${encodeURIComponent(
      query
    )}`;
    const url = `https://api.scrapfly.io/scrape?tags=player%2Cproject%3Afrontend-web-intermediario-nextjs-typescript&format=json&extraction_model=search_engine_results&asp=true&key=${key}&url=${searchUrl}`;

    const response = await fetch(url);

    const result = await response.json();

    console.log("result", result);

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

  return NextResponse.json({ teste: 1 });
}
