import { Root, Container, Text } from "@react-three/uikit";
import { FancyMaterial } from "../utils";

const bullets = [
  "I'm a typescript & Solidity dev",
  "I've been a full time crypto trading neet since 2021",
  "Contributed to projects in about every crypto niche",
];

export const GUI = () => {
  return (
    <group position={[0.775, 1.25, 0]}>
      <Root
        backgroundColor="black"
        padding={24}
        borderRadius={12}
        borderColor="white"
        border={8}
        panelMaterialClass={FancyMaterial}
        maxWidth={400}
      >
        <Text color="white" fontSize={32}>
          Hi there!
        </Text>
        {bullets.map((bullet, index) => (
          <Text key={index} color="white" fontSize={22}>
            - {bullet}
          </Text>
        ))}
      </Root>
    </group>
  );
};
