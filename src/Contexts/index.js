
import { combineComponents } from '../Utils/CombineComponents';
import { GridProvider } from './GridContext';
import { MenuProvider } from './MenuContext';
import { PropertyProvider } from './PropertyContext';
import { SearchProvider } from './SearchContext';
import { SortProvider } from './SortContext';
import { ToggleProvider } from './ToggleContext';

export const AppContextProvider = combineComponents(
  GridProvider,
  MenuProvider,
  PropertyProvider,
  SearchProvider,
  SortProvider,
  ToggleProvider
);