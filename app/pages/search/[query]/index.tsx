"use client";

import CircleLoader from "@/components/circle-loader";
import ManageAccounts from "@/components/manage-accounts";
import UnauthPage from "@/components/unauth-page";
import { GlobalContext } from "@/context";
import { getAllfavorites, getTVorMovieSearchResults } from "@/utils";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import MediaItem from "@/components/media-item";

interface MediaItemType {
  id: string;
  backdrop_path: string | null;
  poster_path: string | null;
  type?: "tv" | "movie";
  addedToFavorites?: boolean;
}

interface FavoritesType {
  movieID: string;
}

interface GlobalContextType {
  loggedInAccount: { _id: string } | null;
  searchResults: MediaItemType[];
  pageLoader: boolean;
  setPageLoader: (loading: boolean) => void;
  setSearchResults: (results: MediaItemType[]) => void;
}

export default function Search() {
  const {
    loggedInAccount,
    searchResults,
    pageLoader,
    setPageLoader,
    setSearchResults,
  } = useContext(GlobalContext) as GlobalContextType;

  const { data: session } = useSession();
  const params = useParams();

  useEffect(() => {
    async function getSearchResults() {
      const query = params.query as string;

      const tvShows: MediaItemType[] = await getTVorMovieSearchResults(
        "tv",
        query
      );
      const movies: MediaItemType[] = await getTVorMovieSearchResults(
        "movie",
        query
      );
      const allFavorites: FavoritesType[] = await getAllfavorites(
        session?.user?.uid as string,
        loggedInAccount?._id as string
      );

      setSearchResults([
        ...tvShows
          .filter(
            (item) => item.backdrop_path !== null && item.poster_path !== null
          )
          .map((tvShowItem) => ({
            ...tvShowItem,
            type: "tv",
            addedToFavorites: allFavorites.some(
              (fav) => fav.movieID === tvShowItem.id
            ),
          })),
        ...movies
          .filter(
            (item) => item.backdrop_path !== null && item.poster_path !== null
          )
          .map((movieItem) => ({
            ...movieItem,
            type: "movie",
            addedToFavorites: allFavorites.some(
              (fav) => fav.movieID === movieItem.id
            ),
          })),
      ]);

      setPageLoader(false);
      console.log(tvShows, movies);
    }

    getSearchResults();
  }, [loggedInAccount, params.query, session?.user?.uid]);

  if (session === null) return <UnauthPage />;
  if (loggedInAccount === null) return <ManageAccounts />;
  if (pageLoader) return <CircleLoader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Navbar />
      <div className="mt-[100px] space-y-0.5 md:space-y-2 px-4">
        <h2 className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
          Showing Results for {decodeURI(params.query as string)}
        </h2>
        <div className="grid grid-cols-5 gap-3 items-center scrollbar-hide md:p-2">
          {searchResults.length
            ? searchResults.map((searchItem) => (
                <MediaItem
                  key={searchItem.id}
                  media={searchItem}
                  searchView={true}
                />
              ))
            : null}
        </div>
      </div>
    </motion.div>
  );
}
