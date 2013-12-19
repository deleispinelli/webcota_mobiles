var modulos = {
	peds: {
		id: 'peds',
		nome: 'pedidos'
	}
};

$(document).ready(function() {
	$.ajaxSetup({
		timeout: 120 * 1000
	});
	
	//
	
	//setTimeout(sincronizar_licitacoes(), 100);
	
	//
	
	$('#cancelar').click(function () {
		apprise('Você realmente deseja cancelar a sincronização?', {
			'verify': true,
			'textYes': 'Sim',
			'textNo': 'Não'
		}, function (dado) {
			if (dado)
			{
				window.location = 'index.html';
			}
		});
		
		return false;
	});
});

function sinc_simples(nome_mod, mod, tab)
{
	$('#carregando').find('span:first').html('Sincronizando ' + nome_mod + '…');
	$('progress').attr('value', 0);
	
	var ajax = $.ajax({
		url: ws_url + '/exportar',
		data: { 
			tabela: tab, 
			ultimo_id: 0, 
			codigo_do_representante: info.cod_rep
		},
		dataType: 'json',
		success: function(dados) {
			db.transaction(function(x) {
				x.executeSql('INSERT INTO sincronizacoes (timestamp, modulo, sucesso) VALUES (?, ?, ?)', [time(), mod, 0]);
				
				x.executeSql('DELETE FROM ' + tab);
			});
			
			var total = dados.length;
			
			if (!total)
			{
				concluir_sinc_simples(mod);
			}
			else
			{
				db.transaction(function(x) {
					$.each(dados, function(i, v) {
						var tmp_1 = [];
						var tmp_2 = [];
						var tmp_3 = [];
						
						$.each(v, function(i_1, v_1) {
							tmp_1.push(i_1);
							tmp_2.push('?');
							tmp_3.push(v_1);
						});
						
						x.executeSql('INSERT INTO ' + tab + ' (' + tmp_1.join(', ') + ') VALUES (' + tmp_2.join(', ') + ')', tmp_3, function() {
							$('progress').attr('value', round(((i / total) * 100)));
							
							// quando usamos o $.each, devemos subtrair 1 do total
							if (i == total - 1)
							{
								concluir_sinc_simples(mod);
							}
						});
					});
				});
			}
		}
	});
	
	ajax.fail(function () {
		apprise('A sincronização não foi totalmente concluída. Você deseja tentar novamente?', {
			'verify': true,
			'textYes': 'Sim',
			'textNo': 'Não'
		}, function (dado) {
			if (dado)
			{
				window.location = 'sincronizar.html';
			}
			else
			{
				window.location = 'pedidos_analisados.html';
			}
		});
	});
}

function concluir_sinc_simples(mod)
{
	db.transaction(function(x) {
		x.executeSql('UPDATE sincronizacoes SET sucesso = ? WHERE modulo = ?', [1, mod], function () {
			setTimeout(modulos[mod].prox_func, 100);
		});
	});
}


function sincronizar_peds()
{
	$('#carregando').find('span:first').html('Sincronizando pedidos...');
	
	sincronizar_peds_passo_1();
}

