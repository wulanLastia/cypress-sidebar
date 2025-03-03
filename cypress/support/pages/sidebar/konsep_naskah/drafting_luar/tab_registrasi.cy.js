import tab_registrasi from "@selectors/sidebar/konsep_naskah/drafting_luar/tab_registrasi"

const getMasterData = "cypress/fixtures/non_cred/drafting_luar/master_data/create_data.json"
const getPreviewData = "cypress/fixtures/non_cred/drafting_luar/transaction_data/preview_data.json"
export class TabRegistrasiPage {

    // BANK NOMOR //
    clickTabRegistrasi() {
        const btn_uploadFileTabRegistrasi = cy.get(tab_registrasi.btn_uploadFileTabRegistrasi).as('btn_uploadFileTabRegistrasi')
        btn_uploadFileTabRegistrasi.should('contain', 'Registrasi')
            .click()

        // Begin Save Assertion Data
        cy.readFile(getPreviewData).then((object) => {
            if (!object.konseptor) {
                object.konseptor = [];
            }

            const label_konseptorName = cy.get(tab_registrasi.label_konseptorName).as('label_konseptorName')
            label_konseptorName.invoke('text')
                .then((textValue) => {
                    // Construct the sub-object
                    const konseptorName = {
                        konseptor_name: textValue.trim()
                    }

                    // Push the sub-object to the array
                    object.konseptor.push(konseptorName)

                    // // Write data to the JSON file
                    cy.writeFile(getPreviewData, object)
                })

            const label_konseptorPosition = cy.get(tab_registrasi.label_konseptorPosition).as('label_konseptorPosition')
            label_konseptorPosition.invoke('text')
                .then((textValue) => {
                    // Construct the sub-object
                    const konseptorPosition = {
                        konseptor_position: textValue.trim()
                    }

                    // Push the sub-object to the array
                    object.konseptor.push(konseptorPosition)

                    // // Write data to the JSON file
                    cy.writeFile(getPreviewData, object)
                })
        })
    }

