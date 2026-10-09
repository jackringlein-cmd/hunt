# Project workflow

This game is backed up at https://github.com/jackringlein-cmd/hunt (main).

The user has requested that completed game changes be added to GitHub. After editing:
- Run the relevant checks and the full gameplay suite with `node --test tests/engine.test.js tests/serpent.test.js tests/toolmaker.test.js tests/pirate.test.js tests/turtle.test.js tests/abomination.test.js tests/water-beast.test.js tests/ironling.test.js tests/camoflauger.test.js`.
- Update design/ability documentation when mechanics change.
- Commit and push completed source, runtime assets, tests and documentation to the existing repository. Preserve unrelated work and remote changes; never force-push.
- Verify the remote commit before reporting that changes are on GitHub. Report any sync failure honestly.
- Command-line Git may lack credentials. The connected GitHub tools can create blobs, trees and commits and fast-forward main. Fetch that commit afterward to keep this checkout aligned.

Generated screenshots, local hosting metadata and the separate `published-game` Sites checkout are ignored. Pushing GitHub does not republish the separate Sites website.
