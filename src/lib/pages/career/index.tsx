import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';
import { useContext } from 'react';

import PageTitle from '~/lib/components/PageTitle';
import { ProfileContext } from '~/lib/contexts/ProfileContext';
import type { ProfileBundle, ExpData } from '~/lib/contexts/ProfileContext';

import Timeline from './components/Timeline';

interface CareerProps {
  title: string;
}

const Career = (props: CareerProps) => {
  const { title } = props;
  const { experiences } = useContext<ProfileBundle>(ProfileContext);

  return (
    <Container maxWidth="7xl" p={{ base: 2, sm: 10 }}>
      <PageTitle title={title} />
      <Tabs>
        <TabList>
          {experiences.map((item: ExpData) => (
            <Tab>{item.title}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {experiences.map((item: ExpData) => (
            <TabPanel>
              <Timeline experiences={item.items} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Career;
