import tab_registrasi from "../../../../selectors/sidebar/konsep_naskah/drafting_luar/tab_registrasi"

const getPreviewData = "cypress/fixtures/non_cred/drafting_luar/transaction_data/preview_data.json"
export class TabRegistrasiPage {

    // BANK NOMOR //
    clickTabRegistrasi() {
        const btn_uploadFileTabRegistrasi = cy.get(tab_registrasi.btn_uploadFileTabRegistrasi).as('btn_uploadFileTabRegistrasi')
        btn_uploadFileTabRegistrasi.should('contain', 'Registrasi')
            .click()
    }

    checkFieldNomorUrut(bank_nomor) {
        if (bank_nomor === 'none') {
            const input_bankNomorNomorUrut = cy.get(tab_registrasi.input_bankNomorNomorUrut).as('input_bankNomorNomorUrut')
            input_bankNomorNomorUrut.find('input')
                .should('be.visible')
                .and('be.disabled')
        } else {
            // Input Bank Nomor
            const select_bankNomor = cy.get(tab_registrasi.select_bankNomor).first().as('select_bankNomor')
            select_bankNomor.should('be.visible')
                .click()

            const select_bankNomorlainnya = cy.get(tab_registrasi.select_bankNomorlainnya).as('select_bankNomorlainnya')
            select_bankNomorlainnya.should('be.visible')
                .click()

            // Input Nomor Urut
            const input_bankNomorNomorUrut = cy.get(tab_registrasi.input_bankNomorNomorUrut).as('input_bankNomorNomorUrut')
            input_bankNomorNomorUrut.should('have.attr', 'type', 'number')
                .and('be.visible')
        }
    }

    inputNomorUrut() {
        cy.readFile(getPreviewData).then((object) => {
            if (!object.bank_nomor) {
                object.bank_nomor = [];
            }

            // Input Bank Nomor
            const select_bankNomor = cy.get(tab_registrasi.select_bankNomor).first().as('select_bankNomor')
            select_bankNomor.scrollIntoView()
                .should('be.visible')
                .click()

            const select_bankNomorUKDispusipda = cy.get(tab_registrasi.select_bankNomorUKDispusipda).as('select_bankNomorUKDispusipda')
            select_bankNomorUKDispusipda.should('be.visible')
                .click()
                .invoke('text')  // Extract the value of the input
                .then((inputBankNomor) => { // Use the actual value from the input
                    // Construct the sub-object
                    const bank_nomor_name = {
                        bank_nomor: inputBankNomor.trim()
                    }

                    // Push the sub-object to the array
                    object.bank_nomor.push(bank_nomor_name)

                    // Write data to the JSON file
                    cy.writeFile(getPreviewData, object)
                })

            // Input Nomor Urut
            const select_inputNomorUrut = cy.get(tab_registrasi.select_inputNomorUrut).first().as('select_inputNomorUrut')
            select_inputNomorUrut.should('be.visible')
                .click()

            const select_inputNomorUrut0 = cy.get(tab_registrasi.select_inputNomorUrut0).as('select_inputNomorUrut0')
            select_inputNomorUrut0.should('be.visible')
                .click()
                .invoke('text')  // Extract the value of the input
                .then((inputNomorUrut) => { // Use the actual value from the input
                    // Construct the sub-object
                    const nomor_urut = {
                        nomor_urut: inputNomorUrut.trim()
                    }

                    // Push the sub-object to the array
                    object.bank_nomor.push(nomor_urut)

                    // Write data to the JSON file
                    cy.writeFile(getPreviewData, object)
                })
        })
    }

    checkBtnSubmit() {
        const btn_submitFormRegistrasi = cy.get(tab_registrasi.btn_submitFormRegistrasi).as('btn_submitFormRegistrasi')
        btn_submitFormRegistrasi.should('be.visible')
            .and('be.disabled')
    }

