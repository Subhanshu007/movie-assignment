const API_KEY = "4729f8046d161c403075a83612cd6838";
const BASE_URL = "https://api.themoviedb.org/3";

interface MediaResponse<T> {
  results: T[];
}

interface VideoResult {
  key: string;
  type: string;
}

interface MediaItem {
  id: number;
  backdrop_path: string | null;
  poster_path: string | null;
}

interface MediaDetails extends MediaItem {
  results?: VideoResult[];
}

export const getTrendingMedias = async (
  type: "movie" | "tv"
): Promise<MediaItem[] | undefined> => {
  try {
    const res = await fetch(
      `${BASE_URL}/trending/${type}/day?api_key=${API_KEY}&language=en-US`,
      {
        method: "GET",
      }
    );

    const data: MediaResponse<MediaItem> = await res.json();

    return data.results;
  } catch (e) {
    console.log(e);
  }
};

export const getTopratedMedias = async (
  type: "movie" | "tv"
): Promise<MediaItem[] | undefined> => {
  try {
    const res = await fetch(
      `${BASE_URL}/${type}/top_rated?api_key=${API_KEY}&language=en-US`,
      {
        method: "GET",
      }
    );

    const data: MediaResponse<MediaItem> = await res.json();

    return data.results;
  } catch (e) {
    console.log(e);
  }
};

export const getPopularMedias = async (
  type: "movie" | "tv"
): Promise<MediaItem[] | undefined> => {
  try {
    const res = await fetch(
      `${BASE_URL}/${type}/popular?api_key=${API_KEY}&language=en-US`,
      {
        method: "GET",
      }
    );

    const data: MediaResponse<MediaItem> = await res.json();

    return data.results;
  } catch (e) {
    console.log(e);
  }
};

export const getTVorMoviesByGenre = async (
  type: "movie" | "tv",
  id: number
): Promise<MediaItem[] | undefined> => {
  try {
    const res = await fetch(
      `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=en-US&include_adult=false&sort_by=popularity.desc&with_genres=${id}`,
      {
        method: "GET",
      }
    );

    const data: MediaResponse<MediaItem> = await res.json();

    return data.results;
  } catch (e) {
    console.log(e);
  }
};

export const getTVorMovieVideosByID = async (
  type: "movie" | "tv",
  id: number
): Promise<MediaDetails | undefined> => {
  try {
    const res = await fetch(
      `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
      {
        method: "GET",
      }
    );

    const data: MediaDetails = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getTVorMovieSearchResults = async (
  type: "movie" | "tv",
  query: string
): Promise<MediaItem[] | undefined> => {
  try {
    const res = await fetch(
      `${BASE_URL}/search/${type}?api_key=${API_KEY}&include_adult=false&language=en-US&query=${query}`,
      {
        method: "GET",
      }
    );

    const data: MediaResponse<MediaItem> = await res.json();

    return data.results;
  } catch (e) {
    console.log(e);
  }
};

export const getTVorMovieDetailsByID = async (
  type: "movie" | "tv",
  id: number
): Promise<MediaDetails | undefined> => {
  try {
    const res = await fetch(
      `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
      {
        method: "GET",
      }
    );

    const data: MediaDetails = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getSimilarTVorMovies = async (
  type: "movie" | "tv",
  id: number
): Promise<MediaItem[] | undefined> => {
  try {
    const res = await fetch(
      `${BASE_URL}/${type}/${id}/similar?api_key=${API_KEY}&language=en-US`,
      {
        method: "GET",
      }
    );

    const data: MediaResponse<MediaItem> = await res.json();

    return data.results;
  } catch (e) {
    console.log(e);
  }
};

interface FavoriteItem {
  movieID: number;
}

export const getAllfavorites = async (
  uid: string | undefined,
  accountID: string | undefined
): Promise<FavoriteItem[] | undefined> => {
  try {
    const res = await fetch(
      `/api/favorites/get-all-favorites?id=${uid}&accountID=${accountID}`,
      {
        method: "GET",
      }
    );

    const data = await res.json();

    return data?.data;
  } catch (e) {
    console.log(e);
  }
};
