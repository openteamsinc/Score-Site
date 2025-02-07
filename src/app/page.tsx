import React from "react";
import SearchAutocomplete from "@/components/Search/SearchAutocomplete";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Book, Github } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="my-8 text-center text-3xl font-bold">
        Welcome to OpenTeams • Open Source Scoring
      </h1>
      <div className="mx-auto flex max-w-2xl">
        <SearchAutocomplete />
      </div>
      <div className="mt-12 text-center">
        <p className="mb-4 text-xl">
          Discover and evaluate open source projects with ease.
        </p>
        <p className="text-gray-600">
          Will integrating project <span className="font-extrabold">X</span> as
          a dependency enhance the stability and maintainability of our
          applications while minimizing potential risks and challenges?
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="flex flex-col items-center p-6 transition-all hover:shadow-lg">
          <Book className="mb-4 size-12 text-blue-500" />
          <CardContent className="text-center">
            <h2 className="mb-2 text-xl font-semibold">API Documentation</h2>
            <p className="mb-4 text-gray-600">
              Explore our comprehensive API to integrate OpenTeams scoring into
              your workflow.
            </p>
            <Link
              href="/docs"
              className="inline-flex items-center text-blue-500 hover:underline"
            >
              View API Documentation
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center p-6 transition-all hover:shadow-lg">
          <Github className="mb-4 size-12 text-green-500" />
          <CardContent className="text-center">
            <h2 className="mb-2 text-xl font-semibold">GitHub Action</h2>
            <p className="mb-4 text-gray-600">
              Automatically analyze your dependencies&rsquo; health in pull
              requests.
            </p>
            <a
              href="https://github.com/openteamsinc/actions/"
              className="inline-flex items-center text-green-500 hover:underline"
            >
              Use the GitHub Action
              <ArrowRight className="ml-2 size-4" />
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
