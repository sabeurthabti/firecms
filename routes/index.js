import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../model/reducers.js';
import {getData, GET_DATA} from '../model/actions.js';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);

module.exports = function (app) {
  console.log(store)
  app.get('/', function (req, res) {
    var isDev = process.env.NODE_ENV !== 'production'



    var data = store.getState().getData.links;
    res.render('main', {
      year: JSON.stringify(data.year)
    });
  });

  app.get('/abc', function (req, res) {
    var q = req.query.year || '2016';
    console.log(q)
    store.dispatch(getData({"year": q }));
    res.end("done", store)
  });

};