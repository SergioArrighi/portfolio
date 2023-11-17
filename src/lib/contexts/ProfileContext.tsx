import { createContext } from 'react';

export interface HomeData {
  name: string;
  roles: string[];
}

export interface AboutData {
  about: string;
  imageSrc: string;
}

export interface SkillItem {
  icon: string;
  title: string;
  xp: number;
}

export interface SkillData {
  title: string;
  items: SkillItem[];
}

export type SkillsData = {
  intro: string;
  items: SkillData[];
};

export enum WorkTypeEnum {
  'Corporate',
  'Freelance',
}

export interface ExpItem {
  title: string;
  subtitle?: string;
  workType?: WorkTypeEnum;
  workDescriptions: string[];
  start: Date;
  end: Date;
  image: string;
  skills: string[];
}

export interface ExpData {
  title: string;
  items: ExpItem[];
}

export interface ProjectItem {
  title: string;
  description: string;
  yearStart: number;
  yearEnd: number;
  links?: string[];
  images?: string[];
  skills?: string[];
}

export interface ProfileBundle {
  home: HomeData;
  about: AboutData;
  skills: SkillsData;
  experiences: ExpData[];
  projects: ProjectItem[];
  getSkills: (filter: (item: SkillItem) => boolean) => SkillItem[];
  getProjects: (skillTitle: string) => ProjectItem[];
}

export const defaultProfileBundle: ProfileBundle = {
  home: { name: '', roles: [] },
  about: { about: '', imageSrc: '' },
  skills: { intro: '', items: [] },
  experiences: [],
  projects: [],
  getSkills: () => [],
  getProjects: () => [],
};

export const ProfileContext =
  createContext<ProfileBundle>(defaultProfileBundle);