    searchKodeKlasifikasi(inputanKodeKlasifikasi) {
        cy.readFile(getPreviewData).then((object) => {
            if (!object.bank_nomor) {
                object.bank_nomor = [{}];
            }

            const label_kodeKlasifikasi = cy.get(tab_registrasi.label_kodeKlasifikasi).as('label_kodeKlasifikasi')
            label_kodeKlasifikasi.should('contain', 'Kode klasifikasi')

            const select_inputKodeKlasifikasi = cy.get(tab_registrasi.select_inputKodeKlasifikasi).first().as('select_inputKodeKlasifikasi')
            select_inputKodeKlasifikasi.click()
                .wait(3000)
                .type(inputanKodeKlasifikasi)
                .wait(3000)
                .type('{enter}')

            const val_inputKodeKlasifikasi = cy.get(tab_registrasi.select_inputKodeKlasifikasi).as('val_inputKodeKlasifikasi')
            val_inputKodeKlasifikasi.find('div')
                .find('div')
                .find('span')
                .invoke('text')  // Extract the text of the input
                .then((inputKodeKlasifikasi) => { // Use the actual value from the input
                    // Construct the sub-object
                    const kode_klasifikasi = {
                        kode_klasifikasi: inputKodeKlasifikasi.trim()
                    }

                    // Push the sub-object to the array
                    object.bank_nomor.push(kode_klasifikasi)

                    // // Write data to the JSON file
                    cy.writeFile(getPreviewData, object)
                })
        })
    }

    batalKodeKlasifikasi() {
        const select_inputKodeKlasifikasi = cy.get(tab_registrasi.select_inputKodeKlasifikasi).first().as('select_inputKodeKlasifikasi')
        select_inputKodeKlasifikasi.find('button')
            .should('have.attr', 'title', 'Clear Selected')
            .click()
    }

    checkKodeKlasifikasi(inputanKodeKlasifikasi) {
        // Assertion pemilihan kode klasifikasi
        const select_inputKodeKlasifikasi = cy.get(tab_registrasi.select_inputKodeKlasifikasi).first().as('select_inputKodeKlasifikasi')
        select_inputKodeKlasifikasi.find('span')
            .should('contain', inputanKodeKlasifikasi)
    }

    inputUnitPengolah(inputUnitPengolah, assertionUnitPengolah) {
        cy.readFile(getPreviewData).then((object) => {
            if (!object.bank_nomor) {
                object.bank_nomor = [{}];
            }

            const label_unitPengolah = cy.get(tab_registrasi.label_unitPengolah).as('label_unitPengolah')
            label_unitPengolah.should('contain', 'Unit pengolah')

            // Input unit pengolah
            const input_unitPengolah = cy.get(tab_registrasi.input_unitPengolah).first().as('input_unitPengolah')
            input_unitPengolah.clear()
                .type(inputUnitPengolah)

            // Assertion input unit pengolah
            const assert_unitPengolah = cy.get(tab_registrasi.input_unitPengolah).first().as('assert_unitPengolah')
            assert_unitPengolah.invoke('val')
                .then((val) => {
                    expect(val).to.deep.equal(assertionUnitPengolah);

                    // Construct the sub-object
                    const unit_pengolah = {
                        unit_pengolah: val.trim()
                    }

                    // Push the sub-object to the array
                    object.bank_nomor.push(unit_pengolah)

                    // // Write data to the JSON file
                    cy.writeFile(getPreviewData, object)
                })
        })
    }

    // TUJUAN SURAT //
    activateToggleDistribusi() {
        const check_toggleDistribusi = cy.get(tab_registrasi.check_toggleDistribusi).as('check_toggleDistribusi')
        check_toggleDistribusi.click({ force: true })
    }

