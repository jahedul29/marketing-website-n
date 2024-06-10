# ClickUp integration

We use [ClickUp](https://app.clickup.com/) as our internal planning and bug tracking software. For
each project, we use tasks to plan and follow the design and development life cycle. Maintaining a
proper commit hygiene is hard in itself, having to deal with another platform to record progress is
tedious. By following simple rules you can free yourself from status updates in ClickUp and let a
bot do it for you.

The first thing that need to happen is establishing a link between your branch and click up task(s).
Then, we can automate status changes in ClickUp based on where commits are merged.

As per [ClickUp's own doc](https://docs.clickup.com/en/articles/856285-github), we tie branches,
commits and PR to specific tasks in ClickUp by using the `CU-XXXX` syntax. We can also update status
from a commit with the square braquet notation `CU-XXXX[status]`.

## Workflow

Even though some steps are not mandatory, following this workflow will make sure your tasks are
always properly updated.

1.  Pick a task in ClickUp. On each task, there is a github button. If you hover over it, there is a
    button for you to copy the `CU-XXXX` of the task.

2.  Create a branch with one or more `CU-XXXX` ids in it. This will link task(s) with this branch.

3.  When creating the first commit, add the same `CU-XXXX` ids in the commit's message body.

4.  When opening the PR, make sure to edit the template to add `CU-XXXX[InProgress]` in the PR body.
    This will update the status in ClickUp denoting that work has started.

5.  When merging the PR, make sure `CU-XXXX` ids have been copied in the commit's message body. When
    commits land in integration branches, a github action will run and create a commit with the
    appropriate status, in a corresponding `clickup/*` branch. This way, status on task will always
    reflect where they are in integration environnement.

## Project setup

When the github repos are created, we
[create orphan branches](00-create-new-project.md#ClickUp-branches) for the actions to commit in. We
also need to add the new repos in ClickUp. This is a one time operation that needs to be done by a
ClickUp admin. If you are not a ClickUp admin, ask to one in the #dev channel in Slack.

1.  Go to the Deux Huit Huit space settings.
2.  Click on "Integrations"
3.  Click on "github"
4.  Under the "My repositories from GitHub" section, search and add the proper repos.
5.  Under the "GitHub repositories added to ClickUp" section, add your repos to the "Projets" space.
