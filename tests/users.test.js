
const request = require('supertest');
const app = require('./../src/app');
const {Users} = require('./../src/models/users');
const {userOne, userOneId, setUpDatabase} = require('./fixtures/db');

beforeEach(setUpDatabase);

test('should create/sign-up a new user, 201 expected', async () => {
    const response = await request(app)
    .post('/api/users')
    .send({
        name: "prasad's test 1",
        email: "prasads367@gmail.com",
        password: "123456789"
    })
    .expect(201);

    const user = await Users.findById(response.body.user._id);
    expect(user).not.toBeNull();

    expect(response.body).toMatchObject({
        user: {
            name: "prasad's test 1",
            email: "prasads367@gmail.com"
        },
        token: user.tokens[0].token
    });
    expect(user.password).not.toBe('123456789');

});

test('should login an existing user', async () => {
    const response = await request(app)
    .post('/api/users/login')
    .send({
        email: userOne.email,
        password: userOne.password
    })
    .expect(200);

    const user = await Users.findById(userOneId);
    expect(user).not.toBeNull();
    expect(response.body).toMatchObject({
        token: user.tokens[1].token
    });

});

test('should not login an existing user when invalid credentials are passed', async () => {
    await request(app)
    .post('/api/users/login')
    .send({
        email: userOne.email,
        password: '1234568761'
    })
    .expect(400);
});

test('on authentication, user should see his profile', async () => {
    await request(app)
    .get('/api/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}` )
    .send()
    .expect(200)
});

test('on authentication failure, user should not see his profile', async () => {
    await request(app)
    .get('/api/users/me')
    .send()
    .expect(401)
});

test('on authentication failure, user should not be able to delete his profile', async () => {
    await request(app)
    .delete('/api/users/me')
    .send()
    .expect(401)
});

test('on authentication, user should be able to delete his profile', async () => {
    await request(app)
    .delete('/api/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    const user = await Users.findById(userOneId);
    expect(user).toBeNull();
});

test('on authentication should upload avatar', async () => {
    await request(app)
    .post('/api/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200)
});

test('on authentication, should update user details', async () => {
    const response = await request(app)
    .patch('/api/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: "prasad's test2 updated"
    })
    .expect(200)

    const user = await Users.findById(response.body.userProfile._id);
    expect(user.name).toBe("prasad's test2 updated")
});

test('on authentication, should notify while trying to update invalid properties', async () => {
    const response = await request(app)
    .patch('/api/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: "prasad's test2 updated",
        location: "bangalore"
    })
    .expect(400)
});

// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated

