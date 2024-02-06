import { Stack } from "expo-router";

const StackLayout = () => {
  return (
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
              statusBarAnimation: "fade",
              animation: "fade_from_bottom",
              autoHideHomeIndicator: true,
            }}
          />
        </Stack>
  );
};

export default StackLayout;
