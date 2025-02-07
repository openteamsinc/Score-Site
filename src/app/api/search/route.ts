import search_packages from "@/utils/search_packages";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const ecosystem = searchParams.get("ecosystem") || "";
  if (query == null || query.length == 0) {
    return Response.json({ pkgs: [] });
  }
  const pgks = await search_packages(query, ecosystem);
  return Response.json({ pgks });
}