    inputPenomoran() {
        // Check if section nomor surat exist
        cy.get('body').then($body => {
            if ($body.find(tab_registrasi.label_nomorSurat).length > 0) {

                cy.readFile(getMasterData).then((data_temp) => {
                    // Input nomor urut
                    this.inputNomorUrut(data_temp.registrasi[0].bank_nomor_lainnya)
                    
                    // Input kode klasifikasi
                    this.searchKodeKlasifikasi(data_temp.registrasi[1].kode_klasifikasi)

                    // Input unit pengolah
                    this.inputUnitPengolah(data_temp.registrasi[2].unit_pengolah_diskom, data_temp.registrasi[2].unit_pengolah_diskom)
                });
            }
        });
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
            input_bankNomorNomorUrut.scrollIntoView()
                .should('have.attr', 'type', 'text')
                .and('be.visible')
        }
    }

    inputNomorUrut(inputIndex) {
        cy.readFile(getPreviewData).then((object) => {
            if (!object.bank_nomor) {
                object.bank_nomor = [];
            }

            // Input Bank Nomor
            const select_bankNomor = cy.get(tab_registrasi.select_bankNomor).first().as('select_bankNomor')
            select_bankNomor.scrollIntoView()
                .should('be.visible')
                .click()

            const select_inputBankNomor = cy.get(tab_registrasi.select_inputBankNomor + inputIndex + '"').as('select_inputBankNomor')
            select_inputBankNomor.should('be.visible')
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

            if(inputIndex == 9999){
                // Input Nomor Urut lainnya
                const uuid = () => Cypress._.random(0, 1e6)
                const id = uuid()
                const nomorUrut = `AUTOMATION/${id}`

                const select_inputNomorUrut = cy.get(tab_registrasi.select_inputNomorUrut).first().as('select_inputNomorUrut')
                select_inputNomorUrut.scrollIntoView()
                    .type(nomorUrut)  
                    .invoke('val') // Extract the value of the input
                    .then((val) => { // Use the actual value from the input
                        // Construct the sub-object
                        const nomor_urut = {
                            nomor_urut: val.trim()
                        }

                        // Push the sub-object to the array
                        object.bank_nomor.push(nomor_urut)

                        // Write data to the JSON file
                        cy.writeFile(getPreviewData, object)
                    })
            }else{
                // Input Nomor Urut
                const select_inputNomorUrut = cy.get(tab_registrasi.select_inputNomorUrut).first().as('select_inputNomorUrut')
                select_inputNomorUrut.scrollIntoView()
                    .should('be.visible')
                    .click()

                // Check if nomor available
                cy.get('body').then($body => {
                    if ($body.find(tab_registrasi.select_inputNomorUrut0).length > 0) {
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
                    } else {
                        this.inputNomorUrut(9999)
                    }
                })
            }
        })
    }

    batalTujuanTembusan() {
        // Click btn cancel input tujuan tembusan
        const btn_cancelDialogTujuanTembusan = cy.get(tab_registrasi.btn_cancelDialogTujuanTembusan).as('btn_cancelDialogTujuanTembusan')
        btn_cancelDialogTujuanTembusan.find('div')
            .should('contain', 'Batal')
            .click()
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
        const btn_klasifikasiClear = cy.get(tab_registrasi.btn_klasifikasiClear).as('btn_klasifikasiClear')
        btn_klasifikasiClear.should('be.visible')
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

    inputTujuanTembusan() {
        // Click button tambah tujuan dan tembusan
        const label_daftarTujuanTembusan = cy.get(tab_registrasi.label_daftarTujuanTembusan).as('label_daftarTujuanTembusan')
        label_daftarTujuanTembusan.scrollIntoView()
            .should('contain', 'Tujuan & Tembusan surat')

        const btn_tujuanTembusan = cy.get(tab_registrasi.btn_tujuanTembusan).as('btn_tujuanTembusan')
        btn_tujuanTembusan.should('contain', 'Tambah daftar tujuan & tembusan')
            .click()
    }

    selectInternalDinas() {
        // Pilih internal dinas
        const btn_daftarInternalDinas = cy.get(tab_registrasi.btn_daftarInternalDinas).as('btn_daftarInternalDinas')
        btn_daftarInternalDinas
            .find('div')
            .should('contain', 'Internal Dinas')
            .click()

        // Assertion pop up
        const dialog_tujuanTembusan = cy.get(tab_registrasi.dialog_tujuanTembusan).as('dialog_tujuanTembusan')
        dialog_tujuanTembusan.should('be.visible')

        const dialog_tujuanTembusanTitle = cy.get(tab_registrasi.dialog_tujuanTembusanTitle).as('dialog_tujuanTembusanTitle')
        dialog_tujuanTembusanTitle.should('contain', 'Internal Dinas')

        const btn_closeDialogTujuanTembusan = cy.get(tab_registrasi.btn_closeDialogTujuanTembusan).as('btn_closeDialogTujuanTembusan')
        btn_closeDialogTujuanTembusan.should('be.visible')

        const label_dialogTujuanTembusanInfo = cy.get(tab_registrasi.label_dialogTujuanTembusanInfo).as('label_dialogTujuanTembusanInfo')
        label_dialogTujuanTembusanInfo.find('span')
            .should('contain', 'Naskah akan dikirim ke akun Sidebar penerima secara langsung.')

        const btn_cancelDialogTujuanTembusan = cy.get(tab_registrasi.btn_cancelDialogTujuanTembusan).as('btn_cancelDialogTujuanTembusan')
        btn_cancelDialogTujuanTembusan.find('div')
            .should('contain', 'Batal')

        const btn_confirmDialogTujuanTembusan = cy.get(tab_registrasi.btn_confirmDialogTujuanTembusan).as('btn_confirmDialogTujuanTembusan')
        btn_confirmDialogTujuanTembusan.find('div')
            .should('contain', 'Simpan')
    }

    selectLintasDinas() {
        // Pilih lintas dinas
        const btn_daftarLintasDinas = cy.get(tab_registrasi.btn_daftarLintasDinas).as('btn_daftarLintasDinas')
        btn_daftarLintasDinas
            .find('div')
            .should('contain', 'Lintas Dinas')
            .click()

        // Assertion pop up
        const dialog_tujuanTembusan = cy.get(tab_registrasi.dialog_tujuanTembusan).as('dialog_tujuanTembusan')
        dialog_tujuanTembusan.should('be.visible')

        const dialog_tujuanTembusanTitle = cy.get(tab_registrasi.dialog_tujuanTembusanTitle).as('dialog_tujuanTembusanTitle')
        dialog_tujuanTembusanTitle.should('contain', 'Lintas Dinas')

        const btn_closeDialogTujuanTembusan = cy.get(tab_registrasi.btn_closeDialogTujuanTembusan).as('btn_closeDialogTujuanTembusan')
        btn_closeDialogTujuanTembusan.should('be.visible')

        const label_dialogTujuanTembusanInfo = cy.get(tab_registrasi.label_dialogTujuanTembusanInfo).as('label_dialogTujuanTembusanInfo')
        label_dialogTujuanTembusanInfo.find('span')
            .should('contain', 'Naskah akan dikirim ke akun Unit Kearsipan penerima untuk didistribusikan.')

        const btn_cancelDialogTujuanTembusan = cy.get(tab_registrasi.btn_cancelDialogTujuanTembusan).as('btn_cancelDialogTujuanTembusan')
        btn_cancelDialogTujuanTembusan.find('div')
            .should('contain', 'Batal')

        const btn_confirmDialogTujuanTembusan = cy.get(tab_registrasi.btn_confirmDialogTujuanTembusan).as('btn_confirmDialogTujuanTembusan')
        btn_confirmDialogTujuanTembusan.find('div')
            .should('contain', 'Simpan')
    }

    selectTidakDidistribusikan() {
        // Pilih tidak didistribusikan
        const btn_daftarTidakDidistribusikan = cy.get(tab_registrasi.btn_daftarTidakDidistribusikan).as('btn_daftarTidakDidistribusikan')
        btn_daftarTidakDidistribusikan
            .find('div')
            .should('contain', 'Tidak Didistribusikan via Sidebar')
            .click()

        // Assertion pop up
        const dialog_tujuanTembusan = cy.get(tab_registrasi.dialog_tujuanTembusan).as('dialog_tujuanTembusan')
        dialog_tujuanTembusan.should('be.visible')

        const dialog_tujuanTembusanTitle = cy.get(tab_registrasi.dialog_tujuanTembusanTitle).as('dialog_tujuanTembusanTitle')
        dialog_tujuanTembusanTitle.should('contain', 'Tidak Didistribusikan via Sidebar')

        const btn_closeDialogTujuanTembusan = cy.get(tab_registrasi.btn_closeDialogTujuanTembusan).as('btn_closeDialogTujuanTembusan')
        btn_closeDialogTujuanTembusan.should('be.visible')

        const label_dialogTujuanTembusanInfo = cy.get(tab_registrasi.label_dialogTujuanTembusanInfo).as('label_dialogTujuanTembusanInfo')
        label_dialogTujuanTembusanInfo.find('span')
            .should('contain', 'Naskah akan diproses oleh Unit Kearsipan secara mandiri.')

        const btn_cancelDialogTujuanTembusan = cy.get(tab_registrasi.btn_cancelDialogTujuanTembusan).as('btn_cancelDialogTujuanTembusan')
        btn_cancelDialogTujuanTembusan.find('div')
            .should('contain', 'Batal')

        const btn_confirmDialogTujuanTembusan = cy.get(tab_registrasi.btn_confirmDialogTujuanTembusan).as('btn_confirmDialogTujuanTembusan')
        btn_confirmDialogTujuanTembusan.find('div')
            .should('contain', 'Simpan')
    }

    inputTujuan(inputEnv, tujuanKe, tujuanInternalEksternal, inputTujuan) {
        cy.readFile(getPreviewData).then((object) => {
            if (!object.tujuan_surat) {
                object.tujuan_surat = [{}]; // Initialize as an empty array
            }

            if (inputTujuan) {
                // Intercept all POST network requests
                if (inputEnv === 'prod') {
                    cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('postRequest')
                } else {
                    cy.intercept('POST', Cypress.env('base_url_api_v2')).as('postRequest')
                }

                const select_inputTujuanWrapper = cy.get(tab_registrasi.select_inputTujuanWrapper + tujuanKe + '"').as('select_inputTujuanWrapper')
                select_inputTujuanWrapper.click()

                const select_inputTujuanSearch = cy.get(tab_registrasi.select_inputTujuanSearch).as('select_inputTujuanSearch')
                select_inputTujuanSearch.click()
                    .wait(1000)
                    .type(inputTujuan, { delay: 50 })

                if (tujuanInternalEksternal === 'internal') {
                    cy.wait('@postRequest', { timeout: 10000 })
                        .then((interception) => {
                            if (interception.response.statusCode === 200) {
                                const select_inputTujuanSuggest0 = cy.get(tab_registrasi.select_inputTujuanSuggest0, { timeout : 6000 }).first().as('select_inputTujuanSuggest0')
                                select_inputTujuanSuggest0.contains(inputTujuan, { timeout: 10000 }).should('be.visible')
                                    .invoke('text')
                                    .then((inputanTujuanSuggest) => {
                                        // Push the sub-object to the array
                                        object.tujuan_surat[tujuanKe] = { ['tujuan_internal_' + tujuanKe] : inputanTujuanSuggest.trim() };

                                        // Write data to the JSON file
                                        cy.writeFile(getPreviewData, object)

                                        // Select Tujuan
                                        select_inputTujuanWrapper.type('{enter}')
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
                                        select_inputTujuanWrapper.type('{enter}')
                                    })
                            }
                        })
                }
            } else {
                const select_inputTujuanWrapper = cy.get(tab_registrasi.select_inputTujuanWrapper + tujuanKe + '"').as('select_inputTujuanWrapper')
                select_inputTujuanWrapper.click()

                const select_inputTujuanSuggest0 = cy.get(tab_registrasi.select_inputTujuanSuggest0, { timeout: 6000}).as('select_inputTujuanSuggest0')
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

    inputTujuanTidakDidistribusikan(inputTujuan, inputTembusan) {
        cy.readFile(getPreviewData).then((object) => {
            if (!object.tujuan_surat) {
                object.tujuan_surat = [{}]; // Initialize as an empty array
            }

            // Input Tujuan
            inputTujuan.forEach((tujuan, index) => {
                // Menggunakan index untuk menentukan field mana yang digunakan
                switch (index) {
                    default:
                        const select_inputTujuanTidakDidistribusikan = cy.get(tab_registrasi.select_inputTujuanTidakDidistribusikan + index + '"').as('select_inputTujuanTidakDidistribusikan')
                        select_inputTujuanTidakDidistribusikan.click()
                            .wait(1000)
                            .type(tujuan, { delay : 50 })
                            .invoke('val')
                            .then((inputanTujuanSuggest) => {
                                // Push the sub-object to the array
                                object.tujuan_surat[index] = { ['tujuan_tidak_didistribusikan_' + index] : inputanTujuanSuggest.trim() };

                                // Write data to the JSON file
                                cy.writeFile(getPreviewData, object)
                            })

                        break;
                }
                
                // Hanya memanggil addMoreTujuan untuk elemen selain elemen terakhir
                if (index < inputTujuan.length - 1) {
                    this.addMoreTujuan()
                }
            })

            if (!object.tembusan_surat) {
                object.tembusan_surat = [{}]; // Initialize as an empty array
            }

            // Input Tembusan
            inputTembusan.forEach((tembusan, index) => {
                // Menggunakan index untuk menentukan field mana yang digunakan
                switch (index) {
                    default:
                        const select_inputTembusanTidakDidistribusikan = cy.get(tab_registrasi.select_inputTembusanTidakDidistribusikan + index + '"').as('select_inputTembusanTidakDidistribusikan')
                        select_inputTembusanTidakDidistribusikan.click()
                            .wait(1000)
                            .type(tembusan, { delay : 50 })
                            .invoke('val')
                            .then((inputanTembusanSuggest) => {
                                // Push the sub-object to the array
                                object.tembusan_surat[index] = { ['tembusan_tidak_didistribusikan_' + index] : inputanTembusanSuggest.trim() };

                                // Write data to the JSON file
                                cy.writeFile(getPreviewData, object)
                            })

                        break;
                }
                
                // Hanya memanggil addMoreTembusan untuk elemen selain elemen terakhir
                if (index < inputTembusan.length - 1) {
                    this.addMoreTembusan()
                }
            })
        })
    }

    assertInputTujuan() {
        cy.readFile(getPreviewData).then((object) => {
            // Get data tujuan
            const tujuanValue = object.tujuan_surat[0].tujuan_eksternal

            // Assertion
            const select_inputTujuanSelected = cy.get(tab_registrasi.select_inputTujuanSelected).as('select_inputTujuanSelected')
            select_inputTujuanSelected.contains(tujuanValue, { matchCase : false })
        })
    }

    deleteTujuan(inputanTujuan) {
        // Click btn close on first data tujuan
        const btn_deleteTujuan = cy.xpath(tab_registrasi.btn_deleteTujuan).first().as('btn_deleteTujuan')
        btn_deleteTujuan.click()

        // Assertion
        cy.contains(inputanTujuan).should('not.exist')
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

                const select_inputTembusanSearch = cy.get(tab_registrasi.select_inputTembusanSearch).as('select_inputTembusanSearch')
                select_inputTembusanSearch.click()
                    .wait(1000)
                    .type(inputTembusan, { delay : 500 })

                if (tujuanInternalEksternal === 'internal') {
                    cy.wait('@postRequest', { timeout: 5000 })
                        .then((interception) => {
                            if (interception.response.statusCode === 200) {
                                const select_inputTembusanSuggest0 = cy.get(tab_registrasi.select_inputTembusanSuggest0, { timeout : 6000 }).as('select_inputTembusanSuggest0')
                                select_inputTembusanSuggest0.scrollIntoView()
                                    .contains(inputTembusan, { timeout: 10000 }).should('be.visible')
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

                const select_inputTembusanSuggest0 = cy.get(tab_registrasi.select_inputTembusanSuggest0, { timeout : 6000 }).as('select_inputTembusanSuggest0')
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

    deleteTembusan(inputanTembusan) {
        // Click btn close on first data tembusan
        const btn_deleteTembusan1 = cy.xpath(tab_registrasi.btn_deleteTembusan1).as('btn_deleteTembusan1')
        btn_deleteTembusan1.click()

        // Assertion
        cy.contains(inputanTembusan).should('not.exist')
    }

    inputTujuanTembusanSurat() {
        cy.get('body').then($body => {
            if ($body.find(tab_registrasi.label_daftarTujuanTembusan).length > 0) {
                cy.get('body').then($body => {
                    if ($body.find(tab_registrasi.check_toggleDistribusi).length > 0) {
                        // Pilih distribusi
                        this.activateToggleDistribusi()
        
                        // Input data tujuan dan tembusan
                        cy.readFile(getMasterData).then((data_temp) => {
                            this.inputTujuan(data_temp.env[0].staging, data_temp.registrasi[3].index0, data_temp.registrasi[4].input_internal, data_temp.registrasi[5].tujuan_internal1)
                            this.addMoreTujuan()
                            this.inputTujuan(data_temp.env[0].staging, data_temp.registrasi[3].index1, data_temp.registrasi[4].input_eksternal, data_temp.registrasi[5].tujuan_eksternal1)
                            this.inputTembusan(data_temp.env[0].staging, data_temp.registrasi[3].index0, data_temp.registrasi[4].input_internal, data_temp.registrasi[6].tembusan_internal2)
                            this.addMoreTembusan()
                            this.inputTembusan(data_temp.env[0].staging, data_temp.registrasi[3].index1, data_temp.registrasi[4].input_eksternal, data_temp.registrasi[6].tembusan_eksternal1)
                        });
                    }else{
                        // Pilih Daftar Tujuan & Tembusan
                        this.inputTujuanTembusan()
                        this.selectLintasDinas()
        
                        // Input data tujuan dan tembusan
                        cy.readFile(getMasterData).then((data_temp) => {
                            this.inputTujuan(data_temp.env[0].staging, data_temp.registrasi[3].index0, data_temp.registrasi[4].input_internal, data_temp.registrasi[5].tujuan_internal1)
                            this.inputTembusan(data_temp.env[0].staging, data_temp.registrasi[3].index0, data_temp.registrasi[4].input_internal, data_temp.registrasi[6].tembusan_internal3)
                        });
        
                        // Click button simpan
                        const btn_confirmDialogTujuanTembusan = cy.get(tab_registrasi.btn_confirmDialogTujuanTembusan).as('btn_confirmDialogTujuanTembusan')
                        btn_confirmDialogTujuanTembusan.find('div')
                            .should('contain', 'Simpan')
                            .click()
                    }
                })
            }
        })
    }

    simpanTujuanTembusan() {
        // Click button simpan
        const btn_confirmDialogTujuanTembusan = cy.get(tab_registrasi.btn_confirmDialogTujuanTembusan).as('btn_confirmDialogTujuanTembusan')
        btn_confirmDialogTujuanTembusan.find('div')
            .should('contain', 'Simpan')
            .click()
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

            // Assertion input perihal
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
    checkPenandatanganMode() {
        // Click button tambah penandatangan
        const btn_addMorePenandatangan = cy.get(tab_registrasi.btn_addMorePenandatangan).as('btn_addMorePenandatangan')
        btn_addMorePenandatangan.should('contain', 'Tambah Pemaraf/Penandatangan')
            .click()

        // Click button mode penandatangan
        const dialog_penandatanganModeLabel = cy.get(tab_registrasi.dialog_penandatanganModeLabel).as('dialog_penandatanganModeLabel')
        dialog_penandatanganModeLabel.should('contain', 'Mode Pemaraf/Penandatangan')

        const dialog_penandatanganModeInput = cy.get(tab_registrasi.dialog_penandatanganModeInput).as('dialog_penandatanganModeInput')
        dialog_penandatanganModeInput.find('option')
            .then(options => {
                const actual = [...options].map(o => o.value)
                expect(actual).to.deep.eq(['', 'ATASAN', 'ATAS_NAMA', 'UNTUK_BELIAU', 'DIRI_SENDIRI', 'LAINNYA_INTERNAL_DINAS', 'LAINNYA_LINTAS_DINAS'])
            })
    }

    searchPenandatangan(inputanAtasan) {
        // Click mode penandatangan atasan
        const dialog_penandatanganModeInput = cy.get(tab_registrasi.dialog_penandatanganModeInput).as('dialog_penandatanganModeInput')
        dialog_penandatanganModeInput.select('ATASAN')
            
        const select_inputPenandatanganAtasan = cy.get(tab_registrasi.select_inputPenandatanganAtasan).as('select_inputPenandatanganAtasan')
        select_inputPenandatanganAtasan.click()
            .wait(1000)
            .type(inputanAtasan)
            .wait(12000)

        // Assertion
        const select_inputPenandatanganAtasanSuggest = cy.get(tab_registrasi.select_inputPenandatanganAtasanSuggest).last().as('select_inputPenandatanganAtasanSuggest')
        select_inputPenandatanganAtasanSuggest.scrollIntoView()
            .contains(inputanAtasan, { matchCase: false, timeout: 10000 }).should('be.visible')
    }

    cancelPenandatangan() {
        const btn_batalAddPenandatangan = cy.get(tab_registrasi.btn_batalAddPenandatangan).as('btn_batalAddPenandatangan')
        btn_batalAddPenandatangan.click()

        // Assertion
        const label_konsepNaskah = cy.get(tab_registrasi.label_konsepNaskah).as('label_konsepNaskah')
        label_konsepNaskah.should('contain', 'Konsep Naskah')
    }

    addMorePenandatangan() {
        const btn_addMorePenandatangan = cy.get(tab_registrasi.btn_addMorePenandatangan).as('btn_addMorePenandatangan')
        btn_addMorePenandatangan.should('contain', 'Tambah Pemaraf/Penandatangan')
            .click()

        // Assertion
        const dialog_penandatangan = cy.get(tab_registrasi.dialog_penandatangan).as('dialog_penandatangan')
        dialog_penandatangan.should('be.visible')

        const dialog_penandatanganTitle = cy.get(tab_registrasi.dialog_penandatanganTitle).as('dialog_penandatanganTitle')
        dialog_penandatanganTitle.should('contain', 'Tambah Pemaraf/Penandatangan')
    }

    selectPenandatanganAtasNama() {
        // Select mode penandatangan atas nama
        const dialog_penandatanganModeLabel = cy.get(tab_registrasi.dialog_penandatanganModeLabel).as('dialog_penandatanganModeLabel')
        dialog_penandatanganModeLabel.should('contain', 'Mode Pemaraf/Penandatangan')

        const dialog_penandatanganModeInput = cy.get(tab_registrasi.dialog_penandatanganModeInput).as('dialog_penandatanganModeInput')
        dialog_penandatanganModeInput.select('ATAS_NAMA')

        // Assertion 
        const label_penandatangaAtasNama = cy.get(tab_registrasi.label_penandatangaAtasNama).as('label_penandatangaAtasNama')
        label_penandatangaAtasNama.should('contain', 'Atas Nama')
            .and('be.visible')

        const dialog_penandatanganLabel = cy.get(tab_registrasi.dialog_penandatanganLabel).as('dialog_penandatanganLabel')
        dialog_penandatanganLabel.should('contain', 'Penandatangan')
            .and('be.visible')
    }

    selectPenandatanganUntukBeliau() {
        // Select mode penandatangan untuk beliau
        const dialog_penandatanganModeLabel = cy.get(tab_registrasi.dialog_penandatanganModeLabel).as('dialog_penandatanganModeLabel')
        dialog_penandatanganModeLabel.should('contain', 'Mode Pemaraf/Penandatangan')

        const dialog_penandatanganModeInput = cy.get(tab_registrasi.dialog_penandatanganModeInput).as('dialog_penandatanganModeInput')
        dialog_penandatanganModeInput.select('UNTUK_BELIAU')

        // Assertion 
        const label_penandatangaUntukBeliau = cy.get(tab_registrasi.label_penandatangaUntukBeliau).as('label_penandatangaUntukBeliau')
        label_penandatangaUntukBeliau.should('contain', 'Untuk Beliau')
            .and('be.visible')

        const dialog_penandatanganLabel = cy.get(tab_registrasi.dialog_penandatanganLabel).as('dialog_penandatanganLabel')
        dialog_penandatanganLabel.should('contain', 'Penandatangan')
            .and('be.visible')
    }

    inputPenandatanganDiriSendiri() {
        cy.readFile(getPreviewData).then((object) => {
            if (!object.penandatangan) {
                object.penandatangan = []; // Initialize as an empty array
            }

            const dialog_penandatanganModeLabel = cy.get(tab_registrasi.dialog_penandatanganModeLabel).as('dialog_penandatanganModeLabel')
            dialog_penandatanganModeLabel.should('contain', 'Mode Pemaraf/Penandatangan')

            const dialog_penandatanganModeInput = cy.get(tab_registrasi.dialog_penandatanganModeInput).as('dialog_penandatanganModeInput')
            dialog_penandatanganModeInput.select('DIRI_SENDIRI')

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

    inputPenandatanganAtasan(inputanAtasan, inputEnv) {
        cy.readFile(getPreviewData).then((object) => {
            if (!object.penandatangan) {
                object.penandatangan = []; // Initialize as an empty array
            }

            const dialog_penandatanganModeLabel = cy.get(tab_registrasi.dialog_penandatanganModeLabel).as('dialog_penandatanganModeLabel')
            dialog_penandatanganModeLabel.should('contain', 'Mode Pemaraf/Penandatangan')

            const dialog_penandatanganModeInput = cy.get(tab_registrasi.dialog_penandatanganModeInput).as('dialog_penandatanganModeInput')
            dialog_penandatanganModeInput.select('ATASAN')

            const dialog_penandatanganLabel = cy.get(tab_registrasi.dialog_penandatanganLabel).as('dialog_penandatanganLabel')
            dialog_penandatanganLabel.should('contain', 'Pemaraf/Penandatangan')

            // Intercept all POST network requests
            if (inputEnv === 'prod') {
                cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('postRequest')
            } else {
                cy.intercept('POST', Cypress.env('base_url_api_v2')).as('postRequest')
            }
            
            const select_inputPenandatanganAtasan = cy.get(tab_registrasi.select_inputPenandatanganAtasan).as('select_inputPenandatanganAtasan')
            select_inputPenandatanganAtasan.click()
                .wait(3000)
                .type(inputanAtasan, {delay: 500})

            cy.wait('@postRequest', { timeout: 30000 })
                .then((interception) => {
                    if (interception.response.statusCode === 200) {
                        const select_inputPenandatanganAtasanSuggest = cy.get(tab_registrasi.select_inputPenandatanganAtasanSuggest).as('select_inputPenandatanganAtasanSuggest')
                        select_inputPenandatanganAtasanSuggest.contains(inputanAtasan, { matchCase: false, timeout: 10000 }).should('be.visible')
                            .click()
                            .invoke('text')
                            .then((inputanAtasan) => {
                                // Construct the sub-object
                                const penandatangan_name = {
                                    penandatangan_atasan: inputanAtasan.trim()
                                }

                                // Push the sub-object to the array
                                object.penandatangan.push(penandatangan_name)

                                // Write data to the JSON file
                                cy.writeFile(getPreviewData, object)
                            })
                    }
                })
        })

        const btn_simpanPenandatangan = cy.get(tab_registrasi.btn_simpanPenandatangan).as('btn_simpanPenandatangan')
        btn_simpanPenandatangan.should('contain', 'Simpan')
            .click()
    }

    inputPenandatanganAtasNama(inputanAtasNama, inputanAtasan, inputEnv) {
        cy.readFile(getPreviewData).then((object) => {
            if (!object.penandatangan) {
                object.penandatangan = []; // Initialize as an empty array
            }

            // Atas Nama
            const label_penandatangaAtasNama = cy.get(tab_registrasi.label_penandatangaAtasNama).as('label_penandatangaAtasNama')
            label_penandatangaAtasNama.should('contain', 'Atas Nama')

            // Intercept all POST network requests
            if (inputEnv === 'prod') {
                cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('postRequest')
            } else {
                cy.intercept('POST', Cypress.env('base_url_api_v2')).as('postRequest')
            }
            
            const select_inputPenandatanganAtasNama = cy.get(tab_registrasi.select_inputPenandatanganAtasNama).as('select_inputPenandatanganAtasNama')
            select_inputPenandatanganAtasNama.click()
                .wait(3000)
                .type(inputanAtasNama, {delay: 500})

            cy.wait('@postRequest', { timeout: 30000 })
                .then((interception) => {
                    if (interception.response.statusCode === 200) {
                        const select_inputPenandatanganAtasNamaSuggest = cy.get(tab_registrasi.select_inputPenandatanganAtasNamaSuggest).as('select_inputPenandatanganAtasNamaSuggest')
                        select_inputPenandatanganAtasNamaSuggest.contains(inputanAtasNama, { matchCase : false }).should('be.visible')
                            .click()
                            .invoke('text')
                            .then((inputanAtasNama) => {
                                // Construct the sub-object
                                const penandatangan_atas_nama_name = {
                                    atas_nama: inputanAtasNama.trim()
                                }

                                // Push the sub-object to the array
                                object.penandatangan.push(penandatangan_atas_nama_name)

                                // Write data to the JSON file
                                cy.writeFile(getPreviewData, object)
                            })
                    }
                })

            // Penandatangan
            const dialog_penandatanganLabel = cy.get(tab_registrasi.dialog_penandatanganLabel).as('dialog_penandatanganLabel')
            dialog_penandatanganLabel.should('contain', 'Penandatangan')

            // Intercept all POST network requests
            if (inputEnv === 'prod') {
                cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('postRequest')
            } else {
                cy.intercept('POST', Cypress.env('base_url_api_v2')).as('postRequest')
            }
            
            const select_inputPenandatanganAtasan = cy.get(tab_registrasi.select_inputPenandatanganAtasan).as('select_inputPenandatanganAtasan')
            select_inputPenandatanganAtasan.click()
                .wait(3000)
                .type(inputanAtasan, {delay: 500})

            cy.wait('@postRequest', { timeout: 30000 })
                .then((interception) => {
                    if (interception.response.statusCode === 200) {
                        const select_inputPenandatanganAtasanSuggest = cy.get(tab_registrasi.select_inputPenandatanganAtasanSuggest).as('select_inputPenandatanganAtasanSuggest')
                        select_inputPenandatanganAtasanSuggest.contains(inputanAtasan, { matchCase : false }).should('be.visible')
                            .click()
                            .invoke('text')
                            .then((inputanAtasan) => {
                                // Construct the sub-object
                                const penandatangan_name = {
                                    penandatangan_atas_nama: inputanAtasan.trim()
                                }

                                // Push the sub-object to the array
                                object.penandatangan.push(penandatangan_name)

                                // Write data to the JSON file
                                cy.writeFile(getPreviewData, object)
                            })
                    }
                })
        })

        const btn_simpanPenandatangan = cy.get(tab_registrasi.btn_simpanPenandatangan).as('btn_simpanPenandatangan')
        btn_simpanPenandatangan.should('contain', 'Simpan')
            .click()
    }

    inputPenandatanganUntukBeliau(inputanUntukBeliau, inputanAtasan, inputEnv) {
        cy.readFile(getPreviewData).then((object) => {
            if (!object.penandatangan) {
                object.penandatangan = []; // Initialize as an empty array
            }

            // Atas Nama
            const label_penandatangaUntukBeliau = cy.get(tab_registrasi.label_penandatangaUntukBeliau).as('label_penandatangaUntukBeliau')
            label_penandatangaUntukBeliau.should('contain', 'Untuk Beliau')

            // Intercept all POST network requests
            if (inputEnv === 'prod') {
                cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('postRequest')
            } else {
                cy.intercept('POST', Cypress.env('base_url_api_v2')).as('postRequest')
            }
            
            const select_inputPenandatanganUntukBeliau = cy.get(tab_registrasi.select_inputPenandatanganUntukBeliau).as('select_inputPenandatanganUntukBeliau')
            select_inputPenandatanganUntukBeliau.click()
                .wait(3000)
                .type(inputanUntukBeliau, {delay: 500})

            cy.wait('@postRequest', { timeout: 30000 })
                .then((interception) => {
                    if (interception.response.statusCode === 200) {
                        const select_inputPenandatanganUntukBeliauSuggest = cy.get(tab_registrasi.select_inputPenandatanganUntukBeliauSuggest).as('select_inputPenandatanganUntukBeliauSuggest')
                        select_inputPenandatanganUntukBeliauSuggest.contains(inputanUntukBeliau, { matchCase : false }).should('be.visible')
                            .click()
                            .invoke('text')
                            .then((inputanUntukBeliau) => {
                                // Construct the sub-object
                                const penandatangan_untuk_beliau_name = {
                                    untuk_beliau: inputanUntukBeliau.trim()
                                }

                                // Push the sub-object to the array
                                object.penandatangan.push(penandatangan_untuk_beliau_name)

                                // Write data to the JSON file
                                cy.writeFile(getPreviewData, object)
                            })
                    }
                })

            // Penandatangan
            const dialog_penandatanganLabel = cy.get(tab_registrasi.dialog_penandatanganLabel).as('dialog_penandatanganLabel')
            dialog_penandatanganLabel.should('contain', 'Penandatangan')

            // Intercept all POST network requests
            if (inputEnv === 'prod') {
                cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('postRequest')
            } else {
                cy.intercept('POST', Cypress.env('base_url_api_v2')).as('postRequest')
            }
            
            const select_inputPenandatanganAtasan = cy.get(tab_registrasi.select_inputPenandatanganAtasan).as('select_inputPenandatanganAtasan')
            select_inputPenandatanganAtasan.click()
                .wait(3000)
                .type(inputanAtasan, {delay: 500})

            cy.wait('@postRequest', { timeout: 30000 })
                .then((interception) => {
                    if (interception.response.statusCode === 200) {
                        const select_inputPenandatanganAtasanSuggest = cy.get(tab_registrasi.select_inputPenandatanganAtasanSuggest).as('select_inputPenandatanganAtasanSuggest')
                        select_inputPenandatanganAtasanSuggest.contains(inputanAtasan, { matchCase : false }).should('be.visible')
                            .click()
                            .invoke('text')
                            .then((inputanAtasan) => {
                                // Construct the sub-object
                                const penandatangan_name = {
                                    penandatangan_untuk_beliau: inputanAtasan.trim()
                                }

                                // Push the sub-object to the array
                                object.penandatangan.push(penandatangan_name)

                                // Write data to the JSON file
                                cy.writeFile(getPreviewData, object)
                            })
                    }
                })
        })

        const btn_simpanPenandatangan = cy.get(tab_registrasi.btn_simpanPenandatangan).as('btn_simpanPenandatangan')
        btn_simpanPenandatangan.should('contain', 'Simpan')
            .click()
    }

    assertPenandatanganAtasan1(inputanAtasan) {
        // Assertion
        const label_penandatanganName1 = cy.get(tab_registrasi.label_penandatanganName1).as('label_penandatanganName1')
        label_penandatanganName1.contains(inputanAtasan, { matchCase : false })
    }

    assertPenandatanganAtasNama() {
        // Assertion
        const label_iconPenandatanganAtasNama = cy.get(tab_registrasi.label_iconPenandatanganAtasNama).as('label_iconPenandatanganAtasNama')
        label_iconPenandatanganAtasNama.should('be.visible')

        cy.readFile(getPreviewData).then((object) => {
            // Assertion data penandatangan atas nama
            const penandatanganAtasNamaValue = object.penandatangan[0].atas_nama
            const arrAtasNama = penandatanganAtasNamaValue.split('(')
            const arrPositionAtasNama = arrAtasNama[1].split(')')

            const label_assertPenandatanganAtasNama = cy.get(tab_registrasi.label_assertPenandatanganAtasNama).as('label_assertPenandatanganAtasNama')
            label_assertPenandatanganAtasNama.contains(arrAtasNama[0], { matchCase : false })

            const label_assertJabatanPenandatangaAtasNama = cy.get(tab_registrasi.label_assertJabatanPenandatangaAtasNama).as('label_assertJabatanPenandatangaAtasNama')
            label_assertJabatanPenandatangaAtasNama.contains(arrPositionAtasNama[0], { matchCase : false })
        })
    }

    assertPenandatanganUntukBeliau() {
        // Assertion
        const label_iconPenandatanganUntukBeliau = cy.get(tab_registrasi.label_iconPenandatanganUntukBeliau).as('label_iconPenandatanganUntukBeliau')
        label_iconPenandatanganUntukBeliau.should('be.visible')

        cy.readFile(getPreviewData).then((object) => {
            // Assertion data penandatangan untuk beliau
            const penandatanganUntukBeliauValue = object.penandatangan[0].untuk_beliau
            const arrUntukBeliau = penandatanganUntukBeliauValue.split('(')
            const arrPositionUntukBeliau = arrUntukBeliau[1].split(')')

            const label_assertPenandatanganUntukBeliau = cy.get(tab_registrasi.label_assertPenandatanganUntukBeliau).as('label_assertPenandatanganUntukBeliau')
            label_assertPenandatanganUntukBeliau.contains(arrUntukBeliau[0], { matchCase : false })

            const label_assertJabatanPenandatangaUntukBeliau = cy.get(tab_registrasi.label_assertJabatanPenandatangaUntukBeliau).as('label_assertJabatanPenandatangaUntukBeliau')
            label_assertJabatanPenandatangaUntukBeliau.contains(arrPositionUntukBeliau[0], { matchCase : false })
        })
    }

    validateSamePenandatangan(inputanAtasan, inputEnv) {
        cy.readFile(getPreviewData).then((object) => {
            if (!object.penandatangan) {
                object.penandatangan = []; // Initialize as an empty array
            }

            const dialog_penandatanganModeLabel = cy.get(tab_registrasi.dialog_penandatanganModeLabel).as('dialog_penandatanganModeLabel')
            dialog_penandatanganModeLabel.should('contain', 'Mode Pemaraf/Penandatangan')

            const dialog_penandatanganModeInput = cy.get(tab_registrasi.dialog_penandatanganModeInput).as('dialog_penandatanganModeInput')
            dialog_penandatanganModeInput.select('ATASAN')

            const dialog_penandatanganLabel = cy.get(tab_registrasi.dialog_penandatanganLabel).as('dialog_penandatanganLabel')
            dialog_penandatanganLabel.should('contain', 'Penandatangan')

            // Intercept all POST network requests
            if (inputEnv === 'prod') {
                cy.intercept('POST', Cypress.env('base_url_api_prod_v2')).as('postRequest')
            } else {
                cy.intercept('POST', Cypress.env('base_url_api_v2')).as('postRequest')
            }

            const select_inputPenandatanganAtasan = cy.get(tab_registrasi.select_inputPenandatanganAtasan).as('select_inputPenandatanganAtasan')
            select_inputPenandatanganAtasan.click()
                .wait(3000)
                .type(inputanAtasan, {delay: 500})

            cy.wait('@postRequest', { timeout: 30000 })
                .then((interception) => {
                    if (interception.response.statusCode === 200) {
                        const select_inputPenandatanganAtasanSuggest = cy.get(tab_registrasi.select_inputPenandatanganAtasanSuggest).as('select_inputPenandatanganAtasanSuggest')
                        select_inputPenandatanganAtasanSuggest.contains(inputanAtasan, { matchCase: false, timeout: 10000 }).should('be.visible')
                            .click()
                            .invoke('text')
                            .then((inputanAtasan) => {
                                // Construct the sub-object
                                const penandatangan_name = {
                                    penandatangan_atasan: inputanAtasan.trim()
                                }

                                // Push the sub-object to the array
                                object.penandatangan.push(penandatangan_name)

                                // Write data to the JSON file
                                cy.writeFile(getPreviewData, object)
                            })
                    }
                })
        })

        // Assertion
        const label_errorSamePenandatangan = cy.get(tab_registrasi.label_errorSamePenandatangan).as('label_errorSamePenandatangan')
        label_errorSamePenandatangan.should('contain', 'Penandatangan tidak boleh sama dengan sebelumnya')

        const btn_simpanPenandatangan = cy.get(tab_registrasi.btn_simpanPenandatangan).as('btn_simpanPenandatangan')
        btn_simpanPenandatangan.should('contain', 'Simpan')
            .and('be.disabled')
    }

    assertJumlahPenandatangan() {
        // Assertion Button Tambah Penandatangan
        cy.contains('Tambah Pemaraf/Penandatangan').should('not.exist')
    }

    deletePenandatangan(inputanAtasan) {
        // Click Button Delete Penandatangan 1
        const btn_deletePenandatangan = cy.get(tab_registrasi.btn_deletePenandatangan).as('btn_deletePenandatangan')
        btn_deletePenandatangan.scrollIntoView()
            .click()

        // Assertion
        cy.contains(inputanAtasan).should('not.exist')
    }

    uploadSuratPengantar(status) {
        if (status === 'positif') {
            // Upload File
            const fileUploadSingleFile = 'non_cred/drafting_luar/master_data/Dummy.pdf'
            const fileName = 'Dummy.pdf'

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
        cy.readFile(getPreviewData).then((object) => {
            // Assertion file upload
            const upload_file_name = object.upload_file[1].upload_file_name

            const label_fileUploadTitle = cy.get(tab_registrasi.label_fileTitle).as('label_fileUploadTitle')
            label_fileUploadTitle.scrollIntoView()
                .should('contain', upload_file_name)

            const label_fileUploadSize = cy.get(tab_registrasi.label_fileSize).as('label_fileUploadSize')
            label_fileUploadSize.should('contain', '18.3 KB')

            const btn_deleteSuratPengantar = cy.get(tab_registrasi.btn_deleteSuratPengantar).as('btn_deleteSuratPengantar')
            btn_deleteSuratPengantar.should('be.visible')

            cy.wait(6000)
        })
    }
}