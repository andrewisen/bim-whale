function handleIfcFile() {
    // Update local storage
    localStorage.setItem("ifcEntities", $("#ifcSelection").val());
    // Convert select2 selection(s) to uppercase
    let selectedEntities = $("#ifcSelection")
        .val()
        .map((entity) => {
            return entity.toUpperCase();
        });

    // Update local storage
    localStorage.setItem("ifcPropertySets", $("#propertySetsSelection").val());
    // Return select2 selection(s)
    let selectedPropertySets = $("#propertySetsSelection")
        .val()
        .map((entity) => {
            return entity;
        });

    // Same as "config.ts"
    const requiredEntities = [
        "IFCPROPERTYSINGLEVALUE",
        "IFCRELDEFINESBYPROPERTIES",
        "IFCPROPERTYSET",
    ];
    // Same as "config.ts"
    const allEntities = [...requiredEntities, ...selectedEntities];
    // Same as "config.ts"
    const config = {
        requiredEntities: requiredEntities,
        selectedEntities: selectedEntities,
        selectedPropertySets: selectedPropertySets,
        allEntities: allEntities,
    };
    // Get file with jQuery
    const file = $("#ifcFileInput").prop("files")[0];

    // Same as "index.ts"
    var fileReader = new FileReader();
    fileReader.onload = (loadEvent) => {
        const lines = fileReader.result.split(/\r\n|\n/);
        // N.B. The BIM Whale must be imported before this
        let ifcFile = new BIMWHALE.IfcFile(lines, config);
        ifcFile.parseIfcFile();
        buildTable(Object.values(ifcFile.entities.genericEntities)); // See: datatables.js
    };
    fileReader.readAsText(file);
    return false; // Prevent page reload
}

// Call handleIfcFile() on form submit
document.getElementById("ifc-form").addEventListener("submit", handleIfcFile);
