
const request = require('supertest');
const app = require('./../src/app');
const {Tasks} = require('./../src/models/tasks');
const {userOne, userOneId, 
    userTwo, userTwoId, 
    taskOne, taskTwo, taskThree, 
    setUpDatabase} = require('./fixtures/db');

beforeEach(setUpDatabase);

test('should create a task with the assosciated user', async () => {
    const response = await request(app)
    .post('/api/tasks')
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send({
        description: 'task 4',
        completed: true
    })
    .expect(201);

    const task = await Tasks.findById(response.body.task._id);
    expect(task).not.toBeNull();
    expect(task.completed).toBe(true);
});

test('on authentication,get tasks', async () => {
    const response = await request(app)
    .get('/api/tasks/me')
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(200);

    expect(response.body.UserTasks.length).toBe(1);

});

test('on authentication failure, should not delete tasks', async () => {
    await request(app)
    .delete(`/api/tasks/me/${taskThree._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(404);
});

test('on authentication, delete tasks', async () => {
    await request(app)
    .delete(`/api/tasks/me/${taskThree._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(200);
});

// Should not create task with invalid description/completed
// Should not update task with invalid description/completed
// Should delete user task
// Should not delete task if unauthenticated
// Should not update other users task
// Should fetch user task by id
// Should not fetch user task by id if unauthenticated
// Should not fetch other users task by id
// Should fetch only completed tasks
// Should fetch only incomplete tasks
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks

