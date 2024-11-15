let baseUrl;

if (process.env.NODE_ENV === "development") {
  baseUrl = "http:/localhost:8000/api";
}

if (process.env.NODE_ENV === "production") {
  baseUrl = "http:/localhost:8000/api";
}
