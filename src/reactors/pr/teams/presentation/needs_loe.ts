import {
  hasCanvasOrDashboardLabel,
  LABEL_NEEDS_LOE,
  LABEL_LOE_PREFIX,
} from '../../../issue/teams/presentation'
import { missingLabelReactorFactory } from '../../factory'

export const needsLevelOfEffortLabelReactor = missingLabelReactorFactory({
  id: 'presentation_team_pr_needs_loe',
  context: 'prbot:level of effort label',
  errorDesc: 'A Presentation Team PR requires a loe:* label',
  filterFn: pr => hasCanvasOrDashboardLabel(pr),
  labelFn: label =>
    label.startsWith(LABEL_LOE_PREFIX) && label !== LABEL_NEEDS_LOE,
})
