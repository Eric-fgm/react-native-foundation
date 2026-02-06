import { createContext } from 'react';

export interface GroupContextProps {
  disabled: boolean;
}

const GroupContext = createContext<GroupContextProps | null>(null);

export default GroupContext;
