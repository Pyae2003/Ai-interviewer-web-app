
export const signUpPath = "/sign-up"
export const loginPath = "/login"
export const dashboardPath = "/dashboard"
export const resetPasswordPath = "/reset-password"

export const categoryGroupPath = (slug : string) => `/${slug}`

//
export const histroyPath = "/history"
export const interviewResultPath =(params : string) =>  `/interviews/${params}/result`
export const interviewProcessingPath =(params : string) =>  `/interviews/${params}/processing`
export const histroyDetailPath = (params : string ) => `/history/${params}`

//Interviews
export const interviewPath ="/interviews"
export const interviewQuestionsPath =(params : string) => `/interviews/${params}`

//admin Route
export const ADMIN_PREFIX = "/admin";
export const adminDashboardPath = "/admin/dashboard"
export const adminUserManagemant = "/admin/user-managemant"
export const adminInterviewsPath = "/admin/interviews"

//CRUD Category
export const createCategoryPath = "/admin/categories/create-categories"
export const updateCategoryPath = (params : string) =>  `/admin/categories/edit-categories/${params}`
export const deleteCategoryPath = (params : string) =>  `/admin/categories/delete-categories/${params}`
export const categoriesdashboardPath = "/admin/categories"


//CRUD Questions
export const createQuestionPath = "/admin/questions/create-questions"
export const questionsDashboardPath = "/admin/questions"
export const questionDashboardWithCategoryNamePath = (params : string) =>  `/admin/categories/${params}/questions`
export const editQuestionPath = (params : string) =>  `/admin/questions/edit-questions/${params}`

//userDetail

export const userDetailPath =(params : string) => `/admin/user-managemant/${params}`

//CRUD Categories Group
export const createCategoryGroupPath =  `/admin/category-groups/create-category-groups`;
export const updateCategoryGroupPath = (params : string) => `/admin/category-groups/update-category-groups/${params}`


