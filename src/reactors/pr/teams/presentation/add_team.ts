import { addLabelReactorFactory } from '../../factory'
import {
  hasCanvasOrDashboardLabel,
  hasTeamPresentationLabel,
  LABEL_PRESENTATION_TEAM,
} from '../../../issue/teams/presentation'

export const addPresentationTeamLabelReactor = addLabelReactorFactory({
  id: 'presentation_team_pr_label',
  filterFn: pr =>
    hasCanvasOrDashboardLabel(pr) && !hasTeamPresentationLabel(pr),
  label: LABEL_PRESENTATION_TEAM,
})
