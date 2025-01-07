// 获取商品列表的容器
const productList = document.getElementById('product-list');
// 获取商品详情的容器
const productDetail = document.getElementById('product-detail');

// 加载商品列表
async function loadProductList() {
    try {
        // 从 JSON 文件加载数据
        const response = await fetch('https://chillaxor.github.io/sanyou_json/sanyou.json');
        const data = await response.json();
console.log(data);
        // 动态生成商品列表
        data.forEach(product => {
            const li = document.createElement('li');
            li.className = 'product-item';
            li.innerHTML = `
                <a href="product.html?id=${product.id}">
                    ${product.name} - ￥${product.price}
                </a>
            `;
            productList.appendChild(li);
        });
    } catch (error) {
        console.error('加载商品列表失败:', error);
    }
}

// 加载商品详情
async function loadProductDetail() {
    try {
        // 从 URL 中获取商品 ID
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (productId) {
            // 从 JSON 文件加载数据
            const response = await fetch('https://chillaxor.github.io/sanyou_json/sanyou_detail.json');
            const data = await response.json();

            // 查找对应的商品
            const product = data.find(item => item.id == productId);

            if (product) {
                // 显示商品详情
                document.getElementById('product-name').textContent = product.name;
                document.getElementById('product-image').src = product.image;
                document.getElementById('product-price').textContent = `价格：￥${product.price}`;
                document.getElementById('product-description').textContent = `描述：${product.description}`;
            } else {
                productDetail.innerHTML = '<p>商品未找到</p>';
            }
        } else {
            productDetail.innerHTML = '<p>商品ID无效</p>';
        }
    } catch (error) {
        console.error('加载商品详情失败:', error);
    }
}

// 根据当前页面决定加载列表还是详情
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    loadProductList();
} else if (window.location.pathname.endsWith('product.html')) {
    loadProductDetail();
}
