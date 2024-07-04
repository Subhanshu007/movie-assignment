export interface Account {
  id: string;
  name: string;
  // Add more fields as necessary
}

export interface MediaData {
  id: string;
  title: string;
  description: string;
  // Add more fields as necessary
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  // Add more fields as necessary
}

export interface MediaInfo {
  id: string;
  type: string;
  // Add more fields as necessary
}

export interface GlobalContextType {
  loggedInAccount: Account | null;
  setLoggedInAccount: React.Dispatch<React.SetStateAction<Account | null>>;
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  pageLoader: boolean;
  setPageLoader: React.Dispatch<React.SetStateAction<boolean>>;
  mediaData: MediaData[];
  setMediaData: React.Dispatch<React.SetStateAction<MediaData[]>>;
  searchResults: MediaData[];
  setSearchResults: React.Dispatch<React.SetStateAction<MediaData[]>>;
  currentMediaInfoIdAndType: MediaInfo | null;
  setCurrentMediaInfoIdAndType: React.Dispatch<
    React.SetStateAction<MediaInfo | null>
  >;
  showDetailsPopup: boolean;
  setShowDetailsPopup: React.Dispatch<React.SetStateAction<boolean>>;
  mediaDetails: MediaData | null;
  setMediaDetails: React.Dispatch<React.SetStateAction<MediaData | null>>;
  similarMedias: MediaData[];
  setSimilarMedias: React.Dispatch<React.SetStateAction<MediaData[]>>;
  favorites: MediaData[];
  setFavorites: React.Dispatch<React.SetStateAction<MediaData[]>>;
}

export interface GlobalStateProps {
  children: React.ReactNode;
}
