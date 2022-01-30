import chai from "chai";
import chaiHttp from "chai-http";
import * as constants from "../constants/constants";

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request(constants.URL_BASE);

describe("Realizar o registro", () => {
    var bodyRegister = {
        "email": "eve.holt@reqres.in",
        "password": "pistol"
    }

    var token;

    context("Quando realizo o registro correto de um usuário", () => {
        it("Então o registro é feito com sucesso e o status é 200", (done) => {
            request
                .post(constants.REGISTER)
                .send(bodyRegister)
                .end((err, res) => {
                    expect(res).to.has.status(200)
                    expect(res.body).to.have.property("id");
                    expect(res.body.id).to.eqls(4);
                    expect(res.body.token).to.not.be.empty;

                    token = res.body.token;
                    expect(res.body.token).to.eqls(token);
                    expect(res.body.token).to.eqls("QpwL5tke4Pnpja7X4");
                    done();

                })
        })
    })

    context("Quando realizo os o registro incorreto do usuário", () => {
        it("Então o registro não é feito corretamente e o status retornado é 400", (done) => {
            request
                .post(constants.REGISTER)
                .send({ "email": "sydney@fife" })
                .end((err, res) => {
                    expect(res).to.has.status(400)
                    expect(res.body).to.not.be.empty
                    expect(res.body).to.not.have.property("id")
                    expect(res.body.error).to.equals("Missing password")
                    done();
                })
        })
    })
    
    context("Quando realizo o registro com um usuário inválido", () => {
        it("Então o sistema retorna mensagem de erro com o status 400", (done) => {
            request
                .post(constants.REGISTER)
                .send({"email": "teste", "password": "teste2"})
                .end((err, res) => {
                    expect(res).to.have.status(400)
                    expect(res.body).to.not.have.property("id")
                    expect(res.body).to.not.have.property("token")
                    expect(res.body.error).to.equals("Note: Only defined users succeed registration")
                    done();
                })
        })
    })
})