import * as Popover from '@rn-foundation/popover';

export interface TriggerProps extends Popover.TriggerProps {}

const Trigger = ({ withLongPress = true, ...props }: TriggerProps) => {
  return <Popover.Trigger withLongPress={withLongPress} {...props} />;
};

Trigger.defaultName = 'MenuTrigger';

export default Trigger;
