import kembalikan_naskah from "../../../selectors/sidebar/kotak_masuk/kembalikan_naskah"
import review_verifikasi_surat from "../../../selectors/sidebar/kotak_masuk/review_verifikasi_surat"
import { MenuPage } from "../menu/menu.cy"

const menuPage = new MenuPage()
const perihalNaskah = "cypress/fixtures/kepala_surat/kepala_surat_temp_data.json"

export class KembalikanNaskahPage {

    goToNaskahBelumDireview() {
        menuPage.goToKotakMasukReviewNaskah()
        cy.readFile(perihalNaskah).then((object) => {
            const titlePerihalNaskah = object.titlePerihal

            const tableReviewSurat = cy.xpath(review_verifikasi_surat.tableReviewSurat).as('tableReviewSurat')
            tableReviewSurat.contains('td', titlePerihalNaskah)
                .click()
        })
    }

    emptyField() {
        this.goToNaskahBelumDireview()

        const btnKembalikan = cy.get(kembalikan_naskah.btnKembalikan).as('btnKembalikan')
        btnKembalikan.should('be.visible')
            .click()

        const popUpKembalikanNaskah = cy.get(kembalikan_naskah.popUpKembalikanNaskah).as('popUpKembalikanNaskah')
        popUpKembalikanNaskah.should('be.visible')

        const titleKembalikanNaskah = cy.get(kembalikan_naskah.titleKembalikanNaskah).as('titleKembalikanNaskah')
        titleKembalikanNaskah.should('contain', 'Tandai poin-poin perbaikan')

        const btnKembalikanNaskah = cy.get(kembalikan_naskah.btnKembalikanNaskah).as('btnKembalikanNaskah')
        btnKembalikanNaskah.should('contain', 'Kembalikan naskah')
            .and('have.attr', 'disabled', 'disabled')
    }

    popUpKembalikanNaskah() {
        const popUpKembalikanNaskah = cy.get(kembalikan_naskah.popUpKembalikanNaskah).as('popUpKembalikanNaskah')
        popUpKembalikanNaskah.should('be.visible')

        const titleKembalikanNaskah = cy.get(kembalikan_naskah.titleKembalikanNaskah).as('titleKembalikanNaskah')
        titleKembalikanNaskah.should('contain', 'Tandai poin-poin perbaikan')
    }

    checkHalamanInformasi() {
        cy.wait(3000)

        const btnKembalikan = cy.get(kembalikan_naskah.btnKembalikan).as('btnKembalikan')
        btnKembalikan.should('be.visible')
            .click()

        this.popUpKembalikanNaskah()
    }

    batalKembalikanNaskah() {
        const btnBatalKembalikanNaskah = cy.get(kembalikan_naskah.btnBatalKembalikanNaskah).as('btnBatalKembalikanNaskah')
        btnBatalKembalikanNaskah.should('contain', 'Batal')
            .click()
    }

    popUpKonfirmasiKembalikanNaskah() {
        const popUpKonfirmasiKembalikanNaskah = cy.get(kembalikan_naskah.popUpKonfirmasiKembalikanNaskah).as('popUpKonfirmasiKembalikanNaskah')
        popUpKonfirmasiKembalikanNaskah.should('be.visible')

        const titleKonfirmasiKembalikanNaskah = cy.get(kembalikan_naskah.titleKonfirmasiKembalikanNaskah).as('titleKonfirmasiKembalikanNaskah')
        titleKonfirmasiKembalikanNaskah.should('contain', 'Pastikan anda sudah melengkapi catatan perbaikan sebelum mengirimkan naskah kepada konseptor')

        const subTitleKonfirmasiKembalikanNaskah = cy.get(kembalikan_naskah.subTitleKonfirmasiKembalikanNaskah).as('subTitleKonfirmasiKembalikanNaskah')
        subTitleKonfirmasiKembalikanNaskah.should('contain', 'Naskah ini akan diteruskan ke pihak berikut untuk dilakukan Perbaikan')
    }

    checkBtnPeriksaKembali() {
        this.inputPerihal()

        const btnKembalikanNaskah = cy.get(kembalikan_naskah.btnKembalikanNaskah).as('btnKembalikanNaskah')
        btnKembalikanNaskah.should('contain', 'Kembalikan naskah')
            .click()

        this.popUpKonfirmasiKembalikanNaskah()

        const btnPeriksaKembali = cy.get(kembalikan_naskah.btnPeriksaKembali).as('btnPeriksaKembali')
        btnPeriksaKembali.should('contain', 'Periksa kembali')
            .click()

        this.popUpKembalikanNaskah()
    }

    inputSifatNaskah() {
        const checkSifatNaskah = cy.get(kembalikan_naskah.checkSifatNaskah).as('checkSifatNaskah')
        checkSifatNaskah.check()

        const inputSifatNaskah = cy.get(kembalikan_naskah.inputSifatNaskah).as('inputSifatNaskah')
        inputSifatNaskah.type('Perbaiki Sifat Naskah')
    }

    inputTembusan() {
        const checkTembusan = cy.get(kembalikan_naskah.checkTembusan).as('checkTembusan')
        checkTembusan.check()

        const inputTembusan = cy.get(kembalikan_naskah.inputTembusan).as('inputTembusan')
        inputTembusan.type('Tambahkan tembusan kepada kepala dinas terkait')
    }

    inputPerihal() {
        const checkPerihal = cy.get(kembalikan_naskah.checkPerihal).as('checkPerihal')
        checkPerihal.check()

        const inputPerihal = cy.get(kembalikan_naskah.inputPerihal).as('inputPerihal')
        inputPerihal.clear()
            .type('Perbaiki perihal surat')
    }

    kembalikanNaskah() {
        this.inputPerihal()

        const btnKembalikanNaskah = cy.get(kembalikan_naskah.btnKembalikanNaskah).as('btnKembalikanNaskah')
        btnKembalikanNaskah.should('contain', 'Kembalikan naskah')
            .click()

        this.popUpKonfirmasiKembalikanNaskah()

        const btnKirimNaskah = cy.get(kembalikan_naskah.btnKirimNaskah).as('btnKirimNaskah')
        btnKirimNaskah.should('contain', 'Kirim naskah')
            .click()
    }

}