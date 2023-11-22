import {
  Box,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import type { ChangeEvent, MouseEvent } from 'react';
import { useContext, useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';

import PageTitle from '~/lib/components/PageTitle';
import { Skill } from '~/lib/components/Skill';
import type { NavigationBundle } from '~/lib/contexts/NavigationContext';
import { NavigationContext } from '~/lib/contexts/NavigationContext';
import {
  type SkillData,
  type SkillItem,
  type ProfileBundle,
  ProfileContext,
} from '~/lib/contexts/ProfileContext';
import type { PageProps } from '~/lib/router/routes';

import SkillProjects from './components/SkillProjects';

const Skills = (props: PageProps) => {
  const { title } = props;
  const [search, setSearch] = useState<string>('');
  const { from } = useContext<NavigationBundle>(NavigationContext);
  const { skills, getSkills } = useContext<ProfileBundle>(ProfileContext);
  const [clickedSkill, setClickedSkill] = useState<SkillItem | undefined>(
    undefined
  );
  const {
    isOpen: isSkillProjectsOpen,
    onOpen: onSkillProjectsOpen,
    onClose: onSkillProjectsClose,
  } = useDisclosure();

  useEffect(() => {
    if (
      from &&
      from.pathname === '/projects' &&
      from.state &&
      from.state.skill
    ) {
      const skill = getSkills(
        (item: SkillItem) => item.title === from.state.skill
      ).at(0);
      setClickedSkill(skill);
      onSkillProjectsOpen();
    }
  }, [from, getSkills, onSkillProjectsOpen]);

  const handleSearch = (item: ChangeEvent<HTMLInputElement>) => {
    if (item.nativeEvent.target) {
      const input = item.nativeEvent.target as unknown as HTMLInputElement;
      setSearch(input.value.toLowerCase());
    }
  };

  const handleSkillClick = (
    event: MouseEvent<HTMLDivElement>,
    skill: SkillItem
  ) => {
    event.stopPropagation();
    setClickedSkill(skill);
    onSkillProjectsOpen();
  };

  return (
    <>
      <PageTitle title={title} />
      {skills && (
        <Fade>
          <Box>
            <Text>{skills.intro}</Text>
          </Box>
          <Input
            placeholder="Search...🔎"
            value={search}
            onChange={handleSearch}
            mt={2}
          />
          {skills.items.map((skill: SkillData) => (
            <Box key={`skill-data-${skill.title}`} borderRadius={10}>
              <Text fontWeight="extrabold" mt={3}>
                {skill.title}
              </Text>
              <SimpleGrid minChildWidth="130px" mt={2} mb={2}>
                {skill.items
                  .filter((item: SkillItem) => {
                    return (
                      search === '' || item.title.toLowerCase().includes(search)
                    );
                  })
                  .map((item: SkillItem) => (
                    <Skill
                      key={`skill-item-${item.title}`}
                      skill={item}
                      animate
                      onClick={(event: MouseEvent<HTMLDivElement>) =>
                        handleSkillClick(event, item)
                      }
                    />
                  ))}
              </SimpleGrid>
            </Box>
          ))}
        </Fade>
      )}
      <Modal isOpen={isSkillProjectsOpen} onClose={onSkillProjectsClose}>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('primary.light', 'primary.dark')}>
          <ModalHeader>{clickedSkill?.title} Projects</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SkillProjects skill={clickedSkill!} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Skills;
