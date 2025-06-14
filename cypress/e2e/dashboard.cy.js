describe("Dashboard Functionalities", () => {
  const testEmail = `test${Date.now()}@test.com`;
  const testPassword = "123456";
  const testName = `test${Date.now()}`;
  const newUser = {
    name: "Novo Usuário Teste",
    email: `new${Date.now()}@test.com`,
    role: "admin",
  };
  before(() => {
    // Registra o usuário
    cy.registerUser(testEmail, testPassword, testName);
    // Faz login
    cy.loginUser(testEmail, testPassword);
  });

  it("should display dashboard after login", () => {
    // Verifica redirecionamento para home
    cy.location("pathname").should("eq", "/");

    // Verifica mensagem de boas-vindas
    cy.get('[data-testid="welcome-message"]')
      .should("be.visible")
      .and("contain", testName);

    // Verifica componentes principais
    cy.get('[data-testid="user-table"]').should("be.visible");
    cy.get('[data-testid="user-form"]').should("be.visible");
    cy.get('[data-testid="logout-button"]').should("be.visible");

    // Verifica paginação inicial
    cy.get('[data-testid="user-table"] tbody tr').should("have.length", 6);
    cy.get('[data-testid="page-info"]').should("contain", "Página 1 de");

    // Testa navegação
    cy.get('[data-testid="next-page-button"]').click();
    cy.get('[data-testid="page-info"]').should("contain", "Página 2");
    cy.get('[data-testid="prev-page-button"]').click();
    cy.get('[data-testid="page-info"]').should("contain", "Página 1");

    //should create new user
    cy.get('[data-testid="name-input"]').type(newUser.name);
    cy.get('[data-testid="email-input"]').type(newUser.email);
    cy.get('[data-testid="role-select"]').select(newUser.role);
    cy.get('[data-testid="create-button"]').click();

    cy.get('[data-testid="success-message"]').should("contain", "sucesso");

    // Verifica na última linha da tabela
    cy.get('[data-testid="user-table"] tbody tr')
      .last()
      .within(() => {
        cy.get('[data-testid^="user-name-"]').should("contain", newUser.name);
        cy.get('[data-testid^="user-role-"]').should("contain", newUser.role);
      });

    // Edita o primeiro usuário
    cy.get('[data-testid="edit-button-1"]').click();
    cy.get('[data-testid="edit-name-input"]').clear().type("Nome Editado");
    cy.get('[data-testid="save-button"]').click();

    cy.get('[data-testid="success-message"]').should("contain", "atualizado");

    cy.get('[data-testid="user-row-1"]')
      .find('[data-testid^="user-name-"]')
      .should("contain", "Nome Editado");

    //should delete user
    cy.get('[data-testid="user-table"] tbody tr').then(($rows) => {
      const initialCount = $rows.length;
      cy.get('[data-testid="delete-button-1"]').click();
      cy.get('[data-testid="user-table"] tbody tr').should(
        "have.length",
        initialCount - 1
      );
    });
  });


});
