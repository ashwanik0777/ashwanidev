import { asArray, asText, pickArray, pickNumber, pickText } from './fieldUtils';

/*
 * Research projects + research group share these shapes between the standalone
 * ResearchGroupTab and the combined ResearchProjectsAndGroup view.
 *
 * The dashboard editor stores a scholar as { name, topic, year, status } while
 * these tabs rendered { name, program, researchArea, thesis, publications } —
 * which is why "Research Area" and "Thesis" showed up blank and the "Total
 * Publications" tile summed `undefined` into NaN.
 */

export const normalizeProject = (item) => ({
  title: pickText(item, ['title', 'name']),
  description: pickText(item, ['description', 'summary']),
  fundingAgency: pickText(item, ['fundingAgency', 'funding_agency', 'agency']),
  role: pickText(item, ['role']),
  duration: pickText(item, ['duration', 'period']),
  budget: pickText(item, ['budget', 'grantAmount', 'grant_amount', 'amount']),
  status: asText(pickText(item, ['status'], 'ongoing')).toLowerCase(),
  collaborators: pickArray(item, ['collaborators']),
  deliverables: pickArray(item, ['deliverables', 'outcomes']),
});

/** PhD scholars, postdocs and research assistants all normalize the same way. */
export const normalizeGroupMember = (item) => ({
  name: pickText(item, ['name']),
  program: pickText(item, ['program', 'position', 'designation']),
  researchArea: pickText(item, ['researchArea', 'research_area', 'area', 'topic']),
  thesis: pickText(item, ['thesis', 'thesisTopic', 'topic']),
  project: pickText(item, ['project', 'topic']),
  role: pickText(item, ['role', 'position', 'topic']),
  previousInstitute: pickText(item, ['previousInstitute', 'previous_institute', 'institute']),
  duration: pickText(item, ['duration', 'year']),
  year: pickText(item, ['year']),
  status: pickText(item, ['status'], 'ongoing'),
  publications: pickNumber(item, ['publications', 'publicationsCount'], 0),
  email: pickText(item, ['email']),
  profileUrl: pickText(item, ['profileUrl', 'profile', 'url']),
});

/** Total publications across group members, ignoring members with no count. */
export const sumPublications = (...groups) =>
  groups
    .flatMap((group) => asArray(group))
    .reduce((sum, member) => sum + pickNumber(member, ['publications'], 0), 0);

export const GROUP_STATUS_COLORS = {
  'first year': 'bg-green-100 text-green-800',
  'second year': 'bg-blue-100 text-blue-800',
  'third year': 'bg-purple-100 text-purple-800',
  ongoing: 'bg-green-100 text-green-800',
  submitted: 'bg-blue-100 text-blue-800',
  awarded: 'bg-purple-100 text-purple-800',
  completed: 'bg-purple-100 text-purple-800',
};