function sincronizar_peds_passo_1() // adicionar na versão online os pedidos adicionados na versão offline
{
	$('progress').attr('value', 0);
	
	
	db.transaction(function(x) {
		
		console.log('...1');
		
		var numeros_pedidos = new Array();
		var mensagem_erro = '';
		var total_pedidos = 0;
		x.executeSql('SELECT DISTINCT(codigo) as codigo FROM pedidos WHERE exportado = 0 AND codigo != "" AND orc = 0', [], function(x, dados_pedido) {
			if(dados_pedido.rows.length)
			{	
				total_pedidos = dados_pedido.rows.length - 1;
				
				for (i = 0; i < dados_pedido.rows.length; i++)
				{
					var dado_pedido = dados_pedido.rows.item(i);
					
					
					numeros_pedidos[i] = dado_pedido.codigo;
				}
				
				//-------------
				
				for (indice_pedido = 0; indice_pedido < numeros_pedidos.length; indice_pedido++)
				{
				

					x.executeSql(
						'SELECT * FROM pedidos WHERE exportado = 0 AND codigo = ? AND orc = ?', [numeros_pedidos[indice_pedido], 0], function(x, dados) {
							var total = dados.rows.length;
							
							if (!total)
							{
								sincronizar_peds_passo_2();
							}
							else
							{
								$('progress').attr('value', 0);
								
								var tmp = 0;
								
								for (var i = 0; i < total; i++)
								{
									// o sleep previne o bloqueio de muitas requisições
									sleep(0.5);
									
									var dado = dados.rows.item(i);
									
									/*if(dado.um_do_produto =='PÇ'){
										
										unidade_de_medida = 'UN';
									}
									else{
										
										unidade_de_medida = dado.um_do_produto;
									}*/
									
									
									var ajax = $.ajax({
										url: ws_url + '/importar_peds_e_orcs',
										type: 'POST',
										data: {
											pedido: serialize({
												unidade: dado.unidade,
												un_do_produto: dado.um_do_produto,
												id_do_representante: info.id_rep,
												codigo_do_representante: info.cod_rep,
												timestamp: dado.timestamp,
												codigo: dado.codigo,
												codigo_do_cliente: dado.codigo_do_cliente,
												loja_do_cliente: dado.loja_do_cliente,
												codigo_da_tabela_de_preco: dado.codigo_da_tabela_de_preco,
												codigo_do_produto: dado.codigo_do_produto,
												quantidade: dado.quantidade,
												preco: dado.preco,
												total_sem_ipi: dado.total_sem_ipi,
												valor_do_frete_do_pedido: dado.valor_do_frete_do_pedido,
												codigo_da_forma_de_pagamento: dado.codigo_da_forma_de_pagamento,
												tipo_de_frete: dado.tipo_de_frete,
												codigo_da_transportadora: dado.codigo_da_transportadora,
												id_do_evento: dado.id_do_evento,
												ordem_de_compra: dado.ordem_de_compra,
												data_de_entrega: dado.data_de_entrega,
												observacao: dado.observacao,
												observacao_fiscal: dado.observacao_fiscal,
												desconto: dado.desconto,
												valor_st: dado.valor_st,
												cultura: dado.cultura,
												tipo_de_pedido: dado.tipo_de_pedido,
												pedido_autorizado: dado.pedido_autorizado,
												orc: dado.orc,
												id_pro: dado.id_pro,
												raz_soc_pro: dado.raz_soc_pro,
												nro_itens: dado.nro_itens
											})
										},
										dataType: 'jsonp',
										success: function(dados) {
										   console.log(dado.codigo);
											tmp++;
											
											$('progress').attr('value', round(((i / total) * 100)));
											
											if (tmp == total)
											{
												
												if(dados.sucesso)
												{
													
													db.transaction(function(x) {
														x.executeSql('DELETE FROM pedidos WHERE codigo = ? AND codigo_do_produto = ? AND codigo_da_tabela_de_preco = ?', [dados.pedidos[0].codigo, dados.pedidos[0].codigo_do_produto, dados.pedidos[0].codigo_da_tabela_de_preco]);
													});
													
													console.log('Pedido ' + dados.pedidos[0].codigo + ' enviado com sucesso.');
												
													// Se for o ultimo pedido, fazer isso
													if(numeros_pedidos[total_pedidos] == dados.pedidos[0].codigo)
													{
														sincronizar_peds_passo_2();
														
														/*
														if(mensagem_erro)
														{
															apprise('Não foi possível enviar todos os pedidos.<br>' + mensagem_erro, {}, function (dado) {
																window.location = 'pedidos_analisados.html';
															});
														}
														else
														{
															apprise('Pedidos enviados com sucesso.', {}, function (dado) {
																window.location = 'pedidos_analisados.html';
															});
														}
														*/
													}
													
												}
												else
												{
												
													mensagem_erro += 'Pedido ' + dados.pedidos[0].codigo + ' Rejeitado!<br>Motivo: ' + dados.erro + '<br><br>';
													
													console.log('Pedido ' + dados.pedidos[0].codigo + ' Rejeitado!');
													
													// Se for o ultimo pedido, fazer isso
													if(numeros_pedidos[total_pedidos] == dados.pedidos[0].codigo)
													{
														/*
														apprise('Não foi possível enviar todos os pedidos.<br>' + mensagem_erro, {}, function (dado) {
															window.location = 'pedidos_analisados.html';
														});
														*/
														
														sincronizar_peds_passo_2();
														
													}
													
												}
											}
										}
										
									});
									ajax.fail(function () {
										apprise('A sincronização não foi totalmente concluída. Você deseja tentar novamente?', {
											'verify': true,
											'textYes': 'Sim',
											'textNo': 'Não'
										}, function (dado) {
											if (dado)
											{
												window.location = 'sincronizar.html';
											}
											else
											{
												window.location = 'pedidos_analisados.html';
											}
										});
									});
										
								}
								
							}
						}
					);
				
				}
				
				//--------------
				
				
			}
			else
			{
				sincronizar_peds_passo_2();
			}
		});
		
	});
	
}

