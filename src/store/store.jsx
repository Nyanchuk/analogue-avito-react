import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { thunk } from 'redux-thunk';

// Функция для инициализации состояния
const loadState = () => {
  try {
    const tokenExists = localStorage.getItem('accessToken');
    if (tokenExists) {
      return {
        product: {
          tokenExists: true
        }
      };
    } else {
      return {
        product: {
          tokenExists: false
        }
      };
    }
  } catch (error) {
    // Обработка ошибок при получении данных из localStorage 
    return undefined;
  }
};

const store = createStore(
  rootReducer,
  loadState(),
  applyMiddleware(thunk)

);

export default store;
