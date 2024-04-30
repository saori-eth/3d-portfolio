import { Container, Root, Text } from '@react-three/uikit'
import { Card, List, ListItem } from './uikit'
import { useScroll } from '@react-three/drei'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useFrame } from '@react-three/fiber'

export const GUI = () => {
  const tl = useRef<GSAPTimeline>()
  const gui = useRef<any>()
  const scroll = useScroll()
  useFrame(() => {
    if (!tl.current) return
    tl.current.seek(scroll.offset * tl.current.duration())
  })
  useLayoutEffect(() => {
    if (!gui.current) return
    tl.current = gsap.timeline()
    tl.current.to(gui.current.position, {
      duration: 0.5,
      y: 5,
    })
  }, [])
  return (
    <group position={[0.77, 1.25, -0.25]} rotation={[0, -0.25, 0]} ref={gui}>
      <group position={[0, 0, 0]}>
        <Intro />
      </group>
      <group position={[0, -2, 0]}>
        <Skills />
      </group>
      <group position={[0, -3.75, 0]}>
        <Projects />
      </group>
    </group>
  )
}

const Intro = () => {
  return (
    <Root sizeX={0.75} sizeY={0.5}>
      <Card
        width={'100%'}
        height={'100%'}
        padding={15}
        alignItems={'flex-start'}
        justifyContent={'space-evenly'}
      >
        <Text fontWeight={'bold'} fontSize={24}>
          Hey, I'm Saori!
        </Text>
        <Text>
          Foremost, I work for the internet. Coding satisfies my drive to work,
          and trading crypto is basically my video game.
        </Text>
        <Text>
          I'm very interested in the future of 3d web, web3 and asset
          interoperability via NFTs.
        </Text>
      </Card>
    </Root>
  )
}

const SkillsList = {
  Frontend: [
    'React',
    'Three.js',
    'React Three Fiber',
    'Next.js',
    'Vite',
    'TypeScript',
    'Drizzle ORM',
    'ethers.js',
    'Viem',
    'WAGMI',
    'Tailwind CSS',
    'Web3.js (Solana)',
  ],
  Backend: [
    'Node.js',
    'Express',
    'SQLite',
    'MySQL',
    'Solidity',
    'Hardhat',
    'Foundry (Forge / Anvil)',
    'Discord.js',
    'Telgraf',
  ],
}

const Skills = () => {
  return (
    <Root sizeX={1} sizeY={0.75}>
      <Card
        width={'100%'}
        height={'100%'}
        padding={15}
        alignItems={'flex-start'}
      >
        <Text fontWeight={'bold'} fontSize={24} paddingBottom={20}>
          Skills
        </Text>
        <Container
          flexDirection={'row'}
          justifyContent={'space-between'}
          paddingX={15}
        >
          {Object.keys(SkillsList).map((category) => (
            <Container flexDirection={'column'} paddingX={30}>
              <Text fontWeight={'bold'}>{category}</Text>
              {
                //@ts-expect-error
                SkillsList[category].map((skill) => (
                  <Text>- {skill}</Text>
                ))
              }
            </Container>
          ))}
        </Container>
      </Card>
    </Root>
  )
}

const Projects = () => {
  return (
    <Root>
      <Card width={'100%'} height={'100%'} padding={15}>
        <List type="plain" width={400}>
          <ListItem
            subtitle={
              <Text>Documentation / Contributor Coordination 2021</Text>
            }
            onPointerDown={() =>
              window.open('https://github.com/yearn/yearn-docs')
            }
          >
            <Text>Yearn Finance</Text>
          </ListItem>
          <ListItem
            subtitle={<Text>Cofounder 2022-2023</Text>}
            onPointerDown={() => window.open('https://hyperfy.io')}
          >
            <Text>Hyperfy</Text>
          </ListItem>
          <ListItem subtitle={<Text>Trading / Bots 2023-2024</Text>}>
            <Text>Self Employed</Text>
          </ListItem>
        </List>
      </Card>
    </Root>
  )
}
