export default function(app) {

  app.get('/new', function(req, res) {
    let config = res.locals.config;
    console.log(config.fields.main)
    res.render('new', {
      title: "Fire CMS",
      config
    });
  });

  app.post('/save', function (req, res) {

    var store = res.locals.store;
    var action = res.locals.action;

    let{title, description} = req.body;

    console.log(req.body)

    let results = {
      title: title,
      description: description
    }
    action.saveData(results);
    res.redirect('/view');
  });

  app.get('/delete/:id', async function(req, res) {
    var id = req.params.id;
    var action = res.locals.action;
    await action.remove(id);
    res.redirect('/view');
  });
  

  app.post('/edit/:id', async function (req, res) {
    var id = req.params.id;
    var store = res.locals.store;
    var action = res.locals.action;

    let{title, description} = req.body;

    console.log(req.body)

    let results = {
      title: title,
      description: description
    }

    await action.update(id, results);
    res.redirect('/view');
  });

}
