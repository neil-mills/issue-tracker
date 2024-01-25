import StatusBadge from "@/app/components/StatusBadge"
import { Heading, Flex, Card } from "@radix-ui/themes"
import ReactMarkdown from "react-markdown"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const LoadingIssueDetailPage = () => {
  return (
    <div>
   <Skeleton className="max-w-xl" />
    <Flex gap="2" className="my-2">
    <Skeleton width="5rem" />
    <Skeleton width="8rem" />
    </Flex>
    <Card className="prose" mt="4">
    <Skeleton count={3} />
    </Card>
  </div>
  )
}

export default LoadingIssueDetailPage