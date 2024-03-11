import { createContext, useContext, useState, ReactNode} from 'react';

interface ColorContextType {
  colors: string[];
  setColors: (filter: string[]) => void;
}

const ColorsContext = createContext<ColorContextType | undefined>(undefined);


export const ColorsProvider = ({ children } : { children: ReactNode; }) => {
  const [colors, setColors] = useState<string[]>([]);

  return (
    <ColorsContext.Provider value={{ colors, setColors }}>
      {children}
    </ColorsContext.Provider>
  );
};

export const useColors = () => {
  const context = useContext(ColorsContext);
  if (!context) {
    throw new Error('useColors must be used within a ColorsProvider');
  }
  return context;
};
