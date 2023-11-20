import {
  Box,
  GridItem,
  Link,
  SimpleGrid,
  chakra,
  useColorMode,
  useToken,
} from '@chakra-ui/react';
import _ from 'lodash';
import { useCallback, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import type { BarProps } from 'recharts';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

import type {
  ProfileBundle,
  ProjectItem,
  SkillItem,
} from '~/lib/contexts/ProfileContext';
import { ProfileContext } from '~/lib/contexts/ProfileContext';

export interface SkillProjectProps {
  skill: SkillItem;
}

const getPath = (x: number, y: number, width: number) => {
  const yZero = 265;
  const controlAmount = width! / 4;

  return `M${x},${yZero}
    Q${x + controlAmount},${y} ${x + width / 2},${y}
    Q${x + width - controlAmount},${y} ${x + width},${yZero}Z`;
};

const TriangleBar = ({ fill, x, y, width }: BarProps) => {
  return (
    <path
      d={getPath(x as number, y as number, width!)}
      stroke="none"
      fill={fill}
    />
  );
};

const SkillProjects = ({ skill }: SkillProjectProps) => {
  const { getProjects } = useContext<ProfileBundle>(ProfileContext);
  const colorMode = useColorMode();
  const [secondaryLight, secondaryDark] = useToken('colors', [
    'secondary.light',
    'secondary.dark',
  ]);

  const getProjectsByYear: () => Map<number, ProjectItem[]> =
    useCallback(() => {
      const projectsByYear = new Map();
      getProjects(skill.title).forEach((item: ProjectItem) => {
        _.range(item.yearStart, item.yearEnd + 1).forEach((year) => {
          if (projectsByYear.has(year)) projectsByYear.get(year)!.push(item);
          else projectsByYear.set(year, [item]);
        });
      });
      return projectsByYear;
    }, [getProjects, skill.title]);

  const getProjectsTitles: () => string[] = useCallback(() => {
    return getProjects(skill.title).map(
      (project: ProjectItem) => project.title
    );
  }, [getProjects, skill.title]);

  const getChartData = () => {
    return Array.from(getProjectsByYear().keys()).map((year: number) => {
      let projectsPerYear = { name: year };
      getProjectsByYear()
        .get(year)
        ?.forEach((item: ProjectItem) => {
          projectsPerYear = { ...projectsPerYear, [item.title]: 1 };
        });
      return projectsPerYear;
    });
  };

  return (
    <>
      <Box style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={getChartData()}>
            <CartesianGrid stroke="transparent" />
            <XAxis stroke="transparent" tick={false} />
            <YAxis hide tick={false} />
            {getProjectsTitles().map((project) => (
              <Bar
                key={project}
                dataKey={project}
                stackId="a"
                shape={<TriangleBar dataKey={project} />}
                fill={`${
                  colorMode.colorMode === 'light'
                    ? secondaryLight
                    : secondaryDark
                }55`}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <Box>
        <SimpleGrid columns={getProjectsByYear().size}>
          {Array.from(getProjectsByYear().keys()).map((year: number) => (
            <GridItem key={year} textAlign="center" p={4}>
              <chakra.h1
                fontSize="xl"
                lineHeight={1.2}
                fontWeight="bold"
                w="100%"
              >
                {year}
              </chakra.h1>
              {getProjectsByYear()
                .get(year)
                ?.map((item: ProjectItem) => (
                  <Box>
                    <Link
                      to={`/projects#${item.title
                        .replace(' ', '-')
                        .toLowerCase()}`}
                      textDecoration="underline"
                      as={RouterLink}
                    >
                      {item.title}
                    </Link>
                  </Box>
                ))}
            </GridItem>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default SkillProjects;
