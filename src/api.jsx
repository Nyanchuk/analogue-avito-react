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
  console.log(password, role, email, name, surname, phone, city)
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
        city: city
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
// Аутентификация пользователя
export const sendAuthenticationToServer = async ({password, email}) => {
  try {
    const response = await fetch(`${host}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
        email: email,
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
// Обновление токена
export const refreshAccessToken = async ({ accessToken, refreshToken }) => {
  try {
    const response = await fetch(`${host}auth/login`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ access_token: accessToken, refresh_token: refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Ошибка при обновлении токена");
    }

    const data = await response.json();
    if (data.access_token && data.refresh_token) {
      localStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('refreshToken', data.refresh_token);
    }
    else {
      throw new Error("Токен не был получен после обновления");
    }
    return {
      status: response.status,
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    };
  } catch (error) {
    console.error(error);
    // Логика для обработки ошибки обновления токена
  }
};
// Отправка комментария
export const getNewCommentText = async (id, text, accessToken) => {
  try {
    const response = await fetch(`${host}ads/${id}/comments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
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
// Получить текущего пользователя
export const getMyProfile = async (accessToken) => {
  try {
    const response = await fetch(`${host}user`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
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