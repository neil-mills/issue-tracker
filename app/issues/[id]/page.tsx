import StatusBadge from "@/app/components/StatusBadge"
import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import EditIssueButton from "./EditIssueButton"
import IssueDetails from "./IssueDetails"

interface Props {
  params: { id: string }
}

const IssueDetailPage = async ({params}:Props ) => {
  if(typeof parseInt(params.id) !== 'number') notFound()
  const issue = await prisma?.issue.findUnique({
    where: { id: parseInt(params.id)}
  })
  if(!issue) notFound()
  return (
    <Grid columns={{initial: "1", md:"2" }} gap="5">
      <Box>
    <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  )
}

export default IssueDetailPage