import * as categoryHandlers from './categoryHandlers'
import * as dreamCategoriesHandlers from './dreamCategoriesHandler'
import * as dreamHandlers from './dreamsHandlers'

export default [
    dreamHandlers.deleteDreamHandler,
    dreamHandlers.getDreamHandler(),
    dreamHandlers.getDreamPrivateHandler,
    dreamHandlers.getDreamsHandler(),
    dreamHandlers.getDreamsPrivateHandler,
    dreamHandlers.patchDreamFinalizeHandler,
    dreamHandlers.patchDreamHandler,
    dreamHandlers.postDreamsHandler,

    dreamCategoriesHandlers.deleteDreamCategory,
    dreamCategoriesHandlers.deleteDreamPerson,
    dreamCategoriesHandlers.putDreamCategory,
    dreamCategoriesHandlers.putDreamPerson,

    categoryHandlers.deleteCategory,
    categoryHandlers.getCategories,
    categoryHandlers.patchCategoryName,
    categoryHandlers.patchCategoryType,
    categoryHandlers.postCategoryMerge,
]
