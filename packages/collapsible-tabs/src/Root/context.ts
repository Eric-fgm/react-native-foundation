import { createContext, useContext } from 'react';
import type PagerView from 'react-native-pager-view';
import type { SharedValue } from 'react-native-reanimated';

export interface RootContextProps {
  headerHeight: SharedValue<number>;
  scrollOffsetMap: SharedValue<Record<string, number | undefined>>;

  itemsHeight: SharedValue<number>;

  pageId: string | null;
  setPageId: (id: string) => void;

  pageIds: string[];
  setPageIds: React.Dispatch<React.SetStateAction<string[]>>;

  pageScrollSpace: SharedValue<number>;

  pagerViewRef: React.RefObject<PagerView | null>;
  scrollToPage: (index: number) => void;

  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}

const RootContext = createContext<RootContextProps | null>(null);

export const useRootContext = () => {
  const context = useContext(RootContext);
  if (!context) {
    throw new Error('useRootContext must be used within a CollapsibleTabs.Root');
  }
  return context;
};

export default RootContext;
