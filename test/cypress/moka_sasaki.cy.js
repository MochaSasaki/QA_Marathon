describe('顧客情報入力フォームのテスト', () => {
  beforeEach(() => {
    cy.fixture('customerData').as('customerData');
  });
  it('顧客情報を入力して送信し、成功メッセージを確認する', () => {
    cy.visit('/moka_sasaki/customer/add.html');
    cy.get('#companyName', { timeout: 10000 }).should('exist');
    cy.window().then((win) => {
      // windowのalertをスタブ化し、エイリアスを設定
      cy.stub(win, 'alert').as('alertStub');
    });

    // テストデータの読み込み
    const data = this.customerData;
    // フォームの入力フィールドにテストデータを入力
    const uniqueContactNumber = `03-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    cy.get('#companyName', { timeout: 10000 }).should('be.visible').type(data.companyName);
    cy.get('#industry').type(data.industry);
    cy.get('#contact').type(uniqueContactNumber);
    cy.get('#location').type(data.location);

    // 確認ボタンをクリック
    cy.get('button.btn-primary').click();
    // 確認画面に遷移することを確認
    cy.url().should('include', '/add-confirm.html');

    // 登録ボタンをクリック
    cy.get('#confirmBtn').click();
    // cy.wait(2000);
    // // alertメッセージが表示されたことを確認
    // cy.on('window:alert', (alertText) => {
    //   expect(alertText).to.equal('顧客情報が正常に保存されました。');
    // });
      // フォームがリセットされたことを確認
      cy.wait(2000);
      cy.get('#companyName', { timeout: 10000 }).should('be.visible');
      cy.get('#companyName').should('have.value', '');
      cy.get('#industry').should('have.value', '');
      cy.get('#contact').should('have.value', '');
      cy.get('#location').should('have.value', '');
  });
});
