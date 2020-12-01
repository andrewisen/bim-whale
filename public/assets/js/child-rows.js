function generateChildData(json_object) {
    var table = "";

    table += '<pre id="' + json_object.instanceId + '"></pre>';

    // table =
    //     '<div class="d-flex"><div class="d-flex flex-column border p-2" style="width: 500px"><div><h6 style=" color: rgb(170, 170, 170); font-weight: 500; font-size: smaller; text-transform: uppercase; " > GlobalId </h6> <div><h6>1F6umJ5H50aeL3A1As_wTm</h6></div> </div> <div> <h6 style=" color: rgb(170, 170, 170); font-weight: 500; font-size: smaller; text-transform: uppercase; " > Instansnamn </h6> <div><h6>Basic Wall:Bearing Wall:346660</h6></div> </div> <div> <h6 style=" color: rgb(170, 170, 170); font-weight: 500; font-size: smaller; text-transform: uppercase; " > Typnamn </h6> <div><h6>Basic Wall:Bearing Wall</h6></div> </div> <div> <h6 style=" color: rgb(170, 170, 170); font-weight: 500; font-size: smaller; text-transform: uppercase; " > Våning </h6> <div><h6>Level 1</h6></div> </div> </div>';
    return table;
}

function getRowId(json_object) {
    return json_object.instanceId;
}
function convert_camel_case(input_string) {
    var output_string = "";
    if (input_string[0] === "_") {
        input_string = input_string.substring(1);
    }
    output_string = input_string
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, function (str) {
            return str.toUpperCase();
        });
    return output_string;
}
