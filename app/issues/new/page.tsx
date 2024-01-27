import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';

interface Props {
  params: { id: string };
}

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = async ({ params }: Props) => {
  return <IssueForm />;
};

export default NewIssuePage;
