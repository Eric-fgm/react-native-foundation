import React, { type JSX } from 'react';

type ChildResolver<S> = React.ReactNode | ((state: S) => React.ReactNode);
type RenderResolver<S> = React.ReactElement | ((state: S) => React.ReactElement);

type UseRenderElement = {
  <P extends Record<string, unknown>, S extends Record<string, unknown>>(
    Component: React.ComponentType<P>,
    render: undefined | RenderResolver<S>,
    props: P & { children?: ChildResolver<S> },
    state: S,
  ): JSX.Element;

  <P extends Record<string, unknown>>(
    Component: React.ComponentType<P>,
    render: undefined | React.ReactElement | (() => React.ReactElement),
    props: P & { children?: React.ReactNode | (() => React.ReactNode) },
  ): JSX.Element;
};

const useRenderElement: UseRenderElement = (
  Component: React.ComponentType<any>,
  render: any,
  props: any,
  state?: any,
) => {
  const { children, ...restProps } = props;
  const resolvedChildren = typeof children === 'function' ? children(state) : children;

  if (!render) {
    return <Component {...restProps}>{resolvedChildren}</Component>;
  }

  return React.cloneElement(
    typeof render === 'function' ? render(state) : render,
    restProps,
    resolvedChildren,
  );
};

export default useRenderElement;
