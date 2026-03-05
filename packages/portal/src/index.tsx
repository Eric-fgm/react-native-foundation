import { Portal as RNPortal } from 'react-native-teleport';

export const Portal = ({ hostName = 'root', ...props }: React.ComponentProps<typeof RNPortal>) => (
  <RNPortal hostName={hostName} {...props} />
);

export { PortalHost, PortalProvider } from 'react-native-teleport';
