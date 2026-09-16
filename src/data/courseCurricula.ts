import { CourseCurriculum, CourseModuleLesson, WorkedExampleStep, FieldSopItem, KeySection } from './curriculumTypes';
import { STAT_METHODS_CURRICULA } from './curricula/statMethods';
import { NATIONAL_ACCOUNTS_CURRICULA } from './curricula/nationalAccounts';
import { SDG_AND_COMPUTING_CURRICULA } from './curricula/sdgAndComputing';
import { GOVERNANCE_AND_LEADERSHIP_CURRICULA } from './curricula/governanceAndLeadership';

export type { CourseCurriculum, CourseModuleLesson, WorkedExampleStep, FieldSopItem, KeySection };

export const COURSE_CURRICULA: Record<string, CourseCurriculum> = {
  ...STAT_METHODS_CURRICULA,
  ...NATIONAL_ACCOUNTS_CURRICULA,
  ...SDG_AND_COMPUTING_CURRICULA,
  ...GOVERNANCE_AND_LEADERSHIP_CURRICULA,
};
