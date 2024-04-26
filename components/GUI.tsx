import { Root, Text } from '@react-three/uikit'

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
          Hey I'm Saori!
        </Text>
        <Text color="white" fontSize={22} marginY={12}>
          Foremost, I'm an onchain trader. In my downtime, I write TypeScript
          and a bit of Solidity.
        </Text>
        <Text color="white" fontSize={22} marginY={12}>
          I'm very interested in the future of 3d web, web3 and asset
          interoperability via NFTs.
        </Text>
      </Root>
    </group>
  )
}
