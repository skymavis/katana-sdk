import axios from 'axios';

const trimQueryString = (queryString: string) => queryString.replace(/\n/g, '');

export const fetchGraphQl = async (endpoint: string, queryString: string, variables?: Record<string, any>) => {
  const trimQuery = trimQueryString(queryString);

  const response = await axios.post(
    endpoint,
    {
      query: trimQuery,
      variables,
    },
    {
      timeout: 10000,
    },
  );
  return await response.data;
};
