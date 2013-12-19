function insert_teste()
{
	db.transaction (function (transaction) 
	{
	  
	  transaction.executeSql ("INSERT INTO teste (a,b) VALUES ('Delei','1');", undefined, 
	  
		function (transaction, result)
		{
			console.log('INSERT teste ok');
			$('#retorno').html('INSERT teste ok');
	    }, error);
	  
	});
}

function select_teste()
{
	db.transaction (function (transaction) 
	{
	  
	  transaction.executeSql ('SELECT * FROM teste', undefined, 
	  
	  function (transaction, result)
	  {
		var html = "<ul>";
		  if (result.rows.length)
		  {
			for (var i = 0; i < result.rows.length; i++) 
			{
			  var row = result.rows.item (i);
			  var a = row.a;
			  var b = row.b;
			  html += "<li>" + a + " - " + b + "</li>";
			}
		  }
		  else
		  {
			html += "<li> A consulta retornou sem dados. </li>";
		  }
		  
		  html += "</ul>";
		  $('#retorno').html(html);
		  }, error);
	  
	});
}

function select_ws_oportunidade()
{
	db.transaction (function (transaction) 
	{
	  
	  transaction.executeSql ('SELECT * FROM ws_oportunidade', undefined, 
	  
	  function (transaction, result)
	{
		console.log('SELECT ws_oportunidade ok');
		var html = "<ul>";
		  if (result.rows.length)
		  {
			for (var i = 0; i < result.rows.length; i++) 
			{
			  var row = result.rows.item (i);

			  html += "<li>" + row.descricao + " - " + row.data_cadastro + "</li>";
			}
		  }
		  else
		  {
			html += "<li> A consulta ws_oportunidades retornou sem dados. </li>";
		  }
		  
		  html += "</ul>";
		  $('#retorno').html(html);
		  }, error);
	  
	});
}

function insert_ws_oportunidade()
{
	db.transaction (function (transaction) 
	{
	  
		transaction.executeSql ("INSERT INTO ws_oportunidade (id,type, data_cadastro, data_alteracao,n_pregao,descricao,termino_credenc,inicio_envio,termino_envio,suspensao_n,suspensao_data,suspensao_motivo,faq,edital,detalhes,arquivos,historico,filename,publicado,excluido,fisica_cadastro,fisica_alteracao,status_codigo,destaque,modalidade_codigo,regime_contratacao_codigo,regime_execucao_codigo,cidade_codigo,base_codigo,estado_codigo,robo_id,orgao,status_triagem_codigo,cidade,estado,descartado,orgao_codigo,tipo_codigo,ws_valor) VALUES ('1','','2013-11-08','2013-11-08','208/2012','Aquisição de Fonte Linear de Tensão e Corrente Ajustável e Estabilizada','','2013-11-19','','','','','','','','','','http://comprasnet.gov.br/ConsultaLicitacoes/download/download_editais_detalhe.asp?coduasg=120016&modprp=5&numprp=2082012','t','f','','','','','','','','','4','','158442','MINISTÉRIO DA DEFESAComando da AeronáuticaGrupamento de Infraestrutura e Apoio de São José dos CamposCódigo da UASG: 120016','3',' São José dos Campos','SP','f','','','');", undefined, 
	  
		function (transaction, result)
		{
			$('#retorno').html('INSERT simples ws_oportunidade ok');
	    }, error);
	  
	});
}

function insert_all_ws_oportunidade(valores)
{
	//alert(valores);
	db.transaction (function (transaction) 
	{
	  
		transaction.executeSql ("INSERT INTO ws_oportunidade (id,type, data_cadastro, data_alteracao,n_pregao,descricao,termino_credenc,inicio_envio,termino_envio,suspensao_n,suspensao_data,suspensao_motivo,faq,edital,detalhes,arquivos,historico,filename,publicado,excluido,fisica_cadastro,fisica_alteracao,status_codigo,destaque,modalidade_codigo,regime_contratacao_codigo,regime_execucao_codigo,cidade_codigo,base_codigo,estado_codigo,robo_id,orgao,status_triagem_codigo,cidade,estado,descartado,orgao_codigo,tipo_codigo,ws_valor) VALUES ("+valores+");", undefined, 
	  
		function (transaction, result)
		{
			$('#retorno').html('INSERT CSV ALL ws_oportunidade ok'); 
	    }, error);
	  
	});
	return;
}