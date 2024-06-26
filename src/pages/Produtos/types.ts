export interface IProduto {
    codigoProduto: string,
    id: number,
    nome: string,
    descricao: string,
    preco: number,
    precoAntigo?: number,
    imagemGrande: string,
    imagemPequena: string,
    enderecoImagem: string,
}

export interface IBtnProduto {
    btnProduto: boolean
}