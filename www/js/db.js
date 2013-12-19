//document.addEventListener("deviceready", init, false);

var db = '';

if (window.sqlitePlugin !== undefined) 
{
	alert('sqlitePlugin');
	db = window.sqlitePlugin.openDatabase("Webcota");
} 
else 
{
	alert('webcota create');
	db = openDatabase('Webcota', '1.0', 'Webcota', 999965535);
}

function create_database()
{
	if (window.sqlitePlugin !== undefined) {
        db = window.sqlitePlugin.openDatabase("Webcota");
    } else {
		db = openDatabase('Webcota', '1.0', 'Webcota', 999965535);
	}
}

/*var sql_create_ws_oportunidades = "CREATE TABLE IF NOT EXISTS ws_oportunidade(";
  sql_create_ws_oportunidades += "id PRIMARY KEY,";
  sql_create_ws_oportunidades += "type character varying(1024), -- Equivalente a orgao";
  sql_create_ws_oportunidades += "data_cadastro TEXT,";
  sql_create_ws_oportunidades += "data_alteracao TEXT,";
  sql_create_ws_oportunidades += "n_pregao character varying(255),";
  sql_create_ws_oportunidades += "descricao text,";
  sql_create_ws_oportunidades += "termino_credenc TEXT,";
  sql_create_ws_oportunidades += "inicio_envio TEXT,";
  sql_create_ws_oportunidades += "termino_envio TEXT,";
  sql_create_ws_oportunidades += "suspensao_n character varying(250),";
  sql_create_ws_oportunidades += "suspensao_data TEXT,";
  sql_create_ws_oportunidades += "suspensao_motivo character varying(1024),";
  sql_create_ws_oportunidades += "faq text,";
  sql_create_ws_oportunidades += "edital text,";
  sql_create_ws_oportunidades += "detalhes text,";
  sql_create_ws_oportunidades += "arquivos text,";
  sql_create_ws_oportunidades += "historico text,";
  sql_create_ws_oportunidades += "filename character varying(1024),";
  sql_create_ws_oportunidades += "publicado boolean NOT NULL DEFAULT false,";
  sql_create_ws_oportunidades += "excluido boolean NOT NULL DEFAULT false,";
  sql_create_ws_oportunidades += " fisica_cadastro integer,";
  sql_create_ws_oportunidades += "fisica_alteracao integer,";
  sql_create_ws_oportunidades += "status_codigo integer,";
  sql_create_ws_oportunidades += "destaque boolean DEFAULT false,";
  sql_create_ws_oportunidades += "modalidade_codigo integer,";
  sql_create_ws_oportunidades += "regime_contratacao_codigo integer, -- antigo campo tipo";
  sql_create_ws_oportunidades += "regime_execucao_codigo integer, -- antigo campo concorrencia";
  sql_create_ws_oportunidades += "cidade_codigo integer,";
  sql_create_ws_oportunidades += "base_codigo integer,";
  sql_create_ws_oportunidades += "estado_codigo integer,";
  sql_create_ws_oportunidades += "robo_id integer,";
  sql_create_ws_oportunidades += "orgao character varying(1024),";
  sql_create_ws_oportunidades += "status_triagem_codigo integer,";
  sql_create_ws_oportunidades += "cidade character varying(255),";
  sql_create_ws_oportunidades += "estado character varying(255),";
  sql_create_ws_oportunidades += "descartado boolean DEFAULT false,";
  sql_create_ws_oportunidades += "orgao_codigo integer,";
  sql_create_ws_oportunidades += "tipo_codigo integer,";
  sql_create_ws_oportunidades += "ws_valor REAL";*/
  
  //sql_create_ws_oportunidades += "ws_valor REAL,";
  /*sql_create_ws_oportunidades += "CONSTRAINT pkws_oportunidade PRIMARY KEY (id),";
  sql_create_ws_oportunidades += "CONSTRAINT fk_ws_oportunidade_ws_base FOREIGN KEY (base_codigo)";
  sql_create_ws_oportunidades += "    REFERENCES ws_base (codigo) MATCH SIMPLE";
  sql_create_ws_oportunidades += "    ON UPTEXT NO ACTION ON DELETE NO ACTION,";
  sql_create_ws_oportunidades += "CONSTRAINT fk_ws_oportunidade_ws_cidade FOREIGN KEY (cidade_codigo)";
  sql_create_ws_oportunidades += "    REFERENCES ws_cidade (codigo) MATCH SIMPLE";
  sql_create_ws_oportunidades += "    ON UPTEXT NO ACTION ON DELETE NO ACTION,";
  sql_create_ws_oportunidades += "CONSTRAINT fk_ws_oportunidade_ws_concorrencia_tipo FOREIGN KEY (regime_execucao_codigo)";
  sql_create_ws_oportunidades += "    REFERENCES ws_concorrencia_tipo (codigo) MATCH SIMPLE";
  sql_create_ws_oportunidades += "    ON UPTEXT NO ACTION ON DELETE NO ACTION,";
  sql_create_ws_oportunidades += "CONSTRAINT fk_ws_oportunidade_ws_estado FOREIGN KEY (estado_codigo)";
  sql_create_ws_oportunidades += "    REFERENCES ws_estado (codigo) MATCH SIMPLE";
  sql_create_ws_oportunidades += "    ON UPTEXT NO ACTION ON DELETE NO ACTION,";
  sql_create_ws_oportunidades += "CONSTRAINT fk_ws_oportunidade_ws_modalidade_tipo FOREIGN KEY (modalidade_codigo)";
  sql_create_ws_oportunidades += "    REFERENCES ws_modalidade_tipo (codigo) MATCH SIMPLE";
  sql_create_ws_oportunidades += "ON UPTEXT NO ACTION ON DELETE NO ACTION,";
  sql_create_ws_oportunidades += "CONSTRAINT fk_ws_oportunidade_ws_orgao FOREIGN KEY (orgao_codigo)";
  sql_create_ws_oportunidades += "    REFERENCES ws_orgao (codigo) MATCH SIMPLE";
  sql_create_ws_oportunidades += "    ON UPTEXT NO ACTION ON DELETE NO ACTION,";
  sql_create_ws_oportunidades += "CONSTRAINT fk_ws_oportunidade_ws_pessoa_fisica_alteracao FOREIGN KEY (fisica_alteracao)";
  sql_create_ws_oportunidades += "    REFERENCES ws_pessoa_fisica (codigo) MATCH SIMPLE";
  sql_create_ws_oportunidades += "    ON UPTEXT NO ACTION ON DELETE NO ACTION,";
  sql_create_ws_oportunidades += "CONSTRAINT fk_ws_oportunidade_ws_pessoa_fisica_cadastro FOREIGN KEY (fisica_cadastro)";
  sql_create_ws_oportunidades += "    REFERENCES ws_pessoa_fisica (codigo) MATCH SIMPLE";
  sql_create_ws_oportunidades += "    ON UPTEXT NO ACTION ON DELETE NO ACTION,";
  sql_create_ws_oportunidades += "CONSTRAINT fk_ws_oportunidade_ws_status_oportunidade FOREIGN KEY (status_codigo)";
  sql_create_ws_oportunidades += "    REFERENCES ws_status_oportunidade (codigo) MATCH SIMPLE";
  sql_create_ws_oportunidades += "    ON UPTEXT NO ACTION ON DELETE NO ACTION,";
  sql_create_ws_oportunidades += "CONSTRAINT fk_ws_oportunidade_ws_status_triagem FOREIGN KEY (status_triagem_codigo)";
  sql_create_ws_oportunidades += "    REFERENCES ws_status_triagem (codigo) MATCH SIMPLE";
  sql_create_ws_oportunidades += "    ON UPTEXT NO ACTION ON DELETE NO ACTION,";
  sql_create_ws_oportunidades += "CONSTRAINT fk_ws_oportunidade_ws_tipo_oportunidade FOREIGN KEY (tipo_codigo)";
  sql_create_ws_oportunidades += "    REFERENCES ws_tipo_oportunidade (codigo) MATCH SIMPLE";
  sql_create_ws_oportunidades += "    ON UPTEXT NO ACTION ON DELETE NO ACTION";
  sql_create_ws_oportunidades += ")";
  sql_create_ws_oportunidades += "WITH (";
  sql_create_ws_oportunidades += "OIDS=FALSE";
  sql_create_ws_oportunidades += ");";
  sql_create_ws_oportunidades += "ALTER TABLE ws_oportunidade";
  sql_create_ws_oportunidades += "OWNER TO postgres;";
  sql_create_ws_oportunidades += "COMMENT ON COLUMN ws_oportunidade.type IS 'Equivalente a orgao';";
  sql_create_ws_oportunidades += "COMMENT ON COLUMN ws_oportunidade.regime_contratacao_codigo IS 'antigo campo tipo';";
  sql_create_ws_oportunidades += "COMMENT ON COLUMN ws_oportunidade.regime_execucao_codigo IS 'antigo campo concorrencia';";*/


  //var sql_create_ws_oportunidades = "CREATE TABLE IF NOT EXISTS ws_oportunidade (id serial NOT NULL, type character varying(1024), data_cadastro TEXT, data_alteracao TEXT,n_pregao character varying(255),descricao text,termino_credenc TEXT,inicio_envio TEXT,termino_envio TEXT,suspensao_n character varying(250),suspensao_data TEXT,suspensao_motivo character varying(1024),faq text,edital text,detalhes text,arquivos text,historico text,filename character varying(1024),publicado boolean NOT NULL DEFAULT false,excluido boolean NOT NULL DEFAULT false,fisica_cadastro integer,fisica_alteracao integer,status_codigo integer,destaque boolean DEFAULT false,modalidade_codigo integer,regime_contratacao_codigo integer,regime_execucao_codigo integer,cidade_codigo integer,base_codigo integer,estado_codigo integer,robo_id integer,orgao character varying(1024),status_triagem_codigo integer,cidade character varying(255),estado character varying(255),descartado boolean DEFAULT false,orgao_codigo integer,tipo_codigo integer,ws_valor REAL)";
  
