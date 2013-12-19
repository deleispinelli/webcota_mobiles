// limpa todas as tabelas
function limpar_tabelas()
{
	if(db)
	{
		db.transaction(function(x) {
			x.executeSql('DELETE FROM usuarios');
			console.log('DELETE usuarios ok');
			
			x.executeSql('DELETE FROM sincronizado');
			console.log('DELETE sincronizado ok');
			
			x.executeSql('DELETE FROM licitacoes');
			console.log('DELETE licitacoes ok');
			
			x.executeSql('DELETE FROM parceiros');
			console.log('DELETE parceiros ok');
			
			x.executeSql('DELETE FROM contratos');
			console.log('DELETE contratos ok');
			
			x.executeSql('DELETE FROM ws_oportunidade');
			console.log('DELETE ws_oportunidade ok');
			
			x.executeSql('DELETE FROM teste');
			console.log('DELETE teste ok');
			
			$('#retorno').html('Todas as tabelas foram limpas');
		});
	}
	else
	{
		console.log("DB erro ao excluir: " + err.message);
		return false;
	}
}

//limpar tabela usuarios
function limpar_tabela_usuarios()
{
	if(db)
	{
		db.transaction(function(x) {
			x.executeSql('DELETE FROM usuarios');
			console.log('DELETE usuarios ok');
			$('#retorno').html('DELETE usuarios ok');
		});
	}
	else
	{
		console.log("DB erro ao excluir dados tabela usuarios: " + err.message);
		return false;
	}
}

//limpar tabela usuarios
function limpar_tabela_sincronizado()
{
	if(db)
	{
		db.transaction(function(x) {
			x.executeSql('DELETE FROM sincronizado');
			console.log('DELETE sincronizado ok');
			$('#retorno').html('DELETE sincronizado ok');
		});
	}
	else
	{
		console.log("DB erro ao excluir dados tabela sincronizado: " + err.message);
		return false;
	}
}

//limpar tabela usuarios
function limpar_tabela_licitacoes()
{
	if(db)
	{
		db.transaction(function(x) {
			x.executeSql('DELETE FROM licitacoes');
			console.log('DELETE licitacoes ok');
			$('#retorno').html('DELETE licitacoes ok');
		});
	}
	else
	{
		console.log("DB erro ao excluir dados tabela licitacoes: " + err.message);
		return false;
	}
}

//limpar tabela usuarios
function limpar_tabela_parceiros()
{
	if(db)
	{
		db.transaction(function(x) {
			x.executeSql('DELETE FROM parceiros');
			console.log('DELETE parceiros ok');
			$('#retorno').html('DELETE parceiros ok');
		});
	}
	else
	{
		console.log("DB erro ao excluir dados tabela parceiros: " + err.message);
		return false;
	}
}

//limpar tabela usuarios
function limpar_tabela_contratos()
{
	if(db)
	{
		db.transaction(function(x) {
			x.executeSql('DELETE FROM contratos');
			console.log('DELETE contratos ok');
			$('#retorno').html('DELETE contratos ok');
		});
	}
	else
	{
		console.log("DB erro ao excluir dados tabela contratos: " + err.message);
		return false;
	}
}

//limpar tabela teste
function limpar_tabela_teste()
{
	if(db)
	{
		db.transaction(function(x) {
			x.executeSql('DELETE FROM teste');
			console.log('DELETE teste ok');
			$('#retorno').html('DELETE teste ok');
		});
	}
	else
	{
		console.log("DB erro ao excluir dados tabela teste: " + err.message);
		return false;
	}
}

//limpar tabela teste
function limpar_tabela_ws_oportunidade()
{
	if(db)
	{
		db.transaction(function(x) {
			x.executeSql('DELETE FROM ws_oportunidade');
			console.log('DELETE ws_oportunidade ok');
			$('#retorno').html('DELETE ws_oportunidade ok');
		});
	}
	else
	{
		console.log("DB erro ao excluir dados tabela ws_oportunidade: " + err.message);
		return false;
	}
}

//function limpar_tabelas()
//{
	/*db.transaction (function (transaction) 
	{
	  
	  //transaction.executeSql ('TRUNCATE TABLE teste', undefined, 
	  //transaction.executeSql ('DBCC CHECKIDENT (teste, RESEED, 0)', undefined, 
	  transaction.executeSql ('DELETE FROM teste', undefined, 
	  
		function (transaction, result)
		{
			alert('DELETE ok');
		}, error);
	  
	});*/
//}