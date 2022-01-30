import chai from "chai";
import chaiHttp from "chai-http";
import * as constants from "../constants/constants";
import * as createUser from "../requests/createUser";

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request(constants.URL_BASE);

const arr = [
    createUser.bodyCreateUser("Tony Stark", "Homem de Ferro"),
    createUser.bodyCreateUser("Peter Park", "Homem Aranha"),
    createUser.bodyCreateUser("Natasha Romanoff", "Viúva Negra")
];

arr.forEach(element => {
    const nameUser = element.name;
    describe("Enviar vários usuários validando os nomes", () => {
        before(done => {
            context("Quando cadastro vários usuários com a request válida", () => {
                request
                    .post(constants.USERS)
                    .send(arr)
                    .end((err, res) => {
                        expect(res).to.has.status(201)
                        expect(res.body.id).to.not.be.null
                        done();
                    })
            })
        })
    })
    
    it("Então os usuários são cadastrados mas os nomes são alterados com sucesso", (done) => {
        if (nameUser == "Tony Stark") {
            request
                .put(constants.USERS)
                .send({
                    "name": "Tony Stark",
                    "job": "homem de ferro"
                })
                .end((err, res) => {
                    expect(res).to.has.status(200)
                    expect(res.body.id).to.not.be.null
                    done();
                })
        }

        else if (nameUser == "Peter Park") {
            request
                .put(constants.USERS)
                .send({
                    "name": "Peter Park",
                    "job": "homem aranha"
                })
                .end((err, res) => {
                    expect(res).to.has.status(200)
                    expect(res.body.id).to.not.be.null
                    done();
                })
        }

        else {
            request
                .put(constants.USERS)
                .send({
                    "name": "Natasha Romanoff",
                    "job": "viúva negra"
                })
                .end((err, res) => {
                    expect(res).to.has.status(200)
                    expect(res.body.id).to.not.be.null
                    done();
                })
        }
    })
})