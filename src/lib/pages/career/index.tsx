import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';
import { memo, useContext, useEffect } from 'react';

import PageTitle from '~/lib/components/PageTitle';
import type { NotificationBundle } from '~/lib/contexts/NotificationContext';
import { NotificationContext } from '~/lib/contexts/NotificationContext';
import { ProfileContext } from '~/lib/contexts/ProfileContext';
import type { ProfileBundle, ExpData } from '~/lib/contexts/ProfileContext';
import type { PageProps } from '~/lib/router/routes';

import Timeline from './components/Timeline';

const Career = memo((props: PageProps) => {
  const { title } = props;
  const { sendToast } = useContext<NotificationBundle>(NotificationContext);
  const { experiences } = useContext<ProfileBundle>(ProfileContext);

  useEffect(() => {
    sendToast({
      id: 'badge',
      title: 'Tap on the skill badges to check experience',
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  }, [sendToast]);

  return (
    <Container maxWidth="7xl" p={{ base: 2, sm: 10 }}>
      <PageTitle title={title} />
      <Tabs>
        <TabList>
          {experiences.map((item: ExpData) => (
            <Tab key={`exp-tab-${item.title}`}>{item.title}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {experiences.map((item: ExpData) => (
            <TabPanel key={`exp-tab-pan-${item.title}`}>
              <Timeline experiences={item.items} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Container>
  );
});

export default Career;
