import kepala_surat from "../../../../selectors/sidebar/konsep_naskah/surat_biasa/drafting_kepala_surat"
import konsep_naskah from "../../../../selectors/sidebar/konsep_naskah/konsep_naskah"
import { DraftingKonsepNaskahPage } from "../surat_biasa/pgs_drafting_surat_biasa.cy"

const filename = "cypress/fixtures/non_cred/kepala_surat/kepala_surat_temp_data.json"

const draftingKonsepNaskahPage = new DraftingKonsepNaskahPage()

export class DraftingKepalaSuratPage {

    aksesKonsepNaskahSuratBiasa() {
        draftingKonsepNaskahPage.goToKonsepNaskahSuratBiasa()
        cy.wait(3000)
    }

    aksesFormEditingKepalaSurat() {
        draftingKonsepNaskahPage.aksesFormKepalaSurat()
    }

    checkDetail() {
        const titleKepalaSurat = cy.get(kepala_surat.titleKepalaSurat).as('titleKop')
        titleKepalaSurat.should('contain', 'Kepala Surat')
            .and('be.visible')
    }

    closeKepalaSurat() {
        const scrollForm = cy.get(kepala_surat.scrollForm).as('scrollForm')
        scrollForm.scrollTo('top')

        const closeKepalaSurat = cy.get(kepala_surat.closeKepalaSurat).as('closeKepalaSurat')
        closeKepalaSurat.should('be.visible')
            .click()

        draftingKonsepNaskahPage.validateFormDefault()
    }

    validateTempat() {
        const titleTempatPenulisan = cy.get(kepala_surat.titleTempatPenulisan).as('titleTempatPenulisan')
        titleTempatPenulisan.should('contain', 'Tempat Penulisan Surat')

        const inputTempatPenulisan = cy.get(kepala_surat.inputTempatPenulisan).as('inputTempatPenulisan')
        inputTempatPenulisan.invoke('val')
            .then(text => {
                const tempatPenulisan = text;
                const previewTempat = cy.xpath(kepala_surat.previewTempat).as('previewTempat')
                previewTempat.should('contain', tempatPenulisan)
            });
    }

    validateTanggal(val) {
        if (val === 'Manual') {
            const titleTanggal = cy.get(kepala_surat.titleTanggal).as('titleTanggal')
            titleTanggal.should('contain', 'Tanggal Penomoran')

            const inputTanggal = cy.get(kepala_surat.inputTanggal).as('inputTanggal')
            inputTanggal.click()

            const getpopupPenomoran = cy.get(kepala_surat.getpopupPenomoran).as('getpopupPenomoran')
            getpopupPenomoran.should('be.visible')

            const gettitlePopupPenomoran = cy.get(kepala_surat.gettitlePopupPenomoran).as('gettitlePopupPenomoran')
            gettitlePopupPenomoran.should('contain', 'Penomoran Manual')

            const getsubtittlePopupPenomoran = cy.get(kepala_surat.getsubtittlePopupPenomoran).as('getsubtittlePopupPenomoran')
            getsubtittlePopupPenomoran.should('contain', 'Ingat, penomoran manual hanya digunakan untuk kasus khusus. Apakah Anda telah mendiskusikan dengan atasan dan yakin akan melanjutkan?')

            const btnkonfirmasiPopupPenomoran = cy.xpath(kepala_surat.btnkonfirmasiPopupPenomoran).as('btnkonfirmasiPopupPenomoran')
            btnkonfirmasiPopupPenomoran.should('be.visible')
                .click()

            const xpathTabelPenomoran1 = cy.xpath(kepala_surat.xpathTabelPenomoran1).as('xpathTabelPenomoran1')
            xpathTabelPenomoran1.invoke('val')
                .then((val) => {
                    cy.log(val)
                    if (val > 0) {
                        cy.log('masuk sini')
                    }
                });
        }
    }

