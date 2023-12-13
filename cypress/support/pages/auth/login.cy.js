import login from "../../selectors/login"
import navbar from "../../selectors/navbar"

export class LoginPage {

    navigateLoginPageV1() {
        cy.visit(Cypress.env('base_url_v1'))
    }

    navigateLoginPageV1Prod() {
        cy.visit(Cypress.env('base_url_prod_v1'))
    }

    navigateLoginPageV2() {
        cy.visit(Cypress.env('base_url'))

        const btnLoginSso = cy.xpath(login.btnLoginSso)
        btnLoginSso.click()

        const titleSso = cy.xpath(navbar.titleSimulasi)
        titleSso.should('contain', 'Simulasi login di Sidebar v1')
    }

    enterNip(nip) {
        const nips = cy.xpath(login.inputNip)

        nips.clear()
        nips.should('be.visible')
        nips.should('have.attr', 'type', 'number')
        nips.type(nip)
    }

    clickBtnMasuk() {
        const btnMasuk = cy.xpath(login.btnMasuk)

        btnMasuk.should('be.visible')
        btnMasuk.contains('Login')
        btnMasuk.click()
    }

    closePopupLandingPage() {
        cy.wait(6000)

        const closePopup = cy.get(login.closePopupLandingPage, { timeout: 10000 }).as('closePopupLandingPage')
        closePopup.then($popup => {
            if ($popup.is(':visible')) {
                closePopup.click()
            }
        })
    }

    loginViaV1(nip, passwordv1) {
        //cy.intercept('POST', Cypress.env('base_url_api_v1')).as('checkResponse')

        this.navigateLoginPageV1()

        cy.get("#login > div").click()
        cy.get("div.flex > div button").click()

        const username = cy.get(login.username).as('username')
        username.should('be.visible')
        username.type(nip, { force: true })

        const password = cy.get(login.password).as('password')
        password.type(passwordv1, { force: true })

        const hiddenCaptcha = cy.get(login.hiddenCaptcha).as('hiddenCaptcha')
        hiddenCaptcha.invoke('val')
            .then((val) => {
                const captchaType = cy.get(login.captcha).as('captcha')
                captchaType.type(val, { force: true })
            })

        const btnLogin = cy.get(login.btnLogin).as('btnLogin')
        btnLogin.should('contain', 'Login')
            .click({ force: true })

        cy.wait(3000)

        cy.wait('@checkResponse', { timeout: 5000 })
            .then((interception) => {
                if (interception.response) {
                    const status = interception.response.statusCode;
                    const clientErrorStatusCodes = [400, 401, 403, 404, 405, 406, 408, 409, 410, 411, 412];
                    const serverErrorStatusCodes = [500, 501, 502, 503, 504];
                    const errorStatusCodes = [...clientErrorStatusCodes, ...serverErrorStatusCodes];

                    // Assert berupa message di Cypress E2E pada status code ketika gagal, bila status code tidak sesuai maka status dibawah akan memberhentikan untuk masuk ke skenario selanjutnya
                    if (errorStatusCodes.includes(status)) {
                        expect(errorStatusCodes, `Request failed with status code: ${status}`).to.include(status);
                    }

                    const successStatusCodes = [200, 201, 202, 203, 204, 205, 206, 207, 208, 226];
                    const redirectStatusCodes = [300, 301, 302, 303, 307];
                    const acceptableStatusCodes = [...successStatusCodes, ...redirectStatusCodes];

                    // Assert berupa message di Cypress E2E pada status code ketika sukses
                    expect(acceptableStatusCodes, `Result of status code: ${status}`).to.include(status);
                } else {
                    // Jika response tidak sesuai dengan status code diatas, makan akan throw error dengan assert message seperti dibawah
                    cy.log('No response received.');
                    throw new Error('No response received.');
                }
            });
    }


    loginViaV1Prod(nip, passwordv1) {
        this.navigateLoginPageV1Prod()

        cy.get("#login > div").click()
        cy.get("div.flex > div button").click()

        const username = cy.get(login.username).as('username')
        username.should('be.visible')
        username.type(nip, { force: true })

        const password = cy.get(login.password).as('password')
        password.type(passwordv1, { force: true })

        const hiddenCaptcha = cy.get(login.hiddenCaptcha).as('hiddenCaptcha')
        hiddenCaptcha.invoke('val')
            .then((val) => {
                const captchaType = cy.get(login.captcha).as('captcha')
                captchaType.type(val, { force: true })
            })

        const btnLogin = cy.get(login.btnLogin).as('btnLogin')
        btnLogin.should('contain', 'Login')
            .click({ force: true })

        cy.wait(3000)
    }

