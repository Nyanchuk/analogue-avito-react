// Хост
const host = "http://localhost:8090/";
// Запрос на получение всех объявлений
export const getAllAds = async () => {
  try {
    const response = await fetch(`${host}ads`, {
      method: "GET",
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
// Запрос на получение объявлений по id
export const getAds = async (id) => {
  try {
    const response = await fetch(`${host}ads/${id}`, {
      method: "GET",
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
// Запрос на получение всех комментариев по обьявлению
export const getAllCommets = async (id) => {
  try {
    const response = await fetch(`${host}ads/${id}/comments`, {
      method: "GET",
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
// Регистрация пользователя
export const sendRegistrationDataToServer = async ({password, role, email, name, surname, phone, city}) => {
  try {
    const response = await fetch(`${host}auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
        role: role,
        email: email,
        name: name,
        surname: surname,
        phone: phone,
        city: city,
        id: 0
      }),
    });

    if (!response.ok) {
      throw new Error("Ошибка при отправке данных на сервер");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
