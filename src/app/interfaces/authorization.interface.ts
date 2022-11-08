export interface ResponseCreateRequestToken {
  success: boolean;
  expires_at: string;
  request_token: string;
}

//SESSION

export interface ResponseCreateSession {
  success: boolean;
  session_id: string;
}
export interface ResponseDeleteSession {
  success: boolean;
}

//ACC DETAILS

export interface Gravatar {
  hash: string;
}

export interface Tmdb {
  avatar_path?: any;
}

export interface Avatar {
  gravatar: Gravatar;
  tmdb: Tmdb;
}

export interface ResponseAccountDetails {
  avatar: Avatar;
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}
