"use strict";

var base = require("./base.spec");

describe("basic", function () {
  it("TODO IMPLEMENT A TEST", function (done) {
    base.adapter.client
      .url("http://backbone-testing.com/notes/app/")

      // Create a note.
      .setValue("input#note-new-input", "Delete Test")
      .click("button#note-create")
      .getText(".notes-item .note-title").then(function (text) {
        expect(text).to.equal("Delete Test");
      })

      // Delete a note
      .click(".notes-item .note-delete")
      .isExisting(".notes-item .note-delete").then(function (exists) {
        expect(exists).to.be.false;
      })

      .finally(base.promiseDone(done));
  });
});