function sincronizar_peds_passo_2() // deletar todos os pedidos da versão offline
{
	sincronizar_peds_passo_3();
}

function sincronizar_peds_passo_3() // adicionar todos os pedidos da versão online na versão offline
{
	$('progress').attr('value', 0);
	
	var ajax = $.ajax({
		url: ws_url + '/exportar',
		data: {
			tabela: 'pedidos',
			ultimo_id: 0,
			codigo_do_representante: info.cod_rep
		},
		dataType: 'jsonp',
		success: function(dados) {
			db.transaction(function(x) {
				x.executeSql('INSERT INTO sincronizacoes (timestamp, modulo, sucesso) VALUES (?, ?, ?)', [time(), 'peds', 0]);
				
				x.executeSql('DELETE FROM pedidos WHERE orc = 0');
			});
			
			var total = dados.total;
			
			if (!total)
			{
				sincronizar_peds_passo_4();
			}
			else
			{
				db.transaction(function (x) {
					var i = 0;
					
					$.each(dados, function (indice, valor) {
						var timestamp = valor[1];
						var exportado = 1;
						var situacao = '';
						var codigo = valor[2];
						var codigo_do_cliente = valor[3];
						var loja_do_cliente = valor[4];
						var razao_social_do_cliente = valor[9];
						var cnpj_do_cliente = valor[10];
						var codigo_da_tabela_de_preco = valor[5];
						var descricao_da_tabela_de_preco = '';
						var valor_do_frete_do_pedido = 0;
						var valor_do_frete_alterado = 0;
						var codigo_da_forma_de_pagamento = valor[6];
						var descricao_da_forma_de_pagamento = valor[11];
						var tipo_de_frete = valor[7];
						var codigo_da_transportadora = valor[8];
						var nome_da_transportadora = valor[12];
						var id_do_evento = 0;
						var nome_do_evento = '';
						var observacao = valor[15];
						var tipo_de_pedido = valor[16];

						if (indice != 'total')
						{
							$.each(valor[17], function (i_item, v_item) {
								var id = v_item[0];
								var codigo_do_produto = v_item[1];
								var descricao_do_produto = v_item[7];
								var um_do_produto = v_item[8];
								var peso_do_produto = v_item[9];
								var quantidade = v_item[2];
								var quantidade_faturada = v_item[3];
								var preco = v_item[4];
								var ipi = v_item[10];
								var ordem_de_compra = v_item[5];
								var data_de_entrega = v_item[6];
								var valor_st = 0;
								var valor_desconto = v_item[11];
								
								var total_sem_ipi = round(preco * quantidade, 2);
								var total_com_ipi = round(total_sem_ipi + ((preco * (v_item[10] / 100)) * quantidade), 2);
								var peso_total = round(v_item[9] * quantidade, 3);
								
								var total_final = total_com_ipi + valor_st - valor_desconto;
								
								x.executeSql('INSERT INTO pedidos (id, timestamp, exportado, situacao, codigo, codigo_do_cliente, loja_do_cliente, razao_social_do_cliente, cnpj_do_cliente, tabela_de_frete_do_cliente, codigo_da_tabela_de_preco, descricao_da_tabela_de_preco, codigo_do_produto, descricao_do_produto, um_do_produto, peso_do_produto, quantidade, quantidade_faturada, preco, total_sem_ipi, ipi, total_com_ipi, peso_total, peso_total_do_pedido, preco_medio_por_kg_do_pedido, valor_do_frete_do_pedido, valor_do_frete_alterado, valor_dos_produtos_do_pedido, valor_total_do_pedido, codigo_da_forma_de_pagamento, descricao_da_forma_de_pagamento, tipo_de_frete, codigo_da_transportadora, nome_da_transportadora, id_do_evento, nome_do_evento, ordem_de_compra, data_de_entrega, observacao, valor_st, valor_desconto, total_final, orc, tipo_de_pedido) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [id, timestamp, exportado, situacao, codigo, codigo_do_cliente, loja_do_cliente, razao_social_do_cliente, cnpj_do_cliente, '', codigo_da_tabela_de_preco, descricao_da_tabela_de_preco, codigo_do_produto, descricao_do_produto, um_do_produto, peso_do_produto, quantidade, quantidade_faturada, preco, total_sem_ipi, ipi, total_com_ipi, peso_total, 0, 0, valor_do_frete_do_pedido, valor_do_frete_alterado, 0, 0, codigo_da_forma_de_pagamento, descricao_da_forma_de_pagamento, tipo_de_frete, codigo_da_transportadora, nome_da_transportadora, id_do_evento, nome_do_evento, ordem_de_compra, data_de_entrega, observacao, valor_st, valor_desconto, total_final, 0, tipo_de_pedido], function () {
									i++;
									
									$('progress').attr('value', round(((i / total) * 100)));
									
									if (i == total)
									{
										// calcular totais e situação
										
										x.executeSql(
											'SELECT DISTINCT codigo, valor_do_frete_do_pedido, SUM(quantidade) AS quantidade_vendida, SUM(quantidade_faturada) AS quantidade_faturada, SUM(peso_total) AS peso_total_do_pedido, SUM(total_com_ipi) AS valor_dos_produtos_do_pedido, SUM(valor_desconto) AS desconto_total_pedido FROM pedidos WHERE orc = 0 GROUP BY codigo, valor_do_frete_do_pedido', [], function (x, dados) {
												if (dados.rows.length)
												{
													var i_2 = 0;
													
													for (i = 0; i < dados.rows.length; i++)
													{
														var pedido = dados.rows.item(i);
														
														var situacao;
														
														if (!pedido.quantidade_faturada)
														{
															situacao = 'aguardando_faturamento';
														}
														else if (pedido.quantidade_faturada != pedido.quantidade_vendida)
														{
															situacao = 'parcialmente_faturado';
														}
														else
														{
															situacao = 'faturado';
														}
														
														var peso_total_do_pedido = round(pedido.peso_total_do_pedido, 2);
														var valor_dos_produtos_do_pedido = round(pedido.valor_dos_produtos_do_pedido, 2);
														
														var preco_medio_por_kg_do_pedido = round(valor_dos_produtos_do_pedido / peso_total_do_pedido, 2);
														
														var desconto_total_pedido = round(pedido.desconto_total_pedido, 2);
														var valor_total_st = round(0, 2);
														
														var valor_total_do_pedido = round(valor_dos_produtos_do_pedido + valor_total_st - desconto_total_pedido, 2);
														
														x.executeSql('UPDATE pedidos SET situacao = ?, peso_total_do_pedido = ?, preco_medio_por_kg_do_pedido = ?, valor_dos_produtos_do_pedido = ?, valor_total_do_pedido = ?, valor_total_st = ?, desconto_total_pedido = ? WHERE codigo = ?', [situacao, peso_total_do_pedido, preco_medio_por_kg_do_pedido, valor_dos_produtos_do_pedido, valor_total_do_pedido, valor_total_st, desconto_total_pedido, pedido.codigo], function () {
															i_2++;
															
															$('progress').attr('value', round(((i_2 / dados.rows.length) * 100)));
															
															if (i_2 == dados.rows.length)
															{
																sincronizar_peds_passo_4();
															}
														});
													}
												}
											}
										);
									}
								});
							});
						}
					});
				});
			}
		}
	});
	
	ajax.fail(function () {
		apprise('A sincronização não foi totalmente concluída. Você deseja tentar novamente?', {
			'verify': true,
			'textYes': 'Sim',
			'textNo': 'Não'
		}, function (dado) {
			if (dado)
			{
				window.location = 'sincronizar.html';
			}
			else
			{
				window.location = 'pedidos_analisados.html';
			}
		});
	});
}

function sincronizar_peds_passo_4()
{
	db.transaction(function(x) {
		x.executeSql('UPDATE sincronizacoes SET sucesso = ? WHERE modulo = ?', [1, 'peds'], function () {
			apprise('Sincronização concluída com sucesso.', {}, function (dado) {
				window.location = 'data.html';
			});
		});
	});
}

// FUNÇÕES DOS PEDIDOS **