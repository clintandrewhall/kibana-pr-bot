import { ReactorInput, PrReactor } from './pr_reactor'
import { RELEASE_BRANCH_RE, InvalidLabelLog } from '../../lib'
import { GithubApiPr } from '../../github_api_types'

const RELEVANT_ACTIONS_MISSING_LABEL: ReactorInput['action'][] = [
  'labeled',
  'unlabeled',
  'opened',
  'synchronize',
  'refresh',
  'ready_for_review',
]

interface MissingLabelParams {
  id: string
  filterFn?: (pr: GithubApiPr) => boolean
  labelFn: (label: string) => boolean
  context: string
  errorDesc: string
}

export const missingLabelReactorFactory = ({
  id,
  filterFn = () => true,
  context,
  errorDesc,
  labelFn: missingFn,
}: MissingLabelParams) =>
  new PrReactor({
    id,

    filter: ({ input: { action, pr } }) =>
      pr.state === 'open' &&
      !pr.draft &&
      RELEVANT_ACTIONS_MISSING_LABEL.includes(action) &&
      filterFn(pr),

    async exec({ input: { pr }, githubApi, es, log }) {
      const labelNames = pr.labels.map(label => label.name)
      const missingLabel = !labelNames.some(n => missingFn(n))

      // we must check these in exec() since they can change over time so we don't want
      // to orphan a PR that became a backport PR or was retargetted away from master
      const isBasedOnReleaseBranch = RELEASE_BRANCH_RE.test(pr.base.ref)
      const isBackport = labelNames.includes('backport')

      if (isBasedOnReleaseBranch && missingLabel && !isBackport) {
        await new InvalidLabelLog(es, log).add(pr.number)
        await githubApi.setCommitStatus(pr.head.sha, {
          context,
          description: errorDesc,
          state: 'failure',
        })
      } else {
        await githubApi.setCommitStatus(pr.head.sha, {
          context,
          state: 'success',
        })
      }

      return {
        pr: pr.number,
        prTitle: pr.title,
        labelNames,
        missingLabel,
        isBasedOnReleaseBranch,
        isBackport,
      }
    },
  })

interface AddLabelParams {
  id: string
  filterFn: (pr: GithubApiPr) => boolean
  label: string
}

export const addLabelReactorFactory = ({
  id,
  filterFn,
  label,
}: AddLabelParams) =>
  new PrReactor({
    id,

    filter: ({ input: { action, pr } }) =>
      pr.state === 'open' &&
      !pr.draft &&
      RELEVANT_ACTIONS_MISSING_LABEL.includes(action) &&
      filterFn(pr),

    async exec({ input: { pr, action }, githubApi, log }) {
      log.info(`pr #${pr.number} [action=${action}]`, { action })

      const labels = [...pr.labels.map(label => label.name), label]

      await githubApi.setPrLabels(pr.number, labels)

      return {
        pr: pr.number,
        prTitle: pr.title,
      }
    },
  })
