import { useMemo } from 'react';
import { Dimensions } from 'react-native';

import { clamp } from './math';
import type { Align, CollisionBehavior, ElementMeasurement, Insets, Side } from './types';

const calculateBaseX = (
  anchor: ElementMeasurement,
  popupWidth: number,
  align: Align,
  offset: number,
): number => {
  switch (align) {
    case 'start':
      return anchor.x + offset;
    case 'center':
      return anchor.x + anchor.width / 2 - popupWidth / 2;
    default: // 'end'
      return anchor.x + anchor.width - popupWidth - offset;
  }
};

interface CalculatePositionOptions {
  anchorMeasurement: ElementMeasurement;
  popupMeasurement: ElementMeasurement;
  side: Side;
  sideOffset: number;
  align: Align;
  alignOffset: number;
  collisionBehavior: CollisionBehavior;
  collisionOffset: number;
  insets: { top: number; left: number; bottom: number; right: number };
}

const calculateVerticalBasedPosition = ({
  anchorMeasurement,
  popupMeasurement,
  side,
  sideOffset,
  align,
  alignOffset,
  collisionBehavior,
  collisionOffset,
  insets,
}: CalculatePositionOptions) => {
  const dimension = Dimensions.get('window');

  const baseX = calculateBaseX(anchorMeasurement, popupMeasurement.width, align, alignOffset);

  const baseY =
    side === 'bottom'
      ? anchorMeasurement.y + anchorMeasurement.height + sideOffset
      : anchorMeasurement.y - popupMeasurement.height - sideOffset;

  const getConstrainedX = (xPos: number) =>
    clamp(
      xPos,
      insets.left + collisionOffset,
      dimension.width - popupMeasurement.width - collisionOffset,
    );

  if (collisionBehavior === 'shift') {
    return {
      left: getConstrainedX(baseX),
      top: clamp(
        baseY,
        insets.top + collisionOffset,
        dimension.height - popupMeasurement.height - insets.bottom - collisionOffset,
      ),
      maxWidth: dimension.width - insets.left - collisionOffset * 2,
      maxHeight: dimension.height - insets.top - insets.bottom - collisionOffset * 2,
    };
  }

  if (collisionBehavior === 'flip') {
    const anchorMidY = anchorMeasurement.y + anchorMeasurement.height / 2;
    const isAnchorBelowCenter = anchorMidY > dimension.height / 2;

    // Check if preferred position overflows
    const bottomY = anchorMeasurement.y + anchorMeasurement.height + sideOffset;
    const topY = anchorMeasurement.y - popupMeasurement.height - sideOffset;

    // Flip to Top
    if (
      isAnchorBelowCenter &&
      bottomY + popupMeasurement.height + collisionOffset > dimension.height
    ) {
      return {
        left: getConstrainedX(baseX),
        top: Math.max(topY, insets.top + collisionOffset),
        maxWidth: dimension.width - insets.left - collisionOffset * 2,
        maxHeight: anchorMeasurement.y - insets.top - sideOffset - collisionOffset,
      };
    }
    if (!isAnchorBelowCenter && topY < collisionOffset) {
      // Flip to Bottom
      return {
        left: getConstrainedX(baseX),
        top: bottomY,
        maxWidth: dimension.width - insets.left - collisionOffset * 2,
        maxHeight: dimension.height - bottomY - insets.bottom - collisionOffset,
      };
    }
  }

  return { left: Math.max(insets.left, baseX), top: Math.max(insets.top, baseY) };
};

const calculateBaseY = (
  anchor: ElementMeasurement,
  popupHeight: number,
  align: Align,
  offset: number,
): number => {
  switch (align) {
    case 'start':
      return anchor.y + offset;
    case 'center':
      return anchor.y + anchor.height / 2 - popupHeight / 2;
    default: // 'end'
      return anchor.y + anchor.height - popupHeight - offset;
  }
};

