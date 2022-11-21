
//Script que coloca as imagens
let cart = [];
let modalQt = 0;
let key = 0;
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

//Abre espaço para o preenchimento
modelsJson.map((item, index) => {
    let modelsItem = c('.models .models-item').cloneNode(true);
    modelsItem.setAttribute('data-key', index);

    modelsItem.querySelector('.models-item--img img').src = item.img;
    modelsItem.querySelector('.models-item--price').innerHTML = `R$ ${item.price[0].toFixed(2)}`;
    modelsItem.querySelector('.models-item--name').innerHTML = item.name;
    modelsItem.querySelector('.models-item--desc').innerHTML = item.description;

    //Colocando as informações
    //Quando clicar na classe 'a' dentro de uma determinada, vai acionar esses eventos.
    modelsItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        key = e.target.closest('.models-item').getAttribute('data-key');
        modalQt = 1; //variavel da quantidade adicionada ou removida
        c('.modelsBig img').src = modelsJson[key].img;
        c('.modelsInfo h1').innerHTML = modelsJson[key].name;
        c('.modelsInfo--desc').innerHTML = modelsJson[key].description;
        //c('.modelsInfo--actualPrice').innerHTML = `R$ ${modelsJson[key].price[0].toFixed(2)}`;
        cs('.modelsInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 0) {
                size.classList.add('selected');
                c('.modelsInfo--actualPrice').innerHTML = `R$ ${modelsJson[key].price[sizeIndex].toFixed(2)}`;
            }
            size.innerHTML = modelsJson[key].sizes[sizeIndex];
        });
        c('.modelsInfo--qt').innerHTML = modalQt;

        //Efeito de opacidade quando abrir a tela
        c('.modelsWindowArea').style.opacity = 0;
        c('.modelsWindowArea').style.display = 'flex';
        setTimeout(() => {
            c('.modelsWindowArea').style.opacity = 1;
        }, 25);

    });

    c('.models-area').append(modelsItem);
});

//AÇÕES DO MODAL - JANELA ---------------

//Função de fechar a janela
function closeModal() {
    c('.modelsWindowArea').style.opacity = 0;
    setTimeout(() => {
        c('.modelsWindowArea').style.display = 'none';
    }, 500);
}
cs('.modelsInfo--cancelButton', '.modelsInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});
//
//Função de aumentar e diminuir a quantidade
c('.modelsInfo--qtmenos').addEventListener('click', () => {
    if (modalQt > 1) {
        modalQt--;
        c('.modelsInfo--qt').innerHTML = modalQt;
    };
});

c('.modelsInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    c('.modelsInfo--qt').innerHTML = modalQt;
});
//
// Função de mudar os tamanhos
cs('.modelsInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        c('.modelsInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
        c('.modelsInfo--actualPrice').innerHTML = `R$ ${modelsJson[key].price[sizeIndex].toFixed(2)}`;
    });
});

// Função de adicionar ao carrinho
c('.modelsInfo--addButton').addEventListener('click', () => {
    //Saber modelo, (key)
    //tamanho
    let size = parseInt(c('.modelsInfo--size.selected').getAttribute('data-key'));
    //variavel para identificar se ja tem um mesmo produto no carrinho
    let identifier = modelsJson[key].id + '@' + size;
    let locaId = cart.findIndex((item) => item.identifier == identifier);
    if (locaId > -1) {
        cart[locaId].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id: modelsJson[key].id,
            size,
            qt: modalQt
        });
    }
    //quantidade (modalQt)
    updateCart();
    closeModal();
});

c('.menu-openner').addEventListener('click', ()=> {
    if (cart.length > 0 ){
        c('aside').style.left = '0';
    }
})

c('.menu-closer').addEventListener('click', () => {
   c('aside').style.left = '100vw'; 
});

c('.cart--finalizar').addEventListener('click', () => {
    cart = [];
    updateCart();

})

//FUNÇÕES DO ASIDE
//verifica se há coisas no carrinho
function updateCart() {
    c('.menu-openner span').innerHTML = cart.length;
    if (cart.length > 0) {
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';
        let subtotal = 0;
        let desconto = 0;
        let total = 0;
        cart.map((itemCart, index) => {
            let modelItem = modelsJson.find((itemBD) => itemBD.id == itemCart.id);
            //subtotal
            subtotal += modelItem.price[itemCart.size] * itemCart.qt;
            //desconto
            if (subtotal > 150) {
                desconto = subtotal * 0.10;
            } else {
                desconto = 0;
            };
            //total
            total = subtotal - desconto;

            let cartItem = c('.models .cart--item').cloneNode(true);
            let modelSizeName;
            switch (itemCart.size) {
                case 0:
                    modelSizeName = 'A3';
                    break;
                case 1:
                    modelSizeName = 'A3';
                    break;
                case 2:
                    modelSizeName = 'A3';
                    break;
                case 3:
                    modelSizeName = 'A3';
                    break;
                case 4:
                    modelSizeName = 'A3';
                    break;
            }
            //Adicionando nome, imagem, quantidade
            cartItem.querySelector('img').src = modelItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = `${modelItem.name} - (${modelSizeName})`;
            cartItem.querySelector('.cart--item-qt').innerHTML = itemCart.qt;
            //Função dos botoes + e -
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (itemCart.qt > 1) {
                    itemCart.qt--;
                    updateCart();
                } else {
                    //remove do carrinho
                    cart.splice(index, 1);
                };
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                itemCart.qt++;
                updateCart();
            });

            c('.cart').append(cartItem);
        });
        //Area de preços
        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`; 
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
    } else {
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    }
};

