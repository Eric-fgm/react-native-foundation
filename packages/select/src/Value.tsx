import { useRootContext } from './Root/context';

const Value = () => {
  const { placeholder, value } = useRootContext();

  return value.length ? value.join(',') : placeholder;
};

export default Value;
