import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';

import User from './modules/user';
import Post from './modules/post';
import Image from './modules/image';
import Comment from './modules/comment';
import Like from './modules/like'


export const history = createBrowserHistory();

const rootReducer = combineReducers({
    user: User,
    post: Post,
    image: Image,
    comment: Comment,
    like: Like,
    router: connectRouter(history),
})

const middlewares = [thunk.withExtraArgument({history: history})];

// 지금이 어느 환경인 지 알려준다. (개발환경, 프로덕션(배포)환경 등) ex) build는 배포환경
const env = process.env.NODE_ENV;
// 개발환경일 때에만 logger에서 redux-logger를 요청하고 middlewares에 넣어준다.
if (env === 'development') {
    const { logger } = require ('redux-logger');
    middlewares.push(logger);
}
// Redux Devtools 익스텐션을 사용하기 위한 세팅 - 윈도우일 때 리덕스 데브툴즈가 존재한다면 사용하도록 구성해라는 코드라는 정도로 이해.
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();