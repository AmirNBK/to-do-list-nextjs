import React, { Dispatch, createContext, useReducer, useState } from "react";
import { mainreducer } from "./Reduser";

export type LocationData = {
  location: { lat: number; lon: number };
  regionAndCity: string;
};

interface Task {
  task: string;
  isComplete: boolean;
  id: string;
}

interface HomeProps {
  tasks: Task[];
}

export type StateType = {
  locationData: LocationData;
  contactId: string;
};

export type MainContextType = {
  state: StateType;
  dispatch: Dispatch<any>;
  userId: number;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  tasks: any[];
  setTasks: React.Dispatch<React.SetStateAction<any[]>>;
  offlineTasks: any[];
  setOfflineTasks: React.Dispatch<React.SetStateAction<any[]>>;
};

export const MainContext = createContext<MainContextType>({} as MainContextType);

type MainProviderProps = {
  children: React.ReactNode;
};

const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<number>(0);
  const [tasks, setTasks] = useState<any[]>([]);
  const [offlineTasks, setOfflineTasks] = useState<any[]>([])

  const initialState: StateType = {
    locationData: {
      location: { lat: 0, lon: 0 },
      regionAndCity: "",
    },
    contactId: "",
  };

  const [state, dispatch] = useReducer(mainreducer, initialState);

  return (
    <MainContext.Provider
      value={{
        state,
        dispatch,
        userId,
        setUserId,
        tasks,
        setTasks,
        offlineTasks,
        setOfflineTasks
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;