import { Status } from '.prisma/client'
import { prisma } from '@/prisma/client'
import { Pagination } from '../../components'
import IssueActions from './IssueActions'
import IssueTable, { IssueQuery, columnNames } from './IssueTable'
import { Flex } from '@radix-ui/themes'
import { Metadata } from 'next'
import { Suspense } from 'react'

interface Props {
  searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {
  const status = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined
  const where = { status }
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined
  const page = searchParams?.page ? parseInt(searchParams.page) : 1
  const pageSize = 10
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  })
  const issueCount = await prisma.issue.count({ where })
  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Suspense>
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={issueCount}
        />
      </Suspense>
    </Flex>
  )
}
export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues',
}

export default IssuesPage
