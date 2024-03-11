import { FilterInterface, FriendsIn, GroupVisibility, SetFilterFunction } from '../../types/Types';
import { createContext, useContext, useState, ReactNode} from 'react';

interface FilterContextType {
  filters: FilterInterface;
  setFilter: SetFilterFunction;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);


export const FilterProvider = ({ children } : { children: ReactNode; }) => {
  const [filters, setFilter] = useState<FilterInterface>({
    visibility: GroupVisibility.All,
    colors: [],
    friendsIn: FriendsIn.All,
  });

  return (
    <FilterContext.Provider value={{ filters, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
