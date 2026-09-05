import { createCategories } from "../fixtures/categories";
import { createDream, createDreams } from "../fixtures/dreams";
import { createCategoriesCount, createStatistics } from "../fixtures/statistics";
import * as categoryHandlers from "./categoryHandlers";
import * as dreamCategoriesHandlers from "./dreamCategoriesHandler";
import * as dreamHandlers from "./dreamsHandlers";
import * as statisticsHandler from "./statisticsHandler";

export default [
  dreamHandlers.deleteDreamHandler,
  dreamHandlers.getDreamHandler(createDream()),
  dreamHandlers.getDreamsHandler(createDreams()),
  dreamHandlers.patchDreamFinalizeHandler,
  dreamHandlers.patchDreamHandler,
  dreamHandlers.postDreamsHandler(),

  dreamCategoriesHandlers.deleteDreamCategory,
  dreamCategoriesHandlers.deleteDreamPerson,
  dreamCategoriesHandlers.putDreamCategory(),
  dreamCategoriesHandlers.postDreamCategory(),

  categoryHandlers.deleteCategory,
  categoryHandlers.getCategoriesHandler(createCategories()),
  categoryHandlers.patchCategoryName,
  categoryHandlers.patchCategoryType,
  categoryHandlers.postCategoryMergeHandler(),

  statisticsHandler.getCountCategoriesHandler(createCategoriesCount()),
  statisticsHandler.getCountCategoriesMonthlyHandler(createStatistics()),
];
