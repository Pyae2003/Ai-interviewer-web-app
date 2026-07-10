"use server"

import { notFound } from "next/navigation";
import { getCategoryGroupById } from "../query/get-category-groups-with-id";
import { UpdateCategoryGroupsForm } from "./update-category-groups-form";

type UpdateCategoryGroupsPageProp = {
    id : string
}

const UpdateCategoryGroupsPage = async({id} : UpdateCategoryGroupsPageProp) => {

    const categoryGroups = await getCategoryGroupById({id});
    
    if(!categoryGroups.data){
        notFound();
    };

  return (
    <div>
        <UpdateCategoryGroupsForm {...categoryGroups.data} />
    </div>
  )
}

export default UpdateCategoryGroupsPage