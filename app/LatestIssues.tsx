import { prisma } from '@/prisma/client'
import { Flex, Table, Avatar, Card, Heading } from '@radix-ui/themes'
import { StatusBadge } from './components'
import Link from 'next/link'

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      assignedToUser: true,
    },
  })
  return (
    <Card>
      <Heading size="4" bm="5">
        Latest issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify={'between'}>
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <StatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar
                      fallback="?"
                      src={issue.assignedToUser.image!}
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  )
}

export default LatestIssues
