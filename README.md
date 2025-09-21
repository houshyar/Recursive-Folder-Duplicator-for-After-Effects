# 📁 Truly Duplicate Folder – After Effects Script

A powerful Adobe After Effects script to **recursively duplicate folders** in the Project panel with **find-and-replace** functionality on item names. Perfect for versioning project structures while maintaining internal precomp links and folder hierarchies.

---

## 🚀 Features

- 🔁 **Recursive Folder Duplication**  
  Duplicates entire folder hierarchies, including subfolders, compositions, footage, and solids.

- 🔍 **Smart Find & Replace**  
  Automatically renames duplicated items by replacing user-defined text strings in item names.

- 🔗 **Layer Source Relinking**  
  Ensures that **duplicated precomps** correctly relink their nested layers to the new duplicates—not the originals.

- 🧠 **Preserves Folder Structure**  
  Mirrors the original folder's structure inside the duplicated version.

- 🛡️ **Failsafe Prompts**  
  Prevents errors by verifying user input and selection state before execution.

---

## 📦 Use Case Example

Say you have a folder called `Scene_01_V1`, and you want to create a version 2:
- Run the script
- Input:
  - Find: `V1`
  - Replace: `V2`
- It will generate: `Scene_01_V1_copy` with renamed comps and assets (e.g., `Intro_V1` → `Intro_V2`)
- All comps are relinked internally to reference their V2 versions.

---

## 🖥️ How to Use

1. Open Adobe After Effects.
2. Select the **folder** you want to duplicate in the Project panel.
3. Run the script via `File > Scripts > Run Script File...`.
4. Input the `Find` and `Replace` terms when prompted.
5. Done! 🎉 Check your Project panel for the duplicated folder.

---

## 🧩 Installation (Optional)

To add it to your After Effects Scripts menu:
1. Copy `Truly Duplicate Folder.jsx` into the `Scripts` folder:
   - **macOS**: `~/Documents/Adobe/After Effects [version]/Scripts/`
   - **Windows**: `My Documents/Adobe/After Effects [version]/Scripts/`
2. Restart After Effects.
3. Run it via `File > Scripts > [Truly Duplicate Folder]`.

---

## ⚠️ Known Limitations

- Items that do not support `.duplicate()` will be skipped silently.
- Only the following item types are supported for duplication:
  - `CompItem`
  - `FootageItem`
  - `SolidSource`

---

## 📜 License

MIT License © Ebi

---

## 🤝 Contributions

Feel free to open a PR or issue if you have improvements or bugfixes!

---

