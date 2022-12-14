# WorkDb React Test Portfolio

### Developed by: Ibsen Gabriel Santos

<br>

## Resumo
Buscando atender o objetivo proposto, foi desenvolvida uma aplicação React 
utilizando o framework NextJS e Typescript com Deploy na Vercel.

## Funcionalidades
A aplicação contém as seguintes funcionalidades: 
### Formulário e Form Controll
Um formulário para cadastro de novos usuários, com validação de dados e tratamento de erros sendo realizados  pelas bibliotecas
_react-hook-form_ e _YUP_.

### Tabela
Uma tabela construída utilizando o componente _mui/x-data-grid_ com funcionalidades adicionais de ordenar resultados por ordem crescente ou decrescente e paginação no seu rodapé.
Contém também no seu cabeçalho um filtro para buscar usuário por nome ou sobrenome, e dois botões, sendo um para exportar todos os dados do estado atual para uma nova aba do navegador em formato JSON e um que irá efetuar a exclusão de todos os dados constantes no estado atual.

### Estilização
Para a estilização foi utilizada a biblioteca de componentes MUI Material que conta com alguns componentes já pré-construídos.

### Principais Bibliotecas de Terceiros / Dependências

1. Mui Material
2. Mui Material Icons
3. Mui X Datagrid
4. React Hook Form
5. Yup
6. UUID
7. Date-Fns


## Considerações Finais e Observações
Para conclusão do objetivo proposto, foi utilizado um pouco de "Prop Drilling". 
Levando em conta o princípio de YAGNI (You ain't gonna need it) já que
o código atende completamente o objetivo proposto, o mesmo fora mantido na forma como se encontra atualmente. Todavia, cabe a ele diversas refatorações, sendo, a principal, uma melhor arquitetura dos pacotes e módulos que abarcam os componentes e a implementação de um contexto para controle global do estado da Tabela na aplicação.