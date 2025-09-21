{
    app.beginUndoGroup("Duplicate Folder with Find & Replace");

    var originalToDuplicateMap = {};

    // Prompt user for find/replace terms
    var findText = prompt("Enter text to find in names:", " ");
    if (findText === null) {
        alert("Operation cancelled.");
        app.endUndoGroup();
    } else {
        var replaceText = prompt("Enter replacement text:", " ");
        if (replaceText === null) {
            alert("Operation cancelled.");
            app.endUndoGroup();
        } else {

            function isDuplicatable(item) {
                return (
                    item instanceof CompItem ||
                    item instanceof FootageItem ||
                    (item.mainSource && item.mainSource instanceof SolidSource)
                );
            }

            function renameIfNeeded(name) {
                return name.indexOf(findText) !== -1
                    ? name.replace(new RegExp(findText, 'g'), replaceText)
                    : name;
            }

            function getChildrenOfFolder(folder) {
                var children = [];
                for (var i = 1; i <= app.project.numItems; i++) {
                    var item = app.project.item(i);
                    if (item.parentFolder === folder) {
                        children.push(item);
                    }
                }
                return children;
            }

            function duplicateFolderRecursive(originalFolder, newFolder) {
                var children = getChildrenOfFolder(originalFolder); // frozen list

                for (var i = 0; i < children.length; i++) {
                    var item = children[i];

                    if (item instanceof FolderItem) {
                        var subFolder = app.project.items.addFolder(renameIfNeeded(item.name));
                        subFolder.parentFolder = newFolder;
                        duplicateFolderRecursive(item, subFolder);
                    } else if (isDuplicatable(item) && typeof item.duplicate === "function") {
                        var duplicated = item.duplicate();
                        duplicated.name = renameIfNeeded(item.name);
                        duplicated.parentFolder = newFolder;

                        if (item instanceof CompItem) {
                            originalToDuplicateMap[item.id] = duplicated;
                        }
                    }
                }
            }

            function relinkCompLayers() {
                for (var key in originalToDuplicateMap) {
                    var duplicatedComp = originalToDuplicateMap[key];

                    for (var i = 1; i <= duplicatedComp.numLayers; i++) {
                        var layer = duplicatedComp.layer(i);
                        if (layer.source && originalToDuplicateMap[layer.source.id]) {
                            layer.replaceSource(originalToDuplicateMap[layer.source.id], false);
                        }
                    }
                }
            }

            // Ensure a folder is selected
            var selectedItems = app.project.selection;
            if (selectedItems.length !== 1 || !(selectedItems[0] instanceof FolderItem)) {
                alert("Please select one folder in the Project panel.");
            } else {
                var originalFolder = selectedItems[0];
                var topLevelCopyName = renameIfNeeded(originalFolder.name + "_copy");
                var topLevelCopy = app.project.items.addFolder(topLevelCopyName);
                topLevelCopy.parentFolder = originalFolder.parentFolder;

                duplicateFolderRecursive(originalFolder, topLevelCopy);
                relinkCompLayers();

                alert("Duplication complete!\nRenamed '" + findText + "' → '" + replaceText + "'");
            }

            app.endUndoGroup();
        }
    }
}
