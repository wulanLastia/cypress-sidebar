import { qase } from 'cypress-qase-reporter/mocha';
import { LoginPage } from "@pages/auth/login.cy"
import { CreateSuratBiasaPage } from "@pages/sidebar/konsep_naskah/surat_biasa/pgs_create_surat_biasa.cy"
import { DraftingKepalaSuratPage } from "@pages/sidebar/konsep_naskah/konsep_naskah/pgs_drafting_kepala_surat.cy"
import { KembalikanNaskahPage } from "@pages/sidebar/kotak_masuk/3_kembalikan_naskah.cy"
import { PerbaikiNaskahPage } from "@pages/sidebar/kotak_masuk/6_perbaiki.cy"
import { SetujuiPage } from "@pages/sidebar/kotak_masuk/5_setujui.cy"
import { KoreksiSuratPage } from "@pages/sidebar/kotak_masuk/7_koreksi.cy"
import { ListNaskahSuratBiasaPage } from "@pages/sidebar/konsep_naskah/drafting_luar/list_jenis_naskah.cy"

const { faker } = require('@faker-js/faker')
let createSuratBiasaPage = new CreateSuratBiasaPage()
let draftingKepalaSuratPage = new DraftingKepalaSuratPage()
let kembalikanNaskahPage = new KembalikanNaskahPage()
let perbaikiNaskahPage = new PerbaikiNaskahPage()
let setujuiPage = new SetujuiPage()
let koreksiSuratPage = new KoreksiSuratPage()
let listNaskahSuratBiasaPage = new ListNaskahSuratBiasaPage()
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

beforeEach(() => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture('cred/credentials_dev.json').then((data) => {
        user = data
    })

    cy.fixture('non_cred/kepala_surat/create_data_surat_biasa.json').then((data) => {
        data_temp = data
    })

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

describe('Create Surat Biasa Tujuan Internal Skenario 2 (Tujuan Lampiran Surat)', () => {

    qase([13, 81, 83, 709, 150, 80, 849, 176],
        it('Create Naskah Surat Biasa', () => {
            // Login 
            loginPage.loginViaV1(user.nip_konseptor_1, user.password)
            loginPage.directLogin()

            // Create Naskah
            listNaskahSuratBiasaPage.goToKonsepNaskahSuratBiasa()
            createSuratBiasaPage.inputKopSurat(data_temp.org[0].org1)
            createSuratBiasaPage.inputLampiranSurat(faker.lorem.paragraphs(6, '<br/>\n'))
            createSuratBiasaPage.inputLampiranSurat2(faker.lorem.paragraphs(6, '<br/>\n'))
            createSuratBiasaPage.inputKakiSuratSkenario1(
                data_temp.env[0].staging,
                data_temp.kaki_surat[0].penandatangan_atasan1,
                data_temp.kaki_surat[1].pemeriksa1,
                data_temp.kaki_surat[2].tembusan_internal1,
                data_temp.kaki_surat[2].tembusan_internal2,
                data_temp.kaki_surat[2].tembusan_internal3)
                draftingKepalaSuratPage.inputKepalaSurat(
                    data_temp.env[0].staging,
                    data_temp.kepala_surat[7].tempat1,
                    data_temp.position_tujuan[0].position_lampiran,
                    [
                        data_temp.kepala_surat[0].tujuan1,
                        data_temp.kepala_surat[0].tujuan2,
                        data_temp.kepala_surat[0].tujuan4
                    ],
                    [
                        true,
                        true,
                        true
                    ],
                    data_temp.kepala_surat[1].lokasi,
                    data_temp.kepala_surat[2].kode_klasifikasi,
                    data_temp.kepala_surat[3].unit_pengolah,
                    data_temp.kepala_surat[4].sifat_surat,
                    data_temp.kepala_surat[5].urgensi_surat,
                    data_temp.kepala_surat[6].perihal
            )
            createSuratBiasaPage.inputBadanNaskahSkenarioRegression(faker.lorem.paragraphs(13, '<br/>\n'))
            createSuratBiasaPage.kirimSurat(data_temp.env[0].staging)

            cy.wait(10000)
        })
    )

    qase([399, 101, 377, 402, 100],
        it('Kembalikan Naskah', () => {
            // Set toogle unleash

            // Login 
            loginPage.loginViaV1(user.nip_pemeriksa_1_1, user.password)
            loginPage.directLogin()

            // Create Naskah
            kembalikanNaskahPage.goToNaskahBelumDireview(data_temp.env[0].staging)
            kembalikanNaskahPage.emptyField()
            kembalikanNaskahPage.batalKembalikanNaskah()
            kembalikanNaskahPage.checkHalamanInformasi()
            kembalikanNaskahPage.checkBtnPeriksaKembali(data_temp.kembalikan[0].kembalikan_perihal)
            kembalikanNaskahPage.kembalikanNaskah(data_temp.kembalikan[0].kembalikan_perihal)
            cy.wait(3000)
        })
    )

    qase([367, 712, 713, 714, 715],
        it('Perbaiki Naskah', () => {
            // Login 
            loginPage.loginViaV1(user.nip_konseptor_1, user.password)
            loginPage.directLogin()

            perbaikiNaskahPage.goToPerbaikiNaskah(data_temp.env[0].staging)
            perbaikiNaskahPage.perbaikiNaskah(data_temp.perbaiki[0].perbaiki_perihal)

            cy.wait(10000)
        })
    )

    qase([358, 102],
        it('Setujui Naskah', () => {
            // Login 
            loginPage.loginViaV1(user.nip_pemeriksa_1_1, user.password)
            loginPage.directLogin()

            setujuiPage.suratBelumDireview(data_temp.env[0].staging)

            cy.wait(3000)
            setujuiPage.setujui()

            cy.wait(10000)
        })
    )

    qase([368, 370, 372],
        it('Koreksi dan Tandatangani Naskah', () => {
            // Login 
            loginPage.loginViaV1(user.nip_pemeriksa_1_2, user.password)
            loginPage.directLogin()

            koreksiSuratPage.goToNaskahBelumDireview(data_temp.env[0].staging)
            koreksiSuratPage.checkDetailKoreksiTandatangani()
            koreksiSuratPage.koreksiTandatanganiNaskah(user.passphrase, data_temp.koreksi[0].koreksi_perihal)
            cy.wait(10000)
        })
    )
}) 