/**
 * WIP
 */

function buildTable(dataSet) {
    // Init
    $("#ifcSetup").hide();
    $("#ifcResult").show();

    // DataTables Config
    const buttons = [
        {
            extend: "excelHtml5",
            text: "Export to Excel",
            title: "",
            filename: "bim-whale-results",
            autoFilter: false,
            customize: function (xlsx) {
                setSheetName(xlsx, "IfcEntities");
                addSheet(
                    xlsx,
                    "#ifcPropertySetTable",
                    "IFC Properties",
                    "IfcProperties",
                    "2"
                );
                addSheet(xlsx, "#allTable", "ALL", "ALL", "3");
            },
        },
    ];
    const dom = "Bfrtip";

    // Generate data set
    let dataSet2 = [];
    let dataSet3 = [];
    dataSet.forEach((entity) => {
        Object.keys(entity.properties).forEach((propertySet) => {
            Object.keys(entity.properties[propertySet]).forEach((property) => {
                dataSet2.push([
                    entity.instanceId,
                    propertySet,
                    property,
                    entity.properties[propertySet][property],
                ]);
                dataSet3.push([
                    entity.instanceId,
                    entity.attributes.parsed[0],
                    entity.entityName,
                    entity.attributes.parsed[2],
                    propertySet,
                    property,
                    entity.properties[propertySet][property],
                ]);
            });
        });
    });

    // Table 1 - Entities
    var ifcTable = $("#ifcTable").DataTable({
        data: dataSet,
        searching: false,
        dom: dom,
        buttons: buttons,
        columns: [
            {
                className: "details-control",
                orderable: false,
                data: null,
                defaultContent: "",
            },
            {
                title: "Id",
                data: "instanceId",
            },
            {
                title: "GUID",
                data: "attributes.parsed.0",
            },
            {
                title: "Entity",
                data: "entityName",
            },
            {
                title: "Name",
                data: "attributes.parsed.2",
            },
        ],
        order: [[1, "asc"]],
    });
    // Table 2 - Property Sets
    var ifcPropertySetTable = $("#ifcPropertySetTable").DataTable({
        data: dataSet2,
        searching: false,
        dom: dom,
        buttons: buttons,
        columns: [
            {
                title: "Belongs to",
                data: 0,
            },
            {
                title: "Property Set",
                data: 1,
            },
            {
                title: "Name",
                data: 2,
            },
            {
                title: "Value",
                data: 3,
            },
        ],
    });
    // Table 3 - ALL (Combined)
    var allTable = $("#allTable").DataTable({
        data: dataSet3,
        dom: dom,
        searching: false,
        buttons: buttons,
        columns: [
            {
                title: "Id",
                data: 0,
            },
            {
                title: "GUID",
                data: 1,
            },
            {
                title: "Entity",
                data: 2,
            },
            {
                title: "Name",
                data: 3,
            },
            {
                title: "Property Set",
                data: 4,
            },
            {
                title: "Property Name",
                data: 5,
            },
            {
                title: "Property Value",
                data: 6,
            },
        ],
    });

    // Child Row + JSON Viewer
    $("#ifcTable tbody").on("click", "td.details-control", function () {
        console.log("child row");
        var tr = $(this).closest("tr");
        var row = ifcTable.row(tr);

        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass("shown");
        } else {
            row.child(generateChildData(row.data())).show();
            $("#" + row.data().instanceId).jsonViewer(row.data().properties, {
                collapsed: true,
                rootCollapsable: false,
                withLinks: false,
            });
            tr.addClass("shown");
        }
    });

    // Update button
    $(".buttons-excel").removeClass("btn-secondary").addClass("btn-primary");
}
