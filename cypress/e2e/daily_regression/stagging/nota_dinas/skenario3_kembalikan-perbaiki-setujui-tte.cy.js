import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { CreateNotaDinasPage } from "@pages/sidebar/konsep_naskah/nota_dinas/pgs_create_nota_dinas.cy"
import { KembalikanNaskahPage } from "@pages/sidebar/kotak_masuk/3_kembalikan_naskah.cy"
import { PerbaikiNaskahPage } from "@pages/sidebar/kotak_masuk/6_perbaiki.cy"
import { SetujuiPage } from "@pages/sidebar/kotak_masuk/5_setujui.cy"
import { ListNaskahSuratBiasaPage } from "@pages/sidebar/konsep_naskah/drafting_luar/list_jenis_naskah.cy"

const { faker } = require('@faker-js/faker')
let loginPage = new LoginPage()
let createNotaDinasPage = new CreateNotaDinasPage()
let kembalikanNaskahPage = new KembalikanNaskahPage()
let perbaikiNaskahPage = new PerbaikiNaskahPage()
let setujuiPage = new SetujuiPage()
let listNaskahSuratBiasaPage = new ListNaskahSuratBiasaPage()
let user
let dataNotaDinas

Cypress.on('uncaught:exception', (err, runnable) => {
    // Jika terdapat error 'uncaught:exception' pada Headless Mode
    if (err.message.includes('postMessage')) {
        return false; // return false digunakan untuk skip error pada Headless Mode
    }

    // throw error untuk exceptions lain bila terdapat error lainnya selain 'uncaught:exception'
    throw err;
});

beforeEach(() => {
    cy.intercept({ resourceType: /xhr/ }, { log: false })
})

before(() => {
    cy.then(Cypress.session.clearCurrentSessionData)

    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.fixture('non_cred/kepala_surat/create_data_nota_dinas.json').then((jsonData) => {
        dataNotaDinas = jsonData  // Assign data from jsonData
    })
})

describe('Drafting Konsep Naskah Nota Dinas Skenario', () => {

    qase([1, 1069, 1064, 1065, 1067, 1066, 1062, 1063, 1061, 721, 723, 724, 725, 1123, 1118, 1146, 1147, 1148, 1151, 1159],
        it('Nota Dinas Tujuan Kepala Internal', () => {
            // LogIn Skenario Default
            loginPage.loginViaV1(user.nip_konseptor_1, user.password)
            loginPage.directLogin()
            
            listNaskahSuratBiasaPage.goToKonsepNaskahNotaDinas() // Cek detail halaman drafting konsep naskah Nota Dinas
            cy.wait(3000)
            createNotaDinasPage.createKopSurat(dataNotaDinas.org[0].org1)
            cy.wait(3000)
            createNotaDinasPage.createLampiranSurat1('Lampiran 1 ' + faker.lorem.paragraphs(6, '<br/>\n'))
            cy.wait(3000)
            createNotaDinasPage.createLampiranSurat2('Lampiran 2 ' + faker.lorem.paragraphs(6, '<br/>\n'))
            cy.wait(3000)
            createNotaDinasPage.createKakiSurat(dataNotaDinas.env[0].staging, dataNotaDinas.kaki_surat[0].penandatangan_atasan1, dataNotaDinas.kaki_surat[1].pemeriksa1)
            cy.wait(3000)
            createNotaDinasPage.createKepalaSurat(
                [dataNotaDinas.kepala_surat[0].tujuan4, dataNotaDinas.kepala_surat[0].tujuan5, dataNotaDinas.kepala_surat[0].tujuan6], 
                [], 
                dataNotaDinas.kepala_surat[3].kode_klasifikasi, 
                dataNotaDinas.kepala_surat[4].unit_pengolah, 
                dataNotaDinas.kepala_surat[5].sifat_surat, 
                dataNotaDinas.kepala_surat[6].urgensi_surat, 
                dataNotaDinas.kepala_surat[7].perihal2
            )
            cy.wait(3000)
            createNotaDinasPage.createBadanSurat(faker.lorem.paragraphs(13, '<br/>\n'))
            cy.wait(3000)
            createNotaDinasPage.doKirimNaskah(dataNotaDinas.env[0].staging)
            cy.wait(3000)
        })
    )

    qase([377, 402, 100],
        it('Kembalikan Naskah', () => {
            // Login 
            loginPage.loginViaV1(user.nip_pemeriksa_1_1, user.password)
            loginPage.directLogin()

            // Create Naskah
            kembalikanNaskahPage.goToNaskahBelumDireview(dataNotaDinas.env[0].staging)
            cy.wait(9000)
            kembalikanNaskahPage.checkHalamanInformasi()
            cy.wait(3000)
            kembalikanNaskahPage.checkBtnPeriksaKembali(dataNotaDinas.kembalikan[0].kembalikan_perihal)
            cy.wait(3000)
            kembalikanNaskahPage.kembalikanNaskah(dataNotaDinas.kembalikan[0].kembalikan_perihal)
        })
    )

    qase([367, 712, 713, 714, 715],
        it('Perbaiki Naskah', () => {
            // Login 
            loginPage.loginViaV1(user.nip_konseptor_1, user.password)
            loginPage.directLogin()

            perbaikiNaskahPage.goToPerbaikiNaskahNotaDinas(dataNotaDinas.env[0].staging)
            cy.wait(3000)
            perbaikiNaskahPage.perbaikiNaskahNotaDinas(dataNotaDinas.perbaiki[0].perbaiki_perihal)
            cy.wait(10000)
        })
    )

    qase([358, 102],
        it('Setujui Naskah', () => {
            // Login 
            loginPage.loginViaV1(user.nip_pemeriksa_1_1, user.password)
            loginPage.directLogin()

            setujuiPage.suratBelumDireview()
            setujuiPage.setujui()
        })
    )

    qase([358, 102],
        it('Tandatangani Naskah', () => {
            // Login 
            loginPage.loginViaV1(user.nip_pemeriksa_1_2, user.password)
            loginPage.directLogin()

            setujuiPage.suratBelumDitandatangani(dataNotaDinas.env[0].staging)
            cy.wait(3000)
            setujuiPage.doTandaTanganiSurat(user.passphrase)
        })
    )
})