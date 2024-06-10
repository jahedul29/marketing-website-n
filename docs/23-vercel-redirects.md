# Redirections

When launching a new site, we often need to create redirects from the old url to new ones. In order
to make this process easier for non-developers, the truth is maintained in a Google Spreadsheet and
we have a simple script to update our code from it.

## Setup

1.  Make sure a proper spreadsheet id is set as the `SPREADSHEET_ID` variable in the file
    `npm run redirects`. If it is not, you will need to get it's in the spreadsheet's url.
2.  Make sure anonymous users can read the document.
3.  Make sure that the redirections are all in the first sheet.
4.  Make sure the document contains a header line.
5.  Make sure the document has those 3 columns as the A,B,C: OLD URL, NEW URL, PERMANENT.
6.  Make sure the document is order Z-A on the OLD column.

## Format

Each column must respect its format restrictions

### OLD

1.  Must start with a `/`.
2.  Pattern matching is done via the
    [next js convention](https://vercel.com/docs/cli#project-configuration/redirects).
3.  **Cannot be EMPTY**

### NEW

1.  Must start with a `/`.
2.  Can reu-use the same pattern matching, or not.
3.  **CAN** be empty: our script ignores redirections to an empty url. This is useful to keep old
    url in the doc, but still handle their redirection with a pattern matching rule below.

### PERMANENT

By default, redirections are permanent. If _anything_ other then `false` (case insensitive) is
present, it is interpreted as `true`, including the empty value.

## How to run

When properly configured, run `npm run redirects`, check the diff to validate and then commit the
resulting vercel.json file.
