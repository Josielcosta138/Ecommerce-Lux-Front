export interface IProduto {
    codigoProduto: string,
    id : number,
    nome : string,
    categoria : string,
    descricao : string,
    preco : number,
    imagemGrande : string,
    imagemPequena : string,
}

export interface IBtnProduto { 
    btnProduto: boolean,
}