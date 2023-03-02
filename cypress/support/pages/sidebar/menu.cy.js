import login from "../../selectors/login"
import navbar from "../../selectors/navbar"
import menu from "../../selectors/sidebar/menu"

export class MenuPage {

    checkProfile() {
        const profileName = cy.xpath(navbar.profileName).as('profileName')
        profileName.should('contain','VITA PUTRI UTAMI, S.Sos., M.I.Kom')

        const profilePosition = cy.xpath(navbar.profilePosition).as('profilePosition')
        profilePosition.should('contain','ARSIPARIS AHLI MUDA')
    }

    clickBtnHideMenu() {
        const hideMenu = cy.xpath(navbar.hideShowMenu).as('hideMenu')
        hideMenu.click()

        const sidebar = cy.xpath(menu.sidebarClass).as('sidebarClass')
        sidebar.should('have.class','flex h-full bg-white transition-[width] duration-500 w-[64px]')
    }

    clickBtnShowMenu() {
        const hideMenu = cy.xpath(navbar.hideShowMenu).as('hideMenu')
        hideMenu.click()

        const showMenu = cy.xpath(navbar.hideShowMenu).as('showMenu')
        showMenu.click()

        const sidebar = cy.xpath(menu.sidebarClass).as('sidebarClass')
        sidebar.should('have.class','flex h-full bg-white transition-[width] duration-500 w-[240px]')
    }

    checkMenu() {
        this.goToKonsepNaskah()

        this.goToKotakMasuk()

        const reviewNaskahKM = cy.xpath(menu.reviewNaskahKM).as('reviewNaskahKM')
        reviewNaskahKM.should('contain','Review Naskah')
            .and('be.visible')

        const tindakLanjutKM = cy.xpath(menu.tindakLanjutKM).as('tindakLanjutKM')
        tindakLanjutKM.should('contain','Tindak Lanjut')
            .and('be.visible')

        this.goToKotakKeluar()

        const reviewNaskahKK = cy.xpath(menu.reviewNaskahKK).as('reviewNaskahKK')
        reviewNaskahKK.should('contain','Review Naskah')
            .and('be.visible')

        const tindakLanjutKK = cy.xpath(menu.tindakLanjutKK).as('tindakLanjutKK')
        tindakLanjutKK.should('contain','Tindak Lanjut')
            .and('be.visible')
            .click()
    }

    goToKotakMasuk() {
        const parentKotakMasuk = cy.xpath(menu.parentKotakMasuk).as('parentKotakMasuk')
        parentKotakMasuk.click()
    }

    goToKotakKeluar() {
        const parentKotakKeluar = cy.xpath(menu.parentKotakKeluar).as('parentKotakKeluar')
        parentKotakKeluar.click()
    }

    goToKonsepNaskah() {
        const konsepNaskahMenu = cy.xpath(menu.konsepNaskahMenu).as('konsepNaskah')
        
        konsepNaskahMenu.should('contain','Konsep Naskah')
        konsepNaskahMenu.click()

        const titleKonsepNaskah = cy.xpath(menu.titleKonsepNaskah).as('titleKonsepNaskah')
        titleKonsepNaskah.should('contain','Buat Naskah Baru')

        this.goToKotakMasukReviewNaskah()
    }

    goToKotakMasukReviewNaskah() {
        this.goToKotakMasuk()

        const reviewNaskahKM = cy.xpath(menu.reviewNaskahKM).as('reviewNaskahKM')
        reviewNaskahKM.should('contain','Review Naskah')
            .and('be.visible')
            .click()
    }

    goToKotakMasukTindakLanjut() {
        this.goToKotakMasuk()

        const tindakLanjutKM = cy.xpath(menu.tindakLanjutKM).as('tindakLanjutKM')
        tindakLanjutKM.should('contain','Tindak Lanjut')
            .and('be.visible')
            .click()
    }

    goToKotakKeluarReviewNaskah() {
        this.goToKotakKeluar()

        const reviewNaskahKK = cy.xpath(menu.reviewNaskahKK).as('reviewNaskahKK')
        reviewNaskahKK.should('contain','Review Naskah')
            .and('be.visible')
            .click()
    }

    goToKotakKeluarTindakLanjut() {
        this.goToKotakKeluar()

        const tindakLanjutKK = cy.xpath(menu.tindakLanjutKK).as('tindakLanjutKK')
        tindakLanjutKK.should('contain','Tindak Lanjut')
            .and('be.visible')
            .click()
    }

    navigateKonsepNaskahPage() {
        cy.visit(Cypress.env('base_url') + '/konsep-naskah')

        const btnLoginSso = cy.xpath(login.btnLoginSso)
        btnLoginSso.should('be.visible')
    }

    navigateKotakMasukReviewNaskahPage() {
        cy.visit(Cypress.env('base_url') + '/kotak-masuk/review-naskah')

        const btnLoginSso = cy.xpath(login.btnLoginSso)
        btnLoginSso.should('be.visible')
    }

    navigateKotakMasukTindakLanjutPage() {
        cy.visit(Cypress.env('base_url') + '/kotak-masuk/tindak-lanjut')

        const btnLoginSso = cy.xpath(login.btnLoginSso)
        btnLoginSso.should('be.visible')
    }

    navigateKotakKeluarReviewNaskahPage() {
        cy.visit(Cypress.env('base_url') + '/kotak-keluar/review-naskah')

        const btnLoginSso = cy.xpath(login.btnLoginSso)
        btnLoginSso.should('be.visible')
    }

    navigateKotakKeluarTindakLanjutPage() {
        cy.visit(Cypress.env('base_url') + '/kotak-keluar/tindak-lanjut')

        const btnLoginSso = cy.xpath(login.btnLoginSso)
        btnLoginSso.should('be.visible')
    }

}