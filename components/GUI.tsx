import { Root, Text } from "@react-three/uikit";

export const GUI = () => {
  return (
    <group position={[0.75, 1.25, -0.25]} rotation={[0, -0.25, 0]}>
      <Root
        backgroundColor="black"
        padding={24}
        borderRadius={12}
        maxWidth={375}
      >
        <Text color="white" fontSize={32}>
          Hi!
        </Text>
        <Text color="white" fontSize={22} marginY={12}>
          I'm a crypto trader and programmer who builds startups in my free
          time.
        </Text>
        <Text color="white" fontSize={22} marginY={12}>
          I used to be a content writer. Suppose I'm a bit of a generalist,
          interested in whatever gets the people going.
        </Text>
      </Root>
    </group>
  );
};
