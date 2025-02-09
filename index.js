// 判断当前设备是否为移动设备的函数
function isMobile() {
    const userAgent = navigator.userAgent; // 获取用户代理字符串
    const mobileAgents = ['Android', 'iPhone', 'Windows Phone', 'BlackBerry', 'SymbianOS'];

    // 检查用户代理字符串中是否包含移动设备关键词
    return mobileAgents.some(agent => userAgent.includes(agent));
}

// 判断当前设备是否为手表的函数
function isWatch() {
    const userAgent = navigator.userAgent; // 获取用户代理字符串
    const watchAgents = ['Watch', 'Huaweiwatch'];

    // 检查用户代理字符串中是否包含手表设备关键词
    return watchAgents.some(agent => userAgent.includes(agent));
}

// 从指定的txt文件中随机获取一条图片链接的函数
async function getRandomImage(filename) {
    const response = await fetch(filename); // 请求txt文件
    const text = await response.text(); // 获取文件内容
    const imageUrls = text.split('\n').filter(url => url.trim() !== ''); // 按行分割并过滤空行
    if (imageUrls.length > 0) {
        const randomIndex = Math.floor(Math.random() * imageUrls.length); // 随机选择一个索引
        return imageUrls[randomIndex]; // 返回选中的图片链接
    } else {
        return null; // 如果数组为空，返回null表示没有图片链接
    }
}

// 直接输出图片的函数
function outputImage(imageUrl) {
    const imgElement = document.getElementById('randomImage');
    imgElement.src = imageUrl; // 设置图片的src属性
}

// 主函数
async function main() {
    let filename;
    const isMobileDevice = isMobile();
    const isWatchDevice = isWatch();

    // 根据设备类型选择相应的txt文件
    if (isWatchDevice) {
        filename = './ghf.txt'; // 如果是手表设备，使用ghf.txt
    } else if (isMobileDevice) {
        filename = './ghm.txt'; // 如果是移动设备，使用ghm.txt
    } else {
        filename = './ghpc.txt'; // 如果是桌面设备，使用ghpc.txt
    }

    const imageUrl = await getRandomImage(filename); // 从txt文件中随机获取一条图片链接

    if (imageUrl) {
        outputImage(imageUrl); // 输出图片
    } else {
        document.getElementById('errorMessage').innerText = "No images found in the txt file."; // 如果没有图片链接，输出错误信息
    }
}

// 页面加载时执行主函数
window.onload = main;




