import * as Popover from '@rn-foundation/popover';

export interface PopupProps extends Popover.PopupProps {}

const Popup = ({
  side = 'right',
  align = 'start',
  collisionBehavior = 'flip',
  ...props
}: PopupProps) => (
  <Popover.Popup
    accessibilityRole="menu"
    side={side}
    align={align}
    collisionBehavior={collisionBehavior}
    {...props}
  />
);

Popup.displayName = 'MenuPopup';

export default Popup;