    inputTujuan(inputEnv, tujuanKe, tujuanInternalEksternal, inputTujuan) {
        cy.readFile(getPreviewData).then((object) => {
            if (!object.tujuan_surat) {
                object.tujuan_surat = [{}]; // Initialize as an empty array
            }

            // Intercept all POST network requests
            if (inputEnv === 'prod') {
                cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('postRequest')
            } else {
                cy.intercept('POST', Cypress.env('base_url_api_v2')).as('postRequest')
            }

            if (inputTujuan) {
                const select_inputTujuan = cy.get(tab_registrasi.select_inputTujuan + tujuanKe + '"').as('select_inputTujuan')
                select_inputTujuan.click()
                    .wait(1000)
                    .type(inputTujuan)

                if (tujuanInternalEksternal === 'internal') {
                    cy.wait('@postRequest', { timeout: 5000 })
                        .then((interception) => {
                            if (interception.response.statusCode === 200) {
                                const select_inputTujuanSuggest0 = cy.get(tab_registrasi.select_inputTujuanSuggest0).first().as('select_inputTujuanSuggest0')
                                select_inputTujuanSuggest0.scrollIntoView()
                                    .contains(inputTujuan, { timeout: 10000 }).should('be.visible')
                                    .invoke('text')
                                    .then((inputanTujuanSuggest) => {
                                        // Push the sub-object to the array
                                        object.tujuan_surat[tujuanKe] = { tujuan_internal: inputanTujuanSuggest.trim() };

                                        // Write data to the JSON file
                                        cy.writeFile(getPreviewData, object)

                                        // Select Tujuan
                                        select_inputTujuan.type('{enter}')
                                    })
                            }
                        })
                } else {
                    cy.wait('@postRequest', { timeout: 5000 })
                        .then((interception) => {
                            if (interception.response.statusCode === 200) {
                                const input_inputTujuanEksternalSuggest = cy.get(tab_registrasi.input_inputTujuanEksternalSuggest).as('input_inputTujuanEksternalSuggest')
                                input_inputTujuanEksternalSuggest.contains(inputTujuan, { timeout: 10000 }).should('be.visible')
                                    .invoke('text')
                                    .then((inputanTujuanSuggest) => {
                                        // Push the sub-object to the array
                                        object.tujuan_surat[tujuanKe] = { tujuan_eksternal: inputanTujuanSuggest.trim() };

                                        // Write data to the JSON file
                                        cy.writeFile(getPreviewData, object)

                                        // Select Tujuan
                                        select_inputTujuan.type('{enter}')
                                    })
                            }
                        })
                }
            } else {
                const select_inputTujuan = cy.get(tab_registrasi.select_inputTujuan + tujuanKe + '"').as('select_inputTujuan')
                select_inputTujuan.click()

                const select_inputTujuanSuggest0 = cy.get(tab_registrasi.select_inputTujuanSuggest0).as('select_inputTujuanSuggest0')
                select_inputTujuanSuggest0.wait(3000)
                    .click()
                    .invoke('text')
                    .then((inputanTujuanSuggest) => {
                        // Push the sub-object to the array
                        object.tujuan_surat[tujuanKe] = { tujuan_eksternal: inputanTujuanSuggest.trim() };

                        // Write data to the JSON file
                        cy.writeFile(getPreviewData, object)
                    })
            }
        })
    }

    deleteTujuan() {
        const select_inputTujuanWrapper = cy.get(tab_registrasi.select_inputTujuanWrapper).as('select_inputTujuanWrapper')
        select_inputTujuanWrapper.find('button')
            .should('have.attr', 'title', 'Clear Selected')
            .click()
    }

    addMoreTujuan() {
        const btn_addMoreTujuan = cy.get(tab_registrasi.btn_addMoreTujuan).as('btn_addMoreTujuan')
        btn_addMoreTujuan.should('contain', 'Tambah Penerima')
            .click()
    }

    inputTembusan(inputEnv, tembusanKe, tujuanInternalEksternal, inputTembusan) {
        cy.readFile(getPreviewData).then((object) => {
            if (!object.tembusan_surat) {
                object.tembusan_surat = [{}]; // Initialize as an empty array
            }
            // Intercept all POST network requests
            if (inputEnv === 'prod') {
                cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('postRequest')
            } else {
                cy.intercept('POST', Cypress.env('base_url_api_v2')).as('postRequest')
            }

            if (inputTembusan) {
                const select_inputTembusan = cy.get(tab_registrasi.select_inputTembusan + tembusanKe + '"').as('select_inputTembusan')
                select_inputTembusan.click()
                    .wait(1000)
                    .type(inputTembusan)

                if (tujuanInternalEksternal === 'internal') {
                    cy.wait('@postRequest', { timeout: 5000 })
                        .then((interception) => {
                            if (interception.response.statusCode === 200) {
                                const select_inputTembusanSuggest0 = cy.get(tab_registrasi.select_inputTembusanSuggest0).as('select_inputTembusanSuggest0')
                                select_inputTembusanSuggest0.contains(inputTembusan, { timeout: 10000 }).should('be.visible')
                                    .invoke('text')
                                    .then((inputanTembusanSuggest) => {
                                        // Push the sub-object to the array
                                        object.tembusan_surat[tembusanKe] = { tembusan_internal: inputanTembusanSuggest.trim() };

                                        // Write data to the JSON file
                                        cy.writeFile(getPreviewData, object)

                                        // Select Tembusan
                                        select_inputTembusan.type('{enter}')
                                    })
                            }
                        })
                } else {
                    cy.wait('@postRequest', { timeout: 5000 })
                        .then((interception) => {
                            if (interception.response.statusCode === 200) {
                                const input_inputTembusanEksternalSuggest = cy.get(tab_registrasi.input_inputTembusanEksternalSuggest).as('input_inputTembusanEksternalSuggest')
                                input_inputTembusanEksternalSuggest.contains(inputTembusan, { timeout: 10000 }).should('be.visible')
                                    .invoke('text')
                                    .then((inputanTembusanSuggest) => {
                                        // Push the sub-object to the array
                                        object.tembusan_surat[tembusanKe] = { tembusan_eksternal: inputanTembusanSuggest.trim() };

                                        // Write data to the JSON file
                                        cy.writeFile(getPreviewData, object)

                                        // Select Tembusan
                                        select_inputTembusan.type('{enter}')
                                    })
                            }
                        })
                }
            } else {
                const select_inputTembusan = cy.get(tab_registrasi.select_inputTembusan + tembusanKe + '"').as('select_inputTembusan')
                select_inputTembusan.click()

                const select_inputTembusanSuggest0 = cy.get(tab_registrasi.select_inputTembusanSuggest0).as('select_inputTembusanSuggest0')
                select_inputTembusanSuggest0.wait(3000)
                    .click()
                    .invoke('text')
                    .then((inputanTembusanSuggest) => {
                        // Push the sub-object to the array
                        object.tembusan_surat[tembusanKe] = { tembusan: inputanTembusanSuggest.trim() };

                        // Write data to the JSON file
                        cy.writeFile(getPreviewData, object)
                    })
            }
        })
    }

    addMoreTembusan() {
        const btn_addMoreTembusan = cy.get(tab_registrasi.btn_addMoreTembusan).as('btn_addMoreTembusan')
        btn_addMoreTembusan.should('contain', 'Tambah Tembusan')
            .click()
    }

    deleteTembusan() {
        const btn_deleteTembusan1 = cy.get(tab_registrasi.btn_deleteTembusan1).as('btn_deleteTembusan1')
        btn_deleteTembusan1.parent().click()
    }

