import {
  Box,
  Text,
  useColorMode,
  useColorModeValue,
  useToken,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import type { BarProps } from 'recharts';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
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

const getPath = (x: number, y: number, width: number, height: number) => {
  const yZero = (y as number) + height!;
  const controlAmount = width! / 4;

  return `M${x},265
    Q${x + controlAmount},${y} ${x + width / 2},${y}
    Q${x + width - controlAmount},${y} ${x + width},265Z`;
};

const TriangleBar = ({ fill, x, y, width, height }: BarProps) => {
  const { firstHeight, setHeight } = useState(0);

  console.log(`${x} ${y} ${width} ${height}`);
  return (
    <path
      d={getPath(x as number, y as number, width!, height!)}
      stroke="none"
      fill={fill}
    />
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={`value-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const SkillProjects = ({ skill }: SkillProjectProps) => {
  const { getProjects } = useContext<ProfileBundle>(ProfileContext);
  const colorMode = useColorMode();

  const [secondaryLight, secondaryDark] = useToken(
    // the key within the theme, in this case `theme.colors`
    'colors',
    // the subkey(s), resolving to `theme.colors.red.100`
    ['secondary.light', 'secondary.dark']
    // a single fallback or fallback array matching the length of the previous arg
  );

  const [activeBar, setActiveBar] = useState(null);

  const handleBarMouseOver = (dataKey) => {
    console.log(dataKey);
  };

  const handleBarMouseLeave = () => {
    //setActiveBar(null);
  };

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
            {projects.map((project, index) => (
              <Bar
                key={index}
                dataKey={project}
                stackId="a"
                shape={<TriangleBar dataKey={project} />}
                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}44`}
                onMouseDown={() => handleBarMouseOver(project)}
                onMouseOver={() => handleBarMouseOver(project)}
                onMouseLeave={handleBarMouseLeave}
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
