export type Side = 'top' | 'bottom' | 'left' | 'right';

export type Align = 'start' | 'center' | 'end';

export type CollisionBehavior = 'none' | 'flip' | 'shift';

export type Insets = Partial<{ top: number; left: number; bottom: number; right: number }>;

export type Orientation = 'horizontal' | 'vertical';

export type ElementMeasurement = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type DynamicNode<S, T> = S extends undefined ? T : T | ((state: S) => T);

export type PropsWithRender<P extends object, S = undefined> = Omit<P, 'children'> & {
  children?: DynamicNode<S, React.ReactNode>;
  render?: DynamicNode<S, React.ReactElement>;
};
