module.exports = {
    // GET
    username: '[data-cy="login__username-input"]',
    password: '[data-cy="login__password-input"]',
    hiddenCaptcha: '[data-cy="login__captcha-hidden"]',
    captcha: '[data-cy="login__captcha-input"]',
    btnLogin: '[data-cy="login__login-button"]',
    closePopupLandingPageV1: '[data-cy="aksi-close-modal-beranda"]',
    goToV2: '[data-cy="aksi-login-to-v2"]',
    backToV1: '[data-cy="sidebar__v1__dashboard"]',
    getJQueryProfileV2: "button[tabindex='0']",
    showHeaderNav: '[data-cy="header__component"]',
    showHeaderNavProd: 'header[data-v-dd2902de]',
    alertSalah: '[id="error-username"]',
    alertPopUp: '[data-cy="dialog__button--confirm"]',
    chooseVersion: "[data-cy='choose-version__navigation__button--sidebar-v2']",
    btnLoginSSO: '[data-cy="login__button--sso"]',
    btnLoginSiap: '[data-cy="login__button--trk"]',
    usernameSSO: '[id="username"]',
    passwordSSO: '[id="password"]',
    btnConfirmLoginSSO: '[id="kc-login"]',
    formLoginSSO: '[id="kc-form-login"]',
    btnClosePopupV2: '[data-cy="dialog__welcoming__button--close"]',
    popupTTEPemeriksaError: '[data-cy="dialog__error-signing__label-pemeriksa"]',
    btnSkipInfoTTE: '[data-cy="dialog-popup__button"]',
    showInputLogin: '[data-cy="login__button--toggle-nip-password"]',

    // SIMULATE V2 STAGING
    btnLoginSso: '/html[1]/body[1]/div[1]/div[1]/section[1]/div[1]/div[1]/div[2]/form[1]/div[1]/button[1]',
    inputNip: '/html[1]/body[1]/form[1]/input[1]',
    btnMasuk: '/html[1]/body[1]/form[1]/button[1]',
    goToV2UK: '/html[1]/body[1]/div[1]/aside[1]/div[1]/section[1]/ul[1]/li[27]/a[1]',
    profileUser: '/html[1]/body[1]/div[1]/header[1]/nav[1]/div[1]/ul[1]/li[2]/a[1]',
    btnKeluar: '/html[1]/body[1]/div[1]/header[1]/nav[1]/div[1]/ul[1]/li[2]/ul[1]/li[2]/div[2]/a[1]',
    konsepNaskahMenu: '/html[1]/body[1]/div[1]/aside[1]/div[1]/section[1]/ul[1]/li[3]/a[1]/span[1]',
    skipOnboarding: '.introjs-skipbutton',
    usernameSiap: '/html[1]/body[1]/div[1]/div[1]/div[1]/section[1]/div[1]/div[1]/div[2]/div[1]/form[1]/div[1]/input[1]',
    passwordSiap: '/html[1]/body[1]/div[1]/div[1]/div[1]/section[1]/div[1]/div[1]/div[2]/div[1]/form[1]/div[2]/input[1]',
    btnConfirmSiap: '/html[1]/body[1]/div[1]/div[1]/div[1]/section[1]/div[1]/div[1]/div[2]/div[1]/form[1]/div[3]/button[1]',
    alertLimiter: '/html[1]/body[1]/section[1]/div[1]/div[2]/div[2]/div[3]/form[1]/div[1]/div[1]/p[1]',
    btnSkipInfoTTE: '[data-cy="dialog-popup__button"]'
}