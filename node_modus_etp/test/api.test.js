const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('API Routes', () => {
  it('should get all items', (done) => {
    chai
      .request(app)
      .get('/api/items')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should create a new item', (done) => {
    const newItem = {
      's.no': 6,
      name: 'New Name',
      email: 'new@email.com',
      gender: 'Other',
      age: 25,
      city: 'New City'
    };

    chai
      .request(app)
      .post('/api/items')
      .send(newItem)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.deep.equal(newItem); // Assuming the response sends back the added item
        done();
      });
  });

  it('should update an item', (done) => {
    const updatedItem = {
      's.no': 6, // Use an existing 's.no' from your data
      name: 'Updated Name',
      email: 'updated@email.com',
      gender: 'Male',
      age: 30,
      city: 'Updated City'
    };

    chai
      .request(app)
      .put(`/api/items/${updatedItem['s.no']}`)
      .send(updatedItem)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(updatedItem);
        done();
      });
  });

  it('should delete an item', (done) => {
    const snoToDelete = 6; // Use an existing 's.no' from your data

    chai
      .request(app)
      .delete(`/api/items/${snoToDelete}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ message: 'Item deleted successfully' });
        done();
      });
  });

  
});
