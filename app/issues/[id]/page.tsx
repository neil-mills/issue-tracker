import StatusBadge from "@/app/components/StatusBadge"
import { Grid, Card, Flex, Heading, Text, Box, Button } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from "next/link"

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
      <Heading as="h2">{issue.title}</Heading>
      <Flex gap="2" className="my-2">
      <StatusBadge status={issue.status} />
      <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
      <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
      </Box>
      <Box>
        <Button><Pencil2Icon /><Link href={`/issues/${issue.id}/edit`}>Edit issue</Link></Button>
      </Box>
    </Grid>
  )
}

export default IssueDetailPage