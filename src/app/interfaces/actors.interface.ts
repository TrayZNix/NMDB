export interface Known_for {
  adult: boolean;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Actor {
  adult: boolean;
  gender: number;
  id: number;
  known_for: Known_for[];
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path?: any;
}

export interface actoresResponse {
  page: number;
  results: Actor[];
  total_pages: number;
  total_results: number;
}
