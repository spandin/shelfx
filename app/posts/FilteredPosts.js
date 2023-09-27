import { findInArrayBy, isNotExported } from "@/lib/sort";

export const filteredPosts = (posts, category, isExported) => {
  switch (category) {
    case "Все":
      if (isExported === "exported") {
        return posts;
      } else {
        return isNotExported(posts);
      }
    case "Косметика":
      if (isExported === "exported") {
        return findInArrayBy(posts, "Косметика");
      } else {
        return isNotExported(findInArrayBy(posts, "Косметика"));
      }
    case "Продукты":
      if (isExported === "exported") {
        return findInArrayBy(posts, "Продукты");
      } else {
        return isNotExported(findInArrayBy(posts, "Продукты"));
      }
    case "Алкоголь":
      if (isExported === "exported") {
        return findInArrayBy(posts, "Алкоголь");
      } else {
        return isNotExported(findInArrayBy(posts, "Алкоголь"));
      }

    case "Химия":
      if (isExported === "exported") {
        return findInArrayBy(posts, "Химия");
      } else {
        return isNotExported(findInArrayBy(posts, "Химия"));
      }

    case "Другое":
      if (isExported === "exported") {
        return findInArrayBy(posts, "Другое");
      } else {
        return isNotExported(findInArrayBy(posts, "Другое"));
      }
    default:
      return posts;
  }
};
