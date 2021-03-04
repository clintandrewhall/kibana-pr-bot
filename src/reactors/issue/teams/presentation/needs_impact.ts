import {
  hasCanvasOrDashboardLabel,
  LABEL_IMPACT_PREFIX,
  LABEL_NEEDS_IMPACT,
} from '.'
import { missingLabelReactorFactory } from '../../factory'

export const needsImpactLabelReactor = missingLabelReactorFactory({
  id: 'presentation_team_issue_impact',
  filterFn: issue =>
    hasCanvasOrDashboardLabel(issue) &&
    !issue.labels.some(label => label.name.startsWith(LABEL_IMPACT_PREFIX)),
  label: LABEL_NEEDS_IMPACT,
})
