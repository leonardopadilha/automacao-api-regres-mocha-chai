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
    describe("Enviar vários usuários", () => {
        context("Quando cadastro vários usuários", () => {
            it("Então os usuários são cadastrados com sucesso", (done) => {
                request
                    .post(constants.USERS)
                    .send(element)
                    .end((err, res) => {
                        expect(res).to.has.status(201)
                        expect(res.body.id).to.not.be.null
                        done();
                    })
            })
        })
    })
})