import { configureStore } from '@reduxjs/toolkit'
import questionsReducer from './reducers/questionsReducer'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
const questionsPersistConfig = {
    key: 'questions',
    storage,
  }
const persistedQuestionsReducer = persistReducer(questionsPersistConfig, questionsReducer)

export const store = configureStore({
    reducer: {questionsReducer:persistedQuestionsReducer},
    middleware: [thunk]

  })
export const persistor = persistStore(store)
