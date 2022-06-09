const Task = require('../../db/models/task/index');

module.exports.getAllTasks = (req, res) => {
  Task.find().then(result => {
    res.send({data: result});
  });
};

module.exports.createNewTask = (req, res) => {
  const task = new Task(req.body);
  task.save().then(result => {
    res.send({data:result});
  });
};

module.exports.deleteTask = (req, res) => {
  const { _id } = req.query;
  console.log('req.query', req.query);
  Task.deleteOne({ _id })
    .then(result => {
      console.log('res',result);
      res.send({ message: 'OK' });
    })
    .catch((err) => {
      res.status(400).send(`Bad Requset`)
    });
};

module.exports.changeTaskInfo = (req, res) => {
  console.log('req.body', req.body);
  const { _id } = req.body;
  Task.findOneAndUpdate({ _id }, req.body).then(result => {
    console.log('result', result);
    res.send(result);
  })
  .catch((err) => {
    res.status(400).send('Bad Request')
  });
};