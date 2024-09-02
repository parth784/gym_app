import axios from 'axios'
export const fetchData = async (url, options) => {
  const res = await axios.request(url, options);
  return res.data;
};

export const exerciseOptions = {
  method: 'GET',
  params: {limit: '100'},
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  },
};

export const exerciseOptionsYoutube = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
  }
}