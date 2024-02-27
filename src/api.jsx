// Хост
const host = "http://localhost:8090/";

// PUT
// Обновление токена
export const refreshAccessToken = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await fetch(`${host}auth/login`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token: accessToken,
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error("Ошибка при обновлении токена");
    }

    const data = await response.json();
    if (data.access_token && data.refresh_token) {
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      };
    } else {
      throw new Error("Токен не был получен после обновления");
    }
  } catch (error) {
    throw error;
  }
};

// GET
// Все объявления
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
// Объявление по id
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
// Все комментарии к объявлению
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
// Текущий юзер
export const getMyProfile = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`${host}user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      return await response.json();
    } else if (response.status === 401) {
      await refreshAccessToken();
      return await getMyProfile();
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    if (
      error.response &&
      (error.response.status === 422 || error.response.status === 500)
    ) {
      console.error("Error updating user data:", error);
    } else {
      throw error;
    }
  }
};

// POST
// Регистрация пользователя
export const sendRegistrationDataToServer = async ({
  password,
  role,
  email,
  name,
  surname,
  phone,
  city,
}) => {
  console.log(password, role, email, name, surname, phone, city);
  try {
    const response = await fetch(`${host}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        role: role,
        email: email,
        name: name,
        surname: surname,
        phone: phone,
        city: city,
      }),
    });

    if (response.status === 201) {
      const data = await response.json();
      return data;
    } else if (response.status === 400) {
      throw new Error("Данный email уже существует");
    } else if (response.status === 422) {
      throw new Error("Данные неверного формата");
    } else {
      throw new Error("Ошибка при отправке данных на сервер");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
// Аутентификация пользователя
export const sendAuthenticationToServer = async ({ password, email }) => {
  try {
    const response = await fetch(`${host}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    });

    if (response.status === 401) {
      const errorData = await response.json();
      if (errorData.detail === "Incorrect password") {
        throw new Error("Неверный пароль");
      } else if (errorData.detail === "Incorrect email") {
        throw new Error("Неверный email");
      }
    }

    if (!response.ok) {
      throw new Error("Ошибка при отправке данных на сервер");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
// Отправка комментария
export const getNewCommentText = async (id, text) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`${host}ads/${id}/comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else if (response.status === 401) {
      await refreshAccessToken(); // Обновляем токен
      return await getNewCommentText(id, text); // Повторно вызываем функцию с новым токеном
    } else {
      throw new Error("Ошибка при отправке данных на сервер");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
// Загрузка аватара пользователя
export const uploadUserPhoto = async (formData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    // Установка правильного Content-Type c указанием границы
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${accessToken}`);

    const response = await fetch(`${host}user/avatar`, {
      method: "POST",
      headers: headers,
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Изображение успешно загружено:", data);
    } else if (response.status === 401) {
      await refreshAccessToken();
      return await uploadUserPhoto(formData);
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Произошла ошибка при загрузке изображения:", error);
    // Обработка ошибок при загрузке изображения
  }
};
// Отправка обвления без фото
export const getNewAdWithoutPhotos = async ({title, description, price}) => {
  try {
    console.log(title, description, price)
    const accessToken = localStorage.getItem("accessToken");
    const priceValue = parseInt(price);
    const response = await fetch(`${host}adstext`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        title: String(title),  // Преобразуем явно в строку
        description: String(description),  // Преобразуем явно в строку
        price: priceValue,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else if (response.status === 401) {
      await refreshAccessToken();
      return await getNewAdWithoutPhotos(title, description, price);
    } else {
      throw new Error("Ошибка при отправке данных на сервер");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
// Отправка нового объявления с фото
export const getNewMyAds = async (title, description, price, photos) => {
  try {
    console.log(photos)
    const formData = new FormData();
    photos.forEach((photo, index) => {
      formData.append(`photo${index}`, photo.file);
    });
    const accessToken = localStorage.getItem("accessToken");
    const url = `${host}ads?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&price=${encodeURIComponent(price)}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else if (response.status === 401) {
      await refreshAccessToken();
      return await getNewMyAds(title, description, price, photos);
    } else {
      throw new Error("Ошибка при отправке данных на сервер");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// PATCH
// Данные текущего юзера
export const setUpdateUser = async ({
  role,
  email,
  name,
  surname,
  phone,
  city,
}) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`${host}user`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: role,
        email: email,
        name: name,
        surname: surname,
        phone: phone,
        city: city,
      }),
    });

    if (response.ok) {
      return await response.json();
    } else if (response.status === 401) {
      await refreshAccessToken();
      return await setUpdateUser({ role, email, name, surname, phone, city });
    } else {
      throw new Error("Failed to update user data");
    }
  } catch (error) {
    if (
      error.response &&
      (error.response.status === 422 || error.response.status === 500)
    ) {
      console.error("Error updating user data:", error);
    } else {
      throw error;
    }
  }
};
