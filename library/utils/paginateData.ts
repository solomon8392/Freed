function parseData(data: any) {
  // If the data is an array, return that
  if (Array.isArray(data)) {
    return data;
  }

  // Some endpoints respond with 204 No Content instead of empty array
  //   when there is no data. In that case, return an empty array.
  if (!data) {
    return [];
  }

  // Otherwise, the array of items that we want is in an object
  // Delete keys that don't include the array of items
  delete data.incomplete_results;
  delete data.repository_selection;
  delete data.total_count;
  // Pull out the array of items
  const namespaceKey = Object.keys(data)[0];
  data = data[namespaceKey];

  return data;
}

function getPaginatedData(octokit: any) {
  return async function (url: string, options: object) {
    const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i;
    let pagesRemaining = true;
    let data: any[] = [];

    while (pagesRemaining) {
      const response = await octokit.request(`GET ${url}`, {
        per_page: 100,
        ...options,
      });

      const parsedData = parseData(response.data);
      data = [...data, ...parsedData];

      const linkHeader = response.headers.link;

      pagesRemaining = !!linkHeader && !!linkHeader.includes(`rel=\"next\"`);

      if (pagesRemaining) {
        const match = linkHeader?.match(nextPattern);
        if (match) {
          url = match[0];
        } else {
          pagesRemaining = false; // Ensure loop termination if no match is found
        }
      }
    }

    return data;
  };
}

export default getPaginatedData;
