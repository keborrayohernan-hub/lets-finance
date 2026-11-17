import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, DESIGN_STATUS_BAR } from '../theme';

/**
 * The teal block with 20 pt rounded bottom corners that sits behind the top of
 * Home (293 tall in Figma), Transactions (293) and Spendings (210).
 */
export function TealHeader({ designHeight }: { designHeight: number }) {
  const insets = useSafeAreaInsets();
  return <View style={[s.header, { height: designHeight - DESIGN_STATUS_BAR + insets.top }]} />;
}

const s = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.brand,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
