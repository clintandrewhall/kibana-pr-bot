import { missingLabelReactorFactory } from '../../factory'
import {
  hasCanvasOrDashboardLabel,
  hasTeamPresentationLabel,
  LABEL_PRESENTATION_TEAM,
} from '.'

export const needsTeamLabelReactor = missingLabelReactorFactory({
  id: 'presentation_team_issue_label',
  filterFn: issue =>
    hasCanvasOrDashboardLabel(issue) && !hasTeamPresentationLabel(issue),
  label: LABEL_PRESENTATION_TEAM,
})
