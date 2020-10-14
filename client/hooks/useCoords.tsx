import {
  createContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from 'react';

type typeCoordsContext = {
  coords: {
    latitude: number;
    longitude: number;
  };
  setCoords?: Dispatch<SetStateAction<any>> | undefined;
};

const defaultCoordsContext: typeCoordsContext = {
  coords: { latitude: 41.394846, longitude: 2.197848 },
};

export const CoordsContext = createContext(defaultCoordsContext);

type CoordsProviderType = {
  children: ReactNode;
};

export function CoordsProvider({ children }: CoordsProviderType) {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number }>(
    { latitude: 41.394846, longitude: 2.197848 }
  );

  return (
    <CoordsContext.Provider value={{ coords, setCoords }}>
      {children}
    </CoordsContext.Provider>
  );
}
