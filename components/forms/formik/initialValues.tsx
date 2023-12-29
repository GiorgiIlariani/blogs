export const initialValues = {
  image: (typeof window !== "undefined" &&
    JSON.parse(sessionStorage.getItem("image")!)) || {
    name: "",
    url: "",
    size: 0,
  },
  author:
    (typeof window !== "undefined" && sessionStorage.getItem("author")) || "",
  title:
    (typeof window !== "undefined" && sessionStorage.getItem("title")) || "",
  description:
    (typeof window !== "undefined" && sessionStorage.getItem("description")) ||
    "",
  publish_date:
    (typeof window !== "undefined" && sessionStorage.getItem("publish_date")) ||
    "",
  categories:
    (typeof window !== "undefined" &&
      JSON.parse(sessionStorage.getItem("categories")!)) ||
    [],
  email:
    (typeof window !== "undefined" && sessionStorage.getItem("email")) || "",
};
