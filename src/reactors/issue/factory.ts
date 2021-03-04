import { GithubApiIssue } from '../../github_api_types'
import { IssueReactorInput, IssueReactor } from './issue_reactor'

const RELEVANT_ACTIONS_MISSING_LABEL: IssueReactorInput['action'][] = [
  'edited',
  'refresh',
  'opened',
]

interface MissingLabelParams {
  id: string
  filterFn: (issue: GithubApiIssue) => boolean
  label: string
}

export const missingLabelReactorFactory = ({
  id,
  filterFn,
  label,
}: MissingLabelParams) => {
  return new IssueReactor({
    id,

    filter: ({ input: { action, issue } }) =>
      issue.state === 'open' &&
      RELEVANT_ACTIONS_MISSING_LABEL.includes(action) &&
      !issue.labels.some(l => l.name === label) &&
      filterFn(issue),

    async exec({ input: { issue, action }, log, githubApi }) {
      log.info(`issue #${issue.number} [action=${action}]`, { action })
      const labels = [...issue.labels.map(l => l.name), label]

      await githubApi.setIssueLabels(issue.number, labels)

      return {
        issue: issue.number,
        issueTitle: issue.title,
      }
    },
  })
}