    validateTujuan(inputanTujuan1) {
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        const inputTujuan = cy.get(kepala_surat.inputTujuan0).as('inputTujuan')
        inputTujuan.wait(1000)
            .type(inputanTujuan1)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestInputTujuan = cy.get(kepala_surat.suggestInputTujuan, { timeout: 5000 }).as('suggestInputTujuan')
                    suggestInputTujuan.contains(inputanTujuan1, { timeout: 10000 }).should('be.visible')

                    inputTujuan.type('{enter}')
                }
            })
    }

    validateLokasi(inputanLokasi) {
        const titleLokasi = cy.get(kepala_surat.titleLokasi).as('titleLokasi')
        titleLokasi.should('contain', 'di')

        const inputLokasi = cy.get(kepala_surat.inputLokasi).as('inputLokasi')
        inputLokasi.type(inputanLokasi)
    }

    validateLokasiNegatifTagScript(inputanLokasiNegatif) {
        const titleLokasi = cy.get(kepala_surat.titleLokasi).as('titleLokasi')
        titleLokasi.should('contain', 'di')

        const inputLokasi = cy.get(kepala_surat.inputLokasi).as('inputLokasi')
        inputLokasi.type(inputanLokasiNegatif)
    }

    validateLokasiNegatifHTMLScript(inputanKodeKlasifikasi) {
        const titleLokasi = cy.get(kepala_surat.titleLokasi).as('titleLokasi')
        titleLokasi.should('contain', 'di')

        const inputLokasi = cy.get(kepala_surat.inputLokasi).as('inputLokasi')
        inputLokasi.type(inputanKodeKlasifikasi)
    }

    validateLokasiNegatifXSSScript(inputanLokasiNegatif) {
        const titleLokasi = cy.get(kepala_surat.titleLokasi).as('titleLokasi')
        titleLokasi.should('contain', 'di')

        const inputLokasi = cy.get(kepala_surat.inputLokasi).as('inputLokasi')
        inputLokasi.type(inputanLokasiNegatif)
    }

    validateLokasiNegatifWhitespace(inputanLokasiNegatif) {
        const titleLokasi = cy.get(kepala_surat.titleLokasi).as('titleLokasi')
        titleLokasi.should('contain', 'di')

        const inputLokasi = cy.get(kepala_surat.inputLokasi).as('inputLokasi')
        inputLokasi.type(inputanLokasiNegatif)
            .wait(3000)
            .blur()
    }

    validateKodeKlasifikasi(inputanKodeKlasifikasi) {
        cy.wait(3000)

        const titleKodeKlasifikasi = cy.get(kepala_surat.titleKodeKlasifikasi).as('titleKodeKlasifikasi')
        titleKodeKlasifikasi.should('contain', 'Kode Klasifikasi')

        const selectKodeKlasifikasi = cy.get(kepala_surat.selectKodeKlasifikasi).as('selectKodeKlasifikasi')
        selectKodeKlasifikasi.click()
            .wait(3000)
            .type(inputanKodeKlasifikasi)
            .wait(3000)
            .type('{enter}')
    }

    validateKodeKlasifikasiNegatifWhitespace(inputanKodeKlasifikasi) {
        cy.wait(6000)

        const titleKodeKlasifikasi = cy.get(kepala_surat.titleKodeKlasifikasi).as('titleKodeKlasifikasi')
        titleKodeKlasifikasi.should('contain', 'Kode Klasifikasi')

        const selectKodeKlasifikasi = cy.get(kepala_surat.selectKodeKlasifikasi).as('selectKodeKlasifikasi')
        selectKodeKlasifikasi.click()
            .wait(3000)
            .type(inputanKodeKlasifikasi)
            .wait(3000)
            .trigger('blur')
    }

    validateUnitPengolah(inputanUnitPengolah) {
        const titleUnitPengolah = cy.get(kepala_surat.titleUnitPengolah).as('titleUnitPengolah')
        titleUnitPengolah.should('contain', 'Unit Pengolah')

        const inputUnitPengolah = cy.get(kepala_surat.inputUnitPengolah).as('inputUnitPengolah')
        inputUnitPengolah.type(inputanUnitPengolah)
    }

    validateUnitPengolahNegatifTagScript(inputanUnitPengolahNegatif) {
        const titleUnitPengolah = cy.get(kepala_surat.titleUnitPengolah).as('titleUnitPengolah')
        titleUnitPengolah.should('contain', 'Unit Pengolah')

        const inputUnitPengolah = cy.get(kepala_surat.inputUnitPengolah).as('inputUnitPengolah')
        inputUnitPengolah.type(inputanUnitPengolahNegatif)
    }

    validateUnitPengolahNegatifHTMLScript(inputanUnitPengolahNegatif) {
        const titleUnitPengolah = cy.get(kepala_surat.titleUnitPengolah).as('titleUnitPengolah')
        titleUnitPengolah.should('contain', 'Unit Pengolah')

        const inputUnitPengolah = cy.get(kepala_surat.inputUnitPengolah).as('inputUnitPengolah')
        inputUnitPengolah.type(inputanUnitPengolahNegatif)
    }

    validateUnitPengolahNegatifXSSScript(inputanUnitPengolahNegatif) {
        const titleUnitPengolah = cy.get(kepala_surat.titleUnitPengolah).as('titleUnitPengolah')
        titleUnitPengolah.should('contain', 'Unit Pengolah')

        const inputUnitPengolah = cy.get(kepala_surat.inputUnitPengolah).as('inputUnitPengolah')
        inputUnitPengolah.type(inputanUnitPengolahNegatif)
    }

    validateUnitPengolahNegatifWhitespace(inputanUnitPengolahNegatif) {
        const titleUnitPengolah = cy.get(kepala_surat.titleUnitPengolah).as('titleUnitPengolah')
        titleUnitPengolah.should('contain', 'Unit Pengolah')

        const inputUnitPengolah = cy.get(kepala_surat.inputUnitPengolah).as('inputUnitPengolah')
        inputUnitPengolah.type(inputanUnitPengolahNegatif)
            .wait(3000)
            .blur()
    }

    validateSifatSurat(inputanSifatSurat) {
        const titleSifatSurat = cy.get(kepala_surat.titleSifatSurat).as('titleSifatSurat')
        titleSifatSurat.should('contain', 'Sifat Surat')

        const selectSifatSurat = cy.get(kepala_surat.selectSifatSurat).as('selectSifatSurat')
        selectSifatSurat.click()
            .contains(inputanSifatSurat)
            .click()
    }

    deleteSifatSurat() {
        const titleSifatSurat = cy.get(kepala_surat.titleSifatSurat).as('titleSifatSurat')
        titleSifatSurat.should('contain', 'Sifat Surat')

        const selectSifatSurat = cy.get(kepala_surat.selectSifatSurat).as('selectSifatSurat')
        selectSifatSurat.click()
    }

    whitespaceSifatSurat() {
        const titleSifatSurat = cy.get(kepala_surat.titleSifatSurat).as('titleSifatSurat')
        titleSifatSurat.should('contain', 'Sifat Surat')

        const whitespaceSifatSurat = cy.get(kepala_surat.selectSifatSurat).as('whitespaceSifatSurat')
        whitespaceSifatSurat.type("{shift}{enter}")
            .wait(3000)
            .trigger('blur')
    }

    validateUrgensiSurat(inputanUrgensiSurat) {
        const titleUrgensiSurat = cy.get(kepala_surat.titleUrgensiSurat).as('titleUrgensiSurat')
        titleUrgensiSurat.should('contain', 'Urgensi')

        const selectUrgensiSurat = cy.get(kepala_surat.selectUrgensiSurat).as('selectUrgensiSurat')
        selectUrgensiSurat.click()
            .wait(10000)
            .contains(inputanUrgensiSurat, { timeout: 10000 })
            .click()
    }

    whitespaceUrgensiSurat() {
        const titleUrgensiSurat = cy.get(kepala_surat.titleUrgensiSurat).as('titleUrgensiSurat')
        titleUrgensiSurat.should('contain', 'Urgensi')

        const whitespaceUrgensiSurat = cy.get(kepala_surat.selectUrgensiSurat).as('whitespaceUrgensiSurat')
        whitespaceUrgensiSurat.type("{shift}{enter}")
            .wait(3000)
            .trigger('blur')
    }

    validatePerihal(inputanPerihal) {
        const titlePerihal = cy.get(kepala_surat.titlePerihal).as('titlePerihal')
        titlePerihal.should('contain', 'Perihal')

        const inputPerihal = cy.get(kepala_surat.inputPerihal).as('inputPerihal')
        inputPerihal.invoke('val')
            .then((val) => {
                if (val) {
                    const inputPerihal = cy.get(kepala_surat.inputPerihal).as('inputPerihal')
                    const perihal = `${inputanPerihal}`
                    inputPerihal.type(perihal)

                    const inputPerihalUpdate = cy.get(kepala_surat.inputPerihal).as('inputPerihal')
                    inputPerihalUpdate.invoke('val')
                        .then((val) => {
                            cy.writeFile(filename, { titlePerihal: val })
                        })
                } else {
                    const uuid = () => Cypress._.random(0, 1e6)
                    const id = uuid()
                    const perihal = `Automation Testing ${id}${inputanPerihal}`

                    const inputPerihal = cy.get(kepala_surat.inputPerihal).as('inputPerihal')
                    inputPerihal.type(perihal)
                    cy.writeFile(filename, { titlePerihal: perihal })
                }
            })
    }

    validateTujuanSkenario1(inputanTujuan1, inputanTujuan2, inputanTujuan3) {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        this.inputTujuanSurat1(inputanTujuan1)

        cy.wait(3000)
        this.clickTambahTujuan()

        this.inputTujuanSurat2(inputanTujuan2)

        cy.wait(3000)
        this.clickTambahTujuan()

        this.inputTujuanSurat3(inputanTujuan3)
    }

    validateTujuanSkenario2(inputanTujuan1, inputanTujuan2, inputanTujuan3) {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        const radio2 = cy.get(kepala_surat.radio2).as('radio2')
        radio2.should('be.visible')
            .click()

        const labelRadio2 = cy.get(kepala_surat.labelRadio2).as('labelRadio2')
        labelRadio2.should('contain', 'Lampiran')

        const inputTujuanLampiran = cy.get(kepala_surat.inputTujuanLampiran).as('inputTujuanLampiran')
        inputTujuanLampiran.wait(1000)
            .type('Tujuan lampiran regression')
            .wait(3000)
            .type('{enter}')

        const previewPage = cy.xpath(konsep_naskah.previewPage).as('previewPage')
        previewPage.scrollTo(180, 1000, { force: true })

        const previewKepalaLampiran = cy.get(konsep_naskah.previewKepalaLampiran).as('previewKepalaLampiran')
        previewKepalaLampiran.click()

        this.inputTujuanLampiranSurat1(inputanTujuan1)

        cy.wait(3000)
        this.clickTambahTujuanLampiran()

        this.inputTujuanLampiranSurat2(inputanTujuan2)

        cy.wait(3000)
        this.clickTambahTujuanLampiran()

        this.inputTujuanLampiranSurat3(inputanTujuan3)

        cy.wait(3000)

        draftingKonsepNaskahPage.scrollPreviewPage()

        this.aksesFormEditingKepalaSurat()
    }

    validateTujuanSkenario3(inputanTujuanEksternal1, inputanTujuanEksternal2, inputanTujuanEksternal3) {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        this.inputTujuanSuratEksternal1(inputanTujuanEksternal1)

        this.clickTambahTujuan()

        this.inputTujuanSuratEksternal2(inputanTujuanEksternal2)

        this.clickTambahTujuan()

        this.inputTujuanSuratEksternal3(inputanTujuanEksternal3)
    }

    validateTujuanSkenario4(inputanTujuanLampiran1, inputanTujuanLampiran2, inputanTujuanLampiran3) {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        const radio2 = cy.get(kepala_surat.radio2).as('radio2')
        radio2.should('be.visible')
            .click()

        const labelRadio2 = cy.get(kepala_surat.labelRadio2).as('labelRadio2')
        labelRadio2.should('contain', 'Lampiran')

        const inputTujuanLampiran = cy.get(kepala_surat.inputTujuanLampiran).as('inputTujuanLampiran')
        inputTujuanLampiran.wait(1000)
            .type('Tujuan lampiran eksternal regression')
            .wait(3000)
            .type('{enter}')

        const previewPage = cy.xpath(konsep_naskah.previewPage).as('previewPage')
        previewPage.scrollTo(180, 1000, { force: true })

        const previewKepalaLampiran = cy.get(konsep_naskah.previewKepalaLampiran).as('previewKepalaLampiran')
        previewKepalaLampiran.click()

        this.inputTujuanLampiranSuratEksternal1(inputanTujuanLampiran1)

        this.clickTambahTujuanLampiran()

        this.inputTujuanLampiranSuratEksternal2(inputanTujuanLampiran2)

        this.clickTambahTujuanLampiran()

        this.inputTujuanLampiranSuratEksternal3(inputanTujuanLampiran3)

        cy.wait(3000)

        draftingKonsepNaskahPage.scrollPreviewPage()

        this.aksesFormEditingKepalaSurat()
    }

    validateTujuanSkenario5(inputanTujuan1, inputanTujuan2, inputanTujuan3, inputanTujuanEksternal4, inputanTujuanEksternal5, inputanTujuanEksternal6) {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        this.inputTujuanSurat1(inputanTujuan1)

        this.clickTambahTujuan()

        this.inputTujuanSurat2(inputanTujuan2)

        this.clickTambahTujuan()

        this.inputTujuanSurat3(inputanTujuan3)

        this.clickTambahTujuan()

        this.inputTujuanSuratEksternal4(inputanTujuanEksternal4)

        this.clickTambahTujuan()

        this.inputTujuanSuratEksternal5(inputanTujuanEksternal5)

        this.clickTambahTujuan()

        this.inputTujuanSuratEksternal6(inputanTujuanEksternal6)

    }

    validateTujuanSkenario6(inputanTujuan1, inputanTujuan2, inputanTujuan3, inputanTujuanEksternal4, inputanTujuanEksternal5, inputanTujuanEksternal6) {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        const radio2 = cy.get(kepala_surat.radio2).as('radio2')
        radio2.should('be.visible')
            .click()

        const labelRadio2 = cy.get(kepala_surat.labelRadio2).as('labelRadio2')
        labelRadio2.should('contain', 'Lampiran')

        const inputTujuanLampiran = cy.get(kepala_surat.inputTujuanLampiran).as('inputTujuanLampiran')
        inputTujuanLampiran.wait(1000)
            .type('Tujuan lampiran internal eksternal regression')
            .wait(3000)
            .type('{enter}')

        const previewPage = cy.xpath(konsep_naskah.previewPage).as('previewPage')
        previewPage.scrollTo(180, 1000, { force: true })

        const previewKepalaLampiran = cy.get(konsep_naskah.previewKepalaLampiran).as('previewKepalaLampiran')
        previewKepalaLampiran.click()

        this.inputTujuanLampiranSurat1(inputanTujuan1)

        this.clickTambahTujuanLampiran()

        this.inputTujuanLampiranSurat2(inputanTujuan2)

        this.clickTambahTujuanLampiran()

        this.inputTujuanLampiranSurat3(inputanTujuan3)

        this.clickTambahTujuanLampiran()

        this.inputTujuanLampiranSuratEksternal4(inputanTujuanEksternal4)

        this.clickTambahTujuanLampiran()

        this.inputTujuanLampiranSuratEksternal5(inputanTujuanEksternal5)

        this.clickTambahTujuanLampiran()

        this.inputTujuanLampiranSuratEksternal6(inputanTujuanEksternal6)

        cy.wait(3000)

        draftingKonsepNaskahPage.scrollPreviewPage()

        this.aksesFormEditingKepalaSurat()
    }

    validateTujuanSkenario7NegatifTagScript(inputanTujuanLampiranNegatif1, inputanTujuanLampiranNegatif2, inputanTujuanLampiranNegatif3, inputanTujuanLampiranNegatif4, inputanTujuanLampiranNegatif5, inputanTujuanLampiranNegatif6, assertTujuanLampiranNegatif1, assertTujuanLampiranNegatif2, assertTujuanLampiranNegatif3, assertTujuanLampiranNegatif4, assertTujuanLampiranNegatif5, assertTujuanLampiranNegatif6) {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        const radio2 = cy.get(kepala_surat.radio2).as('radio2')
        radio2.should('be.visible')
            .click()

        const labelRadio2 = cy.get(kepala_surat.labelRadio2).as('labelRadio2')
        labelRadio2.should('contain', 'Lampiran')

        const inputTujuanLampiran = cy.get(kepala_surat.inputTujuanLampiran).as('inputTujuanLampiran')
        inputTujuanLampiran.wait(1000)
            .type("1 Test JS Script <script>alert('Executing JS')</script>")
            .wait(3000)
            .type('{enter}')

        const previewPage = cy.xpath(konsep_naskah.previewPage).as('previewPage')
        previewPage.scrollTo(180, 1000, { force: true })

        const previewKepalaLampiran = cy.get(konsep_naskah.previewKepalaLampiran).as('previewKepalaLampiran')
        previewKepalaLampiran.click()

        this.inputTujuanLampiranNegatif1(inputanTujuanLampiranNegatif1, assertTujuanLampiranNegatif1)

        this.clickTambahTujuanLampiran()

        this.inputTujuanLampiranNegatif2(inputanTujuanLampiranNegatif2, assertTujuanLampiranNegatif2)

        this.clickTambahTujuanLampiran()

        this.inputTujuanLampiranNegatif3(inputanTujuanLampiranNegatif3, assertTujuanLampiranNegatif3)

        this.clickTambahTujuanLampiran()

        this.inputTujuanLampiranNegatif4(inputanTujuanLampiranNegatif4, assertTujuanLampiranNegatif4)

        this.clickTambahTujuanLampiran()

        this.inputTujuanLampiranNegatif5(inputanTujuanLampiranNegatif5, assertTujuanLampiranNegatif5)

        this.clickTambahTujuanLampiran()

        this.inputTujuanLampiranNegatif6(inputanTujuanLampiranNegatif6, assertTujuanLampiranNegatif6)

        cy.wait(3000)

        draftingKonsepNaskahPage.scrollPreviewPage()

        this.aksesFormEditingKepalaSurat()
    }

    validateTujuanSkenario8NegatifHTMLScript(inputanTujuanLampiranNegatif1, inputanTujuanLampiranNegatif2, inputanTujuanLampiranNegatif3, inputanTujuanLampiranNegatif4, inputanTujuanLampiranNegatif5, inputanTujuanLampiranNegatif6, assertTujuanLampiranNegatif1, assertTujuanLampiranNegatif2, assertTujuanLampiranNegatif3, assertTujuanLampiranNegatif4, assertTujuanLampiranNegatif5, assertTujuanLampiranNegatif6) {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        const radio2 = cy.get(kepala_surat.radio2).as('radio2')
        radio2.should('be.visible')
            .click()

        const labelRadio2 = cy.get(kepala_surat.labelRadio2).as('labelRadio2')
        labelRadio2.should('contain', 'Lampiran')

        const inputTujuanLampiran = cy.get(kepala_surat.inputTujuanLampiran).as('inputTujuanLampiran')
        inputTujuanLampiran.wait(1000)
            .type("<blink>Hello World 1</blink>")
            .wait(3000)
            .type('{enter}')

        const previewPage = cy.xpath(konsep_naskah.previewPage).as('previewPage')
        previewPage.scrollTo(180, 1000, { force: true })

        const previewKepalaLampiran = cy.get(konsep_naskah.previewKepalaLampiran).as('previewKepalaLampiran')
        previewKepalaLampiran.click()

        this.inputTujuanLampiranNegatif1(inputanTujuanLampiranNegatif1, assertTujuanLampiranNegatif1)

        this.clickTambahTujuanLampiran()

        this.inputTujuanLampiranNegatif2(inputanTujuanLampiranNegatif2, assertTujuanLampiranNegatif2)

        this.clickTambahTujuanLampiran()

        this.inputTujuanLampiranNegatif3(inputanTujuanLampiranNegatif3, assertTujuanLampiranNegatif3)

        this.clickTambahTujuanLampiran()

        this.inputTujuanLampiranNegatif4(inputanTujuanLampiranNegatif4, assertTujuanLampiranNegatif4)

        this.clickTambahTujuanLampiran()

        this.inputTujuanLampiranNegatif5(inputanTujuanLampiranNegatif5, assertTujuanLampiranNegatif5)

        this.clickTambahTujuanLampiran()

        this.inputTujuanLampiranNegatif6(inputanTujuanLampiranNegatif6, assertTujuanLampiranNegatif6)

        cy.wait(3000)

        draftingKonsepNaskahPage.scrollPreviewPage()

        this.aksesFormEditingKepalaSurat()
    }

    validateTujuanSkenario9NegatifXSSScript(inputanTujuanLampiranNegatif1, assertTujuanLampiranNegatif1) {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        const radio2 = cy.get(kepala_surat.radio2).as('radio2')
        radio2.should('be.visible')
            .click()

        const labelRadio2 = cy.get(kepala_surat.labelRadio2).as('labelRadio2')
        labelRadio2.should('contain', 'Lampiran')

        const inputTujuanLampiran = cy.get(kepala_surat.inputTujuanLampiran).as('inputTujuanLampiran')
        inputTujuanLampiran.wait(1000)
            .type("'-prompt()-'")
            .wait(3000)
            .type('{enter}')

        const previewPage = cy.xpath(konsep_naskah.previewPage).as('previewPage')
        previewPage.scrollTo(180, 1000, { force: true })

        const previewKepalaLampiran = cy.get(konsep_naskah.previewKepalaLampiran).as('previewKepalaLampiran')
        previewKepalaLampiran.click()

        this.inputTujuanLampiranNegatif1(inputanTujuanLampiranNegatif1, assertTujuanLampiranNegatif1)

        this.clickTambahTujuanLampiran()

        this.inputTujuanLampiranNegatif2(inputanTujuanLampiranNegatif1, assertTujuanLampiranNegatif1)

        this.clickTambahTujuanLampiran()

        this.inputTujuanLampiranNegatif3(inputanTujuanLampiranNegatif1, assertTujuanLampiranNegatif1)

        this.clickTambahTujuanLampiran()

        this.inputTujuanLampiranNegatif4(inputanTujuanLampiranNegatif1, assertTujuanLampiranNegatif1)

        this.clickTambahTujuanLampiran()

        this.inputTujuanLampiranNegatif5(inputanTujuanLampiranNegatif1, assertTujuanLampiranNegatif1)

        this.clickTambahTujuanLampiran()

        this.inputTujuanLampiranNegatif6(inputanTujuanLampiranNegatif1, assertTujuanLampiranNegatif1)

        cy.wait(3000)

        draftingKonsepNaskahPage.scrollPreviewPage()

        this.aksesFormEditingKepalaSurat()
    }

    validateTujuanSkenario10NegatifWhitespace(inputanTujuanLampiranNegatif1) {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        const radio2 = cy.get(kepala_surat.radio2).as('radio2')
        radio2.should('be.visible')
            .click()

        const labelRadio2 = cy.get(kepala_surat.labelRadio2).as('labelRadio2')
        labelRadio2.should('contain', 'Lampiran')

        const inputTujuanLampiran = cy.get(kepala_surat.inputTujuanLampiran).as('inputTujuanLampiran')
        inputTujuanLampiran.wait(1000)
            .type(inputanTujuanLampiranNegatif1)
            .wait(3000)
            .blur()

        const previewPage = cy.xpath(konsep_naskah.previewPage).as('previewPage')
        previewPage.scrollTo(180, 1000, { force: true })

        const previewKepalaLampiran = cy.get(konsep_naskah.previewKepalaLampiran).as('previewKepalaLampiran')
        previewKepalaLampiran.click()

        const inputTujuanLampiran0 = cy.get(kepala_surat.inputTujuanLampiran0).as('inputTujuanLampiran0')
        inputTujuanLampiran0.wait(1000)
            .type(inputanTujuanLampiranNegatif1)
            .wait(3000)
            .blur()

        this.clickTambahTujuanLampiran()

        const inputTujuanLampiran1 = cy.get(kepala_surat.inputTujuanLampiran1).as('inputTujuanLampiran1')
        inputTujuanLampiran1.wait(1000)
            .type(inputanTujuanLampiranNegatif1)
            .wait(3000)
            .blur()

        this.clickTambahTujuanLampiran()

        const inputTujuanLampiran2 = cy.get(kepala_surat.inputTujuanLampiran2).as('inputTujuanLampiran2')
        inputTujuanLampiran2.wait(1000)
            .type(inputanTujuanLampiranNegatif1)
            .wait(3000)
            .blur()

        this.clickTambahTujuanLampiran()

        const inputTujuanLampiran3 = cy.get(kepala_surat.inputTujuanLampiran3).as('inputTujuanLampiran3')
        inputTujuanLampiran3.wait(1000)
            .type(inputanTujuanLampiranNegatif1)
            .wait(3000)
            .blur()

        this.clickTambahTujuanLampiran()

        const inputTujuanLampiran4 = cy.get(kepala_surat.inputTujuanLampiran4).as('inputTujuanLampiran4')
        inputTujuanLampiran4.wait(1000)
            .type(inputanTujuanLampiranNegatif1)
            .wait(3000)
            .blur()

        this.clickTambahTujuanLampiran()

        const inputTujuanLampiran5 = cy.get(kepala_surat.inputTujuanLampiran5).as('inputTujuanLampiran5')
        inputTujuanLampiran5.wait(1000)
            .type(inputanTujuanLampiranNegatif1)
            .wait(3000)
            .blur()

        draftingKonsepNaskahPage.scrollPreviewPage()

        this.aksesFormEditingKepalaSurat()
    }

    validateTujuanSkenario5Prod(inputanTujuan1, inputanTujuan2, inputanTujuan3, inputanTujuanEksternal4, inputanTujuanEksternal5, inputanTujuanEksternal6) {
        const titleTujuan = cy.get(kepala_surat.titleTujuan).as('titleTujuan')
        titleTujuan.should('contain', 'Kepada Yth.')

        this.inputTujuanSuratProd1(inputanTujuan1)

        this.clickTambahTujuan()

        this.inputTujuanSuratProd2(inputanTujuan2)

        this.clickTambahTujuan()

        this.inputTujuanSuratProd3(inputanTujuan3)

        this.clickTambahTujuan()

        this.inputTujuanSuratEksternalProd4(inputanTujuanEksternal4)

        this.clickTambahTujuan()

        this.inputTujuanSuratEksternalProd5(inputanTujuanEksternal5)

        this.clickTambahTujuan()

        this.inputTujuanSuratEksternalProd6(inputanTujuanEksternal6)
    }

    clickTambahTujuan() {
        const addMoreTujuan = cy.get(kepala_surat.addMoreTujuan).as('addMoreTujuan')
        addMoreTujuan.click()
    }

    // Tujuan Kepala Surat Internal
    inputTujuanSurat1(inputanTujuan1) {
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

        const inputTujuan = cy.get(kepala_surat.inputTujuan0).as('inputTujuan')
        inputTujuan.wait(1000)
            .type(inputanTujuan1)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestInputTujuan = cy.get(kepala_surat.suggestInputTujuan, { timeout: 5000 }).as('suggestInputTujuan')
                    suggestInputTujuan.contains(inputanTujuan1, { timeout: 10000 }).should('be.visible')

                    inputTujuan.type('{enter}')
                }
            })
    }

    inputTujuanSurat2(inputanTujuan2) {
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

        const inputTujuan2 = cy.get(kepala_surat.inputTujuan1).as('inputTujuan2')
        inputTujuan2.wait(1000)
            .type(inputanTujuan2)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestInputTujuan = cy.get(kepala_surat.suggestInputTujuan, { timeout: 5000 }).as('suggestInputTujuan')
                    suggestInputTujuan.contains(inputanTujuan2, { timeout: 10000 }).should('be.visible')

                    inputTujuan2.type('{enter}')
                }
            })
    }

    inputTujuanSurat3(inputanTujuan3) {
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

        const inputTujuan3 = cy.get(kepala_surat.inputTujuan2).as('inputTujuan3')
        inputTujuan3.wait(1000)
            .type(inputanTujuan3)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestInputTujuan = cy.get(kepala_surat.suggestInputTujuan, { timeout: 5000 }).as('suggestInputTujuan')
                    suggestInputTujuan.contains(inputanTujuan3, { timeout: 10000 }).should('be.visible')

                    inputTujuan3.type('{enter}')
                }
            })
    }

    // Tujuan Kepala Surat Eksternal
    inputTujuanSuratEksternal1(inputanTujuanEksternal1) {
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

        const inputTujuan0 = cy.get(kepala_surat.inputTujuan0).as('inputTujuan0')
        inputTujuan0.wait(1000)
            .type(inputanTujuanEksternal1)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestInputTujuanEksternal = cy.get(kepala_surat.suggestInputTujuanEksternal, { timeout: 5000 }).as('suggestInputTujuanEksternal')
                    suggestInputTujuanEksternal.contains(inputanTujuanEksternal1, { timeout: 10000 }).should('be.visible')

                    inputTujuan0.type('{enter}')
                }
            })
    }

    inputTujuanSuratEksternal2(inputanTujuanEksternal2) {
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

        const inputTujuan1 = cy.get(kepala_surat.inputTujuan1).as('inputTujuan1')
        inputTujuan1.wait(1000)
            .type(inputanTujuanEksternal2)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestInputTujuanEksternal = cy.get(kepala_surat.suggestInputTujuanEksternal, { timeout: 5000 }).as('suggestInputTujuanEksternal')
                    suggestInputTujuanEksternal.contains(inputanTujuanEksternal2, { timeout: 10000 }).should('be.visible')

                    inputTujuan1.type('{enter}')
                }
            })
    }

    inputTujuanSuratEksternal3(inputanTujuanEksternal3) {
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

        const inputTujuan2 = cy.get(kepala_surat.inputTujuan2).as('inputTujuan2')
        inputTujuan2.wait(1000)
            .type(inputanTujuanEksternal3)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestInputTujuanEksternal = cy.get(kepala_surat.suggestInputTujuanEksternal, { timeout: 5000 }).as('suggestInputTujuanEksternal')
                    suggestInputTujuanEksternal.contains(inputanTujuanEksternal3, { timeout: 10000 }).should('be.visible')

                    inputTujuan2.type('{enter}')
                }
            })
    }

    inputTujuanSuratEksternal4(inputanTujuanEksternal4) {
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

        const inputTujuan3 = cy.get(kepala_surat.inputTujuan3).as('inputTujuan3')
        inputTujuan3.wait(1000)
            .type(inputanTujuanEksternal4)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestInputTujuanEksternal = cy.get(kepala_surat.suggestInputTujuanEksternal, { timeout: 5000 }).as('suggestInputTujuanEksternal')
                    suggestInputTujuanEksternal.contains(inputanTujuanEksternal4, { timeout: 10000 }).should('be.visible')

                    inputTujuan3.type('{enter}')
                }
            })
    }

    inputTujuanSuratEksternal5(inputanTujuanEksternal5) {
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

        const inputTujuan4 = cy.get(kepala_surat.inputTujuan4).as('inputTujuan4')
        inputTujuan4.wait(1000)
            .type(inputanTujuanEksternal5)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestInputTujuanEksternal = cy.get(kepala_surat.suggestInputTujuanEksternal, { timeout: 5000 }).as('suggestInputTujuanEksternal')
                    suggestInputTujuanEksternal.contains(inputanTujuanEksternal5, { timeout: 10000 }).should('be.visible')

                    inputTujuan4.type('{enter}')
                }
            })
    }

    inputTujuanSuratEksternal6(inputanTujuanEksternal6) {
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

        const inputTujuan5 = cy.get(kepala_surat.inputTujuan5).as('inputTujuan5')
        inputTujuan5.wait(1000)
            .type(inputanTujuanEksternal6)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestInputTujuanEksternal = cy.get(kepala_surat.suggestInputTujuanEksternal, { timeout: 5000 }).as('suggestInputTujuanEksternal')
                    suggestInputTujuanEksternal.contains(inputanTujuanEksternal6, { timeout: 10000 }).should('be.visible')

                    inputTujuan5.type('{enter}')
                }
            })
    }

    clickTambahTujuanLampiran() {
        const addMoreTujuanLampiran = cy.get(kepala_surat.addMoreTujuanLampiran).as('addMoreTujuanLampiran')
        addMoreTujuanLampiran.click()
    }

    // Tujuan Lampiran Surat Internal
    inputTujuanLampiranSurat1(inputanTujuan1) {
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

        const inputTujuanLampiran0 = cy.get(kepala_surat.inputTujuanLampiran0).as('inputTujuanLampiran0')
        inputTujuanLampiran0.wait(1000)
            .type(inputanTujuan1)


        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTujuanLampiran = cy.get(kepala_surat.suggestTujuanLampiran).as('suggestTujuanLampiran')
                    suggestTujuanLampiran.contains(inputanTujuan1, { timeout: 10000 }).should('be.visible')

                    inputTujuanLampiran0.type('{enter}')
                }
            })
    }

    inputTujuanLampiranSurat2(inputanTujuan2) {
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

        const inputTujuanLampiran1 = cy.get(kepala_surat.inputTujuanLampiran1).as('inputTujuanLampiran1')
        inputTujuanLampiran1.wait(1000)
            .type(inputanTujuan2)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTujuanLampiran = cy.get(kepala_surat.suggestTujuanLampiran).as('suggestTujuanLampiran')
                    suggestTujuanLampiran.contains(inputanTujuan2, { timeout: 10000 }).should('be.visible')

                    inputTujuanLampiran1.type('{enter}')
                }
            })
    }

    inputTujuanLampiranSurat3(inputanTujuan3) {
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

        const inputTujuanLampiran2 = cy.get(kepala_surat.inputTujuanLampiran2).as('inputTujuanLampiran2')
        inputTujuanLampiran2.wait(1000)
            .type(inputanTujuan3)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTujuanLampiran = cy.get(kepala_surat.suggestTujuanLampiran).as('suggestTujuanLampiran')
                    suggestTujuanLampiran.contains(inputanTujuan3, { timeout: 10000 }).should('be.visible')

                    inputTujuanLampiran2.type('{enter}')
                }
            })
    }

    // Tujuan Lampiran Surat Eksternal
    inputTujuanLampiranSuratEksternal1(inputanTujuanLampiran1) {
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

        const inputTujuanLampiran0 = cy.get(kepala_surat.inputTujuanLampiran0).as('inputTujuanLampiran0')
        inputTujuanLampiran0.wait(1000)
            .type(inputanTujuanLampiran1)


        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTujuanLampiranEksternal = cy.get(kepala_surat.suggestTujuanLampiranEksternal).as('suggestTujuanLampiranEksternal')
                    suggestTujuanLampiranEksternal.contains(inputanTujuanLampiran1, { timeout: 10000 }).should('be.visible')

                    inputTujuanLampiran0.type('{enter}')
                }
            })
    }

    inputTujuanLampiranSuratEksternal2(inputanTujuanLampiran2) {
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

        const inputTujuanLampiran1 = cy.get(kepala_surat.inputTujuanLampiran1).as('inputTujuanLampiran1')
        inputTujuanLampiran1.wait(1000)
            .type(inputanTujuanLampiran2)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTujuanLampiranEksternal = cy.get(kepala_surat.suggestTujuanLampiranEksternal).as('suggestTujuanLampiranEksternal')
                    suggestTujuanLampiranEksternal.contains(inputanTujuanLampiran2, { timeout: 10000 }).should('be.visible')

                    inputTujuanLampiran1.type('{enter}')
                }
            })
    }

    inputTujuanLampiranSuratEksternal3(inputanTujuanLampiran3) {
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

        const inputTujuanLampiran2 = cy.get(kepala_surat.inputTujuanLampiran2).as('inputTujuanLampiran2')
        inputTujuanLampiran2.wait(1000)
            .type(inputanTujuanLampiran3)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTujuanLampiranEksternal = cy.get(kepala_surat.suggestTujuanLampiranEksternal).as('suggestTujuanLampiranEksternal')
                    suggestTujuanLampiranEksternal.contains(inputanTujuanLampiran3, { timeout: 10000 }).should('be.visible')

                    inputTujuanLampiran2.type('{enter}')
                }
            })
    }

    inputTujuanLampiranSuratEksternal4(inputanTujuanLampiran4) {
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

        const inputTujuanLampiran3 = cy.get(kepala_surat.inputTujuanLampiran3).as('inputTujuanLampiran3')
        inputTujuanLampiran3.wait(1000)
            .type(inputanTujuanLampiran4)


        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTujuanLampiranEksternal = cy.get(kepala_surat.suggestTujuanLampiranEksternal).as('suggestTujuanLampiranEksternal')
                    suggestTujuanLampiranEksternal.contains(inputanTujuanLampiran4, { timeout: 10000 }).should('be.visible')

                    inputTujuanLampiran3.type('{enter}')
                }
            })
    }

    inputTujuanLampiranSuratEksternal5(inputanTujuanLampiran5) {
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

        const inputTujuanLampiran4 = cy.get(kepala_surat.inputTujuanLampiran4).as('inputTujuanLampiran4')
        inputTujuanLampiran4.wait(1000)
            .type(inputanTujuanLampiran5)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTujuanLampiranEksternal = cy.get(kepala_surat.suggestTujuanLampiranEksternal).as('suggestTujuanLampiranEksternal')
                    suggestTujuanLampiranEksternal.contains(inputanTujuanLampiran5, { timeout: 10000 }).should('be.visible')

                    inputTujuanLampiran4.type('{enter}')
                }
            })
    }

    inputTujuanLampiranSuratEksternal6(inputanTujuanLampiran6) {
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

        const inputTujuanLampiran5 = cy.get(kepala_surat.inputTujuanLampiran5).as('inputTujuanLampiran5')
        inputTujuanLampiran5.wait(1000)
            .type(inputanTujuanLampiran6)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTujuanLampiranEksternal = cy.get(kepala_surat.suggestTujuanLampiranEksternal).as('suggestTujuanLampiranEksternal')
                    suggestTujuanLampiranEksternal.contains(inputanTujuanLampiran6, { timeout: 10000 }).should('be.visible')

                    inputTujuanLampiran5.type('{enter}')
                }
            })
    }

    // Tujuan Lampiran Surat Negatif
    inputTujuanLampiranNegatif1(inputanTujuanLampiran1, assertTujuanLampiranNegatif1) {
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

        const inputTujuanLampiran0 = cy.get(kepala_surat.inputTujuanLampiran0).as('inputTujuanLampiran0')
        inputTujuanLampiran0.wait(1000)
            .type(inputanTujuanLampiran1)


        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTujuanLampiranEksternal = cy.get(kepala_surat.suggestTujuanLampiranEksternal).as('suggestTujuanLampiranEksternal')
                    suggestTujuanLampiranEksternal.contains(assertTujuanLampiranNegatif1, { timeout: 10000 }).should('be.visible')

                    inputTujuanLampiran0.type('{enter}')
                }
            })
    }

    inputTujuanLampiranNegatif2(inputanTujuanLampiran2, assertTujuanLampiranNegatif2) {
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

        const inputTujuanLampiran1 = cy.get(kepala_surat.inputTujuanLampiran1).as('inputTujuanLampiran1')
        inputTujuanLampiran1.wait(1000)
            .type(inputanTujuanLampiran2)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTujuanLampiranEksternal = cy.get(kepala_surat.suggestTujuanLampiranEksternal).as('suggestTujuanLampiranEksternal')
                    suggestTujuanLampiranEksternal.contains(assertTujuanLampiranNegatif2, { timeout: 10000 }).should('be.visible')

                    inputTujuanLampiran1.type('{enter}')
                }
            })
    }

    inputTujuanLampiranNegatif3(inputanTujuanLampiran3, assertTujuanLampiranNegatif3) {
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

        const inputTujuanLampiran2 = cy.get(kepala_surat.inputTujuanLampiran2).as('inputTujuanLampiran2')
        inputTujuanLampiran2.wait(1000)
            .type(inputanTujuanLampiran3)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTujuanLampiranEksternal = cy.get(kepala_surat.suggestTujuanLampiranEksternal).as('suggestTujuanLampiranEksternal')
                    suggestTujuanLampiranEksternal.contains(assertTujuanLampiranNegatif3, { timeout: 10000 }).should('be.visible')

                    inputTujuanLampiran2.type('{enter}')
                }
            })
    }

    inputTujuanLampiranNegatif4(inputanTujuanLampiran4, assertTujuanLampiranNegatif4) {
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

        const inputTujuanLampiran3 = cy.get(kepala_surat.inputTujuanLampiran3).as('inputTujuanLampiran3')
        inputTujuanLampiran3.wait(1000)
            .type(inputanTujuanLampiran4)


        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTujuanLampiranEksternal = cy.get(kepala_surat.suggestTujuanLampiranEksternal).as('suggestTujuanLampiranEksternal')
                    suggestTujuanLampiranEksternal.contains(assertTujuanLampiranNegatif4, { timeout: 10000 }).should('be.visible')

                    inputTujuanLampiran3.type('{enter}')
                }
            })
    }

    inputTujuanLampiranNegatif5(inputanTujuanLampiran5, assertTujuanLampiranNegatif5) {
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

        const inputTujuanLampiran4 = cy.get(kepala_surat.inputTujuanLampiran4).as('inputTujuanLampiran4')
        inputTujuanLampiran4.wait(1000)
            .type(inputanTujuanLampiran5)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTujuanLampiranEksternal = cy.get(kepala_surat.suggestTujuanLampiranEksternal).as('suggestTujuanLampiranEksternal')
                    suggestTujuanLampiranEksternal.contains(assertTujuanLampiranNegatif5, { timeout: 10000 }).should('be.visible')

                    inputTujuanLampiran4.type('{enter}')
                }
            })
    }

    inputTujuanLampiranNegatif6(inputanTujuanLampiran6, assertTujuanLampiranNegatif6) {
        cy.intercept('POST', Cypress.env('base_url_api_v2')).as('checkResponse')

        const inputTujuanLampiran5 = cy.get(kepala_surat.inputTujuanLampiran5).as('inputTujuanLampiran5')
        inputTujuanLampiran5.wait(1000)
            .type(inputanTujuanLampiran6)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestTujuanLampiranEksternal = cy.get(kepala_surat.suggestTujuanLampiranEksternal).as('suggestTujuanLampiranEksternal')
                    suggestTujuanLampiranEksternal.contains(assertTujuanLampiranNegatif6, { timeout: 10000 }).should('be.visible')

                    inputTujuanLampiran5.type('{enter}')
                }
            })
    }

    // Tujuan Kepala Surat Internal Eksternal Prod
    inputTujuanSuratProd1(inputanTujuan1) {
        cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('checkResponse')

        const inputTujuan = cy.get(kepala_surat.inputTujuan0).as('inputTujuan')
        inputTujuan.wait(1000)
            .type(inputanTujuan1)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestInputTujuan = cy.get(kepala_surat.suggestInputTujuan, { timeout: 5000 }).as('suggestInputTujuan')
                    suggestInputTujuan.contains(inputanTujuan1, { timeout: 10000 }).should('be.visible')

                    inputTujuan.type('{enter}')
                }
            })
    }

    inputTujuanSuratProd2(inputanTujuan2) {
        cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('checkResponse')

        const inputTujuan2 = cy.get(kepala_surat.inputTujuan1).as('inputTujuan2')
        inputTujuan2.wait(1000)
            .type(inputanTujuan2)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestInputTujuan = cy.get(kepala_surat.suggestInputTujuan, { timeout: 5000 }).as('suggestInputTujuan')
                    suggestInputTujuan.contains(inputanTujuan2, { timeout: 10000 }).should('be.visible')

                    inputTujuan2.type('{enter}')
                }
            })
    }

    inputTujuanSuratProd3(inputanTujuan3) {
        cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('checkResponse')

        const inputTujuan3 = cy.get(kepala_surat.inputTujuan2).as('inputTujuan3')
        inputTujuan3.wait(1000)
            .type(inputanTujuan3)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestInputTujuan = cy.get(kepala_surat.suggestInputTujuan, { timeout: 5000 }).as('suggestInputTujuan')
                    suggestInputTujuan.contains(inputanTujuan3, { timeout: 10000 }).should('be.visible')

                    inputTujuan3.type('{enter}')
                }
            })
    }

    inputTujuanSuratEksternalProd4(inputanTujuanEksternal4) {
        cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('checkResponse')

        const inputTujuan3 = cy.get(kepala_surat.inputTujuan3).as('inputTujuan3')
        inputTujuan3.wait(1000)
            .type(inputanTujuanEksternal4)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestInputTujuanEksternal = cy.get(kepala_surat.suggestInputTujuanEksternal, { timeout: 5000 }).as('suggestInputTujuanEksternal')
                    suggestInputTujuanEksternal.contains(inputanTujuanEksternal4, { timeout: 10000 }).should('be.visible')

                    inputTujuan3.type('{enter}')
                }
            })
    }

    inputTujuanSuratEksternalProd5(inputanTujuanEksternal5) {
        cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('checkResponse')

        const inputTujuan4 = cy.get(kepala_surat.inputTujuan4).as('inputTujuan4')
        inputTujuan4.wait(1000)
            .type(inputanTujuanEksternal5)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestInputTujuanEksternal = cy.get(kepala_surat.suggestInputTujuanEksternal, { timeout: 5000 }).as('suggestInputTujuanEksternal')
                    suggestInputTujuanEksternal.contains(inputanTujuanEksternal5, { timeout: 10000 }).should('be.visible')

                    inputTujuan4.type('{enter}')
                }
            })
    }

    inputTujuanSuratEksternalProd6(inputanTujuanEksternal6) {
        cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('checkResponse')

        const inputTujuan5 = cy.get(kepala_surat.inputTujuan5).as('inputTujuan5')
        inputTujuan5.wait(1000)
            .type(inputanTujuanEksternal6)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response.statusCode === 200) {
                    const suggestInputTujuanEksternal = cy.get(kepala_surat.suggestInputTujuanEksternal, { timeout: 5000 }).as('suggestInputTujuanEksternal')
                    suggestInputTujuanEksternal.contains(inputanTujuanEksternal6, { timeout: 10000 }).should('be.visible')

                    inputTujuan5.type('{enter}')
                }
            })
    }
}