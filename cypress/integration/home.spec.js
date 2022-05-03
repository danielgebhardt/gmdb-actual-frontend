describe("Home page", () => {
    beforeEach(() => {
        cy.visit('/')
    });

    it("user can see appbar with GMDB, Home, Login, and Search box with Button", () => {
        cy.findByText('GMDB').should("exist");
        cy.findByText('Home').should("exist");
        cy.findByText('Login').should("exist");
        cy.findByRole('textbox').should("exist");
        cy.findByLabelText(/Search/i).should("exist");
    })

    it("user can see a list of movies in four columns", () => {
        cy.findByAltText("Guardians of the Galaxy Vol. 2").should("exist");
        cy.findByAltText("The Godfather").should("exist");
    })
});


describe("User can click on movie, which replaces movie list with individual movie data, link back to movie list, and then can see a textbox to comment with a submit button that doesnt do anything", () => {
    beforeEach(() => {
        cy.visit('/')
    });

    it("user can click on individual movie, which loads specific movie data", () => {
        cy.findByAltText("Guardians of the Galaxy Vol. 2").click();
        cy.findByAltText("Guardians of the Galaxy Vol. 2").should("exist");
        cy.findByAltText("The Godfather").should("not.exist");
        cy.findByText("05 May 2017").should("exist");
        cy.findByText("The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father the ambitious celestial being Ego.").should("exist");
        cy.findByText("Action, Adventure, Comedy, Sci-Fi").should("exist");

        cy.findByPlaceholderText(/Comment/i).should("exist");

        //cy.findByPlaceholderText("textbox", {name: /CommentBox/i}).should("exist");
        cy.findByRole("button", {name: /Submit/i}).should("exist");
    });

    it("user can click on back to results button to see movie list", () => {
        cy.findByAltText("Guardians of the Galaxy Vol. 2").click();
        cy.findByAltText("Guardians of the Galaxy Vol. 2").should("exist");
        cy.findByAltText("The Godfather").should("not.exist");
        cy.findByText(/BACK TO RESULTS/i).click();
        cy.findByAltText("Guardians of the Galaxy Vol. 2").should("exist");
        cy.findByAltText("The Godfather").should("exist");

    });

    it("user can input comment into comment box and click Submit, which replaces comment box with 'submitted' message", () => {
        cy.findByAltText("Guardians of the Galaxy Vol. 2").click();
        cy.findByAltText("Guardians of the Galaxy Vol. 2").should("exist");
        cy.findByAltText("The Godfather").should("not.exist");

        const commentsBox = cy.findByPlaceholderText(/Comment/i);

        commentsBox.should("exist").type("Great movie!");
        cy.findByRole("button", {name: /Submit/i}).click().then(() => {
            commentsBox.should("not.exist");
            cy.findByRole("button", {name: /Submit/i}).should("not.exist");
            cy.findByText("Comment submitted.").should("exist");
        });
    });
});

describe("user clicks on Login button which shows login form. User can submit login form which will show text 'Logged in ", () => {
    it("user clicks login button which shows login form", () => {
        cy.findByRole("button", {name: /Login/i}).click().then(() => {
            cy.findByText(/Email/i).should("exist");
            cy.get("form").children("input[type=text]").should("exist");
            cy.findByText(/Password/i).should("exist");
            cy.get("form").children("input[type=password]").should("exist");
            cy.findByRole("button", {name: /Submit/i}).should("exist");
        });
    })

    it("user can type in email and password boxes, then click Submit, then see text saying 'Logged in'", () => {
        cy.get("form").children("input[type=text]").type("Jack");
        cy.get("form").children("input[type=password]").type("pwd");
        cy.findByRole("button", {name: /Submit/i}).click();
        cy.findByText(/Logged in\./i).should("exist");
        cy.get("form").should("not.exist");
    })
})

describe('user clicks the search box which filters the movie list', function () {
    it('user clicks the search box which filters the movie list', () => {
        cy.findByLabelText(/Search/i).type("bird\n");
        cy.findByAltText("Guardians of the Galaxy Vol. 2").should("not.exist");
        cy.findByAltText("The Godfather").should("not.exist");

        cy.findByAltText(/Something For The Birds/i).should("exist");
        cy.findAllByAltText(/^For The Birds$/i).should("have.lengthOf", 3)

    })
});

