// Хост
const host = 'http://localhost:8090/';
// Запрос на получение всех объявлений
export const getAllAds = async () => {
    try {
      const response = await fetch(`${host}ads`, {
        method: 'GET'
      });
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
};
// Запрос на получение объявлений по id
export const getAds = async (id) => {
  try {
    const response = await fetch(`${host}ads/${id}`, {
      method: 'GET'
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
// Запрос на получение всех комментариев по обьявлению
export const getAllCommets = async (id) => {
  try {
    const response = await fetch(`${host}ads/${id}/comments`, {
      method: 'GET'
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};