    inputPerihal(inputPerihal, assertionPerihal) {
        cy.readFile(getPreviewData).then((object) => {
            if (!object.identitas_surat) {
                object.identitas_surat = []; // Initialize as an empty array
            }

            const label_perihal = cy.get(tab_registrasi.label_perihal).as('label_perihal')
            label_perihal.should('contain', 'Perihal')

            // Input perihal
            const input_perihal = cy.get(tab_registrasi.input_perihal).as('input_perihal')
            input_perihal.clear()
                .type(inputPerihal)

            // Assertion input unit pengolah
            const assert_perihal = cy.get(tab_registrasi.input_perihal).as('assert_perihal')
            assert_perihal.invoke('val')
                .then((val) => {
                    expect(val).to.deep.equal(assertionPerihal);

                    // Construct the sub-object
                    const perihal_name = {
                        perihal: val.trim()
                    }

                    // Push the sub-object to the array
                    object.identitas_surat.push(perihal_name)

                    // Write data to the JSON file
                    cy.writeFile(getPreviewData, object)
                })
        })
    }

    checkWarnaLabelUrgensi(inputanUrgensi, index) {
        cy.readFile(getPreviewData).then((object) => {
            if (!object.identitas_surat) {
                object.identitas_surat = []; // Initialize as an empty array
            }
            // Label
            const label_urgensi = cy.get(tab_registrasi.label_urgensi).as('label_urgensi')
            label_urgensi.should('contain', 'Urgensi')

            // Input Urgensi
            const select_urgensi = cy.get(tab_registrasi.select_urgensi).first().as('select_urgensi')
            select_urgensi.click()

            const select_urgensiOption = cy.get(tab_registrasi.select_urgensiOption + index + '"').as('select_urgensiOption')
            select_urgensiOption.click()
                .invoke('text')
                .then((val) => {
                    // Construct the sub-object
                    const urgensi_name = {
                        urgensi: val.trim()
                    }

                    // Push the sub-object to the array
                    object.identitas_surat.push(urgensi_name)

                    // Write data to the JSON file
                    cy.writeFile(getPreviewData, object)
                })
        })

        // Assertion warna
        if (inputanUrgensi === 'Amat Segera') {
            const label_urgensiHeader = cy.get(tab_registrasi.label_urgensiHeader).as('label_urgensiHeader')
            label_urgensiHeader.should('have.class', 'py-2 px-4 rounded-3xl flex space-x-2 items-center bg-[#FFEBEE]')
        } else if (inputanUrgensi === 'Biasa') {
            const label_urgensiHeader = cy.get(tab_registrasi.label_urgensiHeader).as('label_urgensiHeader')
            label_urgensiHeader.should('have.class', 'py-2 px-4 rounded-3xl flex space-x-2 items-center bg-[#E6F6EC]')
        } else if (inputanUrgensi === 'Penting') {
            const label_urgensiHeader = cy.get(tab_registrasi.label_urgensiHeader).as('label_urgensiHeader')
            label_urgensiHeader.should('have.class', 'py-2 px-4 rounded-3xl flex space-x-2 items-center bg-[#E3F2FD]')
        } else {
            const label_urgensiHeader = cy.get(tab_registrasi.label_urgensiHeader).as('label_urgensiHeader')
            label_urgensiHeader.should('have.class', 'py-2 px-4 rounded-3xl flex space-x-2 items-center bg-[#FFF9E1]')
        }
    }

    inputSifat(indexSurat) {
        cy.readFile(getPreviewData).then((object) => {
            if (!object.identitas_surat) {
                object.identitas_surat = []; // Initialize as an empty array
            }

            // Label
            const label_sifatSurat = cy.get(tab_registrasi.label_sifatSurat).as('label_sifatSurat')
            label_sifatSurat.should('contain', 'Sifat Surat')

            // Input Sifat
            const select_sifatSurat = cy.get(tab_registrasi.select_sifatSurat).first().as('select_sifatSurat')
            select_sifatSurat.click()

            const select_sifatSuratOption = cy.get(tab_registrasi.select_sifatSuratOption + indexSurat + '"').as('select_sifatSuratOption')
            select_sifatSuratOption.click()
                .invoke('text')
                .then((val) => {
                    // Construct the sub-object
                    const sifat_name = {
                        sifat: val.trim()
                    }

                    // Push the sub-object to the array
                    object.identitas_surat.push(sifat_name)

                    // Write data to the JSON file
                    cy.writeFile(getPreviewData, object)
                })
        })
    }

