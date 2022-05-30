import { HASH_BY_ID, HASH_BY_SLUG } from "@localization";
import { uniqueId, values } from "lodash";

export const generateHashMapFromArray = (array, hashByKey) => {
  const map = {};
  array.forEach((item) => {
    map[item[hashByKey]] = item;
  });
  return map;
};

export const generateArrayFromHashMap = (hashMap) => {
  return values(hashMap);
};

export const generateArrayWithSlug = (array) => {
  return array.map((item) => ({
    ...item,
    [HASH_BY_SLUG]: item.title.toLowerCase().replace(/\s/g, "-"),
  }));
};

const handleKeyTypeValue = (item, key) => {
  let value;
  switch (key) {
    case HASH_BY_ID:
      value = uniqueId();
      break;
    case HASH_BY_SLUG:
      value = item.slug;
      break;
  }
  return value;
};

export const generateArrayWithKey = (array, key) => {
  return array.map((item) => ({
    ...item,
    [key]: handleKeyTypeValue(item, key),
  }));
};
