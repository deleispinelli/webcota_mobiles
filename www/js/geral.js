var info = {};

//

var ufs;

$.each({ AC: 'Acre', AL: 'Alagoas', AP: 'Amapá', AM: 'Amazonas', BA: 'Bahia', CE: 'Ceará', DF: 'Distrito Federal', ES: 'Espírito Santo', GO: 'Goiás', MA: 'Maranhão', MT: 'Mato Grosso', MS: 'Mato Grosso do Sul', MG: 'Minas Gerais', PA: 'Pará', PB: 'Paraíba', PR: 'Paraná', PE: 'Pernambuco', PI: 'Piauí', RJ: 'Rio de Janeiro', RN: 'Rio Grande do Norte', RS: 'Rio Grande do Sul', RO: 'Rondônia', RR: 'Roraima', SC: 'Santa Catarina', SP: 'São Paulo', SE: 'Sergipe', TO: 'Tocantins' }, function(i, v) {
	ufs += '<option value="' + i + '">' + v + '</option>';
});

//

$(document).ready(function() {
	db.transaction(function(x) {
		x.executeSql(
			'SELECT * FROM teste', [], function(x, dados) {
				if (!dados.rows.length)
				{
					if ($('#autenticar').length <= 0)
					{
						//window.location = 'autenticar.html';
						window.location = 'index.html';
					}
				}
				else
				{
					var usuario = dados.rows.item(0);
					
					info.id_rep 		= usuario.id;
					info.cod_rep 		= usuario.codigo;
					info.dap_empresa 	= usuario.dap_empresa;
					info.dap_max 		= usuario.dap_max;
					info.dap_min 		= usuario.dap_min;
					
					$('h1').before('<p class="nao_exibir_impressao" style="float: right; margin: 0; color: #fff; text-align: right;">Bem-vindo(a) <strong>' + representante.nome_de_usuario + '</strong>.<br>Hoje é ' + date('d/m/Y') + '.</p>');
					
					// verificar se a sincronização é muito antiga
					
					x.executeSql(
						'SELECT * FROM sincronizacoes ORDER BY timestamp DESC LIMIT 1', [], function(x, dados) {
							if (dados.rows.length)
							{
								var sinc = dados.rows.item(0);
								
								if (time() - sinc.timestamp >= 24 * 3600)
								{
									$('#conteudo').before('<p class="erro" style="background-color: #fff; border-radius: 5px;"><strong>Atenção:</strong> você está sem efetuar uma sincronização há muito tempo, <a href="sincronizar.html">deseja sincronizar agora</a>?<p>');
								}
							}
						}
					);
				}
			}
		);
	});
	
});

function mensagem(conteudo)
{
	// o timeout corrige um bug: por algum motivo sem o timeout a 
	//	mensagem não é enviada em alguns casos
	setTimeout(function() { apprise(conteudo); }, 100);
}

function sleep(segundos) {
	var time = new Date().getTime();
	
	for (var i = 0; i < 1e7; i++)
	{
		if ((new Date().getTime() - time) > segundos * 1000)
		{
			break;
		}
	}
}
