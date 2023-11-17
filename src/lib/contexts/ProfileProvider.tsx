import { useCallback, useEffect, useMemo, useState } from 'react';
import type React from 'react';

import type {
  AboutData,
  HomeData,
  ProfileBundle,
  SkillsData,
  ExpData,
  SkillItem,
  SkillData,
  ProjectItem,
} from './ProfileContext';
import { ProfileContext } from './ProfileContext';

type ProfileProviderProps = {
  children: React.ReactNode;
};

const ProfileProvider: React.FC<ProfileProviderProps> = (props) => {
  const { children } = props;
  const [home, setHome] = useState<HomeData>({ name: '', roles: [] });
  const [about, setAbout] = useState<AboutData>({ about: '', imageSrc: '' });
  const [skills, setSkills] = useState<SkillsData>({
    intro: '',
    items: [],
  });
  const [experiences, setExperiences] = useState<ExpData[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  useEffect(() => {
    fetch('profile/profile.json', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        setHome(res.home);
        setAbout(res.about);
        setSkills(res.skills);
        setExperiences(res.experiences);
        setProjects(res.projects);
      })
      .catch((err) => err);
  }, []);

  const getSkills = useCallback(
    (filter: (item: SkillItem) => boolean): SkillItem[] => {
      return skills.items.flatMap((skill: SkillData) => {
        return skill.items.filter(filter).flatMap((item: SkillItem) => item);
      });
    },
    [skills.items]
  );

  const getProjects = useCallback(
    (skillTitle: string) => {
      return projects.filter(
        (project: ProjectItem) => project.skills?.includes(skillTitle)
      );
    },
    [projects]
  );

  const profileBundle: ProfileBundle = useMemo(() => {
    return {
      home,
      about,
      skills,
      experiences,
      projects,
      getSkills,
      getProjects,
    };
  }, [home, about, skills, experiences, projects, getSkills, getProjects]);

  return (
    <ProfileContext.Provider value={profileBundle}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