const calculateHorizontalBasedPosition = ({
  anchorMeasurement,
  popupMeasurement,
  side,
  sideOffset,
  align,
  alignOffset,
  collisionBehavior,
  collisionOffset,
  insets,
}: CalculatePositionOptions) => {
  const dimension = Dimensions.get('window');

  const baseY = calculateBaseY(anchorMeasurement, popupMeasurement.height, align, alignOffset);

  const baseX =
    side === 'right'
      ? anchorMeasurement.x + anchorMeasurement.width + sideOffset
      : anchorMeasurement.x - popupMeasurement.width - sideOffset;

  const getConstrainedX = (xPos: number) =>
    clamp(
      xPos,
      insets.left + collisionOffset,
      dimension.width - popupMeasurement.width - collisionOffset,
    );

  const getConstrainedY = (yPos: number) =>
    clamp(
      yPos,
      insets.top + collisionOffset,
      dimension.height - popupMeasurement.height - collisionOffset,
    );

  if (collisionBehavior === 'shift') {
    return {
      left: getConstrainedX(baseX),
      top: clamp(
        baseY,
        insets.top + collisionOffset,
        dimension.height - popupMeasurement.height - insets.bottom - collisionOffset,
      ),
      maxWidth: dimension.width - insets.left - collisionOffset * 2,
      maxHeight: dimension.height - insets.top - insets.bottom - collisionOffset * 2,
    };
  }

  if (collisionBehavior === 'flip') {
    const anchorMidX = anchorMeasurement.x + anchorMeasurement.width / 2;
    const isAnchorAfterCenter = anchorMidX > dimension.width / 2;

    // Check if preferred position overflows
    const rightX = anchorMeasurement.x + anchorMeasurement.width + sideOffset;
    const leftX = anchorMeasurement.x - popupMeasurement.width - sideOffset;

    // Flip to Left
    if (
      isAnchorAfterCenter &&
      rightX + popupMeasurement.width + collisionOffset > dimension.width
    ) {
      return {
        left: Math.max(leftX, insets.left + collisionOffset),
        top: getConstrainedY(baseY),
        maxWidth: anchorMeasurement.x - insets.left - sideOffset - collisionOffset,
        maxHeight: dimension.height - insets.top - insets.bottom - collisionOffset * 2,
      };
    }
    if (!isAnchorAfterCenter && leftX < collisionOffset) {
      // Flip to Right
      return {
        left: rightX,
        top: getConstrainedY(baseY),
        maxWidth: dimension.width - rightX - insets.right - collisionOffset,
        maxHeight: dimension.height - getConstrainedY(baseY) - insets.bottom - collisionOffset,
      };
    }
  }

  return { left: Math.max(insets.left, baseX), top: Math.max(insets.top, baseY) };
};

interface UseAnchoredPosition {
  anchorMeasurement: ElementMeasurement | null;
  popupMeasurement: ElementMeasurement | null;
  side: Side;
  sideOffset: number;
  align: Align;
  alignOffset: number;
  collisionBehavior: CollisionBehavior;
  collisionOffset: number;
  insets?: Insets;
}

const useAnchoredPosition = ({
  anchorMeasurement,
  popupMeasurement,
  side,
  sideOffset,
  align,
  alignOffset,
  collisionBehavior,
  collisionOffset,
  insets,
}: UseAnchoredPosition) => {
  return useMemo(() => {
    if (anchorMeasurement && popupMeasurement) {
      const calculatedInsets = { top: 0, left: 0, bottom: 0, right: 0, ...insets };
      return side === 'top' || side === 'bottom'
        ? calculateVerticalBasedPosition({
            anchorMeasurement,
            popupMeasurement,
            side,
            sideOffset,
            align,
            alignOffset,
            collisionBehavior,
            collisionOffset,
            insets: calculatedInsets,
          })
        : calculateHorizontalBasedPosition({
            anchorMeasurement,
            popupMeasurement,
            side,
            sideOffset,
            align,
            alignOffset,
            collisionBehavior,
            collisionOffset,
            insets: calculatedInsets,
          });
    }
    return {
      opacity: 0,
    };
  }, [
    anchorMeasurement,
    popupMeasurement,
    side,
    sideOffset,
    align,
    alignOffset,
    collisionBehavior,
    collisionOffset,
    insets,
  ]);
};

export default useAnchoredPosition;