    // PENANDATANGAN //
    addMorePenandatangan() {
        const btn_addMorePenandatangan = cy.get(tab_registrasi.btn_addMorePenandatangan).as('btn_addMorePenandatangan')
        btn_addMorePenandatangan.should('contain', 'Tambah Penandatangan')
            .click()

        // Assertion
        const dialog_penandatangan = cy.get(tab_registrasi.dialog_penandatangan).as('dialog_penandatangan')
        dialog_penandatangan.should('be.visible')

        const dialog_penandatanganTitle = cy.get(tab_registrasi.dialog_penandatanganTitle).as('dialog_penandatanganTitle')
        dialog_penandatanganTitle.should('contain', 'Tambah Penandatangan')
    }

    inputPenandatanganDiriSendiri() {
        cy.readFile(getPreviewData).then((object) => {
            if (!object.penandatangan) {
                object.penandatangan = []; // Initialize as an empty array
            }

            const dialog_penandatanganModeLabel = cy.get(tab_registrasi.dialog_penandatanganModeLabel).as('dialog_penandatanganModeLabel')
            dialog_penandatanganModeLabel.should('contain', 'Mode Penandatangan')

            const dialog_penandatanganModeInput = cy.get(tab_registrasi.dialog_penandatanganModeInput).as('dialog_penandatanganModeInput')
            dialog_penandatanganModeInput.select('Diri sendiri').should('have.value', 'DIRI_SENDIRI')

            // Assertion
            const dialog_penandatanganLabel = cy.get(tab_registrasi.dialog_penandatanganLabel).as('dialog_penandatanganLabel')
            dialog_penandatanganLabel.should('contain', 'Penandatangan')

            const label_konseptorName = cy.get(tab_registrasi.label_konseptorName).as('label_konseptorName')
            label_konseptorName.invoke('val')
                .then((val) => {
                    const dialog_penandatanganInput = cy.get(tab_registrasi.dialog_penandatanganInput).as('dialog_penandatanganInput')
                    dialog_penandatanganInput.find('span').should('contain', val)

                    label_konseptorName.invoke('text')
                        .then((text) => {
                            // Construct the sub-object
                            const penandatangan_name = {
                                penandatangan_diri_sendiri: text.trim()
                            }

                            // Push the sub-object to the array
                            object.penandatangan.push(penandatangan_name)

                            // Write data to the JSON file
                            cy.writeFile(getPreviewData, object)
                        })
                })
        })

        const btn_simpanPenandatangan = cy.get(tab_registrasi.btn_simpanPenandatangan).as('btn_simpanPenandatangan')
        btn_simpanPenandatangan.should('contain', 'Simpan')
            .click()
    }

    uploadSuratPengantar(status) {
        if (status === 'positif') {
            // Upload File
            const fileUploadSingleFile = 'non_cred/drafting_luar/master_data/TEMPLATE_SURAT_BIASA.pdf'
            const fileName = 'TEMPLATE_SURAT_BIASA.pdf'

            const btn_inputSuratPengantar = cy.get(tab_registrasi.btn_inputSuratPengantar).as('btn_inputSuratPengantar')
            btn_inputSuratPengantar.attachFile(fileUploadSingleFile)

            // Assertion file name
            const label_fileTitle = cy.get(tab_registrasi.label_fileTitle).as('label_fileTitle')
            label_fileTitle.should('contain', fileName)
        } else {
            // Upload File
            const fileUploadSingleFile = 'non_cred/drafting_luar/master_data/image_example.jpg'
            const fileName = 'image_example.jpg'

            const btn_inputSuratPengantar = cy.get(tab_registrasi.btn_inputSuratPengantar).as('btn_inputSuratPengantar')
            btn_inputSuratPengantar.attachFile(fileUploadSingleFile)

            // Assertion file name
            const label_fileNotSupport = cy.get(tab_registrasi.label_fileNotSupport).as('label_fileNotSupport')
            label_fileNotSupport.should('contain', fileName)
                .and('have.class', 'filename text-[#C62828]')
        }
    }

