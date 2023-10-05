import { qase } from 'cypress-qase-reporter/dist/mocha';
import { LoginPage } from "../../../support/pages/auth/login.cy"
import { MenuPage } from "../../../support/pages/sidebar/menu/menu.cy"
import { CreateSuratBiasaPage } from "../../../support/pages/sidebar/konsep_naskah/surat_biasa/pgs_create_surat_biasa.cy"
import { SetujuiPage } from "../../../support/pages/sidebar/kotak_masuk/5_setujui.cy"
import { DraftPage } from "../../../support/pages/sidebar/konsep_naskah/konsep_naskah/draft.cy"

let setujuiPage = new SetujuiPage()
let createSuratBiasaPage = new CreateSuratBiasaPage()
let draftPage = new DraftPage()
let loginPage = new LoginPage()
let menuPage = new MenuPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })
})

describe('Create Surat Biasa Skenario', () => {

    qase([13, 81, 83, 709, 150, 80, 913, 176],
        it('Create Naskah Surat Biasa', () => {
            loginPage.loginViaV1(user.nip, user.password)
            loginPage.directLogin()

            // Create Naskah
            menuPage.goToKonsepNaskah()
            createSuratBiasaPage.checkDetail()
            createSuratBiasaPage.inputKopSurat()
            createSuratBiasaPage.inputKepalaSurat()
            createSuratBiasaPage.inputKakiSuratPDF()
            createSuratBiasaPage.inputBadanNaskahSkenarioRegression()
            createSuratBiasaPage.inputKakiSuratSkenario4()
            createSuratBiasaPage.simpanSurat()
            cy.wait(6000)
            draftPage.checkDataPertamaNaskahDisimpan()
            setujuiPage.doTandaTanganiSurat(user.passphrase)
        })
    )

}) 