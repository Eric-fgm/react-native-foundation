import { type Insets } from '@rn-foundation/shared';
import React from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

import type { ManagerObject } from './manager';
import { useProviderContext } from './Provider/context';

export interface ViewportProps extends Omit<ViewProps, 'children'> {
  insets?: Insets;
  renderItem: (props: ManagerObject, index: number) => React.ReactNode;
}

const Viewport = ({ insets, style, renderItem, ...props }: ViewportProps) => {
  const { toasts } = useProviderContext();

  return (
    <View style={StyleSheet.absoluteFill} {...props}>
      {(
        [
          'top-left',
          'top-center',
          'top-right',
          'bottom-left',
          'bottom-center',
          'bottom-right',
        ] as const
      ).map((position) => (
        <View key={position} style={[getStyles(insets)[position], style]}>
          {toasts
            .filter((toast) => toast.position === position)
            .map((toast, index) => (
              <React.Fragment key={toast.id}>{renderItem(toast, index)}</React.Fragment>
            ))}
        </View>
      ))}
    </View>
  );
};

const getStyles = ({ left = 0, right = 0, top = 0, bottom = 0 }: Insets = {}) =>
  StyleSheet.create({
    'top-left': {
      position: 'absolute',
      top,
      left,
    },
    'top-center': {
      position: 'absolute',
      top,
      alignItems: 'center',
      alignSelf: 'center',
    },
    'top-right': {
      position: 'absolute',
      top,
      right,
    },
    'bottom-left': {
      position: 'absolute',
      bottom,
      left,
    },
    'bottom-center': {
      position: 'absolute',
      bottom,
      alignItems: 'center',
      alignSelf: 'center',
    },
    'bottom-right': {
      position: 'absolute',
      bottom,
      right,
    },
  });

Viewport.displayName = 'ToastViewport';

export default Viewport;
