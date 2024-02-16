describe('顧客情報入力フォームのテスト', () => {
  before(() => {
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
    cy.fixture('customerData').then((data) => {
      // フォームの入力フィールドにテストデータを入力
      const uniqueContactNumber = `03-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
      cy.get('#companyName', { timeout: 10000 }).should('be.visible').type(data.companyName);
      cy.get('#industry').type(data.industry);
      cy.get('#contact').type(uniqueContactNumber);
      cy.get('#location').type(data.location);
    });

    // 確認ボタンをクリック
    cy.get('button.btn-primary').click();
    // 確認画面に遷移することを確認
    cy.url().should('include', '/add-confirm.html');

    // 登録ボタンをクリック
    cy.get('#confirmBtn').click();

    // alertメッセージが表示されたことを確認
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('顧客情報が正常に保存されました。');

    // フォームがリセットされたことを確認
    cy.get('#companyName', { timeout: 10000 }).should('be.visible').should('have.value', '');
    cy.get('#industry').should('have.value', '');
    cy.get('#contact').should('have.value', '');
    cy.get('#location').should('have.value', '');
  });

  it('顧客情報が一覧表示画面に正しく表示されているかを確認する', () => {
    // 一覧表示画面にアクセス
    cy.visit('/moka_sasaki/customer/list.html');
  
    // テストデータの読み込み（前提条件として、登録した顧客情報が表示されていることを期待）
    cy.fixture('customerData').then((data) => {
      // 顧客情報が一覧テーブル内に正しく表示されているかを確認
      cy.get('#customer-list').should('contain', data.companyName);
      cy.get('#customer-list').should('contain', data.contact);
    });
  });

  it('詳細画面から顧客の住所を更新する', () => {
    // 一覧表示画面にアクセス
    cy.visit('/moka_sasaki/customer/list.html');
    // テストデータの読み込み（前提条件として、一覧に表示された顧客データを選択）
    cy.fixture('customerData').then((data) => {
      // 一覧から詳細画面へのリンクをクリック
      cy.contains(data.companyName).click();
    });
    // 顧客詳細画面にアクセスしたことを確認
    cy.url().should('include', '/moka_sasaki/customer/detail.html');
    // 住所の更新
    cy.get('#location').clear().type('東京都渋谷区1-1');
    // 更新ボタンをクリック
    cy.get('#updateCustomerBtn').click();
    // 更新成功メッセージを確認
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('顧客情報が更新されました');
    });
    // 顧客一覧画面にリダイレクトされたことを確認
    cy.url().should('include', '/moka_sasaki/customer/list.html');
    // 一覧に更新された住所が表示されていることを確認
    cy.contains('東京都渋谷区1-1');
  });
  }); 
});
