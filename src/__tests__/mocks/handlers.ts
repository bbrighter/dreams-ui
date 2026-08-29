import { createStaticHandler } from "react-router-dom";

import { createCategories } from "../fixtures/categories";
import { createDream, createDreams } from "../fixtures/dreams";
import { createCategoriesCount, createStatistics } from "../fixtures/statistics";
import * as authHandlers from "./authHandlers";
import * as categoryHandlers from "./categoryHandlers";
import * as dreamCategoriesHandlers from "./dreamCategoriesHandler";
import * as dreamHandlers from "./dreamsHandlers";
import * as statisticsHandler from "./statisticsHandler";

export default [
  dreamHandlers.deleteDreamHandler,
  dreamHandlers.getDreamHandler(createDream()),
  dreamHandlers.getDreamPrivateHandler,
  dreamHandlers.getDreamsHandler(createDreams()),
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
  categoryHandlers.getCategoriesHandler(createCategories()),
  categoryHandlers.patchCategoryName,
  categoryHandlers.patchCategoryType,
  categoryHandlers.postCategoryMergeHandler(),

  authHandlers.postLoginHandler(),
  authHandlers.postLogoutHandler(),

  statisticsHandler.getCountCategoriesHandler(createCategoriesCount()),
  statisticsHandler.getCountCategoriesMonthlyHandler(createStatistics()),
];
