export const signUpPath = "/sign-up"
export const loginPath = "/login"
export const dashboardPath = "/dashboard"


//admin Route
export const ADMIN_PREFIX = "/admin";

//CRUD Category
export const createCategoryPath = "/admin/categories/create-categories"
export const updateCategoryPath = (params : string) =>  `/admin/categories/edit-categories/${params}`
export const deleteCategoryPath = (params : string) =>  `/admin/categories/delete-categories/${params}`
export const categoriesdashboardPath = "/admin/categories"


//CRUD Questions
export const createQuestionPath = "/admin/questions/create-questions"
export const questionDashboardWithCategoryNamePath = (params : string) =>  `/admin/categories/${params}/questions`
export const editQuestionPath = (params : string) =>  `/admin/questions/edit-questions/${params}`
