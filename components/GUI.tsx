import { Root, Text } from '@react-three/uikit'
import { Card } from './Card'

export const GUI = () => {
  return (
    <group position={[0.77, 1.25, -0.25]} rotation={[0, -0.25, 0]}>
      <Root sizeX={0.75} sizeY={0.5}>
        <Card
          width={'100%'}
          height={'100%'}
          overflow={'scroll'}
          padding={15}
          alignItems={'flex-start'}
          justifyContent={'space-evenly'}
        >
          <Text fontWeight={'bold'} fontSize={24}>
            Hey, I'm Saori!
          </Text>
          <Text>
            Foremost, I'm an onchain trader. In my downtime, I write TypeScript
            and a bit of Solidity.
          </Text>
          <Text>
            I'm very interested in the future of 3d web, web3 and asset
            interoperability via NFTs.
          </Text>
        </Card>
      </Root>
    </group>
  )
}