    checkDeleteSuratPengantar() {
        // Click button delete file
        const btn_deleteSuratPengantar = cy.get(tab_registrasi.btn_deleteSuratPengantar).as('btn_deleteSuratPengantar')
        btn_deleteSuratPengantar.scrollIntoView()
            .should('be.visible')
            .click()

        // Assertion nama file
        const dialog_backPanel = cy.get(tab_registrasi.dialog_backPanel).as('dialog_backPanel')
        dialog_backPanel.should('be.visible')

        const dialog_backTitle = cy.get(tab_registrasi.dialog_backTitle).as('dialog_backTitle')
        dialog_backTitle.should('contain', 'Hapus Surat Pengantar')

        const dialog_backDesc = cy.get(tab_registrasi.dialog_backDesc).as('dialog_backDesc')
        dialog_backDesc.find('p')
            .should('contain', 'image_example.jpg')

        const dialog_backConfirm = cy.get(tab_registrasi.dialog_backConfirm).first().as('dialog_backConfirm')
        dialog_backConfirm.find('div')
            .find('span')
            .should('contain', 'Ya, hapus file')

        const dialog_backCancel = cy.get(tab_registrasi.dialog_backCancel).first().as('dialog_backCancel')
        dialog_backCancel.find('div')
            .find('span')
            .should('contain', 'Tidak')
    }

    batalDeleteFile() {
        const dialog_backCancel = cy.get(tab_registrasi.dialog_backCancel).as('dialog_backCancel')
        dialog_backCancel.should('contain', 'Tidak')
            .and('be.visible')
            .click()

        // Assertion
        const label_konsepNaskah = cy.get(tab_registrasi.label_konsepNaskah).as('label_konsepNaskah')
        label_konsepNaskah.should('contain', 'Konsep Naskah')
            .and('be.visible')
    }

    deleteFileSuratPengantar() {
        // Click button delete file
        const btn_deleteSuratPengantar = cy.get(tab_registrasi.btn_deleteSuratPengantar).as('btn_deleteSuratPengantar')
        btn_deleteSuratPengantar.scrollIntoView()
            .should('be.visible')
            .click()

        const dialog_backConfirm = cy.get(tab_registrasi.dialog_backConfirm).first().as('dialog_backConfirm')
        dialog_backConfirm.find('div')
            .find('span')
            .should('contain', 'Ya, hapus file')
            .click()

        // Assertion
        const label_konsepNaskah = cy.get(tab_registrasi.label_konsepNaskah).as('label_konsepNaskah')
        label_konsepNaskah.should('contain', 'Konsep Naskah')
            .and('be.visible')
    }

    checkDataFileUpload() {
        // Assertion file upload
        const label_fileUploadTitle = cy.get(tab_registrasi.label_fileTitle).as('label_fileUploadTitle')
        label_fileUploadTitle.scrollIntoView()
            .should('contain', 'TEMPLATE_SURAT_BIASA.pdf')

        const label_fileUploadSize = cy.get(tab_registrasi.label_fileSize).as('label_fileUploadSize')
        label_fileUploadSize.should('contain', '434.0 KB')

        const btn_deleteSuratPengantar = cy.get(tab_registrasi.btn_deleteSuratPengantar).as('btn_deleteSuratPengantar')
        btn_deleteSuratPengantar.should('be.visible')
    }
}