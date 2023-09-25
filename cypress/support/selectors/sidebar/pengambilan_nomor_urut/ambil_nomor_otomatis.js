module.exports = {
    // GET
    popupPengambilanNomor: '[data-cy="dialog__confirmation-ambil-nomor"]',
    titlePopupPengambilanNomor: '[data-cy="dialog__confirmation-ambil-nomor__title"]',
    titlePopupPengambilanNomorDesc: '[data-cy="dialog__confirmation-ambil-nomor__deskripsi"]',
    labelKonfirmasiPengambilanNomor: '[data-cy="dialog__label-confirmation-ambil-nomor"]',
    btnCancelPengambilanNomor: '[data-cy="dialog__confirmation-ambil-nomor-manual__button--cancel"]',
    btnKonfirmasiAmbilNomor: '[data-cy="dialog__confirmation-ambil-nomor-manual__button--submit"]',
    popupBerhasilMendapatkanNomor: '[data-cy="dialog__success-ambil-nomor"]',
    labelBerhasilMendapatkanNomor: '[data-cy="dialog__success-ambil-nomor__title"]',
    descBerhasilMendapatkanNomor: '[data-cy="dialog__success-ambil-nomor__deskripsi"]',
    btnSelesaiMendapatkanNomor: '[data-cy="dialog__confirmation-ambil-nomor-manual__button--approve"]',
    validateDataNomorUrut: '[data-cy="table__pengambilan-nomor__item-order-number"]',
    validateDataTanggalNomorUrut: '[data-cy="table__pengambilan-nomor__item-tanggal-nomor"]',
    validateDataTanggalPesanNomorUrut: '[data-cy="table__pengambilan-nomor__item-tanggal-dipesan"]',
    validateStatusNomorUrut: '[data-cy="table__pengambilan-nomor__item-status"]',
    validateAksi: '[data-cy="table__pengambilan-nomor__item-action"]',

    // XPATH
    xpathLabelTanggalPenomoran: '/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/div[1]/div[5]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[1]/th[1]',
    xpathLabelJenisNaskah: '/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/div[1]/div[5]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[2]/th[1]',
    xpathLabelUKUP: '/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/div[1]/div[5]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[3]/th[1]',
    xpathNomorUrut: '/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/div[1]/div[5]/div[1]/div[1]/div[1]/div[15]/div[1]/div[1]/span[1]',
    xpathTablePengambilanNomor: '/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/div[1]/div[3]/div[2]/div[1]'
}