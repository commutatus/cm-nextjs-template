import { isMobile, isTab } from "@helpers/global";

export const initialHelperState = {
  isMobile: isMobile(),
  isTab: isTab(),
};

export const combinedInitialState = {
  helper: initialHelperState,
};

export const statesToBePersisted = [];
