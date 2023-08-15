function calcularValorDaCompra(formaDePagamento, itens) {
  const cardapio = {
    '001': { nome: 'Cafe', preco: 3.00 },
    '002': { nome: 'Chantily', preco: 1.50 },
    '003': { nome: 'Suco Natural', preco: 6.20 },
    '004': { nome: 'Sanduiche', preco: 6.50 },
    '005': { nome: 'Queijo', preco: 2.00 },
    '006': { nome: 'Salgado', preco: 7.25 },
    '007': { nome: 'Combo1', preco: 9.50 },
    '008': { nome: 'Combo2', preco: 7.50 },
  };

  const descontoDinheiro = 0.05;
  const acrescimoCredito = 0.03;

  const codigoItemPrincipal = ['001', '003', '004', '006', '007', '008'];

  if (!formaDePagamento || !(formaDePagamento === 'debito' || formaDePagamento === 'credito' || formaDePagamento === 'dinheiro')) {
    return 'Forma de pagamento inválida!';
  }

  if (itens.length === 0) {
    return 'Não há itens no carrinho de compra!';
  }

  let totalCompra = 0;

  for (const item of itens) {
    const [itemCode, quantidade] = item.split(',');

    if (!itemCode || !quantidade || isNaN(quantidade)) {
      return 'Quantidade inválida!';
    }

    if (!cardapio[itemCode]) {
      return 'Item inválido!';
    }

    if (codigoItemPrincipal.includes(itemCode)) {
      totalCompra += cardapio[itemCode].preco * quantidade;
    } else {
      const itemPrincipalCode = itemCode.substring(0, 3);
      if (!codigoItemPrincipal.includes(codigoItemPrincipal) || cardapio[codigoItemPrincipal].nome.includes('Combo')) {
        return 'Item extra não pode ser pedido sem o principal';
      }
    }
  }

  if (formaDePagamento === 'dinheiro') {
    totalCompra *= (1 - descontoDinheiro);
  } else if (formaDePagamento === 'credito') {
    totalCompra *= (1 + acrescimoCredito);
  }

  return `R$ ${totalCompra.toFixed(2).replace('.', ',')}`;
}


const formaDePagamento = 'debito';
const itens = ['008,1'];
console.log(calcularValorDaCompra(formaDePagamento, itens));
