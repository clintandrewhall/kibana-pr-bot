import { missingLabelReactorFactory } from '../../factory'
import { hasCanvasOrDashboardLabel, LABEL_LOE_PREFIX, LABEL_NEEDS_LOE } from '.'

export const needsLevelOfEffortLabelReactor = missingLabelReactorFactory({
  id: 'presentation_team_issue_loe',
  filterFn: issue =>
    hasCanvasOrDashboardLabel(issue) &&
    !issue.labels.some(label => label.name.startsWith(LABEL_LOE_PREFIX)),
  label: LABEL_NEEDS_LOE,
})
