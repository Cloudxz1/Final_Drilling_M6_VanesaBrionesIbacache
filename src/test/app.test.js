import { expect } from "chai";
import app from "../../server.js";
import request from "supertest";

describe("API Animes funcionando", () => {
    describe("Que el servidor este arriba", () => {
      it("Debería iniciar el servidor sin problemas", (done) => {
        request(app)
          .get("/")
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(404);
            done();
          });
      });
    })
});
