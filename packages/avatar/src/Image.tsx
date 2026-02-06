import { type PropsWithRender, useRenderElement } from '@rn-foundation/shared';
import { useCallback } from 'react';
import {
  Image as RNImage,
  type ImageErrorEvent,
  type ImageLoadEvent,
  type ImageProps as RNImageProps,
} from 'react-native';

import { useRootContext } from './Root/context';

export interface ImageProps extends PropsWithRender<Omit<RNImageProps, 'source' | 'alt'>> {}

const Image = ({ onLoad, onError, render, ...props }: ImageProps) => {
  const { src, alt, status, setStatus } = useRootContext();

  const handleLoad = useCallback(
    (event: ImageLoadEvent) => {
      setStatus('loaded');
      onLoad?.(event);
    },
    [onLoad, setStatus],
  );

  const handleError = useCallback(
    (event: ImageErrorEvent) => {
      setStatus('error');
      onError?.(event);
    },
    [onError, setStatus],
  );

  const element = useRenderElement(RNImage, render, {
    source: src,
    alt,
    onLoad: handleLoad,
    onError: handleError,
    ...props,
  });

  if (status === 'error') {
    return null;
  }

  return element;
};

Image.displayName = 'AvatarImage';

export default Image;
