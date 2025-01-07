// 获取商品列表的容器
const productList = document.getElementById('product-list');
// 获取商品详情的容器
const productDetail = document.getElementById('product-detail');

// 加载商品列表
async function loadProductList() {
    try {
        // 从 JSON 文件加载数据
        const response = await fetch('./sanyou.json');
        
        // 检查请求是否成功
        if (!response.ok) {
            throw new Error(`HTTP 错误！状态码: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // 打印数据

         // 确保 data.products 是一个数组
        if (Array.isArray(data.products)) {
            data.products.forEach(product => {
                const li = document.createElement('li');
                li.className = 'product-item';
                li.innerHTML = `
                    <a href="product.html?id=${product.id}">
                        <img src="${product.imgList[0]}" alt="${product.name}" />
                        <p>${product.name}</p>
                        <p>￥${product.price}</p>
                    </a>
                `;
                productList.appendChild(li);
            });
        } else {
            console.error('数据格式错误：data.products 不是数组');
        }
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
            const response = await fetch('./sanyou_detail.json');
            const data = await response.json();

            // 查找对应的商品
            const product = data.find(item => item.id == productId);

            if (product) {
                // 显示商品详情
                document.getElementById('product-name').textContent = product.name;
                document.getElementById('product-price').textContent = `价格：￥${product.price}`;
                document.getElementById('product-color').textContent = `颜色：${product.color}`;
                document.getElementById('product-size').textContent = `尺码：${product.size}`;
                document.getElementById('product-desc').textContent = `描述：${product.desc}`;

                // 显示商品图片
                const productImages = document.getElementById('product-images');
                product.imgList.forEach(img => {
                    const imgElement = document.createElement('img');
                    imgElement.src = img;
                    imgElement.alt = product.name;
                    productImages.appendChild(imgElement);
                });

                // 显示商品详情图片
                const productDetailImages = document.getElementById('product-detail-images');
                product.detailImg.forEach(img => {
                    const imgElement = document.createElement('img');
                    imgElement.src = img;
                    imgElement.alt = product.name;
                    productDetailImages.appendChild(imgElement);
                });
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

// 页面加载完成后调用
if (window.location.pathname.endsWith('home.html') || window.location.pathname === '/') {
    loadProductList();
} else if (window.location.pathname.endsWith('product.html')) {
    loadProductDetail();
}
