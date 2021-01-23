const mongoose = require('mongoose');
const task = mongoose.model('task');


// get all the Tenants
exports.list_all_tasks = (req, res) => {
  task.find({}, (err, tasks) => {
    if (err) res.send(err);
    res.json(tasks);
  });
};

// create new Tenant
exports.create_a_task = (req, res) => {
  const newtask = new task(req.body);
  newtask.save((err, task) => {
    if (err) res.send(err);
    res.json(task);
  });
};

// read a Tenant details
exports.read_a_task = (req, res) => {
  task.findById(req.params.taskId, (err, task) => {
    if (err) res.send(err);
    res.json(task);
  });
};

//search tenants by name
exports.search_task_by_name = (req, res) => {
  task.find({name: {$regex: req.params.search_query}}, (err, task) => {
    if (err) res.send(err);
    res.json(task);
  });
};

// edit a Tenant details
exports.update_a_task = (req, res) => {
  task.findOneAndUpdate(
    { _id: req.params.taskId },
    req.body,
    { new: true },
    (err, task) => {
      if (err) res.send(err);
      res.json(task);
    }
  );
};

// delete a Tenant
exports.delete_a_task = (req, res) => {
  task.deleteOne({ _id: req.params.taskId }, err => {
    if (err) res.send(err);
    res.json({
      message: 'task successfully deleted',
     _id: req.params.taskId
    });
  });
};
