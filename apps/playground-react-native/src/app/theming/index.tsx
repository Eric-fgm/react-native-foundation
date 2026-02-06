import { useTheme } from '@rn-foundation/theming';
import { Pressable, Text, View } from 'react-native';

export const getKeys = <T extends object>(obj: T) => {
  return Object.keys(obj) as (keyof T)[];
};

export default function ThemeExample() {
  const { theme, themes, setTheme } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background,
      }}>
      <Text style={{ color: theme.palette.text }}>Sample Text</Text>
      <View style={{ marginTop: 20 }}>
        {getKeys(themes).map((variant) => (
          <Pressable key={variant} onPress={() => setTheme(variant)}>
            <Text style={{ color: theme.palette.text }}>Theme: {variant}</Text>
          </Pressable>
        ))}
        <Pressable onPress={() => setTheme()}>
          <Text style={{ color: theme.palette.text }}>Auto Theme</Text>
        </Pressable>
      </View>
    </View>
  );
}
