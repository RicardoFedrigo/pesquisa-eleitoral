#Intenção de Votos - Aplicação de Estimativa

Este repositório contém o código fonte de uma aplicação desenvolvida para um Instituto de Pesquisas, especializado na realização de pesquisas de intenção de votos em eleições para presidente do Brasil. A aplicação tem como missão estimar a intenção de votos em eleições presidenciais com base em dados demográficos dos municípios brasileiros.
Organização do Repositório

Este repositório é organizado em duas partes principais: backend e frontend. Trata-se de um monorepo, o que significa que as partes de frontend e backend estão contidas em um único repositório, facilitando o gerenciamento e a colaboração no desenvolvimento do projeto.

# Backend

O backend da aplicação é desenvolvido com o framework Nest.js. Nest.js é uma estrutura de desenvolvimento de aplicativos Node.js altamente modular que segue o padrão de arquitetura "Módulo, Controlador, Provedor de Serviços". Ele é uma escolha sólida para a criação de serviços web escaláveis e eficientes, fornecendo um ecossistema robusto para desenvolver APIs RESTful.

No contexto deste projeto, o backend é responsável por realizar as estimativas de intenção de votos com base em dados demográficos, incluindo informações sobre estados e municípios brasileiros. O backend é integrado com uma base de dados que contém informações atualizadas dos estados e municípios, utilizando a base do IBGE.

A cada pesquisa eleitoral, o sistema recebe um arquivo contendo uma lista de intenções de votos resultantes das entrevistas, composta pelos seguintes campos:

    ID da pesquisa
    Data da pesquisa
    Município
    Estado
    Intenção de voto para cada candidato (utilizando o ID do candidato)

O backend processa esses dados e gera estimativas de intenção de votos com base nas informações demográficas e nas intenções de voto coletadas.

# Frontend

A parte de frontend desta aplicação é responsável por fornecer uma interface amigável para a visualização dos resultados das estimativas de intenção de votos. Ela pode ser usada para apresentar gráficos, tabelas e outros recursos visuais que ajudam a compreender as tendências de votação com base nos dados coletados.

Este repositório é uma base sólida para desenvolver a aplicação de estimativa de intenção de votos e pode ser expandido e personalizado de acordo com as necessidades específicas do Instituto de Pesquisas. Este README fornece uma visão geral do projeto, e mais detalhes de implementação podem ser encontrados nos diretórios de backend e frontend.

Lembre-se de manter este repositório atualizado com os dados mais recentes dos estados e municípios brasileiros para garantir a precisão das estimativas de intenção de votos. Boa sorte no desenvolvimento e nas pesquisas eleitorais!