    // REDIRECT LOGIN TO SIDEBAR V2

    directLogin() {
        const closePopupLandingPageV1 = cy.get(login.closePopupLandingPageV1).as('closePopupLandingPageV1')
        closePopupLandingPageV1.click()

        const goToV2 = cy.get(login.goToV2).as('goToV2')
        goToV2.should('contain', 'LOGIN TO V2')
            .click()

        cy.wait(3000)

        this.closePopupLandingPage()
    }

    directDeployPreview() {
        cy.visit(Cypress.env('base_url_deploy_preview'))

        cy.wait(3000)

        this.closePopupLandingPage()

        cy.wait(3000)
    }

    // LOGOUT 

    backToV1() {
        const backToV1 = cy.get(login.backToV1).as('backToV1')
        backToV1.should('contain', 'SIDEBAR V1')
            .click()
    }

    logout() {
        const closePopupLandingPageV1 = cy.xpath(login.closePopupLandingPageV1).as('closePopupLandingPageV1')
        closePopupLandingPageV1.click()

        cy.wait(3000)

        const profileUser = cy.get(login.profileUser).as('profileUser')
        profileUser.should('be.visible')
            .click()

        const btnKeluar = cy.xpath(login.btnKeluar).as('btnKeluar')
        btnKeluar.should('contain', 'Keluar')
            .click()
    }

    logoutV2() {
        const btnProfile = cy.get(navbar.btnProfile).as('btnProfile')
        btnProfile.should('be.visible')
        btnProfile.click()

        const popupProfile = cy.get(navbar.popupProfile).as('popupProfile')
        popupProfile.should('be.visible')

        const btnKeluar = cy.get(navbar.btnKeluar).as('btnKeluar')
        btnKeluar.should('be.visible').and('contain', 'Log Out')
        btnKeluar.click()

        cy.url().should('eq', Cypress.env('base_url_v1'))
    }

    logoutV2step2() {
        // Show header if hidden
        cy.get(login.showHeaderNav).invoke('css', 'display', 'block');

        // Use the simpler selector
        const btnProfile = cy.get(login.getJQueryProfileV2).as('btnProfile');

        // Wait for element to be visible or force click if not
        btnProfile.scrollIntoView()
            .should('be.visible', { force: true })
            .click({ force: true });

        // I'm assuming the following popupProfile code remains unchanged 
        // as you didn't provide the selector.
        const popupProfile = cy.get(navbar.btnProfile).as('popupProfile');
        popupProfile.scrollIntoView()
            .should('be.visible', { force: true });

        const btnKeluar = cy.get(navbar.btnKeluar).as('btnKeluar');
        btnKeluar.scrollIntoView()
            .should('be.visible').and('contain', 'Log Out')
            .click({ force: true });

        cy.wait(8000)

        cy.url().should('eq', Cypress.env('base_url_v1'));
    }

    logoutV2step2PROD() {
        // Show header if hidden
        cy.get(login.showHeaderNav).invoke('css', 'display', 'block');

        cy.wait(3000)

        // Use the simpler selector
        const btnProfile = cy.get(login.getJQueryProfileV2).as('btnProfile');

        // Wait for element to be visible or force click if not
        btnProfile.scrollIntoView()
            .should('be.visible', { force: true })
            .click({ force: true });

        // I'm assuming the following popupProfile code remains unchanged 
        // as you didn't provide the selector.
        const popupProfile = cy.get(navbar.btnProfile).as('popupProfile');
        popupProfile.scrollIntoView()
            .should('be.visible', { force: true });

        const btnKeluar = cy.get(navbar.btnKeluar).as('btnKeluar');
        btnKeluar.scrollIntoView()
            .should('be.visible').and('contain', 'Log Out')
            .click({ force: true });

        cy.wait(8000)


        cy.url().should('eq', Cypress.env('base_url_prod_v1'));
    }


    // ALERT

    alertGagalLogin() {
        const alertSalah = cy.xpath(login.alertSalah).as('alertSalah')
        alertSalah.should('be.visible')
            .should('contain', 'Username atau password Anda salah.')
    }

    alertFailedNipKurang() {
        const alert = cy.xpath(navbar.responseNip)

        alert.should('be.visible')
            .and('contain', '{"nip":"Isian nip harus minimal 18 karakter."}')
    }

    alertFailedNipKosong() {
        const alert = cy.xpath(navbar.responseNip)

        alert.should('be.visible')
            .and('contain', '{"nip":"Isian nip tidak boleh string kosong."}')
    }

}