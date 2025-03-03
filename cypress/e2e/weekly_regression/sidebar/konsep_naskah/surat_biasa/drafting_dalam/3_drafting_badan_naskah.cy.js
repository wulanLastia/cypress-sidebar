import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { DraftingBadanNaskahPage } from "@pages/sidebar/konsep_naskah/konsep_naskah/pgs_drafting_badan_naskah.cy"

let draftingBadanNaskahPage = new DraftingBadanNaskahPage()
let loginPage = new LoginPage()
let user

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)

    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

before(() => {
    loginPage.loginViaV1(user.nip_konseptor_1, user.password)
    loginPage.directLogin()
})

describe('Drafting Badan Naskah Skenario', { testIsolation: false }, () => {
    
    qase(709,
        it('Akses form editing badan naskah', () => {
            draftingBadanNaskahPage.aksesKonsepNaskahSuratBiasa()
            draftingBadanNaskahPage.aksesFormEditingBadanNaskah()
        })
    )

    qase(146,
        it('Check on preview page if user entered bold text', () => {
            draftingBadanNaskahPage.checkPreviewTextBold()
        })
    )

    qase(147,
        it('Check on preview page if user entered italic text', () => {
            draftingBadanNaskahPage.checkPreviewTextItalic()
        })
    )

    qase(148,
        it('Check on preview page if user entered numeric list', () => {
            draftingBadanNaskahPage.checkPreviewTextNumeric()
        })
    )

    qase(430,
        it('Insert a new paragraph after numeric list', () => {
            draftingBadanNaskahPage.insertNewParagraph()
        })
    )

    qase(149,
        it('Check on preview page if user entered bullet list', () => {
            draftingBadanNaskahPage.checkPreviewTextBullet()
        })
    )

    qase(153,
        it.skip('Insert a table', () => {
            draftingBadanNaskahPage.insertTable()
        })
    )

    qase(154,
        it.skip('Insert an image', () => {
            draftingBadanNaskahPage.insertImage()
        })
    )

    qase(200,
        it('Menutup form editing badan naskah', () => {
            draftingBadanNaskahPage.closeBadanNaskah()
        })
    )

    qase(584,
        it('Leave the field empty when submitting the form', () => {
            draftingBadanNaskahPage.leaveEmptyForm()
        })
    )

}) 