// AppContext.tsx
import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { AppState, AppAction } from "../types";

const initialState: AppState = {
  comments: [
    { id: 1, timestamp: 7, text: "Interesting point here!" },
    { id: 2, timestamp: 23, text: "Love this part." },
  ],
  activeComment: null,
  playerRef: null,
  playerState: "paused",
};

const AppContext = createContext<
  { state: AppState; dispatch: React.Dispatch<AppAction> } | undefined
>(undefined);

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "ADD_COMMENT":
      const lastId =
        state.comments.length > 0
          ? state.comments[state.comments.length - 1].id!
          : 1;

      const data = { id: lastId + 1, ...action.payload };
      return { ...state, comments: [...state.comments, data] };
    case "SET_PLAYER_REF":
      return { ...state, playerRef: action.payload };
    case "SET_PLAYER_STATE":
      return { ...state, playerState: action.payload };
    case "SET_ACTIVE_COMMENT":
      return { ...state, activeComment: action.payload };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
