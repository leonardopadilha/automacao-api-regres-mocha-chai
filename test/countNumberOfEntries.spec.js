import chai from "chai";
import chaiHttp from "chai-http";
import * as constants from "../constants/constants";

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request(constants.URL_BASE);

describe("Pesquisar por registros", () => {
    context("Quando realizo a contagem de cadastros", () => {
        it("Então a quantidade de cadastros é realizadada com sucesso", (done) => {
            request
                .get(constants.USERS)
                .end((err, res) => {
                    expect(res).to.has.status(200)
                    expect(res.body).to.not.be.empty;
                    expect(res.body.data).to.be.an("array");
                    expect(res.body.data).length(6);
                    expect(res.body.data[0].id).to.eqls(1);
                    done();
                })
        })
    })

    context("Quando pesquiso por um registro inexistente", () => {
        it("Então o sistema me retorna um body vazio e o status 404", (done) => {
            request
                .get(constants.UNKNOWN + "/6546464564")
                .end((err, res) => {
                    expect(res).to.has.status(404)
                    expect(res.body).to.be.empty;
                    done();
                })
        })
    })

    context("Quando pesquiso por cadastros válidos", () => {
        it("Então o sistema retorna os registros salvos com sucesso com o status code 200", (done) => {
            request
                .get(constants.UNKNOWN)
                .end((err, res) => {
                    expect(res).to.has.status(200);
                    expect(res.body).to.not.be.empty;
                    expect(res.body.data).length(6);
                    done();
                })
        })
    })
})