import { Box, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import type { BarProps } from 'recharts';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
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

const data = JSON.parse(
  '[{"name":"2021","project 1":2,"project 2": 1},{"name":"2022","project 1":2,"project 2": 1}]'
);

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

const CustomTooltip = () => {
  return <Text> ciiciococ </Text>;
};

const SkillProjects = ({ skill }: SkillProjectProps) => {
  const { getProjects } = useContext<ProfileBundle>(ProfileContext);

  const projects = Object.keys(data[0]).filter((key) => key !== 'name');

  return (
    <>
      <Box style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            {projects.map((project) => (
              <Bar
                key={project}
                dataKey={project}
                stackId="a"
                shape={<TriangleBar dataKey={project} />}
                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}44`}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Box>
      {getProjects(skill.title).map((project: ProjectItem) => (
        <Text>{project.title}</Text>
      ))}
    </>
  );
};

export default SkillProjects;