if (db)
{
	db.transaction(function(x) {
		x.executeSql('CREATE TABLE IF NOT EXISTS usuarios (id PRIMARY KEY, nome_de_usuario TEXT, codigo TEXT, razao_social TEXT, cnpj TEXT, telefone TEXT, email TEXT, endereco TEXT, bairro TEXT, cep TEXT, municipio TEXT, uf TEXT, razao_social_da_empresa TEXT, cnpj_da_empresa TEXT, telefone_1_da_empresa TEXT, telefone_2_da_empresa TEXT, email_da_empresa TEXT, endereco_da_empresa TEXT, numero_da_empresa TEXT, bairro_da_empresa TEXT, cep_da_empresa TEXT, municipio_da_empresa TEXT, uf_da_empresa TEXT, codigo_da_tabela_de_preco TEXT, unidades TEXT, dap_empresa REAL, dap_max REAL, dap_min REAL) ');
		
		x.executeSql('CREATE TABLE IF NOT EXISTS sincronizado (data_hora PRIMARY KEY, tabelas TEXT, sucesso INTEGER, nunca_sincronizou INTEGER) ');
		
		x.executeSql('CREATE TABLE IF NOT EXISTS licitacoes (id PRIMARY KEY, timestamp INTEGER, exportado INTEGER, situacao TEXT, codigo TEXT, codigo_usuario TEXT, razao_social_do_usuario TEXT, cnpj_do_cliente TEXT, tabela_de_frete_do_cliente TEXT, codigo_da_tabela_de_preco TEXT, descricao_da_tabela_de_preco TEXT, codigo_do_produto TEXT, descricao_do_produto TEXT, um_do_produto TEXT, peso_do_produto REAL, quantidade INTEGER, quantidade_faturada INTEGER, preco REAL, preco_original REAL, total_sem_ipi REAL, ipi REAL, total_com_ipi REAL, peso_total REAL, peso_total_do_pedido REAL, preco_medio_por_kg_do_pedido REAL, valor_do_frete_do_pedido REAL, valor_do_frete_alterado INTEGER, valor_dos_produtos_do_pedido REAL, valor_total_do_pedido REAL, codigo_da_forma_de_pagamento TEXT, descricao_da_forma_de_pagamento TEXT, tipo_de_frete TEXT, codigo_da_transportadora TEXT, nome_da_transportadora TEXT, id_do_evento INTEGER, nome_do_evento TEXT, ordem_de_compra TEXT, data_de_entrega TEXT, observacao TEXT, observacao_fiscal TEXT, unidade TEXT, tipo_de_pedido TEXT, pedido_autorizado TEXT, cultura TEXT, desconto REAL, valor_desconto REAL, st REAL, valor_st REAL, desconto_total_pedido REAL, valor_total_st REAL, total_final REAL, orc INTEGER, id_pro INTEGER, raz_soc_pro TEXT, cpf_pro TEXT, nro_itens INTEGER, licitacao_sendo_editado INTEGER, cfe INTEGER, dap REAL) ');
		
		x.executeSql('CREATE TABLE IF NOT EXISTS parceiros (id PRIMARY KEY, codigo TEXT, filial TEXT, razao_social TEXT, nome_fantasia TEXT, tipo_de_pessoa TEXT, cnpj TEXT, ie TEXT, telefone TEXT, email TEXT, pessoa_de_contato TEXT, endereco TEXT, bairro TEXT, cep TEXT, municipio TEXT, estado TEXT, limite_de_credito REAL, observacao TEXT, data_de_cadastro TEXT, condicao_pagamento TEXT, total_licitacoes_abertos REAL, total_licitacoes_vencidas REAL, total_licitacoes_abertas REAL) ');
		
		x.executeSql('CREATE TABLE IF NOT EXISTS contratos (id PRIMARY KEY, codigo TEXT, descricao TEXT, valor REAL) ');
		
		x.executeSql('CREATE TABLE IF NOT EXISTS teste(a, b PRIMARY KEY) ');
		
		x.executeSql("CREATE TABLE IF NOT EXISTS ws_oportunidade (id PRIMARY KEY, type TEXT, data_cadastro TEXT, data_alteracao TEXT,n_pregao TEXT,descricao TEXT,termino_credenc TEXT,inicio_envio TEXT,termino_envio TEXT,suspensao_n TEXT,suspensao_data TEXT,suspensao_motivo TEXT,faq TEXT,edital TEXT,detalhes TEXT,arquivos TEXT,historico TEXT,filename TEXT,publicado TEXT,excluido TEXT,fisica_cadastro INTEGER,fisica_alteracao INTEGER,status_codigo INTEGER,destaque TEXT,modalidade_codigo INTEGER,regime_contratacao_codigo INTEGER,regime_execucao_codigo INTEGER,cidade_codigo INTEGER,base_codigo INTEGER,estado_codigo INTEGER,robo_id INTEGER,orgao TEXT,status_triagem_codigo INTEGER,cidade TEXT,estado TEXT,descartado TEXT,orgao_codigo INTEGER,tipo_codigo INTEGER,ws_valor REAL) ");

	});
	
	$('#retorno').html('success create tables:');
}
else
{
	$('#retorno').html("DB error : " + err.message);
	return false;
}

