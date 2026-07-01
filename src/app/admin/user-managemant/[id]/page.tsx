import UserDetailPage from '@/features/admin/user-managemant/components/user-details-page'

type Prop = {
  params : Promise<{id : string}>
}

const page = async ({params} : Prop) => {

  const {id} = await params;

  return (
    <div>
        <UserDetailPage userId={id} />
    </div>
  )
}

export default page