import axios from 'axios';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchCoinList = (page: number, perPage: number) => 
  axios.get(`${API_BASE_URL}/coins/markets`, {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: perPage,
      page,
    },
  }).then((res) => res.data);

export const fetchCoinDetails = (id: string) => 
  axios.get(`${API_BASE_URL}/coins/${id}`).then((res) => res.data);

export const fetchCoinMarketChart = (id: string, days: string) => 
  axios.get(`${API_BASE_URL}/coins/${id}/market_chart`, {
    params: { vs_currency: 'usd', days },
  }).then((res) => res.data);
