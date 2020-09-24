const fetcher = (...args) =>
  fetch(...args)
    .then((res) => res.json())
    .then((res) => res.list);
