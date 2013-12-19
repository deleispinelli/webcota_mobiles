function inserir_csv_ws_oportunidade()
{
    $.ajax({
        type: "GET",
        url: "csv/ws_oportunidade.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
}

function processData(allText) 
{
	var record_num = 0;
    var allTextLines = allText.split(/\r\n|\n/);
	var lines = [];
	
	$.each(allTextLines, function( index, value ) 
	{
	  record_num++;
	});
	
	for (var j=0; j < record_num; j++) 
	{ 
		var entries = replaceAll(allTextLines[j],"\\N","");
		var str_clean = replaceAll(entries,";","','");
		
		lines[j] = "'"+str_clean+"'";
	}
	
	$("#arq_csv").html(lines[0]);
	
	record_num = 0;
	$.each(lines, function( index, value ) 
	{
		insert_all_ws_oportunidade(lines[record_num]);
		record_num++;
	});
	
	$('#retorno').html("fim insert ws_oportunidade");
}

