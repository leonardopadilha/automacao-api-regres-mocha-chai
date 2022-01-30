import chai from "chai";
import chaiHttp from "chai-http";
import * as constants from "../constants/constants";
import * as bodyCreateUser from "../requests/createUser";

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request(constants.URL_BASE);

describe('Criar usuário com sucesso', () => {
    var userName = "Teste";
    var userJob = "Teste1";

    context("Quando envio os dados válidos de um usuário", () => {
        it("Então o usuário é cadastrado com sucesso e o status é 201", (done) => {
            request
                .post(constants.USERS)
                .send(bodyCreateUser.bodyCreateUser(userName, userJob))
                .end((err, res) => {
                    expect(res).to.has.status(201);
                    expect(res.body.name).to.equals(userName);
                    expect(res.body.job).to.equals(userJob);
                    expect(res.body.id).to.not.empty;
                    done();
                })
        })
    })

    context("Quando envio o body vazio", () => {
        it("O usuário não é cadastrado e o status code é 201", (done) => {
            request
                .post(constants.USERS)
                .send(bodyCreateUser.bodyCreateUser("",""))
                .end((err, res) => {
                    expect(res).to.has.status(201)
                    done();
                })                
        })
    })
})