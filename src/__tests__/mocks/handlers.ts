import * as authHandlers from "./authHandlers";
import * as categoryHandlers from "./categoryHandlers";
import * as dreamCategoriesHandlers from "./dreamCategoriesHandler";
import * as dreamHandlers from "./dreamsHandlers";
import * as statisticsHandler from "./statisticsHandler";

export default [
  dreamHandlers.deleteDreamHandler,
  dreamHandlers.getDreamHandler(),
  dreamHandlers.getDreamPrivateHandler,
  dreamHandlers.getDreamsHandler(),
  dreamHandlers.getDreamsPrivateHandler,
  dreamHandlers.patchDreamFinalizeHandler,
  dreamHandlers.patchDreamHandler,
  dreamHandlers.patchPrivateDreamHandler,
  dreamHandlers.postDreamsHandler(),

  dreamCategoriesHandlers.deleteDreamCategory,
  dreamCategoriesHandlers.deleteDreamPerson,
  dreamCategoriesHandlers.putDreamCategory(),
  dreamCategoriesHandlers.postDreamCategory(),

  categoryHandlers.deleteCategory,
  categoryHandlers.getCategoriesHandler(),
  categoryHandlers.patchCategoryName,
  categoryHandlers.patchCategoryType,
  categoryHandlers.postCategoryMergeHandler(),

  authHandlers.postLoginHandler(),
  authHandlers.postLogoutHandler(),

  statisticsHandler.getCountCategoriesHandler(),
  statisticsHandler.getCountCategoriesMonthlyHandler(),
];
