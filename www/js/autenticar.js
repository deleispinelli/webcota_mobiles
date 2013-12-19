$(document).ready(function() {
	$('input[type=submit]').click(function() {
		var nome_de_usuario = $('input[name=nome_de_usuario]').val();
		var senha = $('input[name=senha]').val();
		
		if (!nome_de_usuario || !senha)
		{
			mensagem('Digite seu nome de usuário e senha.');
		}
		else
		{
			$.ajax({
				url: ws_url + '/autenticar',
				data: {
					nome_de_usuario: nome_de_usuario,
					senha: senha
				},
				dataType: 'jsonp',
				success: function(dados) {
					if (dados)
					{
						db.transaction(function(x) {
							var tmp_1 = [];
							var tmp_2 = [];
							var tmp_3 = [];
							
							$.each(dados, function(indice, valor) {
								tmp_1.push(indice);
								tmp_2.push('?');
								tmp_3.push(valor);
							});
							
							x.executeSql('INSERT INTO informacoes_do_representante (' + tmp_1.join(', ') + ') VALUES (' + tmp_2.join(', ') + ')', tmp_3);
							
							apprise('Agora o sistema será instalado.', {}, function (dado) {
								window.location = 'instalar.html';
							});
						});
					}
					else
					{
						//mensagem('Dados inválidos.');
						db.transaction(function(x) {
							var tmp_1 = [];
							var tmp_2 = [];
							var tmp_3 = [];
							
							$.each(dados, function(indice, valor) {
								tmp_1.push(indice);
								tmp_2.push('?');
								tmp_3.push(valor);
							});
							
							x.executeSql('INSERT INTO informacoes_do_representante (' + tmp_1.join(', ') + ') VALUES (' + tmp_2.join(', ') + ')', tmp_3);
							
							apprise('Agora o sistema será instalado.', {}, function (dado) {
								window.location = 'instalar.html';
							});
						});
					}
				},
				error: function() {
					mensagem('Não foi possível se conectar com o servidor, verifique sua conexão com a internet. Por favor tente novamente.');
				}
			});
		}
		
		return false;
	});
	
	verificar_conexao();
});

function verificar_conexao()
{
	$.ajax({
		dataType: 'jsonp',
		complete: function (xhr, status) {
			switch (status)
			{
				case 'notmodified':
				case 'parsererror':
				case 'success':
					$('.autenticar').show();
					$('.erro').hide();
				break;
				
				default:
					$('.autenticar').hide();
					$('.erro').show();
				break;
			}
		},
		timeout: 2000,
		type: 'POST',
		url: pdr_url + '/offline/jsonp.php'
	});
	
	setTimeout('verificar_conexao()', 2000);
}
