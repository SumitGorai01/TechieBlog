const getContributors = async () => {
  try {
    let allContributors = [];
    let page = 1;
    const perPage = 10; // GitHub max
    let hasMore = true;

    while (hasMore) {
      const res = await fetch(
        `https://api.github.com/repos/SumitGorai01/TechieBlog/contributors?per_page=${perPage}&page=${page}`
      );
      const contributors = await res.json();

      if (contributors.length === 0) {
        hasMore = false;
      } else {
        allContributors = [...allContributors, ...contributors];
        page++;
      }
    }

    return allContributors;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export { getContributors }
