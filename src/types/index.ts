export type Comment = {
  id?: number;
  timestamp: number;
  text: string;
};

export type AppState = {
  comments: Comment[];
  activeComment: Comment[] | null;
  playerRef: HTMLVideoElement | null;
  playerState: "playing" | "paused";
};

export type AppAction =
  | { type: "ADD_COMMENT"; payload: Comment }
  | { type: "SET_PLAYER_REF"; payload: HTMLVideoElement | null }
  | { type: "SET_PLAYER_STATE"; payload: "playing" | "paused" }
  | { type: "SET_ACTIVE_COMMENT"; payload: Comment[] | null };
