import { PortalProvider } from '@rn-foundation/portal';
import * as Toast from '@rn-foundation/toast';
import { Drawer } from 'expo-router/drawer';
import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeInUp, FadeOut, LinearTransition } from 'react-native-reanimated';

const AppLayout = () => {
  return (
    <GestureHandlerRootView>
      <PortalProvider>
        <Toast.Provider>
          <Drawer screenOptions={{ sceneStyle: { backgroundColor: 'white' } }} />
          <ToastStack />
        </Toast.Provider>
      </PortalProvider>
    </GestureHandlerRootView>
  );
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ToastStack = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Toast.Viewport
        insets={{ top: 64, bottom: 16, left: 8, right: 8 }}
        style={{ gap: 8 }}
        renderItem={(toast, index) => (
          <Toast.Root
            {...toast}
            render={
              <AnimatedPressable
                style={{
                  position: expanded ? 'relative' : 'absolute',
                  backgroundColor: 'red',
                  color: 'white',
                }}
                entering={toast.position.startsWith('top-') ? FadeInUp : FadeInDown}
                exiting={FadeOut}
                layout={LinearTransition}
                onPress={() => setExpanded((p) => !p)}
              />
            }>
            <Text>
              Title id: {toast.id} || index: {index}
            </Text>
            <Text>Subtitle</Text>
          </Toast.Root>
        )}
      />
    </>
  );
};

export default AppLayout;
