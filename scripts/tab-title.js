// Tab Title Updater with Config Options
function updateTabTitle() {
  const worldTitle = game.world.title;
  const activeScene = game.scenes.active;
  const mode = game.settings.get("tab-title-module", "titleMode");
  let newTitle = worldTitle; // default
  switch (mode) {
    case "world":
      newTitle = worldTitle;
      break;
    case "scene":
      newTitle = activeScene ? activeScene.name : worldTitle;
      break;
    case "both":
      newTitle = activeScene
        ? `${worldTitle} - ${activeScene.name}`
        : worldTitle;
      break;
  }
  document.title = newTitle;
}
// Register settings when Foundry initializes
Hooks.once("init", () => {
  game.settings.register("tab-title-module", "titleMode", {
    name: "Tab Title Mode",
    hint: "Choose how the browser tab title should be displayed.",
    scope: "world", // setting is shared across the world
    config: true, // shows up in the module settings UI
    type: String,
    choices: {
      world: "World Only",
      scene: "Scene Only",
      both: "World + Scene",
    },
    default: "both",
  });
});
// Run once when the game is ready
Hooks.on("ready", updateTabTitle);
// Update whenever the canvas is ready (scene activation)
Hooks.on("canvasReady", updateTabTitle);
// Update when scenes are created or updated (e.g., renamed)
Hooks.on("createScene", updateTabTitle);
Hooks.on("updateScene", updateTabTitle);
