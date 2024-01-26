import IssueForm from "../_components/IssueForm"

interface Props {
  params: { id: string }
}
const NewIssuePage = async({ params }: Props ) => {
 
  return (
    <IssueForm />
  )
}

export default NewIssuePage