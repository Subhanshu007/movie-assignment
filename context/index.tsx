"use client";

// import CircleLoader from "@/components/circle-loader";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import {
  GlobalContextType,
  GlobalStateProps,
  Account,
  MediaData,
  MediaInfo,
} from "../types/global";

// Create a context with a default value
export const GlobalContext = createContext<GlobalContextType | null>(null);

export default function GlobalState({ children }: GlobalStateProps) {
  const [loggedInAccount, setLoggedInAccount] = useState<Account | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [pageLoader, setPageLoader] = useState<boolean>(true);
  const [mediaData, setMediaData] = useState<MediaData[]>([]);
  const [searchResults, setSearchResults] = useState<MediaData[]>([]);
  const [currentMediaInfoIdAndType, setCurrentMediaInfoIdAndType] =
    useState<MediaInfo | null>(null);
  const [showDetailsPopup, setShowDetailsPopup] = useState<boolean>(false);
  const [mediaDetails, setMediaDetails] = useState<MediaData | null>(null);
  const [similarMedias, setSimilarMedias] = useState<MediaData[]>([]);
  const [favorites, setFavorites] = useState<MediaData[]>([]);

  const { data: session } = useSession();

  useEffect(() => {
    const storedAccount = sessionStorage.getItem("loggedInAccount");
    if (storedAccount) {
      setLoggedInAccount(JSON.parse(storedAccount));
    }
  }, []);

  //   if (session === undefined) return <CircleLoader />;

  return (
    <GlobalContext.Provider
      value={{
        loggedInAccount,
        setLoggedInAccount,
        accounts,
        setAccounts,
        pageLoader,
        setPageLoader,
        mediaData,
        setMediaData,
        searchResults,
        setSearchResults,
        currentMediaInfoIdAndType,
        setCurrentMediaInfoIdAndType,
        showDetailsPopup,
        setShowDetailsPopup,
        mediaDetails,
        setMediaDetails,
        similarMedias,
        setSimilarMedias,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
