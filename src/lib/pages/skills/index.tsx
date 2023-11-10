import {
  Box,
  GridItem,
  Image,
  Input,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';

import PageTitle from '~/lib/components/PageTitle';
import XpBar from '~/lib/components/XpBar';
import data from '~/lib/constants/data';

interface Styles {
  iconStyle: React.CSSProperties;
  introTextContainer: React.CSSProperties;
}

const styles: Styles = {
  iconStyle: {
    height: 60,
    width: 60,
    margin: 1,
  },
  introTextContainer: {
    whiteSpace: 'pre-wrap',
  },
};

interface SkillsProps {
  title: string;
}

interface SkillItem {
  icon: string;
  title: string;
  exp: number;
}

interface SkillData {
  title: string;
  items: SkillItem[];
}

interface SkillsData {
  intro: string;
  skills: SkillData[];
}

const Skills = (props: SkillsProps) => {
  const { title } = props;
  const [skillsData, setSkillsData] = useState<SkillsData | undefined>(
    undefined
  );
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetch(data.skills, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setSkillsData(res))
      .catch((err) => err);
  }, []);

  const handleSearch = (item: React.ChangeEvent<HTMLInputElement>) => {
    if (item.nativeEvent.target) {
      const input = item.nativeEvent.target as unknown as HTMLInputElement;
      setSearch(input.value.toLowerCase());
    }
  };

  return (
    <>
      <PageTitle title={title} />
      {skillsData && (
        <Fade>
          <Box style={styles.introTextContainer}>
            <Text>{skillsData.intro}</Text>
          </Box>
          <Input
            placeholder="Search...🔎"
            value={search}
            onChange={handleSearch}
          />
          {skillsData.skills.map((skill: SkillData) => (
            <Box id={skill.title} borderRadius={10}>
              <Text fontWeight="extrabold">{skill.title}</Text>
              <SimpleGrid minChildWidth="130px" mt={2} mb={2}>
                {skill.items
                  .filter((item: SkillItem) => {
                    return (
                      search === '' || item.title.toLowerCase().includes(search)
                    );
                  })
                  .map((item: SkillItem) => (
                    <GridItem
                      id={item.title}
                      m={2}
                      boxShadow="dark-lg"
                      maxWidth="15vh"
                      borderRadius={10}
                      className="skill"
                    >
                      <Box m={1} p={1}>
                        <Text mb={1}>{item.title}</Text>
                        <XpBar currentExp={item.exp} maxExp={100} />
                        <Image src={item.icon} style={styles.iconStyle} />
                      </Box>
                    </GridItem>
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