function criar_tabelas()
{
	db.transaction(function(x) {
		x.executeSql('CREATE TABLE IF NOT EXISTS usuarios (id PRIMARY KEY, nome_de_usuario TEXT, codigo TEXT, razao_social TEXT, cnpj TEXT, telefone TEXT, email TEXT, endereco TEXT, bairro TEXT, cep TEXT, municipio TEXT, uf TEXT, razao_social_da_empresa TEXT, cnpj_da_empresa TEXT, telefone_1_da_empresa TEXT, telefone_2_da_empresa TEXT, email_da_empresa TEXT, endereco_da_empresa TEXT, numero_da_empresa TEXT, bairro_da_empresa TEXT, cep_da_empresa TEXT, municipio_da_empresa TEXT, uf_da_empresa TEXT, codigo_da_tabela_de_preco TEXT, unidades TEXT, dap_empresa REAL, dap_max REAL, dap_min REAL) ');
		
		x.executeSql('CREATE TABLE IF NOT EXISTS sincronizado (data_hora PRIMARY KEY, tabelas TEXT, sucesso INTEGER, nunca_sincronizou INTEGER) ');
		
		x.executeSql('CREATE TABLE IF NOT EXISTS licitacoes (id PRIMARY KEY, timestamp INTEGER, exportado INTEGER, situacao TEXT, codigo TEXT, codigo_usuario TEXT, razao_social_do_usuario TEXT, cnpj_do_cliente TEXT, tabela_de_frete_do_cliente TEXT, codigo_da_tabela_de_preco TEXT, descricao_da_tabela_de_preco TEXT, codigo_do_produto TEXT, descricao_do_produto TEXT, um_do_produto TEXT, peso_do_produto REAL, quantidade INTEGER, quantidade_faturada INTEGER, preco REAL, preco_original REAL, total_sem_ipi REAL, ipi REAL, total_com_ipi REAL, peso_total REAL, peso_total_do_pedido REAL, preco_medio_por_kg_do_pedido REAL, valor_do_frete_do_pedido REAL, valor_do_frete_alterado INTEGER, valor_dos_produtos_do_pedido REAL, valor_total_do_pedido REAL, codigo_da_forma_de_pagamento TEXT, descricao_da_forma_de_pagamento TEXT, tipo_de_frete TEXT, codigo_da_transportadora TEXT, nome_da_transportadora TEXT, id_do_evento INTEGER, nome_do_evento TEXT, ordem_de_compra TEXT, data_de_entrega TEXT, observacao TEXT, observacao_fiscal TEXT, unidade TEXT, tipo_de_pedido TEXT, pedido_autorizado TEXT, cultura TEXT, desconto REAL, valor_desconto REAL, st REAL, valor_st REAL, desconto_total_pedido REAL, valor_total_st REAL, total_final REAL, orc INTEGER, id_pro INTEGER, raz_soc_pro TEXT, cpf_pro TEXT, nro_itens INTEGER, licitacao_sendo_editado INTEGER, cfe INTEGER, dap REAL)  ');
		
		x.executeSql('CREATE TABLE IF NOT EXISTS parceiros (id PRIMARY KEY, codigo TEXT, filial TEXT, razao_social TEXT, nome_fantasia TEXT, tipo_de_pessoa TEXT, cnpj TEXT, ie TEXT, telefone TEXT, email TEXT, pessoa_de_contato TEXT, endereco TEXT, bairro TEXT, cep TEXT, municipio TEXT, estado TEXT, limite_de_credito REAL, observacao TEXT, data_de_cadastro TEXT, condicao_pagamento TEXT, total_licitacoes_abertos REAL, total_licitacoes_vencidas REAL, total_licitacoes_abertas REAL) ');
		
		x.executeSql('CREATE TABLE IF NOT EXISTS contratos (id PRIMARY KEY, codigo TEXT, descricao TEXT, valor REAL) ');
		
		x.executeSql('CREATE TABLE IF NOT EXISTS teste(a, b PRIMARY KEY) ');
		
		x.executeSql("CREATE TABLE IF NOT EXISTS ws_oportunidade (id PRIMARY KEY, type TEXT, data_cadastro TEXT, data_alteracao TEXT,n_pregao TEXT,descricao TEXT,termino_credenc TEXT,inicio_envio TEXT,termino_envio TEXT,suspensao_n TEXT,suspensao_data TEXT,suspensao_motivo TEXT,faq TEXT,edital TEXT,detalhes TEXT,arquivos TEXT,historico TEXT,filename TEXT,publicado TEXT,excluido TEXT,fisica_cadastro INTEGER,fisica_alteracao INTEGER,status_codigo INTEGER,destaque TEXT,modalidade_codigo INTEGER,regime_contratacao_codigo INTEGER,regime_execucao_codigo INTEGER,cidade_codigo INTEGER,base_codigo INTEGER,estado_codigo INTEGER,robo_id INTEGER,orgao TEXT,status_triagem_codigo INTEGER,cidade TEXT,estado TEXT,descartado TEXT,orgao_codigo INTEGER,tipo_codigo INTEGER,ws_valor REAL) ");

	});
	
	$('#retorno').html('success create tables por function:');
}

function error (transaction, err) 
{
	$('#retorno').html("DB error : " + err.message);
	return false;
}

/*db.transaction (function (transaction) 
{
  
  transaction.executeSql ('CREATE TABLE IF NOT EXISTS teste(a, b PRIMARY KEY);', undefined, 
  
  function (transaction, result)
{
	alert('create ok');
  
  }, error);
  
});*/