// netlify/functions/randomImage.js

const fs = require('fs');
const path = require('path');

// 判断当前设备是否为移动设备的函数
function isMobile(userAgent) {
    const mobileAgents = ['Android', 'iPhone', 'Windows Phone', 'BlackBerry', 'SymbianOS'];
    return mobileAgents.some(agent => userAgent.includes(agent));
}

// 判断当前设备是否为手表的函数
function isWatch(userAgent) {
    const watchAgents = ['Watch', 'Huaweiwatch'];
    return watchAgents.some(agent => userAgent.includes(agent));
}

// 从指定的txt文件中随机获取一条图片链接的函数
function getRandomImage(filename) {
    const filePath = path.join(__dirname, filename);
    const text = fs.readFileSync(filePath, 'utf-8');
    const imageUrls = text.split('\n').filter(url => url.trim() !== '');
    if (imageUrls.length > 0) {
        const randomIndex = Math.floor(Math.random() * imageUrls.length);
        return imageUrls[randomIndex];
    } else {
        return null;
    }
}

exports.handler = async (event) => {
    const userAgent = event.headers['user-agent'];
    let filename;

    const isMobileDevice = isMobile(userAgent);
    const isWatchDevice = isWatch(userAgent);

    // 根据设备类型选择相应的txt文件
    if (isWatchDevice) {
        filename = 'ghf.txt';
    } else if (isMobileDevice) {
        filename = 'ghm.txt';
    } else {
        filename = 'ghpc.txt';
    }

    const imageUrl = getRandomImage(filename);

    if (imageUrl) {
        return {
            statusCode: 200,
            body: JSON.stringify({ imageUrl }),
        };
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: "No images found in the txt file." }),
        };
    }
};
