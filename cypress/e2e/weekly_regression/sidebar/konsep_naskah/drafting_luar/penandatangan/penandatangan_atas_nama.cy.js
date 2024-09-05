import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { TabRegistrasiPage } from "@pages/sidebar/konsep_naskah/drafting_luar/tab_registrasi.cy"
import { UploadSingleFilePage } from "@pages/sidebar/konsep_naskah/drafting_luar/pgs_upload_single_file.cy"
import { TandatanganiPage } from "@pages/sidebar/konsep_naskah/drafting_luar/tandatangani.cy"

let uploadSingleFilePage = new UploadSingleFilePage()
let tabRegistrasiPage = new TabRegistrasiPage()
let tandatanganiPage = new TandatanganiPage()
let loginPage = new LoginPage()
let user
let data_temp

Cypress.on('uncaught:exception', (err, runnable) => {
    // Jika terdapat error 'uncaught:exception' pada Headless Mode
    if (err.message.includes('postMessage')) {
        return false; // return false digunakan untuk skip error pada Headless Mode
    }

    // throw error untuk exceptions lain bila terdapat error lainnya selain 'uncaught:exception'
    throw err;
});

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)

    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.fixture('non_cred/drafting_luar/master_data/create_data.json').then((data) => {
        data_temp = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

before(() => {
    loginPage.loginViaV1(user.nip_konseptor_2, user.password)
    loginPage.directLogin()
})

describe('Drafting Luar - Test Case Penandatangan Atas Nama', { testIsolation: false }, () => {

    qase([4289, 3878, 3879],
        it('Upload dan registrasi naskah single file', () => {
            // Login 
            loginPage.loginViaV1(user.nip_konseptor_2, user.password)
            loginPage.directLogin()

            // Go To Konsep Naskah SKP 4289
            uploadSingleFilePage.goToUploadSingleFileSkp()

            // Upload File 3878
            uploadSingleFilePage.uploadSingleFile(data_temp.upload[0].upload1)
            uploadSingleFilePage.checkDataFileUpload()

            // Click tab registrasi 3879
            tabRegistrasiPage.clickTabRegistrasi()

            // Tab Registrasi - Section Identitas Surat
            const uuid = () => Cypress._.random(0, 1e6)
            const id = uuid()

            tabRegistrasiPage.inputPerihal('Automation Drafting Luar Penandatangan Diri Sendiri (SKP) ' + id, 'Automation Drafting Luar Penandatangan Diri Sendiri (SKP) ' + id)
            tabRegistrasiPage.checkWarnaLabelUrgensi(data_temp.registrasi[7].urgensi_surat, data_temp.registrasi[3].index0)
            tabRegistrasiPage.inputSifat(data_temp.registrasi[8].sifat_surat1)
        })
    )

    qase(4527,
        it('User select penandatangan mode Atas Nama', () => {
            // Add Penandatangan
            tabRegistrasiPage.addMorePenandatangan()
            
            // Select penandatangan mode atas nama
            tabRegistrasiPage.selectPenandatanganAtasNama()
        })
    )

    qase(4530,
        it('Check on preview (tab registrasi) after select jenis penandatanganan atas nama', () => {
            // Input penandatangan atas nama
            tabRegistrasiPage.inputPenandatanganAtasNama(data_temp.registrasi[9].atas_nama, data_temp.registrasi[9].atasan1, data_temp.env[0].staging)
        })
    )

    qase(4530,
        it('Show flag a.n on display picture selected penandatangan', () => {
            // Assert penandatangan atas nama
            tabRegistrasiPage.assertPenandatanganAtasNama()
        })
    )

    qase(4562,
        it('Validate penandatangan > 1 cant be same', () => {
            // Add Penandatangan
            tabRegistrasiPage.addMorePenandatangan()

            // Validate same penandatangan
            tabRegistrasiPage.validateSamePenandatangan(data_temp.registrasi[9].atasan1, data_temp.env[0].staging)
        })
    )

    qase(5614,
        it('Delete penandatangan then select another penandatangan', () => {
            // Batal add penandatangan
            tabRegistrasiPage.cancelPenandatangan()

            // Click btn kembali
            tandatanganiPage.batalKirimNaskah()

            // Click btn delete penandatangan atas nama
            tandatanganiPage.deletePenandatangan()
        })
    )
})