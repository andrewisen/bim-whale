// Initialization
$("body").css("background", "#f8f9fa");
$("#ifcResult").hide();

$(document).ready(function () {
    // Init select2
    $("#ifcSelection").select2({
        data: data,
        placeholder: "Select which entities to include",
        theme: "bootstrap4",
        allowClear: true,
    });
    // Populate select2 with prevoius selection
    var ifcEntities = localStorage.getItem("ifcEntities");
    if (ifcEntities) {
        $("#ifcSelection").val(ifcEntities.split(",")).trigger("change");
    }

    // Init select2
    $("#propertySetsSelection").select2({
        placeholder: "Enter which property sets to include",
        theme: "bootstrap4",
        allowClear: true,
        tags: true,
    });
    // Populate select2 with prevoius selection
    var ifcPropertySets = localStorage.getItem("ifcPropertySets");
    if (ifcPropertySets) {
        ifcPropertySets.split(",").forEach((propertySet) => {
            var newOption = new Option(propertySet, propertySet, true, true);
            $("#propertySetsSelection").append(newOption).trigger("change");
        });
        $("#propertySetsSelection")
            .val(ifcPropertySets.split(","))
            .trigger("change");
    }
});
