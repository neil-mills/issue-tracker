import StatusBadge from "@/app/components/StatusBadge"
import { Heading, Text, Flex, Card } from "@radix-ui/themes"
import { notFound } from "next/navigation"

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
    <div>
      <Heading as="h2">{issue.title}</Heading>
      <Flex gap="2" className="my-2">
      <StatusBadge status={issue.status} />
      <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
      <p>{issue.description}</p>
      </Card>
    </div>
  )
}

export default IssueDetailPage