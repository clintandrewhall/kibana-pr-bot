import { GithubApiIssue, GithubApiPr } from '../../../../github_api_types'
import { needsImpactLabelReactor } from './needs_impact'
import { needsLevelOfEffortLabelReactor } from './needs_loe'
import { needsTeamLabelReactor } from './needs_team'

export const LABEL_IMPACT_PREFIX = 'impact:'
export const LABEL_LOE_PREFIX = 'loe:'
export const LABEL_NEEDS_IMPACT = `${LABEL_IMPACT_PREFIX}needs-assessment`
export const LABEL_NEEDS_LOE = `${LABEL_LOE_PREFIX}needs-research`
export const LABEL_PRESENTATION_TEAM = 'Team:Presentation'
export const LABEL_CANVAS = 'Feature:Canvas'
export const LABEL_DASHBOARD = 'Feature:Dashboard'

export const hasTeamPresentationLabel = (item: GithubApiIssue | GithubApiPr) =>
  item.labels.some(label => label.name.includes(LABEL_PRESENTATION_TEAM))

export const hasCanvasOrDashboardLabel = (item: GithubApiIssue | GithubApiPr) =>
  item.labels.some(
    label =>
      label.name.includes(LABEL_CANVAS) || label.name.includes(LABEL_DASHBOARD),
  )

export const presentationTeamReactors = [
  needsImpactLabelReactor,
  needsLevelOfEffortLabelReactor,
  needsTeamLabelReactor,
]
