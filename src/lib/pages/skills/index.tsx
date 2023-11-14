import { Box, Input, SimpleGrid, Text } from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { useContext, useState } from 'react';
import { Fade } from 'react-awesome-reveal';

import PageTitle from '~/lib/components/PageTitle';
import { Skill } from '~/lib/components/Skill';
import {
  type SkillData,
  type SkillItem,
  type ProfileBundle,
  ProfileContext,
} from '~/lib/contexts/ProfileContext';
import type { PageProps } from '~/lib/router/routes';

const Skills = (props: PageProps) => {
  const { title } = props;
  const [search, setSearch] = useState<string>('');
  const { skills } = useContext<ProfileBundle>(ProfileContext);

  const handleSearch = (item: ChangeEvent<HTMLInputElement>) => {
    if (item.nativeEvent.target) {
      const input = item.nativeEvent.target as unknown as HTMLInputElement;
      setSearch(input.value.toLowerCase());
    }
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
          />
          {skills.items.map((skill: SkillData) => (
            <Box key={`skill-data-${skill.title}`} borderRadius={10}>
              <Text fontWeight="extrabold">{skill.title}</Text>
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
                    />
                  ))}
              </SimpleGrid>
            </Box>
          ))}
        </Fade>
      )}
    </>
  );
};

export default Skills;
