import { FC, useEffect, useState } from "react";
import { STATU_CODE, apiGet } from "../../api/RestClient";
import { IBtnProduto, IProduto } from "./types";
import "./index.css";
import BotaoPadrao from "../../components/BtnPadrao";
import { CircularProgress, LinearProgress } from "@mui/material";
import BannerPage from "../../components/BannerOfertas/index";
import { TbShoppingCartDollar } from "react-icons/tb";
import { IoNewspaperOutline } from "react-icons/io5";
import BannerPageNovidades from "../../components/BannerNovidades";

const Home : FC = () =>{
    const [produtos, setProdutos] = useState<IProduto[]>([]); 

    const carregaProdutos = async() => {
        // const response = await apiGet("/produtos/");
        const response = await apiGet("/produtos/carregar/categoriacombo");// endPoint api ecommerce Lux
        if (response.status === STATU_CODE.OK) {
            console.log(response);
            setProdutos(response.data);

        }
    }

    useEffect(() => {
        carregaProdutos();
    }, []);

    const redirecionarDetalhesProduto = (idProduto: number) => {
        if(idProduto) {
            window.location.href = `/produtos/detalhes/${idProduto}`;
        }    }

    return <>
        {produtos?.length ? <> 
            
            <div className="banner-ofertas-da-semana">
                <BannerPage />
            </div>

            <div className="combos-de-produtos">
                <h3>
                    <strong>Combos de ofertas</strong>
                    <TbShoppingCartDollar style={{ fontSize: '24px', marginLeft: '8px' }} />
                </h3>
            </div>

            <div className="container">
                {produtos.map((produto: IProduto) => {
                    return <>
                       <div className="produto">
                            <a className="produto_imagem" href={`/produtos/detalhes/${produto.id}`}>
                                <img src={produto.imagemPequena}/>
                            </a>
                            <div className="produto_nome">
                                <p>{produto.nome}</p>
                            </div>
                            <div className="produto_categoria">
                                <p><strong>{produto.categoria === 'ACESSORIOS' ? 'Combos - Kits - Conjuntos' : produto.categoria}</strong></p>
                            </div>
                            <div className="produto_preco">
                                    <p>R$ {produto.preco}</p>
                                    <div className="produto_preco_desconto">
                                        <p>R$ -10,00</p>
                                    </div>
                            </div>
                            <div><BotaoPadrao label="Comprar" onClick={() => { 
                                        redirecionarDetalhesProduto((produto.id))
                                    }}/>
                            </div>
                            
                       </div>

                    </>
                })}
            </div>
            <div className="combos-de-produtos">
                <h3>
                    <strong>Novidades</strong>
                    <IoNewspaperOutline style={{ fontSize: '24px', marginLeft: '8px' }} />
                </h3>
            </div>
          
            <div className="banner-novidades">
                    <BannerPageNovidades />
            </div>
        </> : <div 
                className="carregar-produtos">
                    <strong>Por favor, aguarde enquanto carregamos as melhores opções de moda...</strong>
                    <div className="progress-container">
                        <LinearProgress />
                    </div>
               </div>
            }
        
    </>
}
export default Home;