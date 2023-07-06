const { elasticSearchClient } = require("./utils");

const getProducts = async (req, res) => {
  const { searchItem, items, pageNumber } = req.query;
  let query;

  const pageSize = parseInt(items) || 12;
  const offset = (parseInt(pageNumber) - 1) * pageSize;

  if (searchItem) {
    query = {
      query: {
        bool: {
          should: [
            {
              match: {
                title: {
                  query: searchItem,
                  fuzziness: "AUTO",
                },
              },
            },
            {
              match: {
                category: {
                  query: searchItem,
                  fuzziness: "AUTO",
                },
              },
            },
          ],
        },
      },
    };
  }

  const searchParams = {
    index: "products",
    body: query,
    size: pageSize,
    from: offset,
  };

  const results = (
    await elasticSearchClient.search(searchParams)
  ).hits.hits.map(({ _source }) => _source);

  const totalHits = (await elasticSearchClient.count({ index: "products", body: query })).count;

  const totalPages = Math.ceil(totalHits / pageSize);

  const response = {
    data: results,
    previousPage: pageNumber > 1,
    nextPage: pageNumber < totalPages,
  };

  res.send(response);
};

const getFeaturedProducts = async (req, res) => {
  const searchFeaturedProducts = async (featuredIds) => {
    const query = {
      query: {
        bool: {
          should: featuredIds.map((id) => ({ term: { featured: id } })),
        },
      },
    };
    const results = await elasticSearchClient.search({
      index: "products",
      body: query,
      size: 10000,
    });
    return results.hits.hits;
  };

  const getFeaturedProducts = (results, featuredIds) => {
    const products = featuredIds.flatMap((id) =>
      results
        .filter((product) => product._source.featured === id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 10)
        .map((product) => product._source)
    );
    return products;
  };

  const { featured = "1,2" } = req.query;
  const featuredIds = featured.split(",").map(Number);
  const results = await searchFeaturedProducts(featuredIds);
  const featuredProducts = getFeaturedProducts(results, featuredIds);
  res.send(featuredProducts);
};

const getCategories = async (req, res) => {
  res.send(
    (
      await elasticSearchClient.search({
        index: "categories",
      })
    ).hits.hits[0]._source.categories.sort()
  );
};

const postClickInfo = async (req, res) => {
  await elasticSearchClient.updateByQuery({
    index: "providers",
    refresh: true,
    body: {
      script: {
        lang: "painless",
        source: 'ctx._source["count"] += 1',
      },
      query: {
        match: {
          provider: req.body.provider,
        },
      },
    },
  });
  res.send("");
};

module.exports = {
  getProducts,
  getFeaturedProducts,
  getCategories,
  postClickInfo,
};
