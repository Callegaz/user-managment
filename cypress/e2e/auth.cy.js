describe("Auth Flow", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.clear();
      win.localStorage.removeItem("fakeUsersDB");
    });
  });

  it("should show error when login with invalid credentials", () => {
    cy.visit("/login");
    cy.get('[data-testid="email-input"]').type("invalid1@test.com");
    cy.get('[data-testid="password-input"]').type("wrongpass");
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="error-message"]').should(
      "contain",
      "Credenciais inválidas"
    );
  });

  it("should show error when passwords dont match", () => {
    cy.visit("/signup");
    const testEmail = `test${Date.now()}@test.com`;
    const testName = `test${Date.now()}`;

    cy.get('[data-testid="name-input"]').type(testName);
    cy.get('[data-testid="email-input"]').type(testEmail);
    cy.get('[data-testid="password-input"]').type("123456");
    cy.get('[data-testid="confirm-password-input"]').type("different");
    cy.get('[data-testid="signup-button"]').click();

    cy.get('[data-testid="error-message"]')
      .should("be.visible")
      .and("contain", "As senhas não coincidem");
  });

  it("should login after registration", () => {
    const testEmail = `test569856@test.com`;
    const testPassword = "123456";
    const testName = `test${Date.now()}`;

    // 1. Registro
    cy.visit("/signup");

    cy.get('[data-testid="name-input"]').type(testName);
    cy.get('[data-testid="email-input"]').type(testEmail);
    cy.get('[data-testid="password-input"]').type(testPassword);
    cy.get('[data-testid="confirm-password-input"]').type(testPassword);
    cy.get('[data-testid="signup-button"]').click();

    cy.window().its('localStorage.auth').should('exist');

    // 2. Logout  
    cy.get('[data-testid="logout-button"]').click();

    // 3. Login (agora na página de login)
    cy.visit("/login"); 
    cy.get('[data-testid="email-input"]').type(testEmail); // Mesmo email
    cy.get('[data-testid="password-input"]').type(testPassword); // Mesma senha
    cy.get('[data-testid="login-button"]').click();

    // 4. Verificação
    cy.get('[data-testid="welcome-message"]')
      .should("be.visible")
      .and("contain", testName);
  });
});